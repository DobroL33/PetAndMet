import { Box, Button, Container, Typography } from '@mui/material'
import BoardDetail from 'containers/components/BoardDetail'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAccessToken } from 'hooks/useAccessToken'
import { useBoardDelete, DeleteCredential } from 'hooks/Board/useBoardDelete'

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

function AdoptDetail() {
  const [title, setTitle] = useState('')
  let navigate = useNavigate()
  const location = useLocation()
  const { userUuid } = useAccessToken()
  const data = location.state as Detail
  const boardDelete = useBoardDelete()
  const [deleteCredential, setDeleteCredential] = useState<DeleteCredential>({
    id: data.id,
    type: location.pathname.split('/')[2],
  })

  useEffect(() => {
    const type = location.pathname.split('/')[2]
    switch (type) {
      case 'adopt':
        setTitle('입양 후기 게시글')
        break
      case 'notice':
        setTitle('공지 사항 게시글')
        break
      case 'support':
        setTitle('후원 후기 게시글')
        break
      case 'qna':
        setTitle('Q & A 게시글')
        break
    }
  }, [location.pathname])

  const goToBack = () => {
    navigate(-1)
  }

  const goToEdit = () => {
    navigate(`/board/${location.pathname.split('/')[2]}/edit/${data.id}`, {
      state: data,
    })
  }

  const handleDelete = async () => {
    await boardDelete.mutateAsync(deleteCredential)
    navigate(-1)
  }

  // const [credential] = useState<Credential>({
  //   id: Number(
  //     location.pathname.split('/')[location.pathname.split('/').length - 1]
  //   ),
  //   type: location.pathname.split('/')[2],
  // })
  // const { data } = useBoardDeatil(credential)

  return (
    <>
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            {title}
          </Typography>
        </div>

        <BoardDetail detail={data}></BoardDetail>

        <Box sx={{ textAlign: 'right', width: '88%' }}>
          {userUuid === data.user_uuid ? (
            <>
              <Button
                sx={{
                  backgroundColor: '#1E90FF',
                  '&:hover': { backgroundColor: '#4FC3F7' },
                  color: 'black',
                }}
                onClick={goToEdit}
              >
                수정
              </Button>
              <Button
                sx={{
                  backgroundColor: '#FF0044',
                  '&:hover': { backgroundColor: '#FA8072' },
                  color: 'black',
                  marginX: '5px',
                }}
                onClick={handleDelete}
              >
                삭제
              </Button>
            </>
          ) : null}
          <Button
            sx={{
              backgroundColor: '#FF0044',
              '&:hover': { backgroundColor: '#FA8072' },
              color: 'black',
            }}
            onClick={goToBack}
          >
            돌아가기
          </Button>
        </Box>
      </Container>
    </>
  )
}
export default AdoptDetail
export {}
