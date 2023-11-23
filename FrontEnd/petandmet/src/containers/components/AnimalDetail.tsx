import {
  Container,
  Typography,
  Button,
  InputLabel,
  Box,
  TextField,
  Grid,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetAnimal, DeleteAnimal } from 'hooks/Animal/AnimalData'
import { useAccessToken } from 'hooks/useAccessToken'
import { Animal } from 'hooks/Animal/AnimalListStore'
import { useCenterDetail } from 'hooks/Center/useCenterDetail'
import { CenterStore } from 'hooks/Center/CenterDetailStore'

export default function AnimalDetail() {
  const [animalDetail, setAnimalDetail] = useState<Animal>({
    adoptionStartDate: '',
    adoptionStatus: '',
    age: 0,
    breed: '',
    centerUuid: '',
    character: '',
    enterAge: 0,
    enteredDate: '',
    findPlace: '',
    gender: '',
    name: '',
    noticeData: '',
    specie: '',
    animal_photo_url: '',
    uuid: '',
  })
  const navigate = useNavigate()
  const { animal_uuid } = useParams<{ animal_uuid: string }>()
  const { accessToken, centerUuid } = useAccessToken()
  let uuid = ''
  if (animal_uuid) {
    uuid = animal_uuid
  }
  const { data: centerDetailData, refetch: refetchCenterDetail } =
    useCenterDetail(animalDetail.centerUuid)
  const centerDetail = CenterStore()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await GetAnimal(animal_uuid, accessToken)
        if (info !== undefined) {
          const res = info.response
          console.log(res)
          setAnimalDetail(prevData => ({
            ...prevData,
            adoptionStartDate: res.adoptoins_start_date,
            adoptionStatus: res.adoption_status,
            age: res.age,
            breed: res.breed,
            centerUuid: res.center_uuid,
            character: res.character,
            enterAge: res.enter_age,
            enteredDate: res.enter_date,
            findPlace: res.find_place,
            gender: res.gender,
            name: res.name,
            noticeData: res.notice_date,
            specie: res.specie,
            animal_photo_url: res.photo_url,
            uuid: uuid,
          }))
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (
      animalDetail.centerUuid !== '' &&
      animalDetail.centerUuid !== undefined
    ) {
      refetchCenterDetail()
    }
  }, [animalDetail.centerUuid])

  const goToBack = () => {
    navigate(-1)
  }
  const goToUpdate = () => {
    navigate('/animal/update', { state: animalDetail })
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
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {animalDetail?.animal_photo_url && (
            <img
              src={animalDetail.animal_photo_url}
              alt="등록된 사진이 없습니다."
              width="100%"
            />
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
                  value={centerDetail?.centerData?.name}
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
                  value={animalDetail?.enterAge}
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
                  value={animalDetail?.findPlace}
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
                  value={animalDetail?.enterAge}
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
                  value={animalDetail?.noticeData}
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
                  value={animalDetail?.adoptionStartDate}
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
                  value={animalDetail?.adoptionStatus}
                />
              </Box>
              <Box sx={{ mt: 3.5, display: 'flex' }}>
                {centerUuid === null ? (
                  <Box sx={{ ml: 21.5 }}>
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
                ) : (
                  <Box sx={{ ml: 4.5 }}>
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
