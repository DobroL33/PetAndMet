import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import WalkCenter from "./Walk/walkCenter";
import WalkDate from "./Walk/walkDate";
import "react-calendar/dist/Calendar.css";

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
  return (
    <>
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
          </div>
        </Container>
      </Container>
    </>
  );
}

export default WalkPage;
