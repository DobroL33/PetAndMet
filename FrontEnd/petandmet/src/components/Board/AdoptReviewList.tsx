import {Button, Typography, FormControl,
        InputLabel, MenuItem } from '@mui/material'
import List from 'containers/components/List'
import { useNavigate } from 'react-router-dom'
import { useCenterStore} from 'hooks/Center/CenterMutation'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import axios from 'axios';
import { domain } from 'hooks/customQueryClient';
import { useState, useEffect } from 'react'

interface CenterBoard {
  id: number;
  title: string;
  content: string | null;
  type: string;
  board_photo_url: string | null;
  created_at: string | null;
  user_uuid : string,
}
  
  function AdoptList() {
    let navigate = useNavigate()

    const centers = useCenterStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      centers.getCentersData()
        .finally(() => {
          setIsLoading(false);
        });
    }, []);

    // console.log(centers)

    const goToCreateForm = () => {
      navigate('/adoptreviewform')
    }
    //선택된 보호소 정보 가져오는 상태, 함수
    const [center, setCenter] = useState('')
    const handleChange = (event: SelectChangeEvent) => {
      setCenter(event.target.value)
    }
    //선택된 보호소 uuid 담는 state
    const [uid, setUid] = useState('')

    //선택된 보호소 입양후기 가져오는 상태, 함수
    const [Boards, setBoards] = useState<CenterBoard[]>([]);

    const CenterAdoptList =async () => {
      try{
        const res = await axios.get(`${domain}/board/adopt?page=0&center_uuid=${uid}&type=adopt`)
        console.log(res.data.response.boards.content)
        const centerAdopt = res.data.response.boards.content
        return centerAdopt
      } catch(error){
        console.log(error)
        return [];
      }
    }
    
    useEffect(() => {
      const fetchBoardList =async () => {
        const centersAdopt = await CenterAdoptList()
        setBoards(centersAdopt)
      }
      fetchBoardList()
    },[uid])


    return (
    <>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          style={{ color: '#FFA629', fontWeight: 'bold' }}
        >
          입양 후기
        </Typography>

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
        <List Boards={Boards}></List>
      </div>
      <div style={{textAlign : 'end', width : '90%'}}>
      <Button sx={{bgcolor : '#FFBC5F', color : 'white', 
                  '&:hover': {
                    bgcolor: 'orange', // Change the hover color to orange
                    },
                  }}
                  onClick={goToCreateForm}
        >작성</Button>
       </div>
    </>
  )
}

export default AdoptList
export {}
