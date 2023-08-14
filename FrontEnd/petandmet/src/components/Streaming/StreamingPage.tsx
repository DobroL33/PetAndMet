import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import useAnimal from "hooks/Animal/useAnimal";
import LiveDonation from "components/Streaming/LiveComponents/Live_Donation";
import Familiarity from "./LiveComponents/Live_Familiarity";

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
  const { animalData } = useAnimal();
  const animal = animalData;

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
                ></Box>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
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
                <Familiarity></Familiarity>
              </Box>
            </Box>

            {/* Bottom Left */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default StreamingPage;
