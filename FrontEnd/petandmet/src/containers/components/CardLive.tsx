import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { domain } from "../../hooks/customQueryClient";

interface CardInfoLiveProps {
  live: any;
  fetchAnimalData: () => Promise<any>;
}

function CardInfoLive({ live, fetchAnimalData }: CardInfoLiveProps) {
  const [animalData, setAnimalData] = useState<any>(null);

  const url = `${domain}/livelist/streaming/${live.live_id}`;
  console.log(url);

  // 클릭 이벤트 핸들러를 정의합니다.
  const handleCardClick = () => {
    window.location.href = url;
  };

  useEffect(() => {
    fetchAnimalData().then((data) => {
      if (data.animalId === live.animalUuid) {
        setAnimalData(data);
      }
    });
  }, [live, fetchAnimalData]);

  return (
    <Card sx={{ maxWidth: 250, borderRadius: 5 }} onClick={handleCardClick}>
      <CardMedia
        component="img"
        image={live.thumbnailImageUrl}
        style={{ width: "100%" }}
        alt="Thumbnail"
      />
      <CardContent sx={{ padding: "0 !important", textAlign: "left" }}>
        {animalData && (
          <Typography variant="body2" color="text.secondary">
            <span>Animal Name: {animalData.name}</span>
            <br />
            <span>Age: {animalData.age}</span>
            <br />
            <span>Gender: {animalData.gender}</span>
            <br />
            <span>Breed: {animalData.breed}</span>
            <br />
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default CardInfoLive;
