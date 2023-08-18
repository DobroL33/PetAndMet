import { useNavigate } from 'react-router-dom'
import { Button, Tooltip, Grid } from '@mui/material'
import { WalkStore, WalkDetail } from 'hooks/Center/CenterWalkStore'

function CenterWalk() {
  const walks = WalkStore()
  const walkList = walks.walk_times
  const navigate = useNavigate()

  const goToUpdateWalk = (item: WalkDetail) => {
    navigate('/admin/walk', { state: item })
  }

  return (
    <>
      <Grid sx={{ display: 'flex' }}>
        {walkList.map((item: WalkDetail) => (
          <Tooltip
            key={item.walk_id}
            sx={{ width: '40%' }}
            title={
              <div>
                <p> 신청자 : {item.user_uuid}</p>
                <p>신청 시간 : {item.time}</p>
                <p>승인 상태 : {item.status}</p>
                <p>신청 동물 : {item.animal_uuid}</p>
                <p>신청 날짜 : {item.date}</p>
              </div>
            }
            arrow
          >
            <Button onClick={() => goToUpdateWalk(item)}>{item.walk_id}</Button>
          </Tooltip>
        ))}
      </Grid>
    </>
  )
}
export default CenterWalk
