import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainLive from "components/Live/LiveList";
import AnimalList from "components/Animal/AnimalList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "css/noticeItem.css";

function AdoptionReviewItem() {
  const imageStyle = {
    width: "100%",
    borderRadius: "13px",
    overflow: "hidden",
  };
  const iStyle = {
    height: "50%",
    display: "flex",
    justifyContent: "center", // 수평 가운데 정렬
    alignItems: "center", // 수직 가운데 정렬
    overflow: "hidden",
  };
  const tagStyle = {
    overflow: "hidden",
    color: "#212121",
    fontWeight: "500",
    textOverflow: "ellipsis",
  };

  const borderedStyle = {
    border: "0.1px solid grey", // 밑줄을 표현하는 border 스타일을 추가
    marginRight: "10px",
    borderRadius: "0 0 13px 13px",
    borderWidth: "0 1px 1px 1px",
    borderStyle: "solid",
    borderColor: "#e1e1e1",
    width: "20%",
  };
  const strongStyle = {
    fontSize: "18px",
    color: "#212121",
    fontWeight: 500,
    overflow: "hidden",
  };
  const pStyle = {
    fontSize: "15px",
    color: "#717171",
    fontWeight: "400",
  };

  return (
    <>
      <div style={borderedStyle}>
        <a href="">
          <i style={iStyle} className="adoptionImage">
            <img
              src="https://www.daejeon.go.kr/FileUpload/CommonBoard/normal_0014/20230812122102122.jpg"
              style={imageStyle}
              alt=""
            />
          </i>
          <div>
            <strong className="adoptionName">제 이름은 뽀또에요</strong>
            <br />
            <span className="adoptionDate">2023-08-12</span>
          </div>
        </a>
      </div>
    </>
  );
}

export default AdoptionReviewItem;
