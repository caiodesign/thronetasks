import React from "react";

// Define the shared type alias for columns
type Columns = string[];

// Use the shared Columns type in both TableHeadProps and TableProps
interface TableHeadProps {
  columns: Columns;
}

function TableHead({ columns }: TableHeadProps) {
  return (
    <tr>
      <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
          />
        </div>
      </th>
      {columns.map((title, i) => (
        <th
          key={`${title}-${i}`}
          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 capitalize"
          scope="col"
        >
          {title}
        </th>
      ))}
    </tr>
  );
}

interface TableProps {
  children: React.ReactNode;
  columns: Columns;
}

export default function Table({ children, columns }: TableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <TableHead columns={columns} />
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {children}
      </tbody>
    </table>
  );
}
