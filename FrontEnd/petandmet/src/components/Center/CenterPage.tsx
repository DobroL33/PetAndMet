import { Box, Container, Grid, Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { domain } from 'hooks/customQueryClient';
import CenterAnimalList from 'components/Center/CenterAnimalList';
import CenterItemList from './CenterItemList';
import CenterWalk from './CenterWalk';
interface AnimalsData {
  name: string;
  age: number;
  specie: string;
  breed: string;
  animal_uuid: string;
  animal_photo_url: string;
  center_uuid : string,
}

interface Center{
  name: string | null,
  address : string | null,
  email : string | null,
  phone : string | null,
}

interface ItemsData{
  item_name: string ,
  item_url : string ,
  item_target_price : number,
  center_item_id : number,
  center_uuid : string
}

function CenterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [center, setCenter] = useState<Center | null>(null); 
  const [animals, setAnimalData] = useState<AnimalsData[]>([]);
  const [items, setItems] = useState<ItemsData[]|null>(null);

  useEffect(() => {
    async function fetchAnimalData() {
      try {
        const cetnerRes = await axios.get(`${domain}/center/detail?id=${location.state}`)
        const centerData = cetnerRes.data.response.board
        setCenter(centerData)

        const ItemRes = await axios.get(`${domain}/center/item?uuid=${location.state}`)
        const ItemData = ItemRes.data.response.centerItems
        setItems(ItemData)

        const response = await axios.get(`${domain}/animal/search`,
          {
            params: { centerUuid: location.state} 
          }
        );
        const AnimalsData: AnimalsData[] = response.data.response.animals;
        setAnimalData(AnimalsData)
      } catch (error) {
        console.error('Error fetching animal data:', error)
      }
    }
    fetchAnimalData();
  }, []);

  const EnrollItem = () => {
    navigate('item/enroll')
  }
  const EnrollAnimal = () => {
    navigate('/animal/enroll')
  }
  const UpdateCenter = () => {
    navigate('center/update', {state : center})
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
          <Grid xs={6} sx={{ fontSize: '2rem' }}>
            <p>{center ? center.name : 'Center Name'}</p> {/* center가 null이 아닐 때만 name을 출력 */}
          </Grid>
          <Grid xs={4}>
            <span>장소 : </span>
            <span>{center? center.address : 'Center Address'}</span>
            <br />
            <span>Tel : </span>
            <span>{center? center.phone : 'Center Phone'}</span>
            <br />
            <span>E-mail : </span>
            <span>{center? center.email : 'Center E-mail'}</span>
          </Grid>
          <Grid xs={2} sx={{ textAlign: 'end' }}>
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
              xs={2}
              sx={{
                textAlign: 'justify',
                fontSize: '1.5rem',
                whiteSpace: 'nowrap',
              }}
            >
              산책 신청 현황
            </Grid>

            <Grid xs={10} sx={{ textAlign: 'end' }}>
            </Grid>

            <Box
              sx={{
                mb: 1,
                display: 'grid',
                gap: '8px', // 카드 간 간격 설정
                height: '90%',
              }}
            >
              <CenterWalk ></CenterWalk>
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
              xs={2}
              sx={{
                textAlign: 'justify',
                fontSize: '1.5rem',
                whiteSpace: 'nowrap',
                // display: 'inline-block',
              }}
            >
              보호동물
            </Grid>

            <Grid xs={10} sx={{ textAlign: 'end' }}>
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
              <CenterAnimalList animals={animals}></CenterAnimalList>
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
            xs={2}
            sx={{
              textAlign: 'justify',
              fontSize: '1.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            물품
          </Grid>
          <Grid xs={10} sx={{ textAlign: 'end' }}>
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
            {items ? <CenterItemList items={items} /> : null}
          </Box>
        </Grid>
      </Container>
    </>
  )
}
export default CenterPage
export {}
