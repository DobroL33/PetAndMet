import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import useAnimal from "hooks/Animal/useAnimal";

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

  useEffect(() => {
    const url = `${domain}/donate/centeritem?uuid=${center_uuid}&id=${item_id}`;
    axios
      .get(url)
      .then((response) => {
        const price = response.data.response.price; // price 값 추출
        setCurrentPrice(price); // current_price 상태 업데이트
        console.log("현재 response는요");
        console.log(response);
        console.log("현재 url는요");
        console.log(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [center_uuid, item_id]);

  // 진행률 계산
  const progress = ((itemTargetPrice - currentPrice) / itemTargetPrice) * 100;
  console.log(currentPrice);
  console.log(progress);
  return (
    <div>
      <ProgressBar variant="warning" now={progress} />
    </div>
  );
};

export default Live_ItemStatus;
