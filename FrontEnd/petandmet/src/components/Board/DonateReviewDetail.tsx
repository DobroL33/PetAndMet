import { Box, Button, Container, Typography } from '@mui/material'
import BoardDetail from 'containers/components/BoardDetail'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useAccessToken } from 'hooks/useAccessToken'
import axios from 'axios'
import { domain } from 'hooks/customQueryClient'
import { useState, useEffect } from 'react'

function DonateDetail() {
  let navigate = useNavigate()
  
  const location = useLocation();
  const board = location.state
  const { accessToken, centerUuid, userUuid } = useAccessToken()
  const params = useParams(); // id 매개변수가 string 형식 또는 undefined일 수 있음
  
  if (params.id === undefined) {
    // id가 undefined일 경우 처리
    return <div>Loading...</div>;
  }

  const numericId = parseInt(params.id);
  
  const deleteboard = async () => {
    try{
      await axios.delete(`${domain}/board/donate/${numericId}`,
      {
        headers: {
          Authorization: accessToken ? `${accessToken}` : undefined,
        }
      }
      ).then(() =>{
        navigate(-1)
        console.log('삭제 완료', numericId)
      })
    }catch(error){
      console.log(error)
    }

  }
  
  const goToBack =() => {
    navigate(-1)
  }

  const [edit, setEdit] = useState(false)

  const handleEdit = () =>{
    setEdit(!edit)
  }
  const goToUpdate= () =>{
    handleEdit
    navigate(`/donate/review/detail/update/${params.id}`, {state: board})
  }

  return (
    <>
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            후원 후기 게시글
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
              onClick={goToUpdate}
              >
              수정
            </Button>
            <Button
              sx={{
                backgroundColor: '#FF0044',
                '&:hover': { backgroundColor: '#FA8072' },
                color: 'black',
              }}
              onClick={deleteboard}
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
export default DonateDetail
export {}
