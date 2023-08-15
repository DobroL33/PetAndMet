import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
} from '@mui/material'
import Box from '@mui/material/Box'
import InputForm from 'containers/components/Form'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useCenterStore } from 'hooks/Center/CenterMutation'
import { useBoardWrite, Board } from 'hooks/Board/useBoardWrite'
import { useAccessToken } from 'hooks/useAccessToken'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

function BoardForm() {
  const [center, setCenter] = useState('')
  const [board, setBoard] = useState<Board>({
    title: '',
    content: '',
    type: '',
    user_uuid: '',
    center_uuid: '',
  })
  const [title, setTitle] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const centers = useCenterStore()
  const { userUuid } = useAccessToken()
  const boardWrite = useBoardWrite()

  useEffect(() => {
    centers.getCentersData()
  }, [])
  useEffect(() => {
    handleUserUuid(userUuid)
  }, [userUuid])
  useEffect(() => {
    const type = location.pathname.split('/')[2]
    handleType(type)
    switch (type) {
      case 'adopt':
        setTitle('입양 후기 작성')
        break
      case 'notice':
        setTitle('공지 사항 작성')
        break
      case 'support':
        setTitle('후원 후기 작성')
        break
      case 'qna':
        setTitle('Q & A 작성')
        break
    }
  }, [location.pathname])

  const ReviewPost = async () => {
    if (board.center_uuid === '') {
      toast.error('보호소를 선택해 주세요')
      return
    }
    if (board.title === '') {
      toast.error('제목을 작성해주세요')
    }
    if (board.content === '') {
      toast.error('내용을 작성해주세요')
    }
    await boardWrite.mutateAsync(board, {
      onSuccess: () => {
        goToBack()
      },
    })
  }
  const goToBack = () => {
    navigate(-1)
  }
  //선택된 보호소 정보 가져오는 상태, 함수
  const handleChange = (value: string) => {
    setCenter(value)
  }
  const handleCenterUuid = (value: string) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      center_uuid: value,
    }))
  }
  const handleTitle = (value: string) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      title: value,
    }))
  }
  const handleContent = (value: string) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      content: value,
    }))
  }
  const handleUserUuid = (value: string | null) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      user_uuid: value,
    }))
  }
  const handleType = (value: string) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      type: value,
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
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <FormControl sx={{ width: '25%' }}>
            <InputLabel id="demo-simple-select-label">보호소</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={center}
              label="보호소"
              onChange={e => handleChange(e.target.value)}
            >
              {centers.centersData.map((cent: any) => (
                <MenuItem
                  key={cent.uuid}
                  value={cent.uuid}
                  onClick={() => handleCenterUuid(cent.uuid)}
                >
                  {cent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <InputForm
          setTitle={handleTitle}
          setContent={handleContent}
        ></InputForm>

        <Box sx={{ textAlign: 'right', width: '88%' }}>
          <Button
            sx={{
              backgroundColor: '#1E90FF',
              '&:hover': { backgroundColor: '#4FC3F7' },
              color: 'black',
              marginRight: '5px',
            }}
            onClick={ReviewPost}
          >
            작성
          </Button>
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

export default BoardForm
