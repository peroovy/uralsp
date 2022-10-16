// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import { parsePayload } from "$lib/parse";
import type { PageLoad } from "./$types";

export const load = async function load({ params, fetch, parent }: Parameters<PageLoad>[0]) {
  let id = parseInt(params.admin);
  if (isNaN(id)) throw redirect(307, "/");
  let layoutReturn = await parent();
  let token = layoutReturn.access_token;
  let API = layoutReturn.API;

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
