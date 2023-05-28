import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { defaulData } from "../utils/defaulData";
import classNames from "classnames";
import { rankItem } from "@tanstack/match-sorter-utils";

const funFilter = (row, columnId, filterValue, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue);

  addMeta({ itemRank });

  return itemRank.passed;
};

function DataTable() {
  const [data, setData] = useState(defaulData);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    {
      accessorKey: "id",
      header: () => <span>#</span>,
    },
    {
      accessorKey: "date_rel",
      header: () => <span>Día Relación</span>,
    },
    {
      accessorKey: "name_user",
      header: () => <span>Nombre Usuario</span>,
    },
    {
      accessorKey: "type_doc",
      header: () => <span>Tipo de Documento</span>,
    },
    {
      accessorKey: "number_doc",
      header: () => <span># de documento</span>,
    },
    {
      accessorKey: "eps",
      header: () => <span>EPS</span>,
    },
    {
      accessorKey: "number_auto",
      header: () => <span># Autorización</span>,
    },
    {
      accessorKey: "date_auto",
      header: () => <span>Día Autorización</span>,
    },
    {
      accessorKey: "date_venci",
      header: () => <span>Día Vencimiento</span>,
    },
    {
      accessorKey: "copago",
      header: () => <span>Copago</span>,
    },
    {
      accessorKey: "recibo",
      header: () => <span># Recibo</span>,
    },
    {
      accessorKey: "Servicio",
      header: () => <span>Servicio/s</span>,
    },
    {
      accessorKey: "date_start_tera",
      header: () => <span>Inicio Terapia</span>,
    },
    {
      accessorKey: "date_end_tera",
      header: () => <span>Fin de Terapias</span>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: funFilter,
  });

  // todo toca arreglar el placeholder, no muestra la palabra buscar

  return (
    <div className="px-6 py-4 text-center">
      <div className="my-2 text-right">
        <input
          type="text"
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 text-gray-600 border-2 border-gray-300 rounded-full outline-indigo-700"
          placeholder="Buscar"
        />
      </div>

      <table className="table-auto w-full ">
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
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white"
          >
            {"<"}
          </button>

          {table.getPageOptions().map((value, key) => (
            <button
              key={key}
              className={classNames({
                "text-gray-600 bg-gray-200 py-0.5 px-2 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white": true,
                "bg-indigo-200 text-indigo-700":
                  value === table.getState().pagination.pageIndex,
              })}
              onClick={() => table.setPageIndex(value)}
            >
              {value + 1}
            </button>
          ))}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white"
          >
            {">>"}
          </button>
        </div>
        <div className="text-gray-600 font-semibold">
          Mostrando de {Number(table.getRowModel().rows[0]?.id) + 1} a{" "}
          {Number(
            table.getRowModel().rows[table.getRowModel().rows.length - 1]?.id
          ) + 1}{" "}
          del total {defaulData.length} registros
        </div>
        <select
          className="text-gray-600 border border-gray-300 rounded outline-indigo-700"
          onChange={(e) => {
            table.setPageSize(+e.target.value);
          }}
        >
          <option value="10">10 pág.</option>
          <option value="20">20 pág.</option>
          <option value="25">25 pág.</option>
          <option value="50">50 pág.</option>
        </select>
      </div>
    </div>
  );
}

export default DataTable;