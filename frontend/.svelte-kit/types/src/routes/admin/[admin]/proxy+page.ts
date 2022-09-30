// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import { parsePayload } from "$lib/parse";
import { browser } from "$app/environment";
import type { PageLoad } from "./$types";

const API = import.meta.env.VITE_API_URL;

interface TokenResponse {
  token_type: "bearer";
  access_token: string;
  expires_in: number;
}

export const load = async function load({ params, fetch, parent }: Parameters<PageLoad>[0]) {
// 	await parent();
//   const res = await fetch(`${API}/auth/refresh`);
//   const token: TokenResponse = await res.json();
//   if (res.ok) {
// }
// tokenStore.set(token.access_token);


  if (!browser) return;
  let id = params.admin;
  // @ts-ignore
  let token = localStorage.getItem("access_token");
  if (token == null) {
throw redirect(307, "/");
  }
  let payload = parsePayload(token);
  let real_id = payload.user_id;
  let permission = payload.permission;
  // if the user is not the same as the participant, redirect to the home page
  if (real_id != id) {
    throw redirect(307, "/");
  }

  let userData = await fetch(`${API}/users/current/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  let competitions = await fetch(`${API}/competitions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let userInfo = await userData.json();
  let competitionsInfo = await competitions.json();
  return {
    userInfo,
    competitionsInfo,
    permission,
    real_id,
    access_token: token,
    API,
  };
};
