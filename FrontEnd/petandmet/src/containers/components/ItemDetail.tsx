import {
  Container,
  Grid,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import pay from "images/kakaopay.png";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemDelete } from "hooks/Center/CenterItem";
import { useAccessToken } from "hooks/useAccessToken";
import { useCenterData } from "hooks/Center/useCenterData";
import { domain } from "hooks/customQueryClient";
import useAnimal from "hooks/Animal/useAnimal";
import { useAnimalList } from "hooks/Animal/useAnimalList";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface CenterItem {
  center_item_id: number;
  center_uuid: string;
  item_name: string;
  item_target_price: number;
  item_url: string | null;
}

function ItemDetail() {
  // 동물 정보 불러오기 및 선택
  const { animalData } = useAnimal();
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (animal: any) => {
    setSelectedAnimal(animal);
    handleClose();
  };

  const { data, refetch } = useAnimalList();
  const num = 15;
  useEffect(() => {
    refetch();
  }, [num]);

  const { setAnimalData } = useAnimal();
  const AnimalData = useAnimal();

  useEffect(() => {
    if (selectedAnimal) {
      setAnimalData(selectedAnimal);
    }
  }, [selectedAnimal]);

  // 도네 성공 여부 측정
  const [donationSuccessOpen, setDonationSuccessOpen] = useState(false);

  // 센터 및 센터 아이템 불러오기
  const { centerData } = useCenterData();
  const location = useLocation();
  const item = location.state as CenterItem;

  // 센터 아이템에 후원된 금액 ( 특정 물건에 얼마나 후원 됐는지)
  const [currentPrice, setCurrentPrice] = useState(0); // current_price 상태 변수 설정

  // 유저가 보유한 마일리지
  const [userMileage, setUserMileage] = useState(0);
  const prevMileage = useRef(userMileage);

  // uuid, 토큰 사용
  const { accessToken, centerUuid, userUuid } = useAccessToken();

  // css, 경로 이동
  const theme = useTheme(); // 테마 가져오기
  const navigate = useNavigate();

  // url 요청 보낼 때 필요한 요소들
  const user_uuid = userUuid;
  const center_uuid = item.center_uuid;
  const item_id = item.center_item_id;
  const itemTargetPrice = item.item_target_price;

  const goToBack = () => {
    navigate(-1);
  };
  const goToUpdate = () => {
    navigate("/admin/item/update/", { state: item });
  };
  const goToDelete = async () => {
    await ItemDelete(item.center_item_id, accessToken);
    goToBack();
  };

  const [donation, setDonation] = useState(0); // donation 상태 변수 설정
  // 1000원, 5000원, 10000원 옆에 +를 누를 때 상호작용
  const handleIncrement = (amount: number) => {
    setDonation(donation + amount);
  };
  // 취소하기 버튼을 누를 때
  const handleCancel = () => {
    setDonation(0); // 취소하기 버튼 클릭 시 donation을 0으로 설정
  };

  const [alertOpen, setAlertOpen] = useState(false); // 경고 창 표시 상태 관리

  // 후원하기 버튼 클릭 이벤트
  const handleDonation = async () => {
    if (donation > userMileage) {
      setAlertOpen(true);
    } else {
      donate(); // 후원 요청 보내기
      reduceMileage(); // 마일리지 감소 요청 보내기
      setDonationSuccessOpen(true);
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
          // 가격이 변동되었을 때만 상태 업데이트
          setCurrentPrice(price);
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

  return (
    <>
      <div style={{ padding: 20 }}>
          <Typography
              variant="h4"
              style={{ color: '#FFA629', fontWeight: 'bold' }}
              >
              후원 물품 상세 정보 
          </Typography>
      </div> 

    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        width: "30%",
        backgroundColor: "#FFF9E6", // 연한 노랑색 (적절한 값을 조절하셔도 됩니다.)
        height: "auto", // 세로 길이를 auto로 설정
        borderRadius: "30px",
        overflow: "hidden", // Prevent content overflow
      }}
    >
      <Grid container spacing={2} margin={0}>
        <Grid item xs={6}>
              <Box sx={{ display: "flex", flexDirection: "column"}}>
                <Box
                  sx={{display: "flex",justifyContent: "flex-end"}}>
                  <Button
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ height: "50px" }}
                  >
                    <p className="grow">
                      어느 동물에게 후원하고 싶으신가요? {selectedAnimal?.name}
                    </p>
                  </Button>
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          {data?.response.map((animal, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => handleMenuItemClick(animal)}
                              sx={{
                                backgroundColor: index % 2 === 0 ? "warning" : "연노랑", // 짝수와 홀수 인덱스에 따라 색상 변경
                              }}
                            >
                              {animal.name}
                            </MenuItem>
                          ))}
                        </Menu>
                  </Box>
                    <Box
                      sx={{display: "flex",flexDirection: "column",alignItems: "flex-end", mt:3}}>
                      {item.item_url ? (
                        <img src={item.item_url} alt="Item" style={{ maxWidth: '100%' }} />
                      ) : (
                        <img src={pay} alt="KakaoPay" style={{ maxWidth: '100%' }} />
                      )}
                    </Box>
                    <Grid item>
                        <Typography sx={{my : 1, fontSize: '8px'}}>
                           물품 : {item.item_name}
                        </Typography>
                        <Typography sx={{ fontSize: '8px'}}>
                           목표 가격 : {item.item_target_price}
                        </Typography>
                </Grid>
              </Box>    
        </Grid>
        <Grid item xs={6}>
                  <Box>
                    <Typography sx={{mt : 1,mb : 10}}>
                      후원 금액
                    </Typography>
                  </Box>
                        {[1000, 5000, 10000].map((amount) => (
                          <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            marginBottom: "10px",
                            flexWrap :'nowrap'
                          }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "16px" }}
                              color="text.secondary"
                              >{`${amount.toLocaleString()}원`}</Typography>
                            <Button
                              variant="contained"
                              onClick={() => handleIncrement(amount)}
                              sx={{
                                marginX: "10px",
                                fontSize: "18px",
                                backgroundColor: "white",
                                border : '2px solid black',
                                borderRadius: "10px",
                                padding: "2px 4px", // 패딩을 조절하여 크기 조정
                                "&:hover": {
                                  backgroundColor: "rgb(248, 199, 158)" // hover 시 배경색 변경
                                }
                              }}
                              >
                              <Typography sx={{color : '#FFA629', fontWeight :'bold'}}>+</Typography>
                            </Button>
                          </Box>
                        ))}
            </Grid>
        </Grid>
            <Box
              sx={{ display: "flex",flexDirection: "column", margin: "5px"}}>
              <Typography variant="h6"color="text.secondary"sx={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
                {`기부하시려는 금액은 \n ${donation.toLocaleString()}원 입니다.`}
              </Typography>
              <LinearProgress
                variant="determinate"
                color="warning"
                value={progress}
                sx={{
                  height: "40px",
                  borderRadius: "15px",
                  marginTop: "20px",
                }}
              />
              <Typography
                variant="body2"
                color={theme.palette.warning.main}
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
                  marginBottom: 3,
                }}
              >
                {centerUuid === center_uuid ? (
                  <>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{
                        fontSize: "20px",
                        borderRadius: "10px",
                        backgroundColor: theme.palette.warning.main,
                        fontWeight: "bold",
                        marginRight: "10px"
                      }}
                      onClick={goToUpdate}
                    >
                      수정하기
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={goToDelete}
                      sx={{
                        fontSize: "20px",
                        borderRadius: "10px",
                        marginRight: "10px"
                      }}
                    >
                      삭제하기
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{
                        fontSize: "20px",
                        borderRadius: "10px",
                        backgroundColor: theme.palette.warning.main,
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                      onClick={handleDonation}
                    >
                      후원하기
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCancel}
                      sx={{
                        fontSize: "20px",
                        borderRadius: "10px",
                        marginRight: "10px", 
                      }}
                    >
                      취소하기
                    </Button>
                  </>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={goToBack}
                  sx={{
                    fontSize: "20px",
                    borderRadius: "10px",
                  }}
                >
                  돌아가기
                </Button>
                {/* Alert for insufficient funds */}
                <Dialog
                  open={alertOpen}
                  onClose={() => setAlertOpen(false)}
                  sx={{ borderRadius: "30px", minWidth: "700px" }}
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
                  </DialogTitle>
                  <DialogContent
                    sx={{ backgroundColor: "#F8D260", minWidth: "400px" }}
                  >
                    <Typography sx={{ fontSize: "20px" }} color="gray">
                      갖고 계신 포인트가 충분하지 않습니다.<br></br>
                      충전 하시겠습니까?<br></br>[ 현재{" "}
                      {userMileage.toLocaleString()}
                      포인트 ]
                    </Typography>
                  </DialogContent>
                  <DialogActions sx={{ backgroundColor: "#F8D260" }}>
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

                {/* Alert for successful donation */}
                <Dialog
                  open={donationSuccessOpen} // state for this should be managed in your component
                  onClose={() => setDonationSuccessOpen(false)}
                  sx={{ borderRadius: "30px", minWidth: "700px" }}
                >
                  <DialogTitle
                    color="gray"
                    sx={{
                      backgroundColor: "#F8D260",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    후원 완료!
                  </DialogTitle>
                  <DialogContent
                    sx={{ backgroundColor: "#F8D260", minWidth: "400px" }}
                  >
                    <Typography sx={{ fontSize: "20px" }} color="gray">
                      {donation.toLocaleString()} 원 후원 완료됐습니다!
                    </Typography>
                  </DialogContent>
                  <DialogActions sx={{ backgroundColor: "#F8D260" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setDonationSuccessOpen(false)}
                      sx={{ fontSize: "20px", borderRadius: "10px" }}
                    >
                      닫기
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Box>
    </Container>
    </>
  );
}

export default ItemDetail;
export {};
