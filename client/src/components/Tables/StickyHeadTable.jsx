import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

const columns = [
  { id: 'contest', label: 'Contest Name', minWidth: 200 },
  { id: 'rank', label: 'Rank', minWidth: 80 },
  {
    id: 'oldRate',
    label: 'Old Rating',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'newRate',
    label: 'New Rating',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

];

function createData(contest, rank, oldRate, newRate) {
  return { contest, rank, oldRate, newRate };
}

// const rows = [
//   // createData('India', 'IN', 1324171354, 3287263),
// ];



export default function StickyHeadTable() {

  const { contest } = useSelector((state) => state.contest || {});

  console.log("IN TABLE:", contest );

  const rows = Array.isArray(contest) ? contest.map((item) => createData(item.contestName, item.rank, item.oldRating, item.newRating)) : [];


  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height:'100%', bgcolor:"#24242E", paddingLeft:"1vw", paddingRight:"1vw" }}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor:"#24242E", color:"white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell sx={{color:"white", border:"none"}} key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{color:"white"}}
      />
    </Paper>
  );
}
