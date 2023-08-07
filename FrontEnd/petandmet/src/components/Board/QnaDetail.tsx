import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
} from '@mui/material'
import BoardDetail from 'containers/components/BoardDetail'
import { useState } from 'react'
import CommentList from 'containers/components/CommentList'
function QnaDetail() {
  const [comment, setComment] = useState<string>('')
  const [commentList, setCommentList] = useState<string[]>([])

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = () => {
    setCommentList(prevComments => [...prevComments, comment])
    setComment('')
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
        <BoardDetail></BoardDetail>

        <Container sx={{ width: '80%' }}>
          <CommentList commentList={commentList}></CommentList>
        </Container>

        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item xs={6}>
            <TextField
              id="comment"
              placeholder="댓글을 입력하세요"
              sx={{ width: '100%' }}
              onChange={handleCommentChange}
              value={comment}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              sx={{
                backgroundColor: '#1E90FF',
                '&:hover': { backgroundColor: '#4FC3F7' },
                color: 'black',
              }}
              onClick={handleCommentSubmit}
            >
              등록
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'right', width: '88%' }}>
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
          >
            돌아가기
          </Button>
        </Box>
      </Container>
    </>
  )
}
export default QnaDetail
export {}
