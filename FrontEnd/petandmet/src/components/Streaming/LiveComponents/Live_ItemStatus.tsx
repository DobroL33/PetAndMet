import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import useAnimal from "hooks/Animal/useAnimal";
import Familiarity from "./Live_Familiarity";
import { useUserAccess } from "hooks/useUserAccess";

interface Live_ItemStatusProps {
  itemTargetPrice: number;
  centerItemId: number;
}

const Live_ItemStatus: React.FC<Live_ItemStatusProps> = ({
  itemTargetPrice,
  centerItemId,
}) => {
  const { animalData } = useAnimal();
  const center_uuid = animalData.center_uuid;
  const item_id = centerItemId;
  const [currentPrice, setCurrentPrice] = useState(0); // current_price 상태 변수 설정
  const user_uuid = useUserAccess().user_uuid;
  const user_token = useUserAccess().user_token;

  // 현재 가격 가져오기
  useEffect(() => {
    const url = `${domain}/donate/centeritem?uuid=${center_uuid}&id=${item_id}`;
    axios
      .get(url)
      .then((response) => {
        const price = response.data.response.price; // price 값 추출
        setCurrentPrice(price); // current_price 상태 업데이트
      })
      .catch((error) => {
        console.error(error);
      });
  }, [center_uuid, item_id]);

  // 지불 가능한지 확인하기 위한 마일리지 체크
  useEffect(() => {
    const url = `${domain}/user/mileage/${user_uuid}`;
    axios
      .get(url)
      .then((response) => {
        const price = response.data.response.price; // price 값 추출
        setCurrentPrice(price); // current_price 상태 업데이트
      })
      .catch((error) => {
        console.error(error);
      });
  }, [center_uuid, item_id]);

  // 진행률 계산
  const progress = ((itemTargetPrice - currentPrice) / itemTargetPrice) * 100;
  //   console.log(currentPrice);
  //   console.log(progress);

  // 마일리지 조회 => 지불 가능한지 조회하기

  return (
    <div>
      <ProgressBar variant="warning" now={50} />
      <Familiarity></Familiarity>
    </div>
  );
};

export default Live_ItemStatus;
