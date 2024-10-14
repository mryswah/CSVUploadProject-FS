import React from "react";

const TableRow: React.FC<{ row: any }> = ({ row }) => {
  return (
    <tr>
      {Object.values(row).map((value: any, columnIndex: number) => (
        <td key={columnIndex}>{value}</td>
      ))}
    </tr>
  );
};

export default TableRow;
