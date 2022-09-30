import { browser } from '$app/environment';
import { parsePayload } from '$lib/parse';
import { store_token } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
// @ts-ignore
export async function load({ params }) {
	const API = import.meta.env.VITE_API_URL;
	if(!browser) return;
	let id = params.info;
	let token: string = '';
	store_token.subscribe((value) => {token = value});
	if (token != null && token != undefined && token != '') {
		throw redirect(307, '/');
	}
	let payload = parsePayload(token);
	let permission = payload.permission;
	let real_id = payload.user_id;
	if (real_id != id) {
		if (permission != 'admin' && permission != 'super_admin') {
			throw redirect(307, '/');
		}
	}
	let userInfo;
	if (real_id == id) {
		let response = await fetch(`${API}/users/current/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});
		userInfo = await response.json();
	} else {
		let respond = await fetch(`${API}/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
		userInfo = await respond.json();
	}
	if (
		real_id != id &&
		((permission == 'admin' && userInfo.permission == 'super_admin') ||
			(permission == 'admin' && userInfo.permission == 'admin'))
	) {
		throw redirect(307, '/');
	}
	return {
		real_id,
		real_permission: permission,
		userInfo,
	};
}
