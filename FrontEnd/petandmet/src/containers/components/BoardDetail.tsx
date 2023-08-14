import { useState, useEffect } from 'react'
import { Container, Button } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import logo from 'images/new_logo.jpg'
import { useLocation } from 'react-router-dom'

interface CenterBoard {
  id: number
  title: string
  content: string | null
  type: string
  board_photo_url: string | undefined
  created_at: string | null
  user_uuid: string
}
function BoardDetail() {
  const location = useLocation()
  const board = location.state as CenterBoard
  console.log(board)
  return (
    <>
      <Container>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '80%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={board.title}
            InputProps={{
              readOnly: true,
            }}
          />

          <img src={board.board_photo_url} alt={logo}></img>

          <TextField
            id="outlined-multiline-static"
            multiline
            defaultValue={board.content}
            rows={15}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Container>
    </>
  )
}

export default BoardDetail
export {}
