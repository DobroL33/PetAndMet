import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useUserAccess } from "hooks/useUserAccess";
import useAnimal from "hooks/Animal/useAnimal";
import { domain } from "hooks/customQueryClient";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

function Familiarity() {
  const { user_token } = useUserAccess();
  const { animal_uuid } = useAnimal().animalData;
  const [progress, setProgress] = useState(0);
  const theme = useTheme(); // 테마 가져오기
  const user_uuid = useUserAccess().user_uuid;
  const navigate = useNavigate(); // useNavigate 사용하기
  const handleWalkButtonClick = () => {
    navigate("/walk");
  };

  useEffect(() => {
    const payload = {
      user_uuid: user_uuid,
      animal_uuid: animal_uuid,
    };

    axios
      .post(`${domain}/user/animal-friendliness`, payload, {
        headers: { Authorization: `Bearer ${user_token}` },
      })
      .then((response) => {
        console.log(response.data.response.percent);
        // 서버 응답에서 percent 값을 가져와 progress에 설정
        // 여기서 'percent'는 실제 응답 내의 키에 따라 수정해야 할 수 있음
        setProgress(response.data.response.percent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user_uuid, animal_uuid, user_token]); // 의존성 배열

  return (
    <>
      <Box>
        <CircularProgress
          variant="determinate"
          value={progress}
          color="warning"
          thickness={10} // 굵기 조정
          size="150px" // 크기 조정, 원하는 크기로 변경 가능
        />
      </Box>
      <Typography variant="body1" sx={{ m: 5 }}>
        {progress}% 만큼 가까워졌어요!
        <br />
        산책을 신청하거나, 후원을 해보세요!
      </Typography>
      <Button
        variant="contained"
        color="warning"
        sx={{
          fontSize: "20px",
          borderRadius: "10px",
          backgroundColor: theme.palette.warning.main,
          fontWeight: "bold",
        }}
        onClick={handleWalkButtonClick}
      >
        산책 신청하기
      </Button>
      {/* "산책 신청하기" 버튼 추가 */}
    </>
  );
}

export default Familiarity;
