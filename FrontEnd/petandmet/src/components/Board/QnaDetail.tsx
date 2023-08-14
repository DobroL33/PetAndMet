import { Box, Button, Container, Typography,
         TextField, Grid} from '@mui/material'
import BoardDetail from 'containers/components/BoardDetail'
import { useState } from 'react'
import CommentList from 'containers/components/CommentList'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useAccessToken } from 'hooks/useAccessToken'
import axios from 'axios'
import { domain } from 'hooks/customQueryClient'

function QnaDetail() {
  const [comment, setComment] = useState<string>('')
  const [commentList, setCommentList] = useState<string[]>([])
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
      await axios.delete(`${domain}/board/qna/${numericId}`,
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
  
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = () => {
    setCommentList(prevComments => [...prevComments, comment])
    setComment('')
  }
  let navigate = useNavigate()

  const goToBack =() => {
    navigate(-1)
  }

  const [edit, setEdit] = useState(false)

  const handleEdit = () =>{
    setEdit(!edit)
  }
  const goToUpdate= () =>{
    handleEdit
    navigate(`/comm/qna/detail/update/${params.id}`, {state: board})
  }

  return (
    <>
      <Container>

        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            Q & A 게시글
          </Typography>
        </div>

        <BoardDetail board={board}></BoardDetail>

        <Container sx={{ width: '80%' }}>
          <CommentList commentList={commentList}></CommentList>
        </Container>

        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item xs={6}>
            <TextField
              id="comment" placeholder="댓글을 입력하세요"
              sx={{ width: '100%' }} onChange={handleCommentChange}
              value={comment}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              sx={{
                '&:hover': { backgroundColor: '#4FC3F7' },
                backgroundColor: '#1E90FF', color: 'black'
              }}
              onClick={handleCommentSubmit}
            >
              등록
            </Button>
          </Grid>
        </Grid>

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
export default QnaDetail
export {}
