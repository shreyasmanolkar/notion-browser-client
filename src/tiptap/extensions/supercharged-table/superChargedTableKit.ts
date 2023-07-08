import { AnyExtension } from "@tiptap/core";

import { Table } from "./extension-table/table";
import { TableCell } from "./extension-table-cell/tableCell";
import { TableHeader } from "./extension-table-header/tableHeader";
import { TableRow } from "./extension-table-row/tableRow";

export const SuperChargedTableExtensions: AnyExtension[] = [
  Table.configure({
    resizable: false,
  }),
  TableCell,
  TableHeader,
  TableRow,
];
