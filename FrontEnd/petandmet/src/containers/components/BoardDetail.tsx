import { Container, Button } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface BoardDetailProps {
  board: {
    title: string;
    photoUrl: string;
    content: string;
  };
}
function BoardDetail({board}:BoardDetailProps) {
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

          <img src={board.photoUrl} alt=''></img>

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