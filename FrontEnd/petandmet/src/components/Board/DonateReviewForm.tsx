import { Button, Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import InputForm from 'containers/components/Form'

function DonateForm() {
  return (
    <>
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            후원 후기 작성
          </Typography>
        </div>

        <InputForm></InputForm>

        <Box sx={{ textAlign: 'right', width: '88%' }}>
          <Button
            sx={{
              backgroundColor: '#1E90FF',
              '&:hover': { backgroundColor: '#4FC3F7' },
              color: 'black',
              marginRight: '5px',
            }}
          >
            작성
          </Button>
          <Button
            sx={{
              backgroundColor: '#FF0044',
              '&:hover': { backgroundColor: '#FA8072' },
              color: 'black',
            }}
          >
            돌아가기
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default DonateForm
export {}
