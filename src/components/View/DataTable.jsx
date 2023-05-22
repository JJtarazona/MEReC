import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { defaulData } from "../utils/defaulData";

function DataTable() {
  const [data, setData] = useState(defaulData);

  const columns = [
    {
      accessorKey: "id",
    },
    {
      accessorKey: "date_rel",
    },
    {
      accessorKey: "name_user",
    },
    {
      accessorKey: "type_doc",
    },
    {
      accessorKey: "number_doc",
    },
    {
      accessorKey: "eps",
    },
    {
      accessorKey: "number_auto",
    },
    {
      accessorKey: "date_auto",
    },
    {
      accessorKey: "date_venci",
    },
    {
      accessorKey: "copago",
    },
    {
      accessorKey: "recibo",
    },
    {
      accessorKey: "Servicio",
    },
    {
      accessorKey: "date_start_tera",
    },
    {
      accessorKey: "date_end_tera",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="px-6 py-4">
      <table className="table-auto w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
