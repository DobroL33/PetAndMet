import { useState, useEffect } from "react";
import {Container, Button, Grid, Typography,
        Select, MenuItem, FormControlLabel, Radio, RadioGroup, }from "@mui/material"
import kakaopay from "images/kakaopay.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useRef } from "react";
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import { useAccessToken } from "hooks/useAccessToken";


function Charge() {
  const [userMileage, setUserMileage] = useState(0);
  // const [selectedMoney, setSelectedMoney] = useState(0);
  const options = [5000, 10000, 15000, 20000, 50000];

  const theme = createTheme({
    typography: {
      fontSize: 20, // 전체 Typography의 fontSize를 24px로 설정합니다.
    },
  });

  const { accessToken, userUuid } = useAccessToken();
  const [selectedOption, setSelectedOption] = useState<number>(options[0]);
  const userNameRef = useRef<HTMLInputElement>(null); // userNameRef 추가

  const handleOptionChange = (value: number) => {
    setSelectedOption(value);
  };

  const handleChargeClick = () => {
    const IMP = (window as any).IMP;
    IMP.init("imp02430511");

    IMP.request_pay(
      {
        pg: "kakao",
        pay_method: "kakaopay",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명 : 주문명 설정",
        mileage: selectedOption,
        buyer_email: "dobrolee26@gmail.com",
        buyer_name: "구매자이름",
        buyer_tel: "010-4604-9647",
        buyer_addr: "대전 광역시 동구",
        buyer_postcode: "123-456",
      },
      (rsp: any) => {
        if (rsp.success) {
          axios
            .post(
              `${domain}/mileage/charge`,
              {
                uuid: userUuid,
                mileage: selectedOption,
              },
              {
                headers: {
                  Authorization: `${accessToken}`,
                },
              }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("결제에 실패하였습니다. 에러내용:", rsp.error_msg);
        }
        console.log(`"${domain}/mileage/charge"`);
      }
    );
  };

  // 마일리지 확인
  useEffect(() => {
    const url = `${domain}/user/mileage/${userUuid}`;
    axios
      .get(url, {
        headers: {
          Authorization: `${accessToken}`, // Header 형태 확인
        },
      })
      .then((response) => {
        const mileage = response.data.response.mileage; // 응답 형태 확인
        if (mileage !== userMileage) {
          setUserMileage(mileage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userUuid, accessToken, userMileage]);

  return (
    <div>
      <div style={{ padding: 20 }}>
        <Typography
          variant="h4"
          style={{ color: "#E8AF7D", fontWeight: "bold", marginBottom: 5 }}
        >
          충전하기
        </Typography>
      </div>
      <ThemeProvider theme={theme}>
        <Container sx={{backgroundColor: "#FFE8A3", width:'80%', borderRadius : 10 }}>
            <Grid container alignItems="center" padding={2}>
              <Grid item xs={3}  sx={{bgcolor:'#FFD396', borderRadius : 3}}>             
                  <Typography variant="body1" sx={{mb: 2.5}}>보유 포인트</Typography>
                  <Typography variant="body2">{userMileage} 포인트</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography sx={{fontSize : 32}}>
                  +
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{bgcolor:'#FFD396', borderRadius : 3}}>             
                  <Typography variant="body1" sx={{mb:2.5}}>충전 포인트</Typography>
                  <Typography variant="body2">
                    {selectedOption} 포인트
                  </Typography>
              </Grid>
              <Grid item xs={1.5}>
              <Typography sx={{fontSize : 32}}>
                  =
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{bgcolor:'#FFD396', borderRadius : 3}}>
              
                  <Typography variant="body1" sx={{mb: 2.5}}>총 포인트</Typography>
                  <Typography variant="body2">
                    {selectedOption + userMileage} 포인트
                  </Typography>
              </Grid>
          </Grid>
              <Grid container spacing={2} >
                <Grid item xs ={1.5}></Grid>
                <Grid item xs={4.5} >
                  <RadioGroup
                      value={selectedOption}
                      onChange={(e) => handleOptionChange(parseInt(e.target.value))}
                      >
                      {options.map((option) => (
                        <FormControlLabel
                        sx={{justifyContent:'center'}}
                        key={option}
                        value={option}
                          control={<Radio sx={{ fontSize: '12px' }} />}
                          label={<Typography sx={{ fontSize: '12px' }}>{option} 포인트</Typography>}
                          />
                          ))}
                  </RadioGroup>
                </Grid>
                <Grid item xs={4.5}>
                  <img
                    src={kakaopay}
                    alt="Kakao Pay"
                    style={{ width: "45%", borderRadius: 10, margin: 'auto' }}
                  />
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#FFD396",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    marginTop: "50px",
                    color : 'black',
                  }}
                  onClick={handleChargeClick}
                >
                  충전하기
                </Button> 
            </Grid>
            <Grid item xs ={1.5}></Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Charge;
export {};
