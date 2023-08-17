import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import kakaopay from "images/kakaopay.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useRef } from "react";
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import { useAccessToken } from "hooks/useAccessToken";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Charge() {
  const [userMileage, setUserMileage] = useState(0);
  const [selectedMoney, setSelectedMoney] = useState(0);
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
        mileage: selectedMoney,
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
                mileage: selectedMoney,
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
          <div
            style={{
              backgroundColor: "#FFE8A3",
              borderRadius: 20,
              paddingTop: 20,
              width: "auto",
            }}
          >
            <Grid container direction="column" spacing={3} alignItems="center">
              <Grid item>
                <div
                  style={{
                    backgroundColor: "#FFA629",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Typography variant="body1">보유 포인트</Typography>
                  <Typography variant="body2">{userMileage}원</Typography>
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    backgroundColor: "#FFA629",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Typography variant="body1">충전 포인트</Typography>
                  <Select
                    value={selectedOption}
                    onChange={(e) =>
                      handleOptionChange(e.target.value as number)
                    }
                    displayEmpty
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}원
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    backgroundColor: "#FFA629",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Typography variant="body1">총 포인트</Typography>
                  <Typography variant="body2">
                    {selectedOption + userMileage}원
                  </Typography>
                </div>
              </Grid>
              <Grid
                item
                container
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Grid item xs={3}>
                  <img
                    src={kakaopay}
                    alt="Kakao Pay"
                    style={{ width: "25%", borderRadius: 30 }}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ width: "100%", marginTop: 20 }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#FFA629",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    marginBottom: "30px",
                  }}
                  onClick={handleChargeClick}
                >
                  결제하기
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Charge;
export {};
