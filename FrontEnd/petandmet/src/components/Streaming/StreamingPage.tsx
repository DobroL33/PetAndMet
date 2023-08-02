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
                <Box sx={{ backgroundColor: "#7b7777", flex: 1 }}>
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
                }}
              >
                <Box sx={{ backgroundColor: "#f8d260", flex: 1 }}>
                  후원할 공간입니다
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* Bottom Container */}
          <Grid item xs={12} md={3} sx={{ flexGrow: 3 }}>
            <Box
              sx={{
                backgroundColor: "#FFA629",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ backgroundColor: "#e99414", flex: 1 }}>
                개 정본디 (Bottom)
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default StreamingPage;
