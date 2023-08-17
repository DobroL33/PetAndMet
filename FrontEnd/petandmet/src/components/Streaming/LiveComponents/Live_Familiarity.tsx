import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useAccessToken } from "hooks/useAccessToken";
import useAnimal from "hooks/Animal/useAnimal";
import { domain } from "hooks/customQueryClient";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

function Familiarity() {
  const { animal_uuid } = useAnimal().animalData;
  const [progress, setProgress] = useState(0);
  const theme = useTheme(); // 테마 가져오기
  const { userUuid, accessToken } = useAccessToken();
  const navigate = useNavigate(); // useNavigate 사용하기
  const handleWalkButtonClick = () => {
    navigate("/walk");
  };

  useEffect(() => {
    const fetchData = () => {
      const payload = {
        user_uuid: userUuid,
        animal_uuid: animal_uuid,
      };

      axios
        .post(`${domain}/user/animal-friendliness`, payload, {
          headers: { Authorization: `${accessToken}` },
        })
        .then((response) => {
          const newProgress = response.data.response.percent;
          if (newProgress !== progress) {
            // 값이 변동되었을 때만 상태 업데이트
            setProgress(newProgress);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData(); // 컴포넌트 마운트 시 바로 실행
    const intervalId = setInterval(fetchData, 3000); // 그 후 5초마다 fetchData 호출

    return () => clearInterval(intervalId); // 컴포넌트 unmount 시에 타이머 제거
  }, [userUuid, animal_uuid, accessToken, progress]);

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
