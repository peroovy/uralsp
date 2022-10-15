import { p as parsePayload } from "../../../../../chunks/parse.js";
import { r as redirect } from "../../../../../chunks/index2.js";
let load = async function load2({ params, parent, fetch }) {
  if (params.application === void 0)
    throw Error("Application id is not defined");
  redirect(307, "/");
  const contestId = parseInt(params.application);
  if (isNaN(contestId))
    return redirect(307, "/");
  let parentLayout = await parent();
  let { access_token, API } = parentLayout;
  const accessToken = access_token;
  if (accessToken == null)
    redirect(307, "/");
  let payload = parsePayload(accessToken);
  const userId = payload.user_id;
  const permissions = payload.permission;
  const contest = await fetch(`${API}/competitions/${contestId}`);
  const oldRequests = await fetch(`${API}/users/current/requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (oldRequests.status != 200 || contest.status != 200) {
    redirect(307, "/");
  }
  const oldRequestsJson = await oldRequests.json();
  const contestJson = await contest.json();
  const now = Date.now();
  const contestStart = Date.parse(contestJson.registration_start);
  const contestEnd = Date.parse(contestJson.registration_end);
  if (now < contestStart || now > contestEnd) {
    alert("The contest is not open for registration");
    return redirect(307, "/");
  }
  const oldRequest = oldRequestsJson.find(
    (request) => request.owner == contestId || request.participants.includes(userId)
  );
  return {
    contest: contestJson,
    oldRequest,
    userId,
    accessToken,
    permissions,
    API
  };
};
export {
  load
};
