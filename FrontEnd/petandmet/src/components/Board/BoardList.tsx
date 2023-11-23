import { Button, Typography, FormControl,
         InputLabel, MenuItem, Box } from '@mui/material'
import List from 'containers/components/List'
import { useNavigate } from 'react-router-dom'
import { useCenterStore } from 'hooks/Center/CenterMutation'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import { useBoardList, Credential, Detail } from 'hooks/Board/useBoardList'
import { useAccessToken } from 'hooks/useAccessToken'

interface BoardList {
  type: string
  boards: Detail[]
  total: number
}

function BoardList() {
  const [title, setTitle] = useState('')
  const {centerUuid} = useAccessToken()
  const [boardList, setBoardList] = useState<BoardList>({
    type: '',
    total: 0,
    boards: [
      {
        id: 0,
        user_uuid: '',
        center_uuid: '',
        user_name: '',
        center_name: '',
        title: '',
        content: '',
        created_at: '',
        update_at: '',
      },
    ],
  })
  const [credential, setCredential] = useState<Credential>({
    center_uuid: '',
    type: location.pathname.split('/')[2],
    page: 0,
    size: 10,
  })
  const { data, refetch } = useBoardList(credential)
  const [center, setCenter] = useState('')
  const centers = useCenterStore()
  let navigate = useNavigate()

  useEffect(() => {
    centers.getCentersData()
    // .finally(() => {
    //   centers.setAllCenter({ uuid: '', name: '전체' })
    // })
  }, [])
  useEffect(() => {
    if (data) {
      setBoardList(prevBoardList => ({
        ...prevBoardList,
        boards: data.boards,
        total: data.total,
      }))
    }
  }, [data])
  useEffect(() => {
    refetch()
  }, [credential])

  useEffect(() => {
    const temp = location.pathname.split('/')[2]
    handleType(temp)
    switch (temp) {
      case 'adopt':
        setTitle('입양 후기')
        break
      case 'notice':
        setTitle('공지 사항')
        break
      case 'support':
        setTitle('후원 후기')
        break
      case 'qna':
        setTitle('Q & A 게시판')
        break
    }
  }, [location.pathname])

  const goToCreateForm = () => {
    navigate(`/board/${boardList.type}/write`)
  }
  //선택된 보호소 정보 가져오는 상태, 함수
  const handleChange = (value: string) => {
    setCenter(value)
  }

  const handleCenterUuid = (value: string) => {
    setCredential(prevCredential => ({
      ...prevCredential,
      center_uuid: value,
    }))
  }
  const handleType = (value: string) => {
    setBoardList(prevBoardList => ({
      ...prevBoardList,
      type: value,
    }))
    setCredential(prevCredential => ({
      ...prevCredential,
      type: value,
    }))
  }

  const handleSize = (value: number) => {
    setCredential(prevCredential => ({
      ...prevCredential,
      size: value,
    }))
  }

  const handlePage = (value: number) => {
    setCredential(prevCredential => ({
      ...prevCredential,
      page: value,
    }))
  }

  return (
    <>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          style={{ color: '#FFA629', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-start', ml: '11.4%'}}>
            <FormControl sx={{ width: '250px' }}>
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
          </Box>
        <List
          list={boardList}
          setPage={handlePage}
          setSize={handleSize}
          page={credential.page}
          size={credential.size}
        ></List>
      </div>
      <Box sx={{ textAlign: 'end',  mr: '12.5%' }}>
      {centerUuid !== null || boardList.type !== 'notice' ? (
        <Button
          sx={{
            bgcolor: '#FFBC5F',
            color: 'white',
            '&:hover': {
              bgcolor: 'orange', // Change the hover color to orange
            },
          }}
          onClick={goToCreateForm}
        >
          작성
        </Button>
      ) : null}
      </Box>
    </>
  )
}

export default BoardList
