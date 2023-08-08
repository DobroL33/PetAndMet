export function setAccessTokenToLocalStorage(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

// 쿠키로 하는 것도 나중에 바꿔야 한다고 하니 지금은 그냥 토큰 직접 넣어주다가, 나중에 방식 업데이트 해주자
export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2ZDUyNjI0My0yNGM0LTRhMTUtODYwMS0wMDc0MzBlNThlOWIiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkxNDgzMDQ3fQ.tPA5U4qj5gBt3JuV6NUqRUzwcp9cbYavu3E-OABA3uMEIHROnB3l6eGu2rzrFDfHYhpfxTNsJd34vCTGtX7cIg";
  console.log("useAuth 에서의 액세스 토큰은 " + accessToken);
  return accessToken ? accessToken : null;
}
