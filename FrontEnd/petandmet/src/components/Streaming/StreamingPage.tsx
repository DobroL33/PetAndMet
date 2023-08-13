import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import useAnimal from "hooks/Animal/useAnimal";
import LiveDonation from "components/Streaming/LiveComponents/Live_Donation";

interface DecodedToken {
  user_uuid: string;
}

/* ### Streaming - 후원하기 파트

1. 목록 클릭 ⇒ 보호소가 등록한 필요 물품 조회 ( 일단 클릭해서 들어오기 전에 Zustand에 보호소id를 state에 저장하고 들어오는 거 ) 
1. 물품 리스트를 클릭 :  onClick() ⇒ 
2. 리스트 안에서 보여질 내용을 불러올 API {domain}/apli/v1/center/item/?uuid={center_uuid}
3. 그 중 클릭하면 그 API에서 받아올 내용중 “item_name” , 즉 품목명을 바탕으로 구분하기 + “item_name” 정보를 form에 저장
4. 그리고 숫자 카운트 ex) 1000, 5000, 10000 단위를 클릭 하면 Total Price에 각 값만큼 증가 혹은 감소를 해주는 컴포넌트 삽입
5. 여기에서는 굳이 Zustand 안 써도 됨. 여기서만 쓸 state니까
6. TotalPrice도 함께 form에 등록할 거임. */

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

function StreamingPage() {
  const animalData = useAnimal();
  const animal = animalData.animalData;

  return (
    <>
      <CssBaseline />
      <h4 className="text-3xl text-yellow-500 font-extrabold my-9">스트리밍</h4>
      <Container
        sx={{
          my: 5,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          height: "45rem",
          width: "98%",
          borderRadius: 5,
        }}
      >
        <Grid container direction="column" spacing={3} sx={{ flexGrow: 1 }}>
          {/* Top Container */}
          <Grid item container spacing={3} xs={12} md={9} sx={{ flexGrow: 9 }}>
            {/* Top Left */}
            <Grid item xs={12} md={9}>
              <Box
                sx={{
                  backgroundColor: "#FFA629",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#7b7777",
                    flex: 1,
                    height: "100%",
                    width: "90%",
                  }}
                >
                  <h1 font-size="lg">ㅇㅇ</h1>
                </Box>
              </Box>
            </Grid>
            {/* Top Right */}
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  backgroundColor: "#FFA629",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 5,
                }}
              >
                <Box
                  sx={{ backgroundColor: "#f8d260", flex: 1, borderRadius: 5 }}
                >
                  <LiveDonation></LiveDonation>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* Bottom Container */}
          <Grid item xs={9} md={3} sx={{ flexGrow: 3, width: "100%" }}>
            {/* Bottom Right */}
            <Box
              sx={{
                backgroundColor: "#FFA629",
                height: "100%",
                display: "flex",
                borderRadius: 5,
                justifyContent: "Left",
              }}
            >
              <img
                className="h-28 m-5 md-3"
                src="https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg"
                alt=""
              />
              <h4 className="m-5">
                Name: {animal.name}
                <br />
                나이: {animal.age}
                <br />
                성별: {animal.gender}
                <br />
                강아지 종: {animal.breed}
              </h4>
            </Box>

            {/* Bottom Left */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default StreamingPage;
