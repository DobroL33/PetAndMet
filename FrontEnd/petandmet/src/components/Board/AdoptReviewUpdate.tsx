import {Button, Typography, Container } from '@mui/material'
import Box from '@mui/material/Box'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { domain } from 'hooks/customQueryClient'
import { useAccessToken } from "hooks/useAccessToken";
import UpdateInputForm from 'containers/components/UpdateForm'

interface BoardType {
  message: string;
  status: string;
  id: number | null;
  userUuid: string;
  centerUuid: string;
  content: string;
  createdAt: string;
  photoUrl: string;
  title: string;
  type: string;
  updatedAt: string | null;
}

function AdoptUpdate() {
const { accessToken, centerUuid, userUuid } = useAccessToken()
const location = useLocation();
const updateboard: BoardType = location.state as BoardType;
console.log(updateboard)

let navigate = useNavigate()
const goToBack =() => {
navigate(-1)
}

const [title, setTitle] = useState(updateboard.title)
const [content, setContent] = useState(updateboard.content)
const [image, setImage] = useState(updateboard.photoUrl)
const params = useParams();
  
  if (params.id === undefined) {
    return <div>Loading...</div>;
  }

  const numericId = parseInt(params.id);
// const imageInputRef = useRef<HTMLInputElement | null>(null);

const [loadImg, setLoadImg] = useState(updateboard.photoUrl)
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
id: params.id,
title : "",
content : "",
type : 'adopt',
created_at : "",
updated_at : "",
user_uuid : userUuid,
center_uuid : null,
board_photo_url : "",
})

const ReviewPatch =async () => {
try{
  const updatedBoard = {
    ...board,
    title: title,
    content: content,
    center_uuid : board.center_uuid,
    board_photo_url : loadImg
  }

  console.log(updatedBoard)

  await axios.patch(`${domain}/board/adopt`, updatedBoard,
  {
    headers: {
      Authorization: `${accessToken}` ,
    },
  }
  )
  .then((res) =>{
    console.log('등록 완료 ', res)
    // increaseId()
    navigate('/adoptreview')
  })
  .catch((error) =>{
    console.log(error)
  })
} catch(error){
  console.log(error)
}
}

return (
<>
  <Container>
    <div style={{ padding: 20 }}>
      <Typography
        variant="h4"
        style={{ color: '#FFA629', fontWeight: 'bold' }}
      >
        입양 후기 수정
      </Typography>
    </div>
    <UpdateInputForm 
        setTitle={setTitle} 
        setContent={setContent} 
        handleImageChange={handleImageChange}
        title={title}
        content={content}
        image={image}
        ></UpdateInputForm>
            <img src={loadImg} alt='등록된 사진이 없습니다.'></img>
    <Box sx={{ textAlign: 'right', width: '88%' }}>
      <Button
        sx={{
          backgroundColor: '#1E90FF',
          '&:hover': { backgroundColor: '#4FC3F7' },
          color: 'black',
          marginRight: '5px',
        }}
        onClick={ReviewPatch}
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

export default AdoptUpdate
export {}
