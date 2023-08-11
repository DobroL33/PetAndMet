import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import logo from "images/logo.png";
import { useNavigate } from "react-router-dom";

interface Animal {
  animal_uuid: string | null;
  animal_photo_url: string | null;
  name: string | null;
  age: string | null;
  specie: string | null;
  breed: string | null;
}

interface CardInfoProps {
  animal: Animal; // 동물 데이터를 받아오는 props
}

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

const AnimalInfo = ["이름", "나이", "종류", "품종"];

function CardInfo({ animal }: CardInfoProps) {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //     setExpanded(!expanded);
  // };
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (animal.animal_uuid) {
      console.log("Clicked animal UUID:", animal.animal_uuid);
      navigate(`/animal/detail/${animal.animal_uuid}`);

      // onCardClick(animal.animal_uuid)
    }
  };
  return (
    <Card sx={{ maxWidth: 250, borderRadius: 5 }} onClick={handleCardClick}>
      {animal.animal_photo_url &&
      typeof animal.animal_photo_url === "string" ? (
        <CardMedia
          component="img"
          image={animal.animal_photo_url}
          style={{ width: "100%" }}
          alt={logo}
        />
      ) : (
        <CardMedia
          component="img"
          image={logo}
          style={{ width: "100%" }}
          alt={logo}
        />
      )}
      <CardContent sx={{ padding: "0 !important", textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary">
          <div style={{ marginTop: "10px" }}>
            {AnimalInfo.map((info) => (
              <>
                <span>{info} : </span>
                <span>
                  {info === "이름" && animal?.name}
                  {info === "나이" && animal?.age}
                  {info === "분류" && animal?.specie}
                  {info === "종" && animal?.breed}
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

export default CardInfo;
export {};
