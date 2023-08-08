export function setAccessTokenToLocalStorage(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

// 쿠키로 하는 것도 나중에 바꿔야 한다고 하니 지금은 그냥 토큰 직접 넣어주다가, 나중에 방식 업데이트 해주자
export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0MzY3ZDE2MS0wMDI0LTQ4MGEtOTJjOS0yNzk2MWQyMjZhN2YiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkxNDcyNjYwfQ.2eLxjSTo53ynbAcby4UaOl1NAms8BOa0eVLNzrVUBv7YXKTnbjoGj5D3pn4NKKRjHqr4RpCtrC83Q1vv5jyvag";
  console.log("useAuth 에서의 액세스 토큰은 " + accessToken);
  return accessToken ? accessToken : null;
}
