import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import { Duck } from "../../features/ducks/ducksSlice";
import { Rabbit } from "../../features/rabbits/rabbitsSlice";
import TextField from "@mui/material/TextField";



interface TableProps {
  data: Duck[] | Rabbit[];
  add:(obj:Duck|Rabbit|{})=>void;
}

const BasicTable: React.FC<TableProps> = ({ data ,add}) => {
  const coulmns = data[0] ? Object.keys(data[0]) : null;
  const [plusRow, setPlusRow] = useState({});

  useEffect(() => {
    console.log(plusRow);
    setPlusRow({});
  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {coulmns
                ? coulmns.map((value) => (
                    <TableCell key={value} align="center">
                      {value}
                    </TableCell>
                  ))
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((value) => (
                  <TableCell key={value} align="center">
                    {row[value as keyof typeof row]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow
              key={"PLUS"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {coulmns
                ? coulmns.map((value) => (
                    <TableCell key={value} align="center">
                      <TextField
                      disabled={value=="id"}
                        style={{ width: "100px" }}
                        size="small"
                        type="text"
                        id={value}
                        value={
                          plusRow[value as keyof typeof plusRow]
                            ? plusRow[value as keyof typeof plusRow]
                            : ""
                        }
                        onChange={(e) =>
                          setPlusRow({ ...plusRow, [value]: e.target.value })
                        }
                      />
                    </TableCell>
                  ))
                : null}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={() => add(plusRow)}>adddd</button>
    </>
  );
};

export default BasicTable;
