
import { browser } from '$app/environment';
import { parsePayload } from '$lib/parse';
import type { Requests } from '$lib/types';
// @ts-ignore
export async function load({ params }) {
	const contestId = parseInt(params.application);
	if (isNaN(contestId)) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: 301,
			return: '/'
		};
	}
	if (!browser) return;
	const API = import.meta.env.VITE_API_URL;
	// Check the access token in the local storage
	const accessToken = localStorage.getItem('access_token');
	if (accessToken == null) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: 300,
			redirect: '/'
		};
	}
	let payload = parsePayload(accessToken);
	const userId = payload.user_id;
	const permissions = payload.permission;
	// Get the competition info
	const contest = await fetch(`${API}/competitions/${contestId}`);
	// Get the user old requests
	const oldRequests = await fetch(`${API}/users/current/requests`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
	if (oldRequests.status != 200 || contest.status != 200) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: 300,
			redirect: '/'
		};
	}
	const oldRequestsJson = await oldRequests.json();
	const contestJson = await contest.json();
	// check if the contest is overdue or upcoming
	const now = Date.now();
	const contestStart = Date.parse(contestJson.registration_start);
	const contestEnd = Date.parse(contestJson.registration_end);

	if (now < contestStart || now > contestEnd) {
		alert('The contest is not open for registration');
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: 300,
			redirect: '/'
		};
	}
	// Check if the user has already made a request for this competition
	const oldRequest = (oldRequestsJson as Requests).find((request) => request.owner == contestId || request.participants.includes(userId));

	return {
		contest: contestJson,
		oldRequest,
		userId,
		accessToken,
		permissions,
		API
	};
}
