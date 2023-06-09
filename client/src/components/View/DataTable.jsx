import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { defaulData } from "../utils/defaulData";
import classNames from "classnames";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

const funFilter = (row, columnId, filterValue, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue);

  addMeta({ itemRank });

  return itemRank.passed;
};

const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
  const [value, setValue] = useState(keyWord);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const DataTable = () => {
  const [data, setData] = useState(defaulData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

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
      enableSorting: false,
    },

    {
      accessorKey: "actions",
      header: "Acciones",
      cell: (info) => {
        return (
          <div className="space-x-2">
            <button className="btn-sm bg-blue-400 px-4 py-1 rounded-full hover:bg-green-500">
              Editar
            </button>
            <button className="btn-sm bg-red-400 px-2 py-1 rounded-full">
              Eliminar
            </button>
          </div>
        );
        enableSorting: false;
      },
    },
  ];

  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPages = table.getRowModel().rows.length;

    const firstIndex = pageIndex * pageSize + 1;
    const finalIndex = pageIndex * pageSize + rowsPerPages;

    return {
      totalRows,
      firstIndex,
      finalIndex,
    };
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: funFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  // ? toca arreglar el placeholder, no muestra la palabra buscar --
  // ? arreglado con un className placeholder:text-gray-300

  return (
    <div className="px-6 py-4">
      <div className="my-2 flex justify-end">
        <div className="relative">
          <DebouncedInput
            type="text"
            value={globalFilter ?? " "}
            onChange={(value) => setGlobalFilter(String(value))}
            className="px-6 py-2  text-gray-600 border-2 border-gray-300 rounded-full outline-indigo-700 placeholder:text-gray-300"
            placeholder="Buscar..."
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 left-1" />
        </div>
      </div>

      <div className="overflow-auto">
        <table className="table-auto w-full min-w-[560px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-gray-300 text-gray-600 bg-gray-100 rounded "
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-5 px-4 text-left uppercase">
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames({
                          "cursor-pointer select-none justify-between":
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {{
                          asc: <BarsArrowUpIcon className="w-5 h-5" />,
                          desc: <BarsArrowDownIcon className="w-5 h-5" />,
                        }[header.column.getIsSorted()] ??
                          (header.column.getCanSort() ? (
                            <ChevronUpDownIcon className="w-5 h-5" />
                          ) : null)}
                      </div>
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
      </div>

      <div className="mt-4 med:flex items-center justify-between space-y-4 text-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white"
          >
            <ChevronDoubleLeftIcon className="w-5 h-7" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white"
          >
            <ChevronLeftIcon className="w-5 h-7" />
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
            <ChevronRightIcon className="w-5 h-7" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="text-gray-600 bg-gray-200 px1 rounded border border-gray-300 disabled:hover:bg-red-600 disabled:hover:text-white"
          >
            <ChevronDoubleRightIcon className="w-5 h-7" />
          </button>
        </div>
        <div className="text-gray-600 font-semibold">
          Registros del {getStateTable().firstIndex} al{" "}
          {getStateTable().finalIndex} de {getStateTable().totalRows} registros
        </div>
        <select
          className="text-gray-600 border border-gray-300 rounded outline-indigo-700 p-3 rounded-full"
          onChange={(e) => {
            table.setPageSize(+e.target.value);
          }}
        >
          <option value="5">5 pág.</option>
          <option value="10">10 pág.</option>
          <option value="20">20 pág.</option>
          <option value="25">25 pág.</option>
          <option value="50">50 pág.</option>
        </select>
      </div>
    </div>
  );
};

export default DataTable;
