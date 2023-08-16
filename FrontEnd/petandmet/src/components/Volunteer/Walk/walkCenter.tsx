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

interface CenterData {
  uuid: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

function WalkCenter() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [centers, setCenters] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const centersData = await CenterDataList();
      setCenters(centersData);
    };
    fetchData();
  }, []);

  // setCenters(centers);

  const { centerData } = useCenterData();
  const uuid = centerData?.uuid;

  const [centerDetail, setCenterDetail] = useState<any | null>(null);

  useEffect(() => {
    const fetchCenterDetail = async () => {
      try {
        const response = await axios.get(
          `${domain}/center/detail?id=${uuid}`,
          {}
        );
        setCenterDetail(response.data.response.board);
      } catch (error) {
        console.error("Failed to fetch center details:", error);
      }
    };

    fetchCenterDetail();
  }, [uuid]);

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
        <p className="grow">{centerDetail?.name}에 산책 신청하기</p>
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
      >
        {/* {here} */}
      </Menu>
      {/* <HouseSidingIcon className="m-3" color="action"></HouseSidingIcon> */}
    </div>
  );
}

export default WalkCenter;
