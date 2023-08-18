import { Box, Button, Container, Typography } from '@mui/material'
import BoardEdit from 'containers/components/BoardEdit'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useBoardEdit, EditCredential } from 'hooks/Board/useBoardEdit'

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
  const data = location.state as Detail
  const boardEdit = useBoardEdit()

  const [editCredential, setEditCredential] = useState<EditCredential>({
    id: data.id,
    type: location.pathname.split('/')[2],
    user: data.user_uuid,
    center: data.center_uuid,
    title: data.title,
    content: data.content,
  })

  useEffect(() => {
    const type = location.pathname.split('/')[2]
    switch (type) {
      case 'adopt':
        setTitle('입양 후기 수정')
        break
      case 'notice':
        setTitle('공지 사항 수정')
        break
      case 'support':
        setTitle('후원 후기 수정')
        break
      case 'qna':
        setTitle('Q & A 수정')
        break
    }
  }, [location.pathname])

  const goToBack = () => {
    navigate(-1)
  }

  const handleEdit = async () => {
    await boardEdit.mutateAsync(editCredential)
    navigate(`/board/${location.pathname.split('/')[2]}/list`)
  }

  const handleTitle = (value: string) => {
    setEditCredential(prevEditCredential => ({
      ...prevEditCredential,
      title: value,
    }))
  }

  const handleContent = (value: string) => {
    setEditCredential(prevEditCredential => ({
      ...prevEditCredential,
      content: value,
    }))
  }

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

        <BoardEdit
          data={data}
          setTitle={handleTitle}
          setContent={handleContent}
        ></BoardEdit>

        <Box sx={{ textAlign: 'right', width: '88%' }}>
          <Button
            sx={{
              backgroundColor: '#1E90FF',
              '&:hover': { backgroundColor: '#4FC3F7' },
              color: 'black',
            }}
            onClick={handleEdit}
          >
            확인
          </Button>

          <Button
            sx={{
              backgroundColor: '#FF0044',
              '&:hover': { backgroundColor: '#FA8072' },
              color: 'black',
            }}
            onClick={goToBack}
          >
            취소
          </Button>
        </Box>
      </Container>
    </>
  )
}
export default AdoptDetail
export {}
