import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { domain } from 'hooks/customQueryClient';

interface CenterBoard {
  id: number;
  title: string;
  content: string | null;
  type: string;
  board_photo_url: string | null;
  created_at: string | null;
  user_uuid : string,
}

interface Column {
  id: 'id' | 'title' | 'user_uuid' | 'created_at';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: '번호', minWidth: 170 },
  { id: 'title', label: '제목', minWidth: 100 },
  {
    id: 'user_uuid',
    label: '작성자',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'created_at',
    label: '등록일',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface ListProps{
  Boards: CenterBoard[];
}

function List(props:ListProps) {
  const {Boards} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [getId, setGetId] = useState(-1)
  const [getType, setGetType] = useState('')

  const getid = (id: number, type: string) => {
    setGetId(id);
    setGetType(type);
  };

  useEffect(() => {
    const fetchAdoptDetail = async () => {
      try {
        const res = await axios.get(`${domain}/board/${getType}/detail?id=${getId}`);
        const adoptdetail = res.data.response.board;
        console.log(adoptdetail);
        if (getType=='adopt' || getType=='donate') {
          navigate(`/${getType}/review/detail/${getId}`, {state : adoptdetail})
        }
        else{
          navigate(`/comm/${getType}/detail/${getId}`, {state : adoptdetail})
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdoptDetail();
  }, [getId, getType]);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <Container>
        <Paper sx={{ width: '100%'}}>
        <TableContainer sx={{ maxHeight: "100%"}}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell 
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {Boards
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                        <TableRow hover role="checkbox"
                                  tabIndex={-1} 
                                  key={row.id}
                                  onClick ={() => getid(row.id, row.type)}
                                  >
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
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
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={Boards.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Container>
    </>
  );
}

export default List
export{};