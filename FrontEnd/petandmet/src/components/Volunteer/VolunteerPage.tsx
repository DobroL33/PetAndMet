import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import newLogo from "images/new_logo.jpg";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CenterDataList from "hooks/Center/CenterMutation";
import { useNavigate } from "react-router-dom";
import { domain } from "hooks/customQueryClient";
import { useCenterData } from "hooks/Center/useCenterData";
import { useCenterStore } from "hooks/Center/CenterMutation";

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

function CustomCard({
  uuid,
  name,
  address,
  phone,
  email,
}: {
  uuid: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}) {
  const navigate = useNavigate();
  const { setCenterData, centerData } = useCenterData(); // useCenterData에서 setCenterData를 가져옵니다.
  console.log("발룬티어 centerData");
  console.log(centerData);

  const handleCardClick = () => {
    console.log(`선택한 보호소의 UUID: ${uuid}`);
    // 선택한 uuid로 centerData의 상태를 업데이트합니다.
    setCenterData({ uuid, name, address, phone, email });
    navigate(`/walk`);
  };
  return (
    <Card sx={{ maxWidth: 310 }} onClick={handleCardClick}>
      <CardMedia component="img" height="60" image={newLogo} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
      <CardActions>{/* Add your button actions here */}</CardActions>
      <CustomButton>산책 신청하기</CustomButton>
      <CustomButton>봉사 신청하기</CustomButton>
    </Card>
  );
}

function VolunteerPage() {
  // 여기있는 데이터를 DB에서 받아와서 쓸 거임
  const [center, setCenter] = useState<any[]>([]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(center.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const centersData = await CenterDataList();
      setCenter(centersData);
    };
    fetchData();
  }, []);

  const [data, setData] = useState(null);

  const response = CenterDataList();
  console.log("센터는 response");
  console.log(response);

  return (
    <>
      <CssBaseline />
      <h4 className="text-3xl text-yellow-500 font-extrabold my-9">봉사활동</h4>
      <Container
        sx={{
          mt: 5,
          display: "flex",
          bgcolor: "#FFE8A3",
          height: "auto",
          width: "60%",
          borderRadius: 5,
        }}
      >
        <Container
          sx={{
            my: 5,
            mx: 3,
            display: "",
            bgcolor: "#ffffff",
            height: "90%",
            width: "98%",
            borderRadius: 5,
          }}
        >
          <Box sx={{ width: "100%" }} marginY={3} marginLeft={3}>
            <Grid container rowSpacing={5}>
              {center
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((centerItem) => (
                  <Grid key={centerItem.uuid} item xs={5} md={6}>
                    <CustomCard
                      uuid={centerItem.uuid}
                      name={centerItem.name || "No Name"}
                      address={centerItem.address || "No Address"}
                      phone={centerItem.phone || "No Address"}
                      email={centerItem.email || "No Address"}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          {/* Pagination buttons */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                sx={{ margin: "0.5rem" }}
                variant={currentPage === index ? "contained" : "outlined"}
                color="primary"
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default VolunteerPage;
