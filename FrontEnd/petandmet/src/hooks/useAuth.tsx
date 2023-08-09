export function setAccessTokenToLocalStorage(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

// 쿠키로 하는 것도 나중에 바꿔야 한다고 하니 지금은 그냥 토큰 직접 넣어주다가, 나중에 방식 업데이트 해주자
export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNzY5NWJlMS0zZjg4LTQ4NjItOWYyMS0xMzdhMGE2ODM3M2IiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkxNTY2MjA1fQ.v2RIGFTTxdI2hkvPPn2t_doTKhMiP-pmDfK-2MBt5agubmShTLv4_JGtp2Cw0MC6zynARoda3Qaip6Fvb4Kztw";
  // console.log("useAuth 에서의 액세스 토큰은 " + accessToken);
  return accessToken ? accessToken : null;
}
