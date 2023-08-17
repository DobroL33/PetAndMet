import { GetWalkResigster } from "hooks/Center/useCenterWalk"
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useAccessToken } from "hooks/useAccessToken"
import { Button, Tooltip, Grid  }from '@mui/material'

interface WalkApplication {
    date : string,
    time : number,
    status : string,
    walk_id : number,
    animal_uuid : string | null,
    center_uuid : string | null,
    user_uuid : string | null
}

function CenterWalk(){
    const [walkList, setwalkList] = useState([])
    const {accessToken, centerUuid, userUuid} = useAccessToken()
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchList =async () => {
            const List = await GetWalkResigster(accessToken)
            const filteredList = List.filter((item: WalkApplication) => item.center_uuid === centerUuid);
            setwalkList(filteredList)
        }
        fetchList()
    }, [])
    
    const goToUpdateWalk = (item : WalkApplication) =>{
        navigate('/admin/walk/update', {state : item })
    }

    return(
        <>
        <Grid sx={{display :'flex'}}>
        {walkList.map((item: WalkApplication) => (
            <Tooltip sx={{width:"40%"}} title={
                <div>
                    <p>  신청자  : {item.user_uuid}</p>
                    <p>신청 시간 : {item.time}</p>
                    <p>승인 상태 : {item.status}</p>
                    <p>신청 동물 : {item.animal_uuid}</p>
                    <p>신청 날짜 : {item.date}</p>
                </div>
            } arrow>
                <Button onClick={() => goToUpdateWalk(item)}>{item.walk_id}</Button>
            </Tooltip>
        ))}
        </Grid>
        </>
    )
}
export default CenterWalk
export{}