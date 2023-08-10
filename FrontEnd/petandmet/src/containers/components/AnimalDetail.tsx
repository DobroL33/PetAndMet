import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import { Button, Container, Grid } from '@mui/material'
import logo from 'images/logo.png'
import { styled } from '@mui/material/styles'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function createData(
  photo_url : string | null,
  center_uuid: string | null,
  name: string | null,
  adoption_status: string | null,
  character: string | null,
  breed: string | null,
  specie: string | null,
  gender: string | null,
  find_place: string | null,
  enter_date: string | null,
  notice_date: string | null,
  adoption_start_date: string | null,
  age: number | null
) {
  return {
    photo_url, center_uuid, name, adoption_status, character,
    breed, specie, gender, find_place,
    enter_date,notice_date, adoption_start_date, age,
  }
}

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFA629',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'orange',
  },
  margin: '5px',
}))

export default function AnimalDetail() {
  const [animalDetail, setAnimalDetail] = useState<AnimalData | null>(null); // 객체나 null로 초기화
  const navigate = useNavigate()
  const { animal_uuid } = useParams<{ animal_uuid: string }>();
  // 동물 UUID 값을 가져옴
  if (!animalDetail) {  // animalDetail이 비어있을 때만 요청
    axios.get(`https://i9b302.p.ssafy.io/api/v1/animal/detail?uuid=${animal_uuid}`)
      .then((response) => {

        setAnimalDetail(response.data.response);
        console.log(animalDetail)

      })
      .catch((error) => {
        console.log('오류')
        console.log(error);
      });
  }
  // console.log(animalDetail)

  axios.get('https://i9b302.p.ssafy.io/api/v1/user')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })




  const goToBack =() => {
    navigate(-1)
  }


  type AnimalData = ReturnType<typeof createData>

  return (
    <Container sx={{mt : 10}}>
      <Grid sx={{display:'flex', justifyContent:'center', mb: 3}}>
        {animalDetail && animalDetail.photo_url && (
          <img src={animalDetail.photo_url} alt={logo} />
        )}
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
        <Table sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
          <TableBody>
            <TableCell sx={{ backgroundColor: '#FFBC5F', width: '20%' }}>
              <TableRow>관리 보호소</TableRow>
              <hr />
              <TableRow>이름</TableRow>
              <hr />
              <TableRow>입양 상태</TableRow>
              <hr />
              <TableRow>성격</TableRow>
              <hr />
              <TableRow>품종</TableRow>
              <hr />
              <TableRow>종류</TableRow>
            </TableCell>
            {animalDetail && ( // 객체가 존재할 때만 렌더링
              <TableCell sx={{ width: '30%' }}>
                <TableRow>{animalDetail.center_uuid}</TableRow>
                <hr />
                <TableRow>{animalDetail.name}</TableRow>
                <hr />
                <TableRow>{animalDetail.adoption_status}</TableRow>
                <hr />
                <TableRow>{animalDetail.character}</TableRow>
                <hr />
                <TableRow>{animalDetail.breed}</TableRow>
                <hr />
                <TableRow>{animalDetail.specie}</TableRow>
                <hr />
              </TableCell>
            )}

            <TableCell sx={{ backgroundColor: '#FFBC5F', width: '20%' }}>
              <TableRow>성별</TableRow>
              <hr />
              <TableRow>발견 장소</TableRow>
              <hr />
              <TableRow>만료일</TableRow>
              <hr />
              <TableRow>공고일</TableRow>
              <hr />
              <TableRow>입양 시작 가능 일시</TableRow>
              <hr />
              <TableRow>나이 (추정)</TableRow>
            </TableCell>
            {animalDetail && (
              <TableCell sx={{ width: '30%' }}>
                <TableRow>{animalDetail.gender}</TableRow>
                <hr />
                <TableRow>{animalDetail.find_place}</TableRow>
                <hr />
                <TableRow>{animalDetail.enter_date}</TableRow>
                <hr />
                <TableRow>{animalDetail.notice_date}</TableRow>
                <hr />
                <TableRow>{animalDetail.adoption_start_date}</TableRow>
                <hr />
                <TableRow>{animalDetail.age}</TableRow>
                <hr />
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid sx={{ margin: '30px'}}>
        <CustomButton onClick={goToBack}>사용자 - 돌아가기</CustomButton>
        <CustomButton>관리자 - 작성 & 수정</CustomButton>
        <CustomButton>관리자 -삭제</CustomButton>
      </Grid>
    </Container>
  )
}
