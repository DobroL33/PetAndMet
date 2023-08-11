import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../../hooks/customQueryClient";
import useAnimal from "../../hooks/Animal/useAnimal";

interface Live {
  live_id: number | null;
  thumbnail: string | null;
  session_name: string | null;
  animal_uuid: string | null;
  center_uuid: string | null;
}

interface Animal {
  animal_uuid: string | null;
  // animal_photo_url: string | null;
  name: string | null;
  age: string | null;
  specie: string | null;
  breed: string | null;
}

interface CardLiveInfoProps {
  live: Live;
}

// 라이브로 표시하는건 여기까지
// 나머지는 도네이션에서 가져왔을 때 처럼 쓰면 되는거 아닐까
// 도네이션때 처럼 state 가져오고, 그걸 사용?

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AnimalInfo = ["세션 이름", "동물 이름", "나이", "종류", "성격"];

function CardLiveInfo({ live }: CardLiveInfoProps) {
  if (!live) {
    return null; // 또는 로딩 중이라는 메시지나 다른 표시를 반환
  }
  const [animal, setAnimal] = useState<any>();

  useEffect(() => {
    const url = `${domain}/animal/detail?uuid=${live.animal_uuid}`;
    console.log(url);
    axios
      .get(url) // 따옴표 제거
      .then((response) => {
        setAnimal(response.data.response); // 데이터 처리 부분 변경
      })
      .catch((error) => {
        console.error(error);
      });
  }, [live.animal_uuid]);

  let animalsToShow: any = [];

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (live.animal_uuid && animal) {
      setAnimal({
        animal_uuid: live.animal_uuid,
        name: animal.name,
        age: animal.age,
        gender: animal.gender, // 여기에 적절한 값 채우기
        breed: animal.breed, // 여기에 적절한 값 채우기
        center_uuid: live.center_uuid, // 여기에 적절한 값 채우기
      });
      navigate(`/livelist/streaming/${live.live_id}`);
    }
  };

  return (
    <Card sx={{ maxWidth: 250, borderRadius: 5 }} onClick={handleCardClick}>
      <CardContent sx={{ padding: "0 !important", textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary">
          <div style={{ marginTop: "10px" }}>
            {AnimalInfo.map((info) => (
              <>
                <span>{info} : </span>
                <span>
                  {info === "동물 이름" && animal?.name}{" "}
                  {/* "이름" 대신 "동물 이름"으로 변경 */}
                  {info === "나이" && animal?.age}
                  {info === "종류" && animal?.specie}
                  {info === "성격" && animal?.breed}
                </span>
                <br />
              </>
            ))}
          </div>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>  
      </CardActions> */}
    </Card>
  );
}

export default CardLiveInfo;
export {};
