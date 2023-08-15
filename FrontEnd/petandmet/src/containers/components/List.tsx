import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Container } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface CenterBoard {
  id: number
  user_uuid: string
  center_uuid: string
  user_name: string
  center_name: string
  title: string
  content: string
  created_at: string
  update_at: string
}

interface Column {
  id: 'id' | 'title' | 'user_name' | 'created_at' | 'update_at'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'id', label: '번호', minWidth: 170 },
  { id: 'title', label: '제목', minWidth: 100 },
  {
    id: 'user_name',
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
]

const formatDate = (dateString: string | number) => {
  const date = new Date(dateString)
  const currentDate = new Date()

  const offsetHours = 9
  const adjustedDate = new Date(date.getTime() + offsetHours * 60 * 60 * 1000)

  if (
    adjustedDate.getFullYear() === currentDate.getFullYear() &&
    adjustedDate.getMonth() === currentDate.getMonth() &&
    adjustedDate.getDate() === currentDate.getDate()
  ) {
    return adjustedDate.toLocaleTimeString()
  } else {
    return `${adjustedDate.getFullYear()}.${(adjustedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${adjustedDate.getDate().toString().padStart(2, '0')}`
  }
}

const formatTime = (dateString: string | number) => {
  const date = new Date(dateString)
  const offsetHours = 9
  const adjustedDate = new Date(date.getTime() + offsetHours * 60 * 60 * 1000)
  return adjustedDate.toLocaleTimeString()
}

interface BoardList {
  type: string
  boards: CenterBoard[]
  total: number
}
interface Test {
  list: BoardList
  size: number
  page: number
  setPage: (page: number) => void
  setSize: (size: number) => void
}

function List({ list, setPage, setSize, size, page }: Test) {
  const boards = list.boards
  const type = list.type
  // const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const navigate = useNavigate()

  const navigateDetail = (id: number, detail: CenterBoard) => {
    navigate(`/board/${type}/detail/${id}`, { state: detail })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value)
    setRowsPerPage(value)
    setPage(0)
    setSize(value)
  }

  return (
    <>
      <Container>
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
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
                {boards.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => navigateDetail(row.id, row)}
                    >
                      {columns.map(column => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {/* {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value} */}
                            {column.id === 'id'
                              ? index + 1
                              : column.id === 'created_at'
                              ? formatDate(value)
                              : column.id === 'update_at'
                              ? formatTime(value)
                              : column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={list.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  )
}

export default List
export {}
