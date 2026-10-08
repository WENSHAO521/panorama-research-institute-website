"""Add reproducible, non-printing provenance marks to the three Charter PDFs.

The marks use PDF text rendering mode 3, so they remain in each page's content
stream for provenance checks without changing the visible or printed layout.
"""

from hashlib import sha256
from pathlib import Path
import os
import sys
import tempfile

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, DecodedStreamObject, DictionaryObject, NameObject


ROOT = Path(__file__).resolve().parent.parent
DOCUMENTS = ROOT / "public" / "documents"
FONT_NAME = NameObject("/FPRIWM")


def add_watermark(path: Path, language: str) -> None:
    source = PdfReader(path)
    assert len(source.pages) > 2, f"Unexpected page count: {path}"
    page_text = "".join(page.extract_text() for page in source.pages)
    if "PRI-CHARTER-v1.1-20261005-" in page_text:
        raise ValueError(f"Watermark already present in {path}")

    fingerprint = sha256(page_text.encode("utf-8")).hexdigest()[:24].upper()
    prefix = f"PRI-CHARTER-v1.1-20261005-{language}-{fingerprint}"
    writer = PdfWriter(clone_from=path)
    font = DictionaryObject(
        {
            NameObject("/Type"): NameObject("/Font"),
            NameObject("/Subtype"): NameObject("/Type1"),
            NameObject("/BaseFont"): NameObject("/Helvetica"),
        }
    )
    font_ref = writer._add_object(font)

    for number, page in enumerate(writer.pages, 1):
        resources = page["/Resources"].get_object()
        fonts = resources.get("/Font")
        if fonts is None:
            fonts = DictionaryObject()
            resources[NameObject("/Font")] = fonts
        else:
            fonts = fonts.get_object()
        fonts[FONT_NAME] = font_ref

        marker = f"{prefix}-P{number:02}"
        stream = DecodedStreamObject()
        stream.set_data(
            f"q\nBT\n/FPRIWM 7 Tf\n3 Tr\n1 0 0 1 36 36 Tm\n({marker}) Tj\nET\nQ\n".encode("ascii")
        )
        stream_ref = writer._add_object(stream)
        contents = page.raw_get("/Contents")
        page[NameObject("/Contents")] = ArrayObject(
            [*contents, stream_ref] if isinstance(contents, ArrayObject) else [contents, stream_ref]
        )

    writer.add_metadata(
        {
            "/Title": f"Panorama Research Institute Charter — {language} — v1.1",
            "/Author": "Panorama Scholarly Group",
            "/Subject": "Official Panorama Research Institute Charter; effective 2026-10-05",
            "/Keywords": "Panorama Research Institute; PRI; Charter; v1.1",
            "/PRIProvenanceID": prefix,
            "/PRIProvenanceURL": "https://research.panorama-sg.com/charter/",
        }
    )

    with tempfile.NamedTemporaryFile(dir=path.parent, suffix=".pdf", delete=False) as temp:
        temp_path = Path(temp.name)
    try:
        writer.write(temp_path)
        checked = PdfReader(temp_path)
        if len(checked.pages) != len(source.pages):
            raise ValueError(f"Page count changed in {path}")
        if checked.metadata.get("/PRIProvenanceID") != prefix:
            raise ValueError(f"Missing document provenance in {path}")
        for number, page in enumerate(checked.pages, 1):
            if f"{prefix}-P{number:02}" not in page.extract_text():
                raise ValueError(f"Missing page provenance on page {number}: {path}")
        os.replace(temp_path, path)
        print(f"Watermarked {path.name}: {len(checked.pages)} pages; {prefix}")
    finally:
        temp_path.unlink(missing_ok=True)


if __name__ == "__main__":
    for code, suffix in (("EN", "en"), ("CN", "cn"), ("TW", "cn-tw")):
        add_watermark(DOCUMENTS / f"panorama-research-institute-charter-{suffix}.pdf", code)
