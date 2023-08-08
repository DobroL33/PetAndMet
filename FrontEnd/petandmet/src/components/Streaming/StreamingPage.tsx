import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import * as React from "react";

import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

import useAnimal from "../../hooks/Animal/useAnimal";
import useCenter from "../../hooks/Center/useCenter";
import CenterList from "./Streaming/Center";

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

const AnimalInfoContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#bf7070",
  padding: theme.spacing(3),
  borderRadius: "5px",
}));

function StreamingPage() {
  const { animal_uuid } = useParams();

  const fetchAnimalData = useAnimal((state) => state.fetchAnimalData);
  const {
    animalId: animalId,
    name: animalName,
    age: animalAge,
    gender: animalGender,
    breed: animalBreed,
    // enterDate: enterDate,
  } = useAnimal();

  const fetchCenterData = useCenter((state) => state.fetchCenterData);
  const {
    centerId: centerId,
    name: centerName,
    address: centerAddress,
    phone: centerPhone,
    email: centerEmail,
    // enterDate: enterDate,
  } = useCenter();

  useEffect(() => {
    fetchAnimalData();
  }, [fetchAnimalData]);

  useEffect(() => {}, [
    animalId,
    animalName,
    animalAge,
    animalGender,
    animalBreed,
  ]);

  useEffect(() => {
    fetchCenterData();
  }, [fetchCenterData]);

  useEffect(() => {}, [
    centerId,
    centerName,
    centerAddress,
    centerPhone,
    centerEmail,
  ]);

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
                  {/* 동물 데이터의 이름과 나이 출력 */}
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
                  <AnimalInfoContainer>
                    <Card.Text>보호소 ID : {centerId}</Card.Text>
                    <Card.Text>보호소 명 : {centerName}</Card.Text>
                    <Card.Text>보호소 주소 : {centerAddress}</Card.Text>
                    <Card.Text>보호소 번호 : {centerPhone}</Card.Text>
                    <Card.Text>이메일 : {centerEmail}</Card.Text>
                  </AnimalInfoContainer>
                  <CenterList></CenterList>
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
              {/* 이미지는 보호소 - 동물 등록 - 동물 이미지 업로드 - 업로드된 이미지 DB - animalImg 추가해주기 && animalImg를 DB에 photoURL로 바인딩 */}
              <img
                className="h-28 m-5 md-3"
                src="https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg"
                alt=""
              />
              <AnimalInfoContainer>
                {/* <Card.Text>동물ID : {animalId}</Card.Text> */}
                <Card.Text>이름 : {animalName}</Card.Text>
                <Card.Text>나이 : {animalAge}</Card.Text>
                <Card.Text>성별 : {animalGender}</Card.Text>
                <Card.Text>종 : {animalBreed}</Card.Text>
              </AnimalInfoContainer>

              {/* <Card.Text>들어온 날짜 : {enterDate}</Card.Text> */}
            </Box>

            {/* Bottom Left */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default StreamingPage;
