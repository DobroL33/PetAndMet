// useAuth.ts

// Function to set the access token to the local storage
export function setAccessTokenToLocalStorage(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

// Function to get the access token from the local storage
export function getAccessTokenFromLocalStorage(): string | null {
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMjViMzk1Ny0wNTJkLTRjODItYTdiZS05MGVkNzJmNzdiZDAiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjkxMzg2OTM1fQ.3hoQwLsgRJHKmb2uSRw1OJGyk1NE4cfEL4uEavql-Pf2U7nTna4PQzMhritDfgcGWKZWF9NLY_v4buzBuFv7bQ";
  console.log("useAuth 에서의 액세스 토큰은 " + accessToken);
  return accessToken ? accessToken : null;
}
