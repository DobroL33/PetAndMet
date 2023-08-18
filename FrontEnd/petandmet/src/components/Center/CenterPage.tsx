import { Box, Container, Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CenterAnimalList from 'components/Center/CenterAnimalList'
import CenterItemList from 'components/Center/CenterItemList'
import {
  useAnimalSearch,
  CenterUuidCredential,
} from 'hooks/Animal/useAnimalSearch'
import { useAccessToken } from 'hooks/useAccessToken'
import { useCenterLiveList } from 'hooks/Live/useLiveSearchList'
import { useCenterDetail } from 'hooks/Center/useCenterDetail'
import { useCenterItemList } from 'hooks/Item/useItemList'
import { GetCenterWalk } from 'hooks/Center/useCenterWalk'
import { CenterStore } from 'hooks/Center/CenterDetailStore'
import CenterWalk from 'components/Center/CenterWalk'

function CenterPage() {
  const navigate = useNavigate()
  const { centerUuid } = useAccessToken()

  const [credential, setCredential] = useState<CenterUuidCredential>({
    center_uuid: centerUuid,
    adoptionStatus: undefined,
    size: undefined,
  })
  const {
    data: animalData,
    refetch: refetchAnimal,
    isLoading: animalLoading,
    isSuccess: animalSuccess,
  } = useAnimalSearch(credential)
  const {
    data: liveData,
    refetch: refetchLive,
    isLoading: liveLoading,
    isSuccess: liveSuccess,
  } = useCenterLiveList(credential.center_uuid)
  const {
    data: centerData,
    refetch: refetchCenter,
    isLoading: centerLoading,
    isSuccess: centerSuccess,
  } = useCenterDetail(credential.center_uuid)
  const {
    data: itemListData,
    refetch: refetchItemList,
    isLoading: itemListLoading,
    isSuccess: itemListSuccess,
  } = useCenterItemList(credential.center_uuid)
  const {
    data: centerWalkData,
    refetch: refetchCenterWalk,
    isLoading: centerWalkLoading,
    isSuccess: centerWalkSuccess,
  } = GetCenterWalk()
  const center = CenterStore()
  const centerDetail = center.centerData

  if (
    animalLoading ||
    liveLoading ||
    centerLoading ||
    itemListLoading ||
    centerWalkLoading
  ) {
    return <div>로딩중</div>
  }

  const EnrollItem = () => {
    navigate('/admin/item/enroll')
  }
  const EnrollAnimal = () => {
    navigate('/animal/enroll')
  }
  const UpdateCenter = () => {
    navigate('/admin/update', { state: centerDetail })
  }
  return (
    <>
      <Container
        sx={{
          mt: 10,
          display: 'grid',
          width: '80%',
          height: '100%',
          borderRadius: 5,
        }}
      >
        <Grid
          container
          sx={{
            bgcolor: '#F0F0F0',
            textAlign: 'justify',
            alignItems: 'center',
            marginY: '3px',
            whiteSpace: 'nowrap',
            border: '2px solid orange',
            borderRadius: '5px',
          }}
        >
          <Grid item xs={6} sx={{ fontSize: '2rem' }}>
            <p>{centerDetail ? centerDetail.name : 'Center Name'}</p>{' '}
            {/* center가 null이 아닐 때만 name을 출력 */}
          </Grid>
          <Grid item xs={4}>
            <span>장소 : </span>
            <span>
              {centerDetail ? centerDetail.address : 'Center Address'}
            </span>
            <br />
            <span>Tel : </span>
            <span>{centerDetail ? centerDetail.phone : 'Center Phone'}</span>
            <br />
            <span>E-mail : </span>
            <span>{centerDetail ? centerDetail.email : 'Center E-mail'}</span>
          </Grid>

          <Grid item xs={2} sx={{ textAlign: 'end' }}>
            <Button onClick={UpdateCenter}>수정</Button>
          </Grid>
        </Grid>

        <Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ bgcolor: '#E5E5E5', marginY: '3px', borderRadius: '5px' }}
          >
            <Grid
              item
              xs={2}
              sx={{
                textAlign: 'justify',
                fontSize: '1.5rem',
                whiteSpace: 'nowrap',
              }}
            >
              산책 신청 현황
            </Grid>

            <Grid item xs={10} sx={{ textAlign: 'end' }}></Grid>

            <Box
              sx={{
                mb: 1,
                display: 'grid',
                gap: '8px', // 카드 간 간격 설정
                height: '90%',
              }}
            >
              <CenterWalk></CenterWalk>
            </Box>
          </Grid>
        </Grid>

        <Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ bgcolor: '#E5E5E5', marginY: '3px', borderRadius: '5px' }}
          >
            <Grid
              item
              xs={2}
              sx={{
                textAlign: 'justify',
                fontSize: '1.5rem',
                whiteSpace: 'nowrap',
                // display: 'inline-block',
              }}
            >
              보호 동물
            </Grid>

            <Grid item xs={10} sx={{ textAlign: 'end' }}>
              <Button onClick={EnrollAnimal}>등록</Button>
            </Grid>

            <Box
              sx={{
                mt: 1,
                display: 'grid',
                gap: '8px', // 카드 간 간격 설정
                height: '90%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {animalSuccess && liveSuccess ? (
                <CenterAnimalList></CenterAnimalList>
              ) : null}
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            bgcolor: '#E5E5E5',
            textAlign: 'justify',
            alignItems: 'center',
            marginY: '3px',
            borderRadius: '5px',
          }}
        >
          <Grid
            item
            xs={2}
            sx={{
              textAlign: 'justify',
              fontSize: '1.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            보호소 등록 물품
          </Grid>
          <Grid item xs={10} sx={{ textAlign: 'end' }}>
            <Button onClick={EnrollItem}>등록</Button>
          </Grid>
          <Box
            sx={{
              mt: 1,
              display: 'grid',
              gap: '8px', // 카드 간 간격 설정
              height: '90%',
            }}
          >
            <CenterItemList />
          </Box>
        </Grid>
      </Container>
    </>
  )
}
export default CenterPage
export {}
