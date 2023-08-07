// useAuth.ts

// Function to set the access token to the local storage
export function setAccessTokenToLocalStorage(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

// Function to get the access token from the local storage
export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhNzRhNGYxMi0wMGEwLTRhY2EtYjkyNi05NzY4NTMyYWUyZmUiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkxNDQ1NDAzfQ.aJuZiPW-odYVELCmSxeSyXGX3TSmmr0KIyYIO56BWHNvDV2WQSO68BIzAE6GQ6SSSEmMXT2czz-9w4KbMbcDsw";
  console.log("useAuth 에서의 액세스 토큰은 " + accessToken);
  return accessToken ? accessToken : null;
}
