import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import newLogo from "../../images/new_logo.jpg";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CustomCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="80" image={newLogo} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          보호소 이름
        </Typography>
        <Typography variant="body2" color="text.secondary">
          보호소 관련 설명입니다.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">산책 신청하기</Button>
        <Button size="small">봉사 신청하기</Button>
      </CardActions>
    </Card>
  );
}

function VolunteerPage() {
  const [center, setCenter] = useState(["A보호소", "B보호소", "C보호소"]);

  return (
    <>
      <CssBaseline />
      <h4 className="text-3xl text-yellow-500 font-extrabold my-9">봉사활동</h4>
      <Container
        sx={{
          mt: 5,
          display: "flex",
          bgcolor: "#FFE8A3",
          height: "100%",
          width: "60%",
          borderRadius: 5,
        }}
      >
        <Container
          sx={{
            mt: 5,
            display: "auto",
            bgcolor: "#ffffff",
            height: "90%",
            width: "95%",
            borderRadius: 5,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={5} md={6}>
                <CustomCard></CustomCard>
              </Grid>
              <Grid item xs={5} md={6}>
                <CustomCard></CustomCard>
              </Grid>
              <Grid item xs={5} md={6}>
                <CustomCard></CustomCard>
              </Grid>
              <Grid item xs={5} md={6}>
                <CustomCard></CustomCard>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default VolunteerPage;
