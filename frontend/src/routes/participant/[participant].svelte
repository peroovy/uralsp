<script context="module" lang="ts">
	import { parsePayload } from '$lib/parse';
	import { browser } from '$app/env';
	// @ts-ignore
	export async function load({ params }) {
		if (!browser) return;
		let id = params.participant;
		// @ts-ignore
		let token = localStorage.getItem('access_token');
		if (token == null) {
			return {
				status: 300,
				redirect: '/'
			};
		}
		let payload = parsePayload(token);
		let real_id = payload.user_id;

		// if the user is not the same as the participant, redirect to the home page
		if (real_id != id) {
			return {
				redirect: '/'
			};
		}

		let userData = await fetch(`http://localhost:8000/users/current/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
		let UpComming_competitions = await fetch(`http://localhost:8000/competitions?opened=false`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		let Ongoing_competitions = await fetch(`http://localhost:8000/competitions?opened=true`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		let Started_competitions = await fetch(`http://localhost:8000/competitions?started=true`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		let requests = await fetch(`http://localhost:8000/users/current/requests`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		}).then (res => res.json());
		let userInfo = await userData.json();
		let upComming_competitions = await UpComming_competitions.json();
		let started_competitions = await Started_competitions.json();
		let ongoing_competition = await Ongoing_competitions.json();
		return {
			props: {
				userInfo,
				ongoing_competition,
				upComming_competitions,
				started_competitions,
				requests
			}
		};
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { contest } from '$lib/stores';
	import src from '$lib/Assets/imgs/logo.png';
	import tempPhoto from '$lib/Assets/imgs/temp-photo.png';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { Requests, Competitions, Competition, UserData } from '$lib/types';
	import { onMount } from 'svelte';

	import lottieNotFoundSrc from '$lib/Assets/animations/lottie-notfound2.json?url';
	export let userInfo: UserData;
	export let ongoing_competition: Competitions = [], upComming_competitions : Competitions = [], started_competitions : Competitions = [];
	export let requests : Requests = [];
	let userId: number;
	let paricipantName = '';
	onMount(() => {
		userId = userInfo.id;
		paricipantName = `${userInfo.name}  ${userInfo.surname}`;
	});
	let contestObject: Competitions = [
		{
			id: 0,
			name: 'string',
			registration_start: '2022-08-08T17:48:45.367Z',
			registration_end: '2022-08-08T17:48:45.367Z',
			started_at: '2022-08-08T17:48:45.367Z',
			persons_amount: 0,
			request_template: 'string',
			link: 'string',
			admins: []
		}
	];
	let showContest = () => {
		contest.set(JSON.stringify(contestObject));
	};

	// Sections slider
	let sectionHolders = '' as unknown as HTMLElement;
	let navBar = '' as unknown as HTMLElement;
	function toSec(name: string): void {
		controlActive(name);
		if (name == 'upcomming') {
			sectionHolders.style.marginLeft = '0px';
		} else if (name == 'ongoing') {
			sectionHolders.style.marginLeft = '-100vw';
		} else if (name == 'past') {
			sectionHolders.style.marginLeft = '-200vw';
		} else if (name == 'requests') {
			sectionHolders.style.marginLeft = '-300vw';
		}
	}

	function controlActive(activeEle: string): void {
		let navs = navBar.querySelectorAll('.nav-link');
		for (let ele in navs) {
			if (navs[ele].nodeName == 'SPAN' && navs[ele].id === activeEle && navs[ele].classList.contains('active')) {
				return;
			}
		}
		// Deactivate all navs
		for (let ele in navs) {
			if (navs[ele].nodeName == 'SPAN') {
				navs[ele].classList.remove('active');
			}
		}
		// Activate the Clicked Nav
		for (let i = 0; i < navs.length; i++) {
			if (navs[i].nodeName == 'SPAN' && navs[i].id === activeEle) {
				navs[i].classList.toggle('active');
			}
		}
	}

	function signout(): void {
		// clear local storage
		localStorage.clear();
		window.location.href = base + '/';
	}
</script>

<svelte:head>
	<title>App Name | {paricipantName}</title>
	<script defer src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</svelte:head>

<section class="participant-container">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />

	<nav class="navbar navbar-expand-lg navbar-light mb-5 sticky-top shadow">
		<div class="container-fluid p-0 d-flex justify-content-lg-around">
			<div class="navbar-brand">
				<img {src} alt="Logo" />
			</div>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#participant-menu"
				aria-controls="participant-menu"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse flex-grow-0" id="participant-menu">
				<ul class="navbar-nav me-auto mb-20 mb-lg-0 col-12 justify-content-around" bind:this={navBar}>
					<li class="nav-item" on:click={() => toSec('upcomming')}>
						<span class="nav-link active" id="upcomming"> Upcomming registeration </span>
					</li>
					<li class="nav-item" on:click={() => toSec('ongoing')}>
						<span class="nav-link" id="ongoing"> Ongoing registeration </span>
					</li>
					<li class="nav-item" on:click={() => toSec('past')}>
						<span class="nav-link" id="past"> Past registeration </span>
					</li>
					<li class="nav-item" on:click={() => toSec('requests')}>
						<span class="nav-link" id="requests"> Requests </span>
					</li>
					<li class="nav-item dropdown">
						<div class="nav-link dropdown-toggle d-flex align-items-center" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src={tempPhoto} alt="Logo" class="part-photo" />
							<span> {paricipantName} </span>
						</div>
						<ul class="dropdown-menu mt-2 ms-3 rounded-0">
							<li class:active={$page.url.pathname === '/info'}>
								<a sveltekit:prefetch href="{base}/info/{userId}" target="_blank" content="Home" class="dropdown-item nav-link">
									<span class="fa fa-gears" />
									Settings
								</a>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li class="dropdown-item nav-link signOut" on:click={signout}>
								<span class="fa fa-sign-out" />
								Sign out
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div class="parts-container p-0" bind:this={sectionHolders}>
		<div class="part_4 d-flex justify-content-center align-items-start">
			<div class="row justify-content-center align-items-center gap-3 p-0 m-0" style="flex-flow: column nowrap; gap: 30px; width: max-content" id="upcomming">
				{#if upComming_competitions.length == 0}
					<div class="text-center p-3 notFound" style="width: fit-content ;background: white">
						<lottie-player src={lottieNotFoundSrc} background="transparent" style="max-width: 500px" speed="1" autoplay nocontrols></lottie-player>
						<h2> No Upcomming registerations!</h2>
						<small style = "margin-top:-10px; display:block; opacity: 0.7">  Please, try later. </small>
					</div>
				{/if}
				{#each upComming_competitions as competition}
					{@const diff = Date.parse(competition.registration_start) - Date.parse(Date())}
					{@const regDay = Date.parse(competition.registration_start)}
					{@const days = Math.floor(diff / (1000 * 60 * 60 * 24))}
					{@const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}
					{@const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}
					{@const seconds = Math.floor((diff % (1000 * 60)) / 1000)}
					<div class="col-md">
						<div class="card shadow-sm border-0">
							<div class="card-header bg-light">
								<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
									<div class="navbar-brand">
										<h4 class="m-0">{competition.name}</h4>
									</div>
								</nav>
							</div>
							<div class="card-body gap-2">
								<table class="table">
									<tbody>
										<tr>
											<th scope="row"><i class="fa-solid fa-calendar" /></th>
											<td>Start date</td>
											<td colspan="2">{new Date(regDay).toDateString()}</td>
										</tr>
										<tr>
											<th scope="row"><i class="fa fa-clock" /></th>
											<td colspan="2">Registeration will start in: </td>
											<td>{days} day, {hours} hour, {minutes} min</td>
										</tr>
										<tr>
											<th scope="row"><i class="fa fa-group" /></th>
											<td colspan="2">Number of Contestant per team</td>
											<td>{competition.persons_amount}</td>
										</tr>
									</tbody>
								</table>
								<div class="btn btn-group gap-2 on:click={showContest}">
									<button class="btn btn-primary" on:click={showContest}>
										<a class="link-light" href={competition.link} target="_blank">
											<span class="fa fa-eye" />
											<span> View full Contest</span>
										</a>
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}

			</div>
		</div>
		<div class="part_4 d-flex justify-content-center align-items-start">
			<div class="row justify-content-center gap-4 justify-content-center align-items-center gap-3 p-0 m-0"  style="flex-flow: column nowrap; gap: 30px; width: max-content" id="ongoing">
			{#if ongoing_competition.length == 0}
			<div class="text-center p-3 notFound" style="width: fit-content ;background: white">
				<lottie-player src={lottieNotFoundSrc} background="transparent" style="max-width: 500px" speed="1" autoplay nocontrols></lottie-player>
				<h2> No ongoing registerations!</h2>
				<small style = "margin-top:-10px; display:block; opacity: 0.7">  Please, try later. </small>
			</div>
			{:else}
					{#each ongoing_competition as comp}
						{@const diff =  Date.parse(comp.registration_end) - Date.parse(Date())}
						{@const regDay = new Date (Date.parse(comp.registration_start)).toDateString()}
						{@const days = Math.floor(diff / (1000 * 60 * 60 * 24))}
						{@const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}
						{@const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}
						{@const seconds = Math.floor((diff % (1000 * 60)) / 1000)}
						{@const ApplyLink = '/contests/apply/'+comp.id}
						<div class="col-md">
							<div class="card shadow-sm border-0">
								<div class="card-header bg-light">
									<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
										<div class="navbar-brand">
											<h4 class="m-0">{comp.name}</h4>
										</div>
									</nav>
								</div>
								<div class="card-body gap-2">
									<table class="table">
										<tbody>
											<tr>
												<th scope="row"><i class="fa-solid fa-calendar" /></th>
												<td>Start date</td>
												<td colspan="2">{regDay}</td>
											</tr>
											<tr>
												<th scope="row"><i class="fa fa-clock" /></th>
												<td>Registeration ends in </td>
												<td colspan="2">{days} days, {hours} hours, {minutes} mins</td>
											</tr>
											<tr>
												<th scope="row"><i class="fa fa-group" /></th>
												<td colspan="2"> Number of contestants per team</td>
												<td>{comp.persons_amount}</td>
											</tr>
										</tbody>
									</table>
									<div class="btn btn-group gap-2 on:click={showContest}">
										<button class="btn btn-primary">
											<a class="link-light" href={ApplyLink} target="_blank">
												<span class="fa fa-check-square-o" />
												<span class="ptn-count"> Apply </span>
											</a>
										</button>
										<button class="btn btn-primary" on:click={showContest}>
											<a class="link-light" href={comp.link} target="_blank">
												<span class="fa fa-eye" />
												<span> View full Contest</span>
											</a>
										</button>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="part_4 d-flex justify-content-center align-items-start">
			<div class="row justify-content-center align-items-center gap-3 p-0 m-0 " id="past">
				<div class="col-md">
					{#if started_competitions.length == 0}
						<div class="text-center p-3 notFound" style="background: white">
							<lottie-player src={lottieNotFoundSrc} background="transparent" style="max-width: 500px" speed="1" autoplay nocontrols></lottie-player>
							<h2> No ongoing registerations!</h2>
							<small style = "margin-top:-10px; display:block; opacity: 0.7">  Please, try later. </small>
						</div>
					{:else}
					{#each started_competitions as comp}
						{@const StartDay = new Date (Date.parse(comp.started_at)).toDateString()}

						<div class="col-md-5" style:width="fit-content">
							<div class="card shadow-sm border-0">
								<div class="card-header bg-light">
									<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
										<div class="navbar-brand">
											<h4 class="m-0">{comp.name}</h4>
										</div>
									</nav>
								</div>
								<div class="card-body gap-2">
									<table class="table">
										<tbody>
											<tr>
												<th scope="row"><i class="fa-solid fa-calendar" /></th>
												<td>Start date</td>
												<td colspan="2">{StartDay}</td>
											</tr>
											<tr>
												<th scope="row"><i class="fa fa-group" /></th>
												<td colspan="2">Number of Contestant per team</td>
												<td>{comp.persons_amount}</td>
											</tr>
										</tbody>
									</table>
									<div class="btn btn-group gap-2 on:click={showContest}">
										<button class="btn btn-primary" on:click={showContest}>
											<a class="link-light" href={comp.link} target="_blank">
												<span class="fa fa-eye" />
												<span> View full Contest</span>
											</a>
										</button>
									</div>
								</div>
							</div>
						</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="part_4 d-flex justify-content-center align-items-start">
			<div class="row part_4 justify-content-center align-items-center gap-3 p-0 m-0" id="requests">
				{#if requests.length == 0}
					<div class="text-center p-3 notFound" style="width: fit-content ;background: white">
						<lottie-player src={lottieNotFoundSrc} background="transparent" style="max-width: 500px" speed="1" autoplay nocontrols></lottie-player>
						<h2> No requests found</h2>
						<small style = "margin-top:-10px; display:block; opacity: 0.7">  Please, try later. </small>
					</div>
				{:else}
					<div class="row justify-content-center algin-itmes-start">
						{#each requests as request}
							{@const createdAt = new Date (Date.parse(request.created_at))}
							<div class="card p-0 col-md-6 border-0 shadow-sm" style="max-width: 500px; min-width: max-content">
								<h4 class="card-header p-4 m-0">
									<li class="fa fa-paper-plane me-1"></li>
									{request.team_name}
								</h4>
								<div class="card-body">
									<p class="request-description"> {request.description ? request.description : "No description"} </p>

									<table class="table table-striped table-hover">
										<tbody>
											<tr>
												<th scope="row">Status</th>
												<td>{request.status}</td>
											</tr>
											<tr>
												<th scope="row">Created at</th>
												<td>{createdAt.toDateString()}, {createdAt.getUTCHours()}</td>
											</tr>
											<tr>
												<th scope="row">Participants IDs</th>
												<td>{request.participants.join(' ,')}</td>
											</tr>
										</tbody>
									</table>
									<div class="btn gap-2">
										<button class="btn btn-primary btn-sm"> <li class="fa fa-edit" /> Edit </button>
										<button class="btn btn-danger btn-sm"> <li class="fa fa-trash" /> Remove </button>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import '../../lib/Assets/common.scss';
	.participant-container {
		width: 100vw;
		min-height: calc(100vh - 38px);
		max-height: fit-content !important;
		align-items: center;
		background-color: $bg-color;
		@include bg;
		position: relative;
		z-index: 1;
		@include navbar;
		.card-header {
			z-index: 2;
			.navbar-brand {
				h4 {
					font-family: 'Medium';
				}
			}
		}
		.contest-description {
			font-size: 15px;
			font-family: 'Light';
			line-height: 1.5;
			margin: 15px;
			text-align: justify;
		}
		.link-light {
			text-decoration: none;
		}
	}
	.parts-container {
		display: flex;
		width: 400vw;
		height: fit-content !important;
		flex-direction: row nowrap;
	}
	.request-description{
		font-family: 'light';
		line-height: 25px;
		font-size: 16px;
		text-align: justify;
		padding: 8px;
	}
	.part_4 {
		flex-shrink: 0;
		padding: 0px !important;
		padding-bottom: 30px !important;
		margin: 0px !important;
		width: 100vw !important;
	}
	nav {
		position: sticky !important;
		z-index: 10 !important;
		background-color: #f8f9fa !important;
	}
	.notFound{
		font-family: 'light';
		font-size: 18px;
		padding-bottom: 100px !important;
		h2{
			margin-top: -40px
		}
	}
	@media screen and (min-width: 1000px) {
		.navbar-nav {
			align-items: center !important;
		}
	}
	@media screen and (max-width: 1000px) {
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
			.dropdown-menu {
				position: absolute;
				top: 100%;
				left: 0;
				border: 1px solid $primary-color;
				border-radius: 5px;
				padding: 10px;
				.dropdown-item {
					display: flex;
					justify-content: left;
					align-items: center;
					.fa {
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
