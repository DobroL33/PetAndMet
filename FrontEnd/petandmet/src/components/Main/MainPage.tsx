import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainLive from "components/Live/LiveList";
import AnimalList from "components/Animal/AnimalList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CustomButtonProps {
  isActive: boolean;
}

const btn = ["라이브", "보호동물", "봉사"];
const CustomButton = styled(Button)(({ isActive }: CustomButtonProps) => ({
  backgroundColor: isActive ? "#FF6F26" : "#FFA629",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#FF6F26",
  },
  margin: "5px",
}));

function MainPage() {
  const [channel, setChannel] = useState(0);
  const [isActive, setIsActive] = useState([true, false, false]);
  let navigate = useNavigate();
  const goToLiveList = () => {
    navigate("/livelist");
  };
  const goToAnimalList = () => {
    navigate("/animallist");
  };
  const goToVolunteer = () => {
    navigate("/volunteer");
  };
  const handleButtonClick = (idx: number) => {
    setChannel(idx);
    const newIsActive = isActive.map((_, i) => i === idx);
    setIsActive(newIsActive);
  };

  return (
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
            <CustomButton
              key={idx}
              isActive={isActive[idx]}
              onClick={() => handleButtonClick(idx)}
            >
              {b}
            </CustomButton>
          ))}
        </Box>

        <Box>{channel === 1 ? <AnimalList num={8} /> : <MainLive />}</Box>

        <CustomButton
          isActive={isActive[channel]}
          onClick={
            channel === 1
              ? goToAnimalList
              : channel === 2
              ? goToVolunteer
              : goToLiveList
          }
        >
          {btn[channel]} 더보기
        </CustomButton>
      </Container>
    </>
  );
}

export default MainPage;
