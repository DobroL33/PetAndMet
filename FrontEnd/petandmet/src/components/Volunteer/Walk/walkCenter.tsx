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

// interface CenterData {
//   uuid: string;
//   name: string;
//   address: string;
//   phone: string;
//   email: string;
// }

function WalkCenter() {
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
    refetch();
  }, [num]);

  const { setAnimalData } = useAnimal();
  const AnimalData = useAnimal();

  useEffect(() => {
    if (selectedAnimal) {
      setAnimalData(selectedAnimal);
    }
  }, [selectedAnimal]);

  // const { centerData, setCenterData } = useCenterData(); // 전역

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
