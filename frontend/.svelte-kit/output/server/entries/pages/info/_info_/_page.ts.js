import { p as parsePayload } from "../../../../chunks/parse.js";
import { r as redirect } from "../../../../chunks/index2.js";
let load = async function load2({ params, parent }) {
  let layoutReturn = await parent();
  const token = layoutReturn.access_token;
  const API = layoutReturn.API;
  let id = params.info ? parseInt(params.info) : null;
  if (id === null)
    throw new Error("No info specified");
  if (token == null || token == "")
    throw redirect(307, "/");
  let payload = parsePayload(token);
  let permission = payload.permission;
  let real_id = payload.user_id;
  if (real_id != id) {
    if (permission != "admin" && permission != "super_admin") {
      throw redirect(307, "/");
    }
  }
  let userInfo;
  if (real_id == id) {
    let response = await fetch(`${API}/users/current/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    userInfo = await response.json();
  } else {
    let respond = await fetch(`${API}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    userInfo = await respond.json();
  }
  if (real_id != id && (permission == "admin" && userInfo.permission == "super_admin" || permission == "admin" && userInfo.permission == "admin")) {
    throw redirect(307, "/");
  }
  return {
    real_id,
    real_permission: permission,
    userInfo,
    API
  };
};
export {
  load
};
