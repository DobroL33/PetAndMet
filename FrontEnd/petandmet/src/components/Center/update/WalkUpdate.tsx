import { useNavigate, useLocation } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  InputLabel,
  FormControl,
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'
import { PostCenterWalk, WalkStatus } from 'hooks/Center/useCenterWalk'
import { WalkDetail } from 'hooks/Center/CenterWalkStore'
import { useProfileQuery } from 'hooks/User/useGetProfile'
import { useProfile } from 'hooks/User/ProfileStore'
import { useAnimalDetail } from 'hooks/Animal/useAnimalSearch'
import { AnimalSearchStore } from 'hooks/Animal/AnimalListStore'

function WalkUpdate() {
  const postCenterWalk = PostCenterWalk()
  const navigate = useNavigate()
  const location = useLocation()
  const Data = location.state as WalkDetail
  const [changeStatus, setChangeStatus] = useState(Data.status)
  const { data: profileData, refetch: refetchProfile } = useProfileQuery(
    Data.user_uuid
  )
  const userProfile = useProfile()
  const { data: animalDetailData, refetch: refetchAnimalData } =
    useAnimalDetail(Data.animal_uuid)
  const animalDetail = AnimalSearchStore()
  console.log(profileData)
  console.log(animalDetailData)
  console.log(userProfile)
  console.log(animalDetail)

  const goToBack = () => {
    navigate(-1)
  }
  const goToUpdate = async () => {
    const updatedData: WalkStatus = {
      walk_id: Data.walk_id,
      status_result: changeStatus,
    }
    await postCenterWalk.mutateAsync(updatedData)
    navigate('/admin')
  }
  return (
    <>
      <Container>
        <div style={{ padding: 20 }}>
          <Typography
            variant="h4"
            style={{ color: '#FFA629', fontWeight: 'bold' }}
          >
            산책 허가
          </Typography>
        </div>

        <Grid>
          <Grid>
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
                label="신청 날짜"
                variant="outlined"
                defaultValue={Data.date}
                disabled
              />
              <TextField
                id="outlined-multiline-static"
                label="신청 시간"
                defaultValue={Data.time}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="동물 이름"
                variant="outlined"
                defaultValue={Data.animal_uuid}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="신청자"
                variant="outlined"
                defaultValue={userProfile.name}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="신청자 전화번호"
                variant="outlined"
                defaultValue={userProfile.phone}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="신청자 이메일"
                variant="outlined"
                defaultValue={userProfile.email}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="동물 이름"
                variant="outlined"
                defaultValue={animalDetail.name}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="동물 나이"
                variant="outlined"
                defaultValue={animalDetail.age}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="동물 종"
                variant="outlined"
                defaultValue={animalDetail.specie + '/' + animalDetail.breed}
                disabled
              />

              <FormControl sx={{ '& > *': { width: '100%' } }}>
                <InputLabel sx={{ paddingRight: 105 }}>승인 상태</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={changeStatus}
                  label="승인 상태"
                  onChange={e => setChangeStatus(e.target.value)}
                >
                  <MenuItem value="APPROVAL">승인</MenuItem>
                  <MenuItem value="PENDING">보류</MenuItem>
                  <MenuItem value="REJECTION">거절</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mt: 3.5, ml: 10 }}>
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
                }}
                onClick={goToBack}
              >
                돌아가기
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default WalkUpdate
