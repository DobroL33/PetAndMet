import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface Detail {
  id: number
  user_name: string
  center_name: string
  title: string
  content: string
  created_at: string
  update_at: string
}
interface BoardProp {
  data: Detail
  setTitle: (title: string) => void
  setContent: (content: string) => void
}

function BoardEdit({ data, setTitle, setContent }: BoardProp) {
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
            defaultValue={data.title}
            placeholder={data.title}
            onChange={e => setTitle(e.target.value)}
          />

          {/* <img src={board.board_photo_url} alt={logo}></img> */}

          <TextField
            id="outlined-multiline-static"
            multiline
            defaultValue={data.content}
            placeholder={data.title}
            rows={15}
            onChange={e => setContent(e.target.value)}
          />
        </Box>
      </Container>
    </>
  )
}

export default BoardEdit
