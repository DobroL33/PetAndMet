import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface Detail {
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
interface BoardProp {
  detail: Detail
}

function BoardDetail(board: BoardProp) {
  const data = board.detail
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
            // value={data?.response.board.title || ''}
            value={data.title}
            InputProps={{
              readOnly: true,
            }}
          />

          {/* <img src={board.board_photo_url} alt={logo}></img> */}

          <TextField
            id="outlined-multiline-static"
            multiline
            // defaultValue={data?.response.board.content || ''}
            defaultValue={data.content}
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
