import { parsePayload } from '$lib/parse';
import { redirect, type Load } from '@sveltejs/kit';

export let load: Load = async function load({ params, parent }) {
	
	let parentLayout = await parent();
	let { access_token, API } = parentLayout;

	let id = params.participant? parseInt(params.participant): null;
	if(id == null) throw new Error('participant id is null');

	let token = access_token;
	if (token == null) {
		throw redirect(307, "/");
	}
	let payload = parsePayload(token);
	let real_id = payload.user_id;

	// if the user is not the same as the participant, redirect to the home page
	if (real_id != id) {
		throw redirect(307, "/");
	}

	let userData = await fetch(`${API}/users/current/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	let Started_competitions = await fetch(`${API}/competitions?started=true`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	let requests = await fetch(`${API}/users/current/requests`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	}).then((res) => res.json());
	
	let userInfo = await userData.json();
	let started_competitions = await Started_competitions.json();
	return {
		userInfo,
		started_competitions,
		requests,
		API
	};
}
