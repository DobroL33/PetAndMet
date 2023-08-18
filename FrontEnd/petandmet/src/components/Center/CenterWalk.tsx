import { useNavigate } from 'react-router-dom'
import { Button, Tooltip, Grid } from '@mui/material'
import { WalkStore, WalkDetail } from 'hooks/Center/CenterWalkStore'
import { useAnimalDetail } from 'hooks/Animal/useAnimalSearch'
import { AnimalSearchStore } from 'hooks/Animal/AnimalListStore'
import { useProfileQuery } from 'hooks/User/useGetProfile'
import { useProfile } from 'hooks/User/ProfileStore'

function CenterWalk() {
  const walks = WalkStore()
  const walkList = walks.walk_times
  const navigate = useNavigate()

  const goToUpdateWalk = (item: WalkDetail) => {
    navigate('/admin/walk', { state: item })
  }

  const checkStatus = (value: string): string => {
    if (value === 'PENDING') {
      return '보류'
    } else if (value === 'APPROVAL') {
      return '승인'
    } else if (value === 'REJECTION') {
      return '거절'
    }
    return '오류'
  }

  return (
    <>
      <Grid sx={{ display: 'flex', gap: '1.5rem' }}>
        {walkList.map((item: WalkDetail) => {
          const { data: animalDetailData, refetch: refetchAnimalData } =
            useAnimalDetail(item.animal_uuid)
          const animalDetail = AnimalSearchStore()
          const { data: profileData, refetch: refetchProfile } =
            useProfileQuery(item.user_uuid)
          const userProfile = useProfile()
          return (
            <Tooltip
              key={item.walk_id}
              sx={{ width: '40%' }}
              title={
                <div>
                  <p> 신청자 : {userProfile.name}</p>
                  <p>신청 시간 : {item.time}</p>
                  <p>승인 상태 : {checkStatus(item.status)}</p>
                  <p>신청 동물 : {animalDetail.name}</p>
                  <p>신청 날짜 : {item.date}</p>
                </div>
              }
              arrow
            >
              <button
                onClick={() => goToUpdateWalk(item)}
                className={`${
                  item.status === 'PENDING'
                    ? 'bg-gray-400 hover:bg-gray-500'
                    : item.status === 'APPROVAL'
                    ? 'bg-green-400 hover:bg-green-500'
                    : item.status === 'REJECTION'
                    ? 'bg-red-400 hover:bg-red-500'
                    : ''
                } py-2 px-3  rounded-md text-2xl`}
              >
                {animalDetail.name}
              </button>
            </Tooltip>
          )
        })}
      </Grid>
    </>
  )
}
export default CenterWalk
