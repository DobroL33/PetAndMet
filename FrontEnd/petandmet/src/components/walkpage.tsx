import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import banner from "../images/banner.jpg";
import { Button, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useState } from "react";
import * as React from "react";

import AdbIcon from "@mui/icons-material/Adb";
import logo from "../images/new_logo.jpg";
import WalkCenter from "./walks/walkCenter";
import WalkDate from "./walks/walkDate";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFA629",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "orange",
  },
  margin: "5px",
}));

function WalkPage() {
  const [center, setCenter] = useState(["A보호소", "B보호소", "C보호소"]);
  const [date, setDate] = useState(["7월29일", "7월30일", "7월31일"]);
  const [time, setTime] = useState(["A보호소", "B보호소", "C보호소"]);

  return (
    <>
      <Container sx={{ padding: "0 !important" }}>
        <img src={banner} alt="" style={{ paddingTop: 10, width: "100%" }} />
      </Container>
      <CssBaseline />
      <h4 className="text-3xl text-yellow-500 font-extrabold my-9">산책하기</h4>
      <Container
        sx={{
          mt: 5,
          display: "grid",
          bgcolor: "#FFE8A3",
          height: "45rem",
          width: "50%",
          borderRadius: 5,
        }}
      >
        <Container
          sx={{
            mt: 5,
            display: "grid",
            bgcolor: "#ffffff",
            height: "90%",
            width: "95%",
            borderRadius: 5,
          }}
        >
          <div className="text-left my-5 text-2xl font-bold">
            <WalkCenter></WalkCenter>
            <WalkDate></WalkDate>
            <div className="my-0.5 border-y-2 border-x-2">
              <AccessTimeIcon className="mx-3" color="action"></AccessTimeIcon>
              시간
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default WalkPage;
