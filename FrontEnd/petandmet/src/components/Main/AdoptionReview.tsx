import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainLive from "components/Live/LiveList";
import AnimalList from "components/Animal/AnimalList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdoptionReviewItem from "./AdoptionReviewItem";

function AdoptionReview() {
  const aStyle = {
    display: "flex",
    justifyContent: "center", // 수평 가운데 정렬
    alignItems: "center", // 수직 가운데 정렬
    marginTop: "20px",
    marginLeft: "-24px",
  };
  const divStyle = {
    display: "flex",
    alignItems: "flex-end",
    margin: "20px 0",
  };
  const h3Style = {
    fontSize: "24px",
    fontFamily: "SCoreDream",
    color: "#212121",
    fontWeight: 700,
    letterSpacing: "-1px",
  };
  const pStyle = {
    marginLeft: "13px",
    fontSize: "16px",
    fontFamily: "SCoreDream",
    color: "#414141",
    fontWeight: 400,
  };

  return (
    <>
      <div style={divStyle}>
        <h3 style={h3Style}>입양후기</h3>
        <p style={pStyle}>#새 삶을 시작한 반려동물들의 소식을 들려주세요!</p>
      </div>
      <Container style={aStyle}>
        <AdoptionReviewItem></AdoptionReviewItem>
        <AdoptionReviewItem></AdoptionReviewItem>
        <AdoptionReviewItem></AdoptionReviewItem>
        <AdoptionReviewItem></AdoptionReviewItem>
        <AdoptionReviewItem></AdoptionReviewItem>
      </Container>
    </>
  );
}

export default AdoptionReview;
