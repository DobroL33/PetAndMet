import {Button, Typography, FormControl,
  InputLabel, MenuItem, Container } from '@mui/material'
import Box from '@mui/material/Box'
import InputForm from 'containers/components/Form'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { domain } from 'hooks/customQueryClient'
import { idCountStore } from 'hooks/Board/BoardIdCountMutation'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useCenterStore} from 'hooks/Center/CenterMutation'

function QnaForm() {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlZmY1MDJhMS0zNzYyLTRjOTctODRhZi1kZDQ1MjFjMzgzNDMiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkxOTExNzczfQ.Kk21RTh3Z_yuLR7lZD_IFystHkAVXc0tVKztjOn4tKT940AvalAw8XH7o82YnHNxUEuOk7cbsGHc3JHpzMXvyQ"

  
  let navigate = useNavigate()
  const goToBack =() => {
    navigate(-1)
  }

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const {id, increaseId} = idCountStore()
  const [board, setBoard] = useState({
    id: id.toString(),
    title : "",
    content : "",
    type : 'qna',
    created_at : "",
    updated_at : "",
    user_uuid : 'eff502a1-3762-4c97-84af-dd4521c38343',
    center_uuid : null,
    board_photo_url : "",
  })

  const ReviewPost =async () => {
    try{
      const updatedBoard = {
        ...board,
        title: title,
        content: content,
        center_uuid : uid,
      }
      console.log(updatedBoard)
      await axios.post(`${domain}/board/qna`, updatedBoard,
      {
        headers: {
          Authorization: `Bearer ${token}` ,
        },
      }
      )
      .then((res) =>{
        console.log('등록 완료 ', res)
        increaseId()
        navigate(-1)
      })
      .catch((error) =>{
        console.log(error)
      })
    } catch(error){
      console.log(error)
    }
  }

  const centers = useCenterStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      centers.getCentersData()
        .finally(() => {
          setIsLoading(false);
        });
    }, []);

  //선택된 보호소 정보 가져오는 상태, 함수
  const [center, setCenter] = useState("")
  const handleChange = (event: SelectChangeEvent) => {
    setCenter(event.target.value)
  }
  //선택된 보호소 uuid 담는 state
  const [uid, setUid] = useState("")

  return (
    <>
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            Q & A 작성
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
              onChange={handleChange}
              >
              {centers.centersData.map((cent:any) => (
                <MenuItem value={cent.uuid} onClick={() => setUid(cent.uuid)}>{cent.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <InputForm setTitle={setTitle} setContent={setContent}></InputForm>

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

export default QnaForm
export {}
