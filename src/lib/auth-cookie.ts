const AUTH_COOKIE = "alom_token";

export function setAuthCookie(token: string) {
  document.cookie = `${AUTH_COOKIE}=${token}; path=/`;
}

export function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
}
