import { Container, Typography, Button, InputLabel,
         Box, TextField, Grid } from "@mui/material";
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useNavigate, useParams } from 'react-router-dom';
import { GetAnimal, DeleteAnimal } from 'hooks/Animal/AnimalData'
import { useAccessToken } from "hooks/useAccessToken";

interface AnimalData{
      name: string| null,
      age: number| null,
      specie: string| null,
      breed: string| null,
      gender: string| null,
      character: string| null,
      find_place: string| null,
      center_uuid: string,
      enter_date: string| null,
      adoption_status: string| null,
      enter_age: number| null,
      notice_date: string| null,
      adoption_start_date: string| null,
      photo_url: string| null
    }

export default function AnimalDetail() {
  const [animalDetail, setAnimalDetail] = useState<AnimalData | null>(null); // 객체나 null로 초기화
  const navigate = useNavigate()
  const { animal_uuid } = useParams<{ animal_uuid: string }>();
  const { accessToken,  centerUuid } = useAccessToken()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await GetAnimal(animal_uuid, accessToken);
        if (info !== undefined) {
          setAnimalDetail(info.response);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  const goToBack = () => {
    navigate(-1)
  }
  const goToUpdate = () => {
    navigate('/animal/update', {state : {animalDetail, animal_uuid}})
  }
  const goToDelete = () => {
    DeleteAnimal(animal_uuid, accessToken)
    goToBack()
  }
  return (
    <Container>     
      <div style={{ padding: 20 }}>
          <Typography
              variant="h4"
              style={{ color: '#FFA629', fontWeight: 'bold' }}
              >
              동물 상세 정보 
          </Typography>
      </div> 

  <Grid container spacing={2}>
      <Grid item xs={12} md={6} sx={{ mb:5, display:'flex', alignItems:'center', justifyContent:'center'}}>
          {animalDetail?.photo_url && (
                  <img src={animalDetail.photo_url} alt="등록된 사진이 없습니다." width='100%' />
          )}            
      </Grid>

      <Grid item xs={12} md={6}>
          <Grid container spacing={2}>

              <Grid item xs={6}>
                  <Box
                      component="form"
                      sx={{
                          '& > :not(style)': { m: 1, width: '80%' },
                      }}
                      noValidate
                      autoComplete="off"
                      >
                      <TextField 
                          id="outlined-basic" 
                          label="이름" 
                          variant="outlined" 
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.name}

                          />

                      <TextField
                          id="outlined-multiline-static"
                          label="추정 나이"
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.age}
                          />
                      <TextField 
                          id="outlined-basic" 
                          label="종류" 
                          variant="outlined" 
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.specie}
                          />
                      <TextField 
                          id="outlined-basic" 
                          label="품종" 
                          variant="outlined" 
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.breed}
                          />
                      <TextField 
                          id="outlined-basic" 
                          label="성별" 
                          variant="outlined" 
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.gender}
                          />
                      <TextField 
                          id="outlined-basic" 
                          label="성격" 
                          variant="outlined" 
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.character}
                          />
                      <TextField 
                          id="outlined-basic" 
                          label="관리 보호소" 
                          variant="outlined" 
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.center_uuid}
                          />
                  </Box>   
              </Grid>
              <Grid item xs={6}>
                  <Box
                      component="form"
                      sx={{
                          '& > :not(style)': { m: 1, width: '80%' },
                      }}
                      noValidate
                      autoComplete="off"
                      >
                      <TextField 
                          id="outlined-basic" 
                          label="만료일" 
                          variant="outlined" 

                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.enter_age}
                          />
                      <TextField 
                          id="outlined-basic" 
                          label="발견 장소" 
                          variant="outlined" 

                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.find_place}
                          />  
                      <TextField
                          id="outlined-multiline-static"
                          label="만료 나이"
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.enter_age}
                          />
                      <TextField 
                          id="outlined-basic" 
                          label="공고일" 
                          variant="outlined" 

                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.notice_date}
                          /> 
                      <TextField
                          id="outlined-multiline-static"
                          label="입양 시작 날짜"

                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.adoption_start_date}
                          />
                       <TextField 
                          id="outlined-basic" 
                          label="입양 상태" 
                          variant="outlined" 
                          InputProps={{
                            readOnly: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={animalDetail?.adoption_status}
                          />
                  </Box>
                  <Box sx={{ mt: 3.5, display:'flex' }}>
                    {centerUuid === null ? (
                      <Box sx={{ml : 21.5}}>
                        <Button
                          sx={{
                            backgroundColor: '#FF0044',
                            '&:hover': { backgroundColor: '#FA8072' },
                            color: 'black'
                          }}
                          onClick={goToBack}
                          >
                          돌아가기
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{ml : 4.5}}>
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
                            marginRight: '5px',
                          }}
                          onClick={goToBack}
                        >
                          돌아가기
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: '#FF0044',
                            '&:hover': { backgroundColor: '#FA8072' },
                            color: 'black',
                          }}
                          onClick={goToDelete}
                        >
                          삭제
                        </Button>
                      </Box>
                    )}
                  </Box>
              </Grid>
          </Grid>
      </Grid>
  </Grid>
</Container>
  )
}