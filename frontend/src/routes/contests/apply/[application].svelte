<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { parsePayload } from '$lib/parse';
	import type { Requests } from '$lib/types';
	// @ts-ignore
	export async function load({ params }) {
		const contestId = parseInt(params.application);
		if (isNaN(contestId)) {
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
			return {
				status: 300,
				redirect: '/'
			};
		}
		// Check if the user has already made a request for this competition
		const oldRequest = (oldRequestsJson as Requests).find((request) => request.owner == contestId || request.participants.includes(userId));

		return {
			props: {
				contest: contestJson,
				oldRequest,
				userId,
				accessToken,
				permissions,
				API
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { RequestsOut, UserRequest, CompetitionWithFields } from '$lib/types';
	import { sessionDuration } from '$lib/sessionDuration';
	sessionDuration();
	
	export let contest: CompetitionWithFields = {} as CompetitionWithFields,
		oldRequest: UserRequest = {} as UserRequest,
		userId: number,
		accessToken: string,
		permissions: string,
		API: string;

	let alertCont: HTMLDivElement;
	let loading: HTMLDivElement;

	let everyThingIsOk = true;
	if (Object.keys(contest).length == 0 || userId === undefined || accessToken == undefined || permissions == undefined) everyThingIsOk = false;

	$: team_name = '';

	let application: RequestsOut = {
		team_name: team_name,
		team: [],
		competition: contest.id
	};
	interface TeamMember { user_id: number; form: { field_id: string | undefined; value: string | undefined; }[]; }
	let demoField = {} as TeamMember;
	
	for (let i = 0; i < contest.persons_amount; i++) {
		application.team.push(demoField);
	}

	let requestTemplates: HTMLElement[] = [];
	function showMessage(msgTitle: string, msgbody: string): void {
		if (msgTitle === 'Success') {
			alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
										<strong>Success</strong> ${msgbody}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
		} else {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error</strong> ${msgbody}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
		}
		setTimeout(() => {
			alertCont.innerHTML = '';
		}, 2000);
	}

	let savedIndex = new Set<number>();
	function saveApp(index: number, mode = 'msg'): void {
		savedIndex.add(index);
		let applicant_id = (requestTemplates[index].children[0].children[1] as HTMLInputElement).value;
		let template = requestTemplates[index].children[1].children;
		let form = [];
		if (applicant_id == '') {
			if (mode == 'msg') showMessage('Error', 'Please enter a valid applicant ID');
			return;
		} else if (isNaN(parseInt(applicant_id))) {
			if (mode == 'msg') showMessage('Error', 'Please enter a valid applicant ID');
			return;
		}
		for (let i = 0; i < template.length; i++) {
			let fieldId = (template[i] as HTMLElement).dataset.id;
			let fieldValue = (template[i].children[1] as HTMLInputElement).value;
			let isRequired = contest.fields.find((field) => field.id == fieldId)!.is_required;
			if (isRequired && fieldValue == '') {
				alert('Please fill all the required fields');
				alertCont.style.display = 'block';
				return;
			}
			form.push({
				field_id: fieldId,
				value: fieldValue
			});
		}
		// check if the user saved this application before
		if (savedIndex.has(index)) {
			application.team[index].user_id = parseInt(applicant_id);
			application.team[index].form = form;
			if (mode == 'msg') showMessage('Success', 'Application saved successfully');
			return
		}
		if (application.team.length >= contest.persons_amount) {
			if (mode == 'msg') showMessage('Error', "You can't add more than the allowed number of participants");
			return;
		}
		application.team.push({
			user_id: parseInt(applicant_id),
			form
		});
		if (mode == 'msg') showMessage('Success', 'Application saved successfully');
	}
	async function submitRequest() {
		// Validate the application
		if (application.team.length < contest.persons_amount) {
			alert('Please add save all the applications first');
			return;
		}
		application.team_name = team_name;

		if (application.team_name === '') {
			alert('Please enter a team name');
			return;
		}
		application.team_name = team_name;
		// send the request to the server and validate the response
		const response = await fetch(`${API}/requests`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(application)
		});
		if (response.status == 200) {
			showMessage('Success', 'Your request has been sent successfully');
		} else {
			showMessage('Error', response.statusText);
		}
	}

	async function updateRequest() {
		// Validate the application
		if (application.team.length < contest.persons_amount) {
			alert('Please add save all the applications first');
			return;
		}
		application.team_name = team_name;

		if (application.team_name === '') {
			alert('Please enter a team name');
			return;
		}
		// send the request to the server and validate the response
		const response = await fetch(`${API}/requests/${oldRequest.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(application)
		});
		if (response.status == 200) {
			showMessage('Success', 'Your request has been updated successfully');
		} else {
			showMessage('Error', response.statusText);
		}
	}
	async function retreiveOldRequest() {
		// Reterive the old request and fill the form
		let old_respond = await fetch(`${API}/requests/` + oldRequest.id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		});
		if (old_respond.status == 200) {
			let old_request = await old_respond.json();
			for (let u = 0; u < contest.persons_amount; u++) {
				saveApp(u, 'silent');
				let template = requestTemplates[u].children[1].children;
				team_name = old_request.team_name;
				for (let i = 0; i < template.length; i++) {
					(requestTemplates[i].children[0].children[1] as HTMLInputElement).value = old_request.participants[i].user_id.toString();
					let fieldId = (template[i] as HTMLElement).dataset.id;
					// @ts-ignore
					let fieldValue = old_request.participants[i].form.find((field) => field.field_id == fieldId)!.value;
					(template[i].children[1] as HTMLInputElement).value = fieldValue;
				}
			}
		}
	}

	let applicationNumber = 1;
	function next() {}
	function back() {}
	onMount(() => {
		if (!everyThingIsOk) goto(base + '/');
		if (oldRequest) {
			retreiveOldRequest();
		}
		loading.style.display = 'none';
	});
</script>

<svelte:head>
	<title>App Name | {contest.name}-form</title>
</svelte:head>

<section class="container-fluid p-0 m-0 pt-5 contestForm d-flex justify-content-center align-items-start">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />

	<div class="row col-12 m-0 p-0 justify-content-center">
		<div class="card col-md-5 p-0" style="max-width: 500px">
			<nav class="navbar card-header">
				<div class="container-fluid justify-content-left">
					<div class="d-flex navbar-brand mb-0 justify-content-left align-items-center gap-3 p-3">
						<li class="fa fa-certificate" />
						{contest.name}
					</div>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#compDetails"
						aria-controls="compDetails"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="fa fa-ellipsis-v" />
					</button>
					<div class="collapse navbar-collapse" id="compDetails">
						<ul class="navbar-nav gap-2">
							<table class="table table-borderless">
								<tr>
									<td>
										<i class="fa fa-calendar" />
										<strong>Starts on:</strong>
									</td>
									<td>{new Date(Date.parse(contest.started_at)).toDateString()}</td>
								</tr>
								<tr>
									<td>
										<i class="fa fa-clock" />
										<strong>Ends in:</strong>
									</td>
									<td>
										{new Date(Date.parse(contest.registration_end) - Date.now()).getDay()} days,
										{new Date(Date.parse(contest.registration_end) - Date.now()).getHours()} hours,
										{new Date(Date.parse(contest.registration_end) - Date.now()).getMinutes()} minutes
									</td>
								</tr>
								<tr>
									<td class="d-flex justify-content-center align-items-center">
										<i class="fa fa-group" />
										<strong>Contestants:</strong>
									</td>
									<td>{contest.persons_amount}</td>
								</tr>
							</table>
						</ul>
					</div>
				</div>
			</nav>

			<div class="card-body">
				<div class="form-field mb-3">
					<label for="teamName">Team Name <span class="text-danger" style:font-size="19px">*</span></label>
					<input type="text" id="teamName" class="form-control" placeholder="Team Name" bind:value={team_name} />
				</div>
				<div class="row gap-1">
					{#each Array(contest.persons_amount) as _, i}
						<button
							class="btn mb-0 btn-light border-0 rounded-0 btn-block"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#appLicationNum{i}"
							aria-expanded="false"
							aria-controls="appLicationNum{i}"
						>
							Application Number: {i + 1}
						</button>
						<div class="collapse mt-0 multi-collapse bg-light {i == 0 ? 'show' : ''}" id="appLicationNum{i}" bind:this={requestTemplates[i]}>
							<div class="form-field mb-3">
								<label for="teamName">Applicant Id <span class="text-danger" style:font-size="19px">*</span></label>
								<input type="text" class="form-control" placeholder="Enter applicant Id ..." />
							</div>
							<div>
								{@html contest.request_template}
							</div>
							<button class="btn btn-sm btn-secondary m-2 ms-0" style="max-width: max-content;" on:click={() => saveApp(i)}>
								<i class="fas fa-save me-1" />
								Save application
							</button>
						</div>
					{/each}
				</div>
				<div class="btn-group col-12 pt-3 ">
					<!-- Update the request -->
					<div class="btn-group col-12 gap-1 d-flex justify-content-center align-items-center">
						{#if oldRequest != undefined && Object.keys(oldRequest).length > 0}
						<button class="btn btn-block btn-primary rounded-0" style="background-color: #3490dc; border-color: #3490dc" on:click={updateRequest}>
							<i class="fas fa-refresh me-1" />
							Update Application
						</button>
						{/if}
						{#if permissions === 'teacher'}
							<button class="btn btn-block btn-outline-primary rounded-0" on:click={submitRequest}>
								<i class="fas fa-plus me-1" />
								Add another Application
							</button>
						{/if}
					</div>
					{#if oldRequest === undefined && Object.keys(oldRequest).length <= 0}
						<button class="btn btn-block btn-primary rounded-0" style="background-color: #3490dc; border-color: #3490dc" on:click={submitRequest}>
							<li class="fa fa-paper-plane me-1" />
							Submit
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="alert" bind:this={alertCont} />
</section>
<div class="loading" bind:this={loading} >
	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>

<style lang="scss">
	@import '../../../lib/Assets/common.scss';

	.contestForm {
		width: 100vw;
		min-height: calc(100vh - 38px);
		align-items: center;
		background-image: $bg-color;
		@include bg;
		position: relative;
		z-index: 1;
		padding-bottom: 30px;
		.card {
			font-family: 'Light';
			.btn-outline-primary {
				border-color: #3490dc;
				color: #3490dc;
				&:hover {
					background-color: #3490dc;
					color: white !important;
				}
			}
		}
	}
	.alert {
		position: fixed;
		bottom: 20px;
		left: 0;
		z-index: 5;
	}
	@media screen and (max-width: 2000px) {
		.navbar-nav {
			margin: 20px 0px;
			&::before {
				content: '';
				display: block;
				width: 100%;
				height: 1px;
				background-color: $primary-color;
				margin-bottom: 10px;
				opacity: 0.2;
			}
		}
	}
</style>
