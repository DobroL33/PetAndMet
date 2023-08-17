import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { domain } from "hooks/customQueryClient";
import axios from "axios";
import { useCenterStore } from "hooks/Center/CenterMutation";
import { useCenterData } from "hooks/Center/useCenterData";
import CenterDataList from "hooks/Center/CenterMutation";
import { useAnimalList } from "hooks/Animal/useAnimalList";
import useAnimal from "hooks/Animal/useAnimal";
import { GetAnimal } from "hooks/Animal/AnimalData";
import { useAccessToken } from "hooks/useAccessToken";
import { useStore } from "hooks/Volunteer/useWalkStore";

// interface CenterData {
//   uuid: string;
//   name: string;
//   address: string;
//   phone: string;
//   email: string;
// }

interface WalkCenterProps {
  setAnimalUuid: React.Dispatch<React.SetStateAction<string | null>>;
  setCenterUuid: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AnimalData {
  name: string | null;
  age: number | null;
  specie: string | null;
  breed: string | null;
  gender: string | null;
  character: string | null;
  find_place: string | null;
  center_uuid: string;
  enter_date: string | null;
  adoption_status: string | null;
  enter_age: number | null;
  notice_date: string | null;
  adoption_start_date: string | null;
  photo_url: string | null;
}

function WalkCenter() {
  const { setAnimalUuid, setCenterUuid } = useStore();
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { accessToken, userUuid } = useAccessToken();
  const [animalDetail, setAnimalDetail] = useState<AnimalData | null>(null); // 객체나 null로 초기화
  const { setAnimalData, animalData } = useAnimal();
  const { data, refetch } = useAnimalList();
  const num = 15;
  useEffect(() => {
    refetch();
  }, [num]);

  useEffect(() => {
    if (animalDetail) {
      const centerUuidValue = animalDetail.center_uuid;
      setAnimalUuid(animal_uuid);
      setCenterUuid(centerUuidValue);
    }
  }, [animalDetail]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (animal: any) => {
    setSelectedAnimal(animal);
    handleClose();
  };

  const { data, refetch } = useAnimalList();
  const num = 15;
  useEffect(() => {
    if (selectedAnimal) {
      setAnimalData(selectedAnimal);
      const fetchData = async () => {
        if (animal_uuid) {
          // animal_uuid가 null이 아닐 경우에만 실행
          try {
            const info = await GetAnimal(animal_uuid, accessToken);
            setAnimalDetail(info);
          } catch (error) {
            console.log(error);
          }
        }
      };
      fetchData();
    }
  }, [selectedAnimal]);

  const animal_uuid = selectedAnimal ? selectedAnimal.animal_uuid : null;

  useEffect(() => {}, []);

  useEffect(() => {
    if (animalDetail) {
      const centerUuid = animalDetail.center_uuid;
      setAnimalUuid(animal_uuid);
      setCenterUuid(centerUuid);
    }
  }, [animalDetail]);

  return (
    <div className="my-0.5 border rounded">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ height: "50px" }}
      >
        <p className="grow">함께 산책하길 기다리는 {selectedAnimal?.name}</p>
      </Button>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            backgroundColor: "warning", // 여기에 실제 색상 코드를 넣어주세요.
          },
        }}
      >
        {data?.response.map((animal, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(animal)}
            sx={{
              backgroundColor: index % 2 === 0 ? "warning" : "연노랑", // 짝수와 홀수 인덱스에 따라 색상 변경
            }}
          >
            {animal.name}
          </MenuItem>
        ))}
      </Menu>
      {/* <HouseSidingIcon className="m-3" color="action"></HouseSidingIcon> */}
    </div>
  );
}

export default WalkCenter;
