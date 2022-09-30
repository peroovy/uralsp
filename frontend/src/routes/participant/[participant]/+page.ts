
import { parsePayload } from '$lib/parse';
import { browser } from '$app/environment';
// @ts-ignore
export async function load({ params }) {
	if (!browser) return;
	const API = import.meta.env.VITE_API_URL;

	let id = params.participant;
	// @ts-ignore
	let token = localStorage.getItem('access_token');
	if (token == null) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: 300,
			redirect: '/'
		};
	}
	let payload = parsePayload(token);
	let real_id = payload.user_id;

	// if the user is not the same as the participant, redirect to the home page
	if (real_id != id) {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: 300,
			redirect: '/'
		};
	}

	let userData = await fetch(`${API}/users/current/profile`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	let UpComming_competitions = await fetch(`${API}/competitions?opened=false`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	let Ongoing_competitions = await fetch(`${API}/competitions?opened=true`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
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
	let upComming_competitions = await UpComming_competitions.json();
	let started_competitions = await Started_competitions.json();
	let ongoing_competition = await Ongoing_competitions.json();
	return {
		userInfo,
		ongoing_competition,
		upComming_competitions,
		started_competitions,
		requests,
		API
	};
}
