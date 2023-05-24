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
            <tr
              key={headerGroup.id}
              className="border-b border-gray-300 text-gray-600 bg-gray-100 rounded "
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-5 px-4 text-left uppercase">
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
            <tr
              key={row.id}
              className="text-gray-600 hover:bg-slate-500  hover:text-gray-900"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300">
            {"<<"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
