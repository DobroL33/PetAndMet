import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function WalkDate() {
  const [date, setDate] = useState(["5일", "6일", "7일", "8일", "9일"]); // DB에서 state에 들어가있는 보호소 바꿔주기
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="my-0.5 border-y-2 border-x-2">
      <CalendarMonthIcon className="mx-3" color="action"></CalendarMonthIcon>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <p className="text-left text-2xl font-bold">날짜</p>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>{date[0]}</MenuItem>
        <MenuItem onClick={handleClose}>{date[1]}</MenuItem>
        <MenuItem onClick={handleClose}>{date[2]}</MenuItem>
        <MenuItem onClick={handleClose}>{date[3]}</MenuItem>
        <MenuItem onClick={handleClose}>{date[4]}</MenuItem>
      </Menu>
    </div>
  );
}
