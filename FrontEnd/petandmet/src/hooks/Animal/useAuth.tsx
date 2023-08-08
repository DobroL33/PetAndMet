// useAuth.ts

// Function to set the access token to the local storage
export function setAccessTokenToLocalStorage(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

// Function to get the access token from the local storage
export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5NTMwNTZlMS0wZWNmLTQ3NDYtOGFlNy1hNjJmYTg2YWZlYjciLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkxNDYyMDI4fQ.LbopDegq4yWq9v5INKAvGwU4DhaZEoW9T6QbH52aXWqj_alcefuf4y31_kMzy8BcWmfzIFnbPs_imlyPBqbzIw";
  console.log("useAuth 에서의 액세스 토큰은 " + accessToken);
  return accessToken ? accessToken : null;
}
