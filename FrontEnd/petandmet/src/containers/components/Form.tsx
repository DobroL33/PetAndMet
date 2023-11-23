import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface InputFormProps {
  setTitle: (title: string) => void
  setContent: (content: string) => void
}

function InputForm({ setTitle, setContent }: InputFormProps) {
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
            label="제목"
            variant="outlined"
            onChange={e => {
              setTitle(e.target.value)
              // console.log(setTitle)
            }}
          />

          <TextField
            id="outlined-multiline-static"
            label="내용"
            multiline
            rows={15}
            onChange={e => {
              setContent(e.target.value)
              // console.log(setContent)
            }}
          />
          {/* <input type="file" accept='image/png, image/jpeg, image/jpg' /> */}
        </Box>
      </Container>
    </>
  )
}

export default InputForm
export {}
