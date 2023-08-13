import ProgressBar from "react-bootstrap/ProgressBar";
import { useUserAccess } from "hooks/useUserAccess";
import useAnimal from "hooks/Animal/useAnimal";
import axios from "axios";
import React, { useState, useEffect } from "react";

// 스트리밍 페이지를 불러오면 바로 함께 DB에서 % 숫자를 가져오게 한다.
// Zustand에서

function Familiarity() {
  const user_uuid = useUserAccess().user_uuid;
  const token = useUserAccess().user_token;
  const animal_uuid = useAnimal().animalData.animal_uuid;

  //Post 요청 보내는 url
  const url = "https://i9b302.p.ssafy.io/api/v1/user/animal-friendliness";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestBody = {
    user_uuid: user_uuid,
    animal_uuid: animal_uuid,
  };

  interface Percentage {
    percentage: number;
  }

  const [percentage, setPercentage] = useState<number>();

  axios
    .post(url, requestBody, { headers: headers })
    .then((response) => {
      // 우호도 퍼센테이지
      const percent = response.data.response.percent;
      console.log("현재 percent는요");
      console.log(percent);
      setPercentage(percent);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
      <ProgressBar striped variant="warning" now={percentage} />
      {/* <AnimatedCircle></AnimatedCircle> */}
    </>
  );
}

export default Familiarity;

// 토큰은 로그인 성공 후 어딘가에 저장되어 있을 것입니다. 여기에 정확한 값을 넣으세요.
