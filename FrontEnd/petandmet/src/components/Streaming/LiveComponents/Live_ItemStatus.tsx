import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { domain } from "hooks/customQueryClient";
import useAnimal from "hooks/Animal/useAnimal";
import { useAccessToken } from "hooks/useAccessToken";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// material css
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Live_ItemStatusProps {
  itemTargetPrice: number;
  centerItemId: number;
}

const Live_ItemStatus: React.FC<Live_ItemStatusProps> = ({
  itemTargetPrice,
  centerItemId,
}) => {
  const { animalData } = useAnimal();
  const center_uuid = animalData.center_uuid;
  const item_id = centerItemId;
  const [currentPrice, setCurrentPrice] = useState(0); // current_price 상태 변수 설정
  const [userMileage, setUserMileage] = useState(0);
  const prevMileage = useRef(userMileage);
  const { accessToken, userUuid } = useAccessToken();
  const theme = useTheme(); // 테마 가져오기

  const [donation, setDonation] = useState(0); // donation 상태 변수 설정
  // 1000원, 5000원, 10000원 옆에 +를 누를 때 상호작용
  const handleIncrement = (amount: number) => {
    setDonation(donation + amount);
  };
  // 취소하기 버튼을 누를 때
  const handleCancel = () => {
    setDonation(0); // 취소하기 버튼 클릭 시 donation을 0으로 설정
  };

  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 가져오기
  const [alertOpen, setAlertOpen] = useState(false); // 경고 창 표시 상태 관리

  // 후원하기 버튼 클릭 이벤트
  const handleDonation = () => {
    if (donation > userMileage) {
      // 후원 금액이 사용자 마일리지보다 많으면 경고 창 표시
      setAlertOpen(true);
    } else {
      donate(); // 후원 요청 보내기
      reduceMileage(); // 마일리지 감소 요청 보내기
    }
  };

  // 충전 페이지로 이동하는 함수
  const goToChargePage = () => {
    navigate("/donate/charge");
  };

  // 설정 가격 가져오기
  useEffect(() => {
    const fetchData = () => {
      const url = `${domain}/donate/centeritem?uuid=${center_uuid}&id=${item_id}`;
      axios
        .get(url, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((response) => {
          const price = response.data.response.price;
          if (price !== currentPrice) {
            // 가격이 변동되었을 때만 상태 업데이트
            setCurrentPrice(price);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData(); // 컴포넌트가 마운트 될 때 바로 실행

    const intervalId = setInterval(fetchData, 5000); // 그 후 5초마다 fetchData 호출

    return () => clearInterval(intervalId); // 컴포넌트 unmount 시에 타이머 제거
  }, [center_uuid, currentPrice, item_id]);

  // 지불 가능한지 확인하기 위한 마일리지 체크
  useEffect(() => {
    prevMileage.current = userMileage; // 처음 실행 시 prevMileage에 현재 마일리지 저장

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
  }, [userUuid, center_uuid, item_id, accessToken, userMileage]);

  // 후원하기 메서드
  const donate = () => {
    const payload = {
      user_uuid: userUuid,
      center_item_id: item_id,
      center_uuid: center_uuid,
      donate_price: donation, // 현재 donation 상태값
      animal_uuid: animalData.animal_uuid,
    };

    axios
      .post(`${domain}/donate/center`, payload, {
        headers: { Authorization: `${accessToken}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 마일리지 감소 메서드
  const reduceMileage = () => {
    const payload = {
      uuid: userUuid, // user_uuid
      mileage: donation, // 현재 donation 상태값
    };

    axios
      .post(`${domain}/mileage/reduce`, payload, {
        headers: { Authorization: `${accessToken}` },
      })
      .then((response) => {
        console.log(response);
        // 성공 후 처리
      })
      .catch((error) => {
        console.error(error);
        // 에러 처리
      });
  };
  // 진행률 계산
  const progress =
    !isNaN(currentPrice) && !isNaN(itemTargetPrice) && itemTargetPrice !== 0
      ? Math.min((currentPrice / itemTargetPrice) * 100, 100)
      : 0;

  // 마일리지 조회 => 지불 가능한지 조회하기

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {[1000, 5000, 10000].map((amount) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                marginBottom: "10px",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "25px" }}
                color="text.secondary"
              >{`${amount.toLocaleString()}원`}</Typography>
              <Button
                variant="contained"
                onClick={() => handleIncrement(amount)}
                sx={{
                  marginX: "10px",
                  fontSize: "20px",
                  backgroundColor: "orange",
                  borderRadius: "10px",
                }}
              >
                +
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "5px",
        }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}
        >
          {`기부하시려는 금액은 \n ${donation.toLocaleString()}원 입니다.`}
        </Typography>
        <LinearProgress
          variant="determinate"
          color="warning"
          value={progress}
          sx={{
            height: "40px", // 높이 조정
            borderRadius: "15px", // 둥근 모서리 설정
            marginTop: "20px", // 상단 마진 설정
          }}
        />
        {/* progress 값을 value로 전달 */}
        <Typography
          variant="body2"
          color={theme.palette.warning.main} // 주황색 적용
          sx={{
            marginTop: "10px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >{`후원 물품 구매까지 ${Math.round(progress)}%`}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="warning"
            sx={{
              fontSize: "20px",
              borderRadius: "10px",
              backgroundColor: theme.palette.warning.main,
              fontWeight: "bold",
            }}
            onClick={handleDonation} // 후원하기 버튼 클릭 이벤트 처리 수정
          >
            후원하기
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel} // 이 버튼을 클릭하면 handleCancel 함수 호출
            sx={{ fontSize: "20px", borderRadius: "10px" }}
          >
            취소하기
          </Button>
          {/* Alert를 모달 형태로 표시 */}
          <Dialog
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            sx={{ borderRadius: "30px", minWidth: "700px" }} // borderRadius 설정
          >
            <DialogTitle
              color="gray"
              sx={{
                backgroundColor: "#F8D260",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              포인트 부족 !
            </DialogTitle>{" "}
            {/* 배경색 설정 */}
            <DialogContent
              sx={{ backgroundColor: "#F8D260", minWidth: "400px" }}
            >
              {" "}
              {/* 배경색과 크기 설정 */}
              <Typography sx={{ fontSize: "20px" }} color="gray">
                갖고 계신 포인트가 충분하지 않습니다.<br></br>
                충전 하시겠습니까?<br></br>[ 현재 {userMileage.toLocaleString()}
                포인트 ]
              </Typography>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#F8D260" }}>
              {" "}
              {/* 배경색 설정 */}
              <Button
                variant="contained"
                color="warning"
                onClick={goToChargePage}
                sx={{
                  fontSize: "20px",
                  borderRadius: "10px",
                  backgroundColor: theme.palette.warning.main,
                  fontWeight: "bold",
                }}
              >
                충전하러 가기
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setAlertOpen(false)}
                sx={{ fontSize: "20px", borderRadius: "10px" }}
              >
                취소하기
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}></Box>
    </Box>
  );
};

export default Live_ItemStatus; // export 부분을 올바르게 수정
