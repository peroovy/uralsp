import { redirect } from '@sveltejs/kit';
import { parsePayload } from '$lib/parse';
import { browser } from '$app/environment';

//@ts-ignore
export async function load({ params }) {
	if (!browser) return;
	const API = import.meta.env.VITE_API_URL;

	let searchQueries = params.q;
	let adminId = params.adminId;
	// @ts-ignore
	let token = localStorage.getItem('access_token');
	if (token == null) {
		throw redirect(301, '/');
	}
	let payload = parsePayload(token);
	let real_id = payload.user_id;
	let permission = payload.permission;
	// if the user is not the same as the participant, redirect to the home page
	if (real_id != adminId) {
		throw redirect(301, '/');
	}
	// if the user is not an admin, redirect to the home page
	if (permission != 'admin' && permission != 'super_admin') {
		throw redirect(301, '/');
	}
	// Request data from the server...
	let usersOrErr;
	await fetch(`${API}/users?${searchQueries}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			usersOrErr = data;
		});
	return {
		adminId,
		searchQueries: params.q,
		usersOrErr,
		token,
		real_id,
		API
	};
}
