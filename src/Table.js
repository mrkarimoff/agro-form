import React, { useEffect, useState } from "react";

export default function Table({ data, totals, deleteRow, tableLangDate }) {
  const [delIndex, setDelIndex] = useState("");

  useEffect(() => {
    deleteRow(delIndex);
  }, [delIndex]);

  return (
    <div className="table-responsive pt-4">
      <table style={{ fontSize: "18px" }} className="table table-bordered">
        <thead>
          <tr className="table table-dark">
            {tableLangDate?.columns?.map((column, index) => (
              <th key={index} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{item.customerName?.name}</td>
              <td>{item.vegetableName?.name}</td>
              <td className="text-end">{Number(item.qtyNumber).toFixed(2)}</td>
              <td>{item.firstUnit?.name}</td>
              <td className="text-end">{Number(item.rateNumber).toFixed(2)}</td>
              <td className="text-end">{Number(item.kgOrUnit).toFixed(2)}</td>
              <td className="text-end">
                {Number(
                  Math.round(
                    Number(item.qtyNumber) * Number(item.rateNumber) * Number(item.kgOrUnit) + "e6"
                  ) + "e-6"
                )}
              </td>
              <td>
                <button onClick={() => setDelIndex(index)} className="btn btn-danger">
                  {tableLangDate?.delBtn}
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <th className="text-center" colSpan="3" scope="row">
              {tableLangDate?.totalCol}
            </th>
            <td className="text-end">{totals?.qtys.reduce((a, b) => a + b, 0).toFixed(2)}</td>
            <td className="text-center">-</td>
            <td className="text-end">{totals?.rates.reduce((a, b) => a + b, 0).toFixed(2)}</td>
            <td className="text-end">{totals?.kgOrUnits.reduce((a, b) => a + b, 0).toFixed(2)}</td>
            <td className="text-end">
              {Number(Math.round(totals?.amounts.reduce((a, b) => a + b, 0) + "e6") + "e-6")}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
