import csv
from io import BytesIO, StringIO
from typing import Dict, Iterable, Optional

from openpyxl.workbook import Workbook


def get_strip_filters(**kwargs: Optional[str]) -> Dict[str, str]:
    return dict([*map(lambda p: [p[0], p[1].strip()], filter(lambda p: p[1] is not None, kwargs.items()))])


def serialize_to_xlsx(rows: Iterable[Iterable[str]]) -> BytesIO:
    buffer = BytesIO()
    workbook = Workbook()
    worksheet = workbook.active

    for row, values in enumerate(rows, 1):
        for column, value in enumerate(values, 1):
            cell = worksheet.cell(row=row, column=column)
            cell.value = value

    workbook.save(buffer)
    buffer.seek(0)

    return buffer


def serialize_to_csv(rows: Iterable[Iterable[str]], delimiter: str = ";") -> BytesIO:
    buffer = StringIO()
    writer = csv.writer(buffer, delimiter=delimiter)

    for row in rows:
        writer.writerow(row)

    buffer.seek(0)
    return BytesIO(buffer.read().encode("utf-8"))
