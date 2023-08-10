import { Box } from "@mui/material";
import CardInfoLive from "containers/components/CardLive";
import useLiveList from "../../hooks/Live/useLiveList";
import useAnimal from "hooks/Animal/useAnimal";
import React, { useEffect } from "react";

interface LiveListProps {
  num?: number;
}

function LiveList({ num = 10 }: LiveListProps) {
  const { liveList, fetchLiveList } = useLiveList();
  const { fetchAnimalData } = useAnimal();

  useEffect(() => {
    fetchLiveList();
    // 종속성 배열을 비워 둡니다.
  }, []);

  return (
    <>
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          height: "95%",
        }}
      >
        {liveList.map((live, idx) => (
          <CardInfoLive
            key={idx}
            live={live}
            fetchAnimalData={() => fetchAnimalData(live.animalUuid)}
          />
        ))}
      </Box>
    </>
  );
}

export default LiveList;
