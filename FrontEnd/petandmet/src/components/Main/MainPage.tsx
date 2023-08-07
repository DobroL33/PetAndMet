import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainLive from '../Live/LiveList';
import AnimalList from '../Animal/AnimalList';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerPage from '../Volunteer/VolunteerPage';

const btn = ["라이브", "보호동물", "봉사"];
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFA629",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "orange",
  },
  margin: "5px",
}));

function MainPage(){
    const [channel, setChannel] = useState(0);
    let navigate = useNavigate();
    const goToLiveList = () => {
      navigate('/livelist')
    }
    const goToAnimalList = () => {
      navigate('/animallist')
    }
    const goToVolunteer = () => {
      navigate('/volunteer')
    }
    return(
    <>
      <CssBaseline />
      <Container
        sx={{
          mt: 10,
          display: "grid",
          bgcolor: "#FFBC5F",
          height: "100%",
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "0 !important 16px",
          }}
        >
          {btn.map((b, idx) => (
            <CustomButton key={idx} onClick={() => setChannel(idx)}>
              {b}
            </CustomButton>
          ))}
        </Box>

      <Box sx={{
            mt:1,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 이 부분을 추가하여 카드를 자동으로 정렬합니다.
            gap: '8px', // 카드 간 간격 설정
            height: '95%',
          }}>
            {channel === 1 ? <AnimalList></AnimalList> 
            : <MainLive></MainLive>}
        </Box>

      <CustomButton
        onClick={channel === 1 ? goToAnimalList 
        : channel === 2 ? goToVolunteer 
        : goToLiveList}
        >더보기</CustomButton> 
      {/* 더보기 눌렀을 시 라이브 리스트, 보호동물 리스트 페이지로 각각 이동 추후개발 */}
      </Container>
    </>
  );
}

export default MainPage;
