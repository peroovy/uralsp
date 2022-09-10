<script context="module" lang="ts">
	import { parsePayload } from '$lib/parse';
	import { browser } from '$app/env';

	// @ts-ignore
	export async function load({ params }) {
		if (!browser) return;
		let id = params.admin;
		// @ts-ignore
		let token = localStorage.getItem('access_token');
		if (token == null) {
			return {
				status: 301,
				redirect: '/'
			};
		}
		let payload = parsePayload(token);
		let real_id = payload.user_id;
		let permission = payload.permission;
		// if the user is not the same as the participant, redirect to the home page
		if (real_id != id) {
			return {
				status: 301,
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
		let competitions = await fetch(`http://localhost:8000/competitions`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let userInfo = await userData.json();
		let competitionsInfo = await competitions.json();
		return {
			props: {
				userInfo,
				competitionsInfo,
				permission,
				real_id,
				access_token: token
			}
		};
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as XLSX from 'xlsx';

	import src from '$lib/Assets/imgs/logo.png';
	import tempPhoto from '$lib/Assets/imgs/temp-photo.png';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { Competition } from '$lib/types';
	import lottie from '$lib/Assets/animations/lottie-search?url';
	import lottieSelect from '$lib/Assets/animations/lottie-select.gif';
	import { republics } from '$lib/Assets/republics.json';
	const { utils } = XLSX;
	export let userInfo, competitionsInfo, access_token: string;
	export let permission: string;
	export let real_id: number;
	import { sessionDuration } from '$lib/sessionDuration';
	sessionDuration();

	// Dummy data
	let adminName = '';
	let InstituteYear = [
		'1 (bachelor / specialty)',
		'2 (bachelor / specialty)',
		'3 (bachelor / specialty)',
		'4 (bachelor / specialty)',
		'5 (specialty)',
		'6 (specialty)',
		'1 (master)',
		'2 (master)'
	];

	// Bind variables
	let alertCont = '' as unknown as HTMLElement;
	let sliderCont = '' as unknown as HTMLElement;
	let formCont = '' as unknown as HTMLElement;
	let compResults = '' as unknown as HTMLElement;
	let compsBinds = [] as HTMLElement[];

	// Component slider
	let navBar = '' as unknown as HTMLElement;
	function slider(target: string) {
		controlActive(target);
		if (browser) {
			if (target === 'Users') {
				filterCont.style.visibility = 'hidden';
				localStorage.setItem('oldLocation', target);
				sliderCont.style.marginLeft = '0px';
			} else {
				localStorage.setItem('oldLocation', target);
				sliderCont.style.marginLeft = '-100vw';
				filterCont.style.visibility = 'visible';
			}
		}
	}
	function controlActive(activeEle: string): void {
		let navs = navBar.querySelectorAll('.nav-link');
		for (let ele in navs) {
			if (navs[ele].nodeName == 'SPAN' && navs[ele].id === activeEle && navs[ele].classList.contains('active')) {
				return;
			}
		}
		for (let i = 0; i < navs.length; i++) {
			if (navs[i].nodeName == 'SPAN') {
				navs[i].classList.toggle('active');
			}
		}
	}

	// User controls
	let email: string, name: string, region: string | undefined, eduType: string | undefined, institute: string, year: string;
	let userPermission: string | undefined;
	eduType = 'Choose...';
	interface searchParams {
		email: string | undefined;
		search: string | undefined;
		region: string | undefined;
		institution_type: string | undefined;
		institution_name: string | undefined;
		institution_course: string | undefined;
		permission: string | undefined;
	}
	let searchParams: searchParams = {
		email: '',
		search: '',
		region: '',
		institution_type: '',
		institution_name: '',
		institution_course: '',
		permission: ''
	};
	function queryParams() {
		searchParams.email = email;
		searchParams.search = name;
		searchParams.region = region;
		searchParams.institution_type = eduType;
		searchParams.institution_name = institute;
		searchParams.institution_course = year;
		searchParams.permission = userPermission;

		// form validation
		let check = Object.values(searchParams).every((item) => item === undefined);

		if (check) {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please fill at least one field.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}

		for (let key in searchParams) {
			if (searchParams[key] === '' || searchParams[key] == 'Choose...' || searchParams[key] == null) searchParams[key] = undefined;
		}

		alertCont.innerHTML = '';

		// Removing the undefinded values from the search params
		searchParams = JSON.parse(JSON.stringify(searchParams));
		//@ts-ignore
		const myURL = new URLSearchParams(searchParams);
		window.location.href = `${base}/admin/${real_id}/users/${myURL.toString()}`;
	}
	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			queryParams();
		}
	}

	// Pagination competitions and applications
	let comps = [];
	$: itemPerpage = 20;
	function pagination(page: number): void {
		let start = page * itemPerpage;
		let end = start + itemPerpage;
		if (end > resultsNumber) {
			end = filtered.length;
		}
		// Hide all the items
		for (let i = 0; i < resultsNumber; i++) {
			//@ts-ignore
			let e = compsBinds[i];
			e!.classList.add('hide');
		}
		for (let i = start; i < end; i++) {
			//@ts-ignore
			let e = compsBinds[i];
			e!.classList.remove('hide');
		}
	}
	$: appsPerPage = 5;
	function applicationPage(page: number): void {
		let start = page * appsPerPage;
		let end = start + appsPerPage;
		if (end > appLength) {
			end = appLength;
		}
		// Hide all the items
		for (let i = 0; i < appLength; i++) {
			//@ts-ignore
			let e = applicationBinds[i];
			e!.classList.add('hide');
		}
		for (let i = start; i < end; i++) {
			//@ts-ignore
			let e = applicationBinds[i];
			e!.classList.remove('hide');
		}
	}

	// The competition filter slider for mobile view
	let filterCont = '' as unknown as HTMLElement;
	function filterSlider() {
		if (filterCont.style.marginRight == '0px') {
			filterCont.style.marginRight = '-220px';
		} else {
			filterCont.style.marginRight = '0px';
		}
	}
	$: filtered = comps;
	let resultsNumber = comps.length;
	let compName = '',
		compStatus = 'Choose competition status ...';
	function filter() {
		filtered = comps.filter((item) => {
			let now = new Date();
			if (compName !== '') {
				if (item.name.toLowerCase().indexOf(compName.toLowerCase()) === -1) {
					return false;
				}
			}
			if (compStatus !== 'Choose competition status ...') {
				let status = '';
				let start = new Date(item.registration_start);
				let end = new Date(item.registration_end);
				if (start > now) {
					status = 'Upcoming';
				} else if (end > now) {
					status = 'Ongoing';
				} else {
					status = 'Finished';
				}

				if (status !== compStatus) {
					return false;
				}
			}
			return true;
		});
		resultsNumber = filtered.length;
		setTimeout(() => {
			pagination(0);
		}, 0);
	}

	// Competition' view and edit
	function selectedCompItem(arg0: string) {
		if (browser) {
			if (arg0 == 'users') {
				slider('users');
			} else {
				slider('comp');
			}
		}
	}
	$: selectedComp = '';
	$: appLength = 0;
	$: req = [];
	$: selectedCompID = '';
	$: selectedCompName = '';
	$: selectedCompRegStart = '';
	$: selectedCompRegEnd = '';
	$: selectedCompStart = '';
	$: selectedCompLink = '';
	$: selectedCompContestantsPerTeam = 0;
	$: request_template = '';
	$: selectedCompMonitors = [];

	let collegeYear = ['1 course', '2 course', '3 course', '4 course', '5 course'];
	async function editComp(id: number) {
		let comp;
		await fetch(`http://localhost:8000/competitions/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				comp = data;
			});
		let reg_s_date = comp.registration_start.replace('Z', '').trim().split('T');
		let reg_e_date = comp.registration_end.replace('Z', '').trim().split('T');
		let start_date = comp.started_at.replace('Z', '').trim().split('T');
		selectedCompID = comp.id;
		selectedCompName = comp.name;
		selectedCompRegStart = reg_s_date[0] + ', at: ' + reg_s_date[1].split(':').slice(0, -1).join(':');
		selectedCompRegEnd = reg_e_date[0] + ', at: ' + reg_e_date[1].split(':').slice(0, -1).join(':');
		selectedCompStart = start_date[0] + ', at: ' + start_date[1].split(':').slice(0, -1).join(':');
		selectedCompLink = comp.link;
		selectedCompContestantsPerTeam = comp.persons_amount;
		request_template = comp.request_template;
		selectedCompMonitors = comp.admins;
		let requests = [];

		// stretched is for design purposes
		let stretched = compResults.classList.contains('align-items-stretch');
		if (!selectedCompMonitors.includes(real_id) && permission != 'super_admin') {
			selectedComp = '';
			alert('You are not a monitor for this competition!');
			!stretched ? compResults.classList.add('align-items-stretch') : '';
			return;
		}

		if (stretched) {
			compResults.classList.remove('align-items-stretch');
			compResults.classList.add('align-items-start');
		}
		await fetch(`http://localhost:8000/competitions/${comp.id}/requests`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
			.then((res) => res.json())
			.then((data) => {
				requests = data;
				appLength = data.length;
			})
			.catch((err) => {
				alert(err);
			});

		selectedComp = 'comp';
		req = requests;
	}

	// Select and download Application
	let applicationBinds = [] as HTMLElement[];
	let selectedAppsId = new Set<number>();
	function selectApp(index: number): void {
		let e = applicationBinds[index].children[0].children[0];
		let p = applicationBinds[index];
		let id = parseInt(p.id);
		if (selectedAppsId.has(id)) {
			selectedAppsId.delete(id);
			e.classList.remove('fa-check-square');
			e.classList.add('fa-square-o');
		} else {
			selectedAppsId.add(id);
			e.classList.remove('fa-square-o');
			e.classList.add('fa-check-square');
		}
	}
	let selectAllBtn = '' as unknown as HTMLElement;
	function selectAll() {
		for (let i = 0; i < applicationBinds.length; i++) {
			let e = applicationBinds[i].children[0].children[0];
			let p = applicationBinds[i];
			let id = parseInt(p.id);
			if (selectedAppsId.has(id)) {
				selectedAppsId.delete(id);
				e.classList.remove('fa-check-square');
				e.classList.add('fa-square-o');
				selectAllBtn.innerHTML = '>> Select All';
			} else {
				selectedAppsId.add(id);
				e.classList.remove('fa-square-o');
				e.classList.add('fa-check-square');
				selectAllBtn.innerHTML = '>> Deselect All';
			}
		}
	}

	let selectedAppArray = new Set();
	function updateSelected() {
		selectedAppArray = new Set();
		for (let i = 0; i < req.length; i++) {
			if (selectedAppsId.has(req[i].id)) {
				selectedAppArray.add(req[i]);
			}
		}
	}

	async function downloadasExcel() {
		updateSelected();
		console.log(selectedAppArray);
		//check for empty set
		if (selectedAppArray.size === 0) {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please sellect at least one user.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}
		alertCont.innerHTML = '';
		// filter the selected requests
		let fileName = prompt('Enter file name:', 'New request');
		if (!fileName) {
			// cancel
			return;
		}
		if (fileName == null) fileName = 'New request';
		// change participants array in the selected requests to string
		for(let i of selectedAppArray){
			i.participants = i.participants.join(', ');
		}
		let jsondata = JSON.parse(JSON.stringify(Array.from(selectedAppArray)));
		let wb = XLSX.utils.book_new();
		let ws = XLSX.utils.json_to_sheet(jsondata);
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, `${fileName}.xlsx`);
	}

	// Componunt intialization
	onMount(() => {
		adminName = `${userInfo.name}  ${userInfo.surname}`;
		comps = competitionsInfo;
		filter();
		if (browser) {
			let oldLocation = localStorage.getItem('oldLocation');
			if (oldLocation == null || oldLocation == undefined || oldLocation == '') {
				localStorage.setItem('basicNav', 'users');
			} else {
				if (oldLocation == 'users') {
					slider('users');
				} else {
					slider('comp');
				}
			}
		}
		pagination(0);
		applicationPage(0);
	});

	// Delete Competition
	async function deleteComp(id: number): Promise<void> {
		if (isNaN(id)) {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Something went wrong.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}
		let confirmRemoval = confirm('Are you sure you want to delete this competition?');
		if (!confirmRemoval) return;
		await fetch(`http://localhost:8000/competitions/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			}
		})
			.then((res) => res.json())
			.then((data) => {
				alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong> ${data.message}
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`;
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				window.location.reload();
			});
	}

	// Applications
	async function acceptApplication(id: string) {
		let confirmAccept = confirm('Are you sure you want to accept this application?');
		if (!confirmAccept) return;
		let description = prompt('Enter description:', 'Accepted');
		await fetch(`http://localhost:8000/requests/${id}/process`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + access_token,
			},
			body: JSON.stringify({
				status: "accepted",
				"description": description,
			}),
		})
			.then((res) => {
				if(res.status == 200){ 
					alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong>
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`;
					window.location.reload();
				} else {
					alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
											<strong>Error!</strong> Something went wrong.
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`;
				}
			})
			.catch((err) => {
				console.error(err);
			})
	}
	async function declineApplication(id: string) {
		let confirmDecline = confirm('Are you sure you want to reject this application?');
		if (!confirmDecline) return;
		let description = prompt('Enter description:', 'Rejected');
		await fetch(`http://localhost:8000/requests/${id}/process`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + access_token,
			},
			body: JSON.stringify({
				status: "rejected",
				"description": description,
			}),
		})
			.then((res) => {
				if(res.status == 200){ 
					alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong>
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`;
					window.location.reload();
				} else {
					alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
											<strong>Error!</strong> Something went wrong.
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`;
				}
			})
			.catch((err) => {
				console.error(err);
			})
	}
	function viewApplication(id: string) {
		window.location.href = `${base}/admin/requests/${id}`;
	}
	// Signout
	function signout(): void {
		// clear local storage
		localStorage.clear();
		window.location.href = base + '/';
	}

	// super admin redirect
	$: per = permission;
</script>

<svelte:head>
	<script defer src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
	<title>App Name| {adminName}</title>
</svelte:head>

<!-- <svelte:window on:keydown={onKeyDown} /> -->

<section class="admin-container">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />

	<nav class="navbar navbar-expand-lg navbar-light mb-5 sticky-top shadow-sm" bind:this={navBar}>
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
				<ul class="navbar-nav me-auto mb-20 mb-lg-0 col-12 justify-content-around">
					<li class="nav-item">
						<span class="nav-link active" id="Users" on:click={() => slider('Users')}> Users control </span>
					</li>
					<li class="nav-item">
						<span class="nav-link" id="Competitions" on:click={() => slider('Competitions')}> Competitions control </span>
					</li>
					{#if per === 'super_admin'}
						<li class="nav-item" on:click={() => (window.location.href = './contests/create-competition')}>
							<span class="nav-link" style:color="rgba(0,0,0,.55)"> Create Competitions </span>
						</li>
					{/if}
					<li class="nav-item dropdown">
						<div class="nav-link dropdown-toggle d-flex align-items-center" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src={tempPhoto} alt="Logo" class="part-photo" />
							<span> {adminName} </span>
						</div>
						<ul class="dropdown-menu mt-2 ms-3 rounded-0">
							<li class:active={$page.url.pathname === '/info'}>
								<a sveltekit:prefetch href="{base}/info/{real_id}" content="Home" class="dropdown-item nav-link">
									<span class="fa fa-gears" />
									Settings
								</a>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<button class="dropdown-item nav-link signOut" on:click={signout}>
								<span class="fa fa-sign-out" />
								Sign out
							</button>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="sliderCont" bind:this={sliderCont}>
		<div class="slide">
			<div class="container pt-5">
				<div class="row justify-content-center align-items-stretch shadow">
					<div class="form col-lg-6 p-4 m-0" bind:this={formCont}>
						<h1 class="form-header">
							<span class="fa fa-search" />
							Search
						</h1>
						<div class="mb-3">
							<label for="email" class="form-label">Email address</label>
							<input
								type="email"
								class="form-control"
								id="email"
								aria-describedby="emailHelp"
								placeholder="Enter the user email"
								bind:value={email}
							/>
						</div>
						<div class="mb-3">
							<label for="fullName" class="form-label mb-0">First name, surname or patronymic</label>
							<input type="text" class="form-control" id="fullName" placeholder="Enter the user name" bind:value={name} />
						</div>
						<div class="mb-3">
							<label for="region">Permission</label>
							<select class="form-select form-select-sm" aria-label="Default select example" bind:value={userPermission}>
								<option selected>Choose...</option>
								{#each ['default', 'teacher', 'admin', 'super_admin'] as per}
									<option>{per}</option>
								{/each}
							</select>
						</div>
						<div class="mb-3">
							<label for="region">Region</label>
							<select class="form-select form-select-sm" aria-label="Default select example" bind:value={region}>
								<option selected>Choose...</option>
								{#each republics as republic}
									<option>{republic}</option>
								{/each}
							</select>
						</div>
						<div class="mb-3">
							<div class="form-group">
								<label for="education">Education type</label>
								<select class="form-select form-select-sm" aria-label="Default select example" bind:value={eduType}>
									<option selected>Choose...</option>
									<option>School</option>
									<option>University</option>
									<option>College</option>
								</select>
							</div>
							{#if eduType === 'School'}
								<div class="d-flex justify-content-between p-0">
									<div class="row">
										<div class="form-group col-md-8">
											<label for="school">School Name</label>
											<input type="text" class="form-control" id="school" placeholder="Enter your school name" bind:value={institute} />
										</div>
										<!--School Year-->
										<div class="form-group col-md-4">
											<label for="schoolYear">School Year</label>
											<select class="form-select form-select" aria-label="Default select example" bind:value={year}>
												<option selected>Choose...</option>
												{#each Array(11) as _, i}
													<option>{i + 1}</option>
												{/each}
											</select>
										</div>
									</div>
								</div>
							{/if}
							{#if eduType === 'University'}
								<div class="d-flex justify-content-between p-0">
									<div class="row">
										<div class="form-group col-md-8">
											<label for="Institute">Institute Name</label>
											<input type="text" class="form-control" id="Institute" placeholder="Enter your Institute name" bind:value={institute} />
										</div>
										<!--Institute  Year-->
										<div class="form-group col-md-4">
											<label for="Institute Year">Institute Year</label>
											<select class="form-select form-select" aria-label="Default select example" bind:value={year}>
												<option selected>Choose...</option>
												{#each InstituteYear as grade}
													<option>{grade}</option>
												{/each}
											</select>
										</div>
									</div>
								</div>
							{/if}
							{#if eduType === 'College'}
								<div class="d-flex justify-content-between p-0">
									<div class="row">
										<div class="form-group col-md-8">
											<label for="College">College Name</label>
											<input type="text" class="form-control" id="College" placeholder="Enter your College name" bind:value={institute} />
										</div>
										<!--College  Year-->
										<div class="form-group col-md-4">
											<label for="College Year">College Year</label>
											<select class="form-select form-select" aria-label="Default select example" bind:value={year}>
												<option selected>Choose...</option>
												{#each collegeYear as grade}
													<option>{grade}</option>
												{/each}
											</select>
										</div>
									</div>
								</div>
							{/if}
						</div>
						<button class="btn" on:click={queryParams}>Search</button>
					</div>
					<div class="lottie-container col-lg-6 p-0">
						<lottie-player class="lottie-animations" src={lottie} speed="1" loop nocontrols autoplay />
					</div>
				</div>
			</div>
		</div>
		<div class="slide">
			<div class="card menu" bind:this={filterCont}>
				<li class="fa fa-filter" on:click={filterSlider} />
				<input type="text" class="form-control" placeholder="Search by competition title ..." id="compName" bind:value={compName} />
				<select class="form-select form-select-sm" aria-label="Default select example" id="compType" bind:value={compStatus}>
					<option selected>Choose competition status ...</option>
					<option>Ongoing</option>
					<option>Upcoming</option>
					<option>Finished</option>
				</select>
				<button class="btn btn-light rounded-0" on:click={filter}> Filter </button>
			</div>
			<div class="container col-12 p-0 d-flex align-items-center justify-content-center mt-5">
				<div class="row p-0 m-0 col-md gap-3 justify-content-center align-items-stretch" bind:this={compResults}>
					<div class="card col-md-5 comps compt-holder p-0 col-sm-6 shadow mt-0" style="max-width:500px; min-width:min-content">
						<h4 class="card-header" style:padding-right="100px">
							<span class="fa fa-book" />
							Competitions
						</h4>
						<div class="card-body p-0 pt-1 shadow">
							{#if filtered.length > 0}
								{#each filtered as comp, i}
									{#if i % 2 == 0}
										<div bind:this={compsBinds[i]} class="comp even hide d-flex flex-row align-items-stretch justify-content-between">
											<span class="d-inline">{comp.name}</span>
											<i class="fa fa-edit m-1" id={comp.id + ''} style="cursor:pointer; color:#3490dc" on:click={() => editComp(comp.id)} />
										</div>
									{:else}
										<div bind:this={compsBinds[i]} class="comp hide d-flex flex-row align-items-stretch justify-content-between">
											<span class="d-inline">{comp.name}</span>
											<i class="fa fa-edit m-1" id={comp.id + ''} style="cursor:pointer; color:#3490dc" on:click={() => editComp(comp.id)} />
										</div>
									{/if}
								{/each}
							{:else}
								<div class="alert alert-warning" role="alert">
									<span class="fa fa-exclamation-triangle" />
									No competitions found, If you think that this is an error, please refresh the page.
								</div>
							{/if}
						</div>
						<div class="container-fluid p-0 pt-3 bg-light d-flex justify-content-center">
							<div class="row col-md-6 paginationNav justify-content-center align-items-center">
								<ul class="pagination m-0 p-3">
									{#each Array(Math.ceil(resultsNumber / itemPerpage)) as _, i}
										<li class="page-item page-link" on:click={() => pagination(i)}>{i + 1}</li>
									{/each}
								</ul>
								<select class="form-select" bind:value={itemPerpage} on:change={() => pagination(0)}>
									{#each [5, 10, 15, 20, 25, 50] as i}
										<option class="dropdown-item">{i}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
					{#if selectedComp === ''}
						<div class="card p-0 col-md-5" style="max-width:500px">
							<div class="card-body p-0 pt-1 shadow">
								<div class="noComp">
									<img src={lottieSelect} alt="" class="gif" />
									<p>No Competition Selected, please click on <i class="fa fa-edit" />.</p>
								</div>
							</div>
						</div>
					{:else}
						<div class="card col-md-5 p-0" style="min-width: fit-content">
							<div class="card-header" data-bs-toggle="collapse" href="#info" role="button" aria-expanded="false" aria-controls="info">
								<span class="fa fa-info-circle" />
								Information
							</div>
							<div class="collapse card-body pt-0 pb-0" id="info">
								<div class="row">
									<table class="table table-striped table-sm">
										<tbody>
											<tr>
												<th scope="row">ID</th>
												<td>{selectedCompID}</td>
											</tr>
											<tr>
												<th>Title</th>
												<td>{selectedCompName}</td>
											</tr>
											<tr>
												<th>Registration time</th>
												<td>
													From {selectedCompRegStart}
													<br />
													To {selectedCompRegEnd}
												</td>
											</tr>
											<tr>
												<th>Start</th>
												<td>{selectedCompStart}</td>
											</tr>
											<tr>
												<th>Registration link</th>
												<td><a href={selectedCompLink}> Link </a></td>
											</tr>
											<tr>
												<th>Contestants per team</th>
												<td>{selectedCompContestantsPerTeam}</td>
											</tr>
											<tr>
												<th>Monitors' IDs</th>
												{#if selectedCompMonitors.length == 0}
													<td>No monitors</td>
												{:else}
													<td>
														{selectedCompMonitors.join(' ,')}
													</td>
												{/if}
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div class="card-header" data-bs-toggle="collapse" href="#form" role="button" aria-expanded="false" aria-controls="form">
								<span class="fa-solid fa-tasks" />
								Form
							</div>
							<div class="card-body collapse" id="form">
								{@html request_template}
							</div>
							<div
								class="card-header d-flex justify-content-between align-items-center"
								style:margin-bottom="38px"
								data-bs-toggle="collapse"
								href="#applications"
								role="button"
								aria-expanded="false"
								aria-controls="applications"
							>
								<div>
									<span class="fa fa-users" />
									Applications
								</div>
								<div>
									<span class="badge badge-light text-primary">{appLength} available</span>
								</div>
							</div>
							<div class="card-body collapse show" style:position="relative" id="applications">
								<div class="table">
									<table class="table table-striped table-sm" style:margin-top="-38px" style:margin-bottom="100px">
										<thead>
											<tr class="table-light">
												<th scope="col" class="ms-1 text-center"> # </th>
												<th scope="col" class="ms-1 text-center"> Id </th>
												<th scope="col" class="text-center"> Status </th>
												<th scope="col" class="text-center"> № of participants </th>
												<th scope="col" class="text-center"> Actions </th>
											</tr>
										</thead>
										<tbody>
											{#each req as application, i}
												<tr bind:this={applicationBinds[i]} id={application.id} class="text-center">
													<td><li on:click={() => selectApp(i)} class="fa fa-square-o" /></td>
													<td>{application.id}</td>
													<td>{application.status}</td>
													<td class="text-center">{application.participants.length}</td>
													<td>
														<div class="btn-group">
															<button class="btn btn-success btn-sm" on:click={() => acceptApplication(application.id)}
																><i class="fa fa-check-square" /></button
															>
															<button class="btn btn-danger btn-sm" on:click={() => declineApplication(application.id)}
																><i class="fa fa-ban" /></button
															>
															<button class="btn btn-primary btn-sm" on:click={() => viewApplication(application.id)}><i class="fa fa-eye" /></button>
														</div>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
								<div class="manage">
									<i on:click={downloadasExcel}> >> Print selected as xlsx</i>
									<i on:click={selectAll} bind:this={selectAllBtn}> >> Select all </i>
								</div>
								<div class="container-fluid p-0 pt-3 d-flex justify-content-center">
									<div class="row col-md-6 bg-light stickyBottom paginationNav apppag justify-content-center align-items-center">
										<ul class="pagination m-0 p-3">
											{#each Array(Math.ceil(req.length / appsPerPage) === 0 ? 1 : Math.ceil(req.length / appsPerPage)) as _, i}
												<li class="page-item page-link" on:click={() => applicationPage(i)}>
													{i + 1}
												</li>
											{/each}
										</ul>
										<select class="form-select" bind:value={appsPerPage} on:change={() => applicationPage(0)}>
											{#each [5, 10, 15, 20, 25, 50] as i}
												<option class="dropdown-item">{i}</option>
											{/each}
										</select>
									</div>
								</div>
							</div>
							<div class="btn-group stickyBottom">
								<button
									class="btn btn-primary rounded-0"
									style="background-color:#3490dc; border: none"
									on:click={() => (window.location.href = base + 'contests/' + selectedCompID)}
								>
									<i class="fa fa-edit" /> Edit</button
								>
								<button class="btn btn-danger rounded-0" on:click={() => deleteComp(parseInt(selectedCompID))}>
									<i class="fa fa-trash" /> Delete</button
								>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="hide">keephideClass</div>
	<div bind:this={alertCont} class="alertCont" />
</section>

<style lang="scss">
	@import '../../lib/Assets/common.scss';
	nav {
		position: relative !important;
		background-color: rgb(236, 236, 236);
		margin-bottom: 0px !important;
	}
	.admin-container {
		@include bg;
		@include navbar;
		padding: 0;
		margin: 0;
		background-color: #fff;
		min-height: 100vh;
		background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);
		width: 100vw;
		min-height: calc(100vh - 38px);
		nav {
			width: 100vw !important;
			background-color: rgb(248, 248, 248);
			.nav-link {
				//color: rgba(255, 255, 255, 0.692) !important;
			}
		}
		.form {
			position: relative;
			z-index: 1;
			font-family: 'Light', sans-serif;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			h1 {
				font-size: 2.5rem;
				font-weight: bold;
				color: #212529;
				margin-bottom: 1rem;
			}
			background-color: $bg-color;
			button {
				background-color: $secondary-color;
				color: white;
				border: none;
				border-radius: 0.25rem;
				padding: 0.5rem 1rem;
				font-size: 1.25rem;
				font-weight: bold;
				cursor: pointer;
				transition: all 0.3s ease-in-out;
				&:hover {
					background-color: #343a40;
				}
			}
		}
		input[type='text'],
		input[type='email'],
		select {
			border-radius: 0;
			border: 0px;
			border-bottom: 2px solid $secondary-color;
			margin-bottom: 20px;
			font-size: 15px;

			&:focus {
				border-bottom: 2px solid $primary-color !important;
				outline: none;
				box-shadow: none;
			}
		}
		.lottie-animations {
			background-color: rgb(240, 240, 240);
			position: relative;
			z-index: 2;
		}
	}
	.sliderCont {
		width: 200vw;
		display: flex;
		flex-flow: row nowrap;
		transition: all 0.3s ease-in-out;
		.slide {
			width: 100vw;
			position: relative;
			z-index: 2;
			padding-bottom: 30px;
		}
	}
	.paginationNav {
		padding-bottom: 20px;
		font-size: 18px;
		font-family: 'Courier New', Courier, monospace;
		select {
			position: relative;
			width: 70px;
			font-size: 18px;
			margin: 0px;
			height: 100%;
			border: none;
			border-radius: 0px;
			background-color: $secondary-color;
			color: white;
			&:focus {
				outline: none;
				box-shadow: none;
				border: none !important;
			}
		}
		.pagination {
			padding: 0px !important;
			max-width: max-content;

			.page-link {
				background-color: $secondary-color;
				border: none;
				width: 35px;
				text-align: center;
				color: white;
				cursor: pointer;
			}
		}
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}
	.alertCont {
		position: fixed;
		z-index: 20;
		bottom: 30px;
		left: 30px;
	}
	.card {
		border: none;
		border-radius: 0;
		background-color: #fff;
	}
	.hide {
		display: none !important;
	}
	.menu {
		position: fixed !important;
		top: 0;
		z-index: 5;
		display: flex !important;
		flex-flow: row wrap !important;
		justify-content: center !important;
		padding: 20px 0px;
		gap: 10px !important;
		margin-bottom: 20px !important;
		border-radius: 0px;
		width: 100vw !important;
		background: $secondary-color !important;
		color: white;
		font-family: 'Light', sans-serif;

		input,
		select,
		button {
			width: 300px;
			height: 40px;
			border: none !important;
			margin: 0px !important;
			border-radius: 20px !important;
			padding: 0px 30px !important;
		}
		button {
			width: fit-content;
		}
	}
	.noComp {
		font-family: 'Light', sans-serif;
		height: 100%;
		text-align: center;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		p {
			font-size: 14px;
			align-self: center;
			color: #212529;
			margin-top: 190px;
			position: absolute;
			.fa {
				opacity: 0.3;
			}
		}
		.gif {
			width: 250px;
			height: 250px;
			margin-top: 0px;
			padding: 0px;
		}
	}
	.comps {
		font-family: 'light', sans-serif;
		margin-top: 100px;
		.comp {
			padding: 6px 10px;
		}
		.even {
			background-color: $bg-color;
		}
		.info {
			width: 100%;
			display: flex;
			flex-flow: column nowrap;
		}
	}
	table {
		font-family: 'light', sans-serif;
		th {
			text-align: left;
			padding: 10px;
			border-bottom: 1px solid #ddd;
			font-family: 'medium', sans-serif;
		}
	}
	.manage {
		font-family: 'light', sans-serif;
		display: flex;
		flex-flow: row wrap;
		gap: 20px;
		font-size: 13px;
		opacity: 0.8;
		color: black;
		position: absolute;
		z-index: 5;
		bottom: 110px;
		i {
			cursor: pointer;
			&:hover {
				opacity: 1;
				color: $primary-color;
			}
		}
	}
	.apppag {
		padding: 20px 0px;
		margin-bottom: 35px;
		.form-select,
		.page-link {
			background-color: white !important;
			color: black !important;
			font-family: 'light', sans-serif;
			font-size: 14px;
		}
		.form-select {
			border-radius: 0px 50px 50px 0px;
		}
	}
	.stickyBottom {
		position: absolute;
		bottom: 0px;
		width: 100%;
	}
	@media screen and (min-width: 1000px) {
		.navbar-nav {
			align-items: center !important;
		}
		.form-group {
			align-items: center;
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
		.lottie-animations {
			display: none;
		}
	}
	@media screen and (max-width: 800px) {
		.compt-filter,
		.compt-holder {
			max-width: 100vw !important;
			margin: 0px !important;
			margin-bottom: 50px !important;
			width: 100vw;
		}
		.menu {
			--height: 180px;
			height: var(--height);
			position: absolute;
			right: 0px;
			top: calc(50% - var(--height) / 2);
			flex-flow: column nowrap !important;
			padding: 20px !important;
			justify-content: left !important;
			width: fit-content !important;
			transition: all 0.3s ease-in-out;
			margin-right: -220px;
			input,
			select,
			button {
				width: 200px;
				height: 40px !important;
				border: none !important;
				margin: 0px !important;
				padding: 0px 30px;
				margin-left: 40px !important;
			}
			.fa {
				height: var(--height);
				margin-top: -20px;
				margin-left: -20px;
				width: 60px;
				position: absolute;
				font-size: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
			button {
				width: fit-content;
				background-color: $primary-color;
				color: white;
			}
		}
	}
	@media screen and (min-width: 800px) {
		.menu {
			position: relative !important;
			.fa {
				display: none !important;
			}
		}
	}
</style>
