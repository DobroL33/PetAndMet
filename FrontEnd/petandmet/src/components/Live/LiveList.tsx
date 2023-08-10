import { Box } from "@mui/material";
import CardInfoLive from "containers/components/CardLive";
import axios from "axios";
// import useLiveList from "../../hooks/Live/useLiveList";
// import useAnimal from "hooks/Animal/useAnimal";
import React, { useEffect, useState } from "react";

interface LiveListProps {
  num?: number;
}

function LiveList({ num = 10 }: LiveListProps) {
  const [liveToShow, setLivesToShow] = useState<any[]>([]);
  // const { liveList, fetchLiveList } = useLiveList();
  // const { fetchAnimalData } = useAnimal();
  useEffect(() => {
    axios
      .get("https://i9b302.p.ssafy.io/api/v1/live?page=0&size=8")
      .then((response) => {
        console.log("response는요");
        console.log(response);
        console.log("response.data.response는요");
        console.log(response.data.response);
        setLivesToShow(response.data.lives || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [num]);

  let livesToShow: any = [];

  if (num !== undefined) {
    livesToShow = Array.from({ length: num });
  }

  return (
    <>
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 이 부분을 추가하여 카드를 자동으로 정렬합니다.
          gap: "8px", // 카드 간 간격 설정
          height: "95%",
        }}
      >
        {livesToShow.map((live: any, idx: number) => (
          <CardInfoLive key={idx} live={live} />
        ))}
      </Box>
    </>
  );
}

export default LiveList;
export {};
