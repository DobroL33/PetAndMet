import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import kakaopay from "images/kakaopay.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useRef } from "react";
import axios from "axios";
import KakaoPayment from "./KakaoCharge";

const options = [5000, 10000, 15000, 20000, 50000];

const theme = createTheme({
  typography: {
    fontSize: 20, // 전체 Typography의 fontSize를 24px로 설정합니다.
  },
});

function Charge() {
  const [selectedOption, setSelectedOption] = useState<number>(options[0]);
  const userNameRef = useRef<HTMLInputElement>(null); // userNameRef 추가

  const handleOptionChange = (value: number) => {
    setSelectedOption(value);
  };

  const handleChargeClick = () => {
    const IMP = (window as any).IMP;
    IMP.init("imp02430511");
    console.log(userUuid);
    console.log(selectedOption);

    IMP.request_pay(
      {
        pg: "kakao",
        pay_method: "kakaopay",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명 : 주문명 설정",
        amount: selectedOption,
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
          style={{ color: "#FFA629", fontWeight: "bold" }}
        >
          충전하기
        </Typography>
      </div>
      <ThemeProvider theme={theme}>
        <Container>
          <div style={{ backgroundColor: "#FFE8A3", borderRadius: 20 }}>
            <Container style={{ fontSize: "3rem" }}>
              <Grid container style={{ padding: 10, color: "white" }}>
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{ backgroundColor: "#FFA629", borderRadius: 5 }}
                >
                  <Typography variant="body1">보유 포인트</Typography>
                  <Typography variant="body2">10000원</Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  md={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  +
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={3}
                  style={{ backgroundColor: "#FFA629", borderRadius: 5 }}
                >
                  <Typography variant="body1">충전 포인트</Typography>
                  <Typography variant="body2">{selectedOption}원</Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  md={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  =
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  style={{ backgroundColor: "#FFA629", borderRadius: 5 }}
                >
                  <Typography variant="body1">총 포인트</Typography>
                  <Typography variant="body2">
                    {selectedOption + 10000}원
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <Container>
              <Grid
                container
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Grid item xs={6} md={6}>
                  {options.map((option) => (
                    <div key={option}>
                      <label>
                        <input
                          type="radio"
                          value={option}
                          checked={selectedOption === option}
                          onChange={() => handleOptionChange(option)}
                        />
                        {option}원
                      </label>
                    </div>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={kakaopay}
                    alt=""
                    style={{ width: "35%", borderRadius: 30 }}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
        </Container>
        <Button
          variant="contained"
          style={{ backgroundColor: "#FFA629", marginTop: "10px" }}
        >
          결제하기
        </Button>
      </ThemeProvider>
      <KakaoPayment></KakaoPayment>
    </div>
  );
}

export default Charge;
export {};
