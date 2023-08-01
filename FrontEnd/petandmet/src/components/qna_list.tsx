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
import Typography from '@mui/material/Typography';

interface Column {
  id: '번호' | '제목' | '작성자' | '조회수' | '등록일';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: '번호', label: '번호', minWidth: 170 },
  { id: '제목', label: '제목', minWidth: 100 },
  {
    id: '작성자',
    label: '작성자',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: '조회수',
    label: '조회수',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: '등록일',
    label: '등록일',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  번호: string;
  제목: string | JSX.Element;
  작성자: string;
  조회수: number;
  등록일: string;
}

function createData(
  번호: string,
  제목: string | JSX.Element,
  작성자: string,
  조회수: number,
): Data {
  const currentDate: Date = new Date();
  const 등록일:string = currentDate.toISOString();
  return { 번호, 제목, 작성자, 조회수, 등록일 };
}

const rows = [
    //데이터 받아서 링크 연결하여 세부페이지 이동 예정
  createData('1', '<Link to="/">질문내용1</Link>', 'Pet & Met', 100),
  createData('2', '질문내용2', 'Pet & Met', 101),
  createData('3', '질문내용3', 'Pet & Met', 102),
  createData('4', '질문내용4', 'Pet & Met', 103),
  createData('5', '질문내용5', 'Pet & Met', 104),
  createData('6', '질문내용6', 'Pet & Met', 105),
  createData('7', '질문내용7', 'Pet & Met', 106),
  createData('8', '질문내용8', 'Pet & Met', 100),
  createData('9', '질문내용9', 'Pet & Met', 107),
  createData('10', '질문내용10', 'Pet & Met', 108),
  createData('11', '질문내용11', 'Pet & Met', 11),
  createData('12', '질문내용12', 'Pet & Met', 120),
  createData('13', '질문내용13', 'Pet & Met', 130),
  createData('14', '질문내용14', 'Pet & Met', 140),
  createData('15', '질문내용15', 'Pet & Met', 150),
];

function QnaList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <div style={{ padding: 20 }}>
        <Typography variant="h4" style={{ color: '#FFA629', fontWeight: 'bold' }}>
            Q & A 게시판
        </Typography>
    </div>

    <Container>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.번호}>
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
            count={rows.length}
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

export default QnaList
export{};