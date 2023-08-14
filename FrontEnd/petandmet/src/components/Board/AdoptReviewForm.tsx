import {Button, Typography, FormControl,
        InputLabel, MenuItem, Container } from '@mui/material'
import Box from '@mui/material/Box'
import InputForm from 'containers/components/Form'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { domain } from 'hooks/customQueryClient'
import { idCountStore } from 'hooks/Board/BoardIdCountMutation'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useCenterStore} from 'hooks/Center/CenterMutation'
import { useAccessToken } from "hooks/useAccessToken";

function AdoptForm() {
  const { accessToken, centerUuid, userUuid } = useAccessToken()
  
  let navigate = useNavigate()
  const goToBack =() => {
    navigate(-1)
  }

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const {id, increaseId} = idCountStore()
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [loadImg, setLoadImg] = useState("")
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files)
      const imgUrl = URL.createObjectURL(event.target.files[0])
      setLoadImg(imgUrl)
      console.log(imgUrl)
    }
  };
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const selectedImage = event.target.files[0];
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       setLoadImg(reader.result as string);
  //       console.log(reader.result)
  //       console.log(loadImg)
  //     };
  //     reader.readAsDataURL(selectedImage);
  //   }
  // };
  // console.log(loadImg)
  const [board, setBoard] = useState({
    id: id.toString(),
    title : "",
    content : "",
    type : 'adopt',
    created_at : "",
    updated_at : "",
    user_uuid : userUuid,
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
        board_photo_url : loadImg
      }

      console.log(updatedBoard)

      await axios.post(`${domain}/board/adopt`, updatedBoard,
      {
        headers: {
          Authorization: `${accessToken}` ,
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
            입양 후기 작성
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

        <InputForm setTitle={setTitle} setContent={setContent} handleImageChange={handleImageChange} />
                <img src={loadImg} alt='등록된 사진이 없습니다.'></img>
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

export default AdoptForm
export {}
