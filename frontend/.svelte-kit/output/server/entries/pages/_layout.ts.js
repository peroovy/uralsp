let load = async function load2({ fetch }) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let API = "http://localhost:8000";
  let token_respond = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    credentials: "include"
  });
  if (!token_respond.ok && window.location.href != "https://reg.uralsp.ru/") {
    document.cookie = "sp_rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
  }
  let res = await token_respond.json();
  let token = res.access_token;
  return {
    access_token: token,
    API
  };
};
export {
  load
};
