import { Box, Button, Container, Typography } from '@mui/material'
import BoardDetail from 'containers/components/BoardDetail'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAccessToken } from 'hooks/useAccessToken'
function AdoptDetail() {
  let navigate = useNavigate()
  
  const location = useLocation();
  const board = location.state
  const { centerUuid, userUuid } = useAccessToken()

  const goToBack =() => {
    navigate(-1)
  }
  
  return (
    <>
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            입양 후기 게시글
          </Typography>
        </div>
        <BoardDetail board={board}></BoardDetail>

        <Box sx={{ textAlign: 'right', width: '88%' }}>
          {userUuid === board.userUuid ?
          <div>
            <Button
              sx={{
                backgroundColor: '#1E90FF',
                '&:hover': { backgroundColor: '#4FC3F7' },
                color: 'black',
                marginRight: '5px',
              }}
              >
              수정
            </Button>
            <Button
              sx={{
                backgroundColor: '#FF0044',
                '&:hover': { backgroundColor: '#FA8072' },
                color: 'black',
              }}
              onClick={goToBack}
              >
              삭제
            </Button>
          </div>
          :<Button
            sx={{
              backgroundColor: '#FF0044',
              '&:hover': { backgroundColor: '#FA8072' },
              color: 'black',
            }}
            onClick={goToBack}
          >
            돌아가기
          </Button>
          }
        </Box>
      </Container>
    </>
  )
}
export default AdoptDetail
export {}
