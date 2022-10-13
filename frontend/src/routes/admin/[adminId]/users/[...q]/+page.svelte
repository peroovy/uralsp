<script lang="ts">
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import { base } from '$app/paths';
	import lottieNotfound from '$lib/Assets/animations/lottie-notFound.json?url';
	import { onMount, onDestroy } from 'svelte';
	import * as XLSX from 'xlsx';
	import { page } from '$app/stores';
	import { republics } from '$lib/Assets/republics.json';
	import { sessionDuration } from '$lib/sessionDuration';
	sessionDuration();

	let data = $page.data;

	export let searchQueries: string = data.searchQueries,
		adminId: number = data.adminId,
		usersOrErr: any = data.usersOrErr;
	export let token: string = data.token,
		real_id: number = data.real_id,
		API: string = data.API;
	const { utils } = XLSX;
	let userCont: HTMLElement;
	let toolbar: HTMLElement;
	let alertCont: HTMLElement;
	let loading: HTMLElement;
	$: itemPerpage = 5;
	// filter data
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
	let collegeYear = ['1 course', '2 course', '3 course', '4 course', '5 course'];

	let formCont: HTMLElement;
	let email: string | undefined,
		name: string | undefined,
		region: string | undefined,
		eduType: string | undefined,
		institute: string | undefined,
		year: string | undefined;
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
		let check = Object.values(searchParams).every((item) => item === undefined || item === null);
		if (check) {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please fill at least one field.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}

		for (let key in searchParams) {
			// @ts-ignore
			if (searchParams[key] === '' || searchParams[key] == 'Choose...' || searchParams[key] == null)
				searchParams[key] = undefined;
		}

		alertCont.innerHTML = '';

		// Removing the undefinded values from the search params
		searchParams = JSON.parse(JSON.stringify(searchParams));
		//@ts-ignore
		const myURL = new URLSearchParams(searchParams);
		// reload
		window.location.href = `${base}/admin/${real_id}/users/${myURL.toString()}`;
	}

	let selectedIds = new Set<string>();
	let userBinds = [] as HTMLElement[];
	function handleSelect(index: number) {
		let e = userBinds[index];
		let id = e?.getAttribute('id');
		if (e!.classList.contains('fa-square-o')) {
			e!.classList.remove('fa-square-o');
			e!.classList.add('fa-check-square-o');
			selectedIds.add(id!);
		} else {
			e!.classList.remove('fa-check-square-o');
			e!.classList.add('fa-square-o');
			selectedIds.delete(id!);
		}
	}
	let users = [] as any;

	let headers = '';
	let resultsNumber: number | undefined;
	onMount(() => {
		if (usersOrErr.details === undefined && usersOrErr.detail === undefined) {
			users = usersOrErr.items;
			resultsNumber = users.length;
		} else {
			users = [];
			resultsNumber = 0;
		}

		// Handle the previous search params
		if (searchQueries !== '') {
			let searchParams = new URLSearchParams(searchQueries);
			email = searchParams.get('email') ? searchParams.get('email')! : undefined;
			name = searchParams.get('search') ? searchParams.get('search')! : undefined;
			region = searchParams.get('region') ? searchParams.get('region')! : undefined;
			eduType = searchParams.get('institution_type')
				? searchParams.get('institution_type')!
				: undefined;
			institute = searchParams.get('institution_name')
				? searchParams.get('institution_name')!
				: undefined;
			year = searchParams.get('institution_course')
				? searchParams.get('institution_course')!
				: undefined;
			userPermission = searchParams.get('permission') ? searchParams.get('permission')! : undefined;
		}
		loading.style.display = 'none';
		
		// Intilize userBinds
		userBinds = Array(resultsNumber).fill(document.createElement('div'));
		if(users === undefined) return;
		Object.keys(users[0]).map((key) => (headers += `${key},`));
		// remove last comma
		headers = headers.slice(0, -1);
		setTimeout(() => {
			// Hide all the items except the first 5
			for (let i = 0; i < itemPerpage; i++) {
				//@ts-ignore
				let e = userBinds[i].parentElement.parentElement.parentElement;
				e!.classList.remove('hide');
			}
		}, 0);
	});

	function toggleToolbar(): void {
		let marginValue = toolbar.style.marginRight;
		if (marginValue == '0px') {
			toolbar.style.marginRight = '-220px';
		} else {
			toolbar.style.marginRight = '0px';
		}
	}
	function sellectAll(): void {
		for (let i in userBinds) {
			let e = userBinds[i];
			let id = e?.getAttribute('id');
			if (e!.classList.contains('fa-square-o')) {
				e!.classList.remove('fa-square-o');
				e!.classList.add('fa-check-square-o');
				selectedIds.add(id!);
			}
		}
	}
	function deselectAll(): void {
		for (let i in userBinds) {
			let e = userBinds[i];
			let id = e?.getAttribute('id');
			if (e!.classList.contains('fa-check-square-o')) {
				e!.classList.remove('fa-check-square-o');
				e!.classList.add('fa-square-o');
				selectedIds.delete(id!);
			}
		}
	}
	function pagination(page: number): void {
		let start = page * itemPerpage;
		let end = start + itemPerpage;
		if (end > users.length) {
			end = users.length;
		}
		// Hide all the items
		for (let i = 0; i < userBinds.length; i++) {
			//@ts-ignore
			let e = userBinds[i].parentElement.parentElement.parentElement;
			e!.classList.add('hide');
		}
		for (let i = start; i < end; i++) {
			//@ts-ignore
			let e = userBinds[i].parentElement.parentElement.parentElement;
			e!.classList.remove('hide');
		}
	}

	// Merge users
	async function merge() {
		let ids = Array.from(selectedIds);
		if (ids.length < 2 || ids.length > 2) {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please sellect two users.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}
		alertCont.innerHTML = '';
		let check = confirm(`Are you sure you want to merge these users-(${ids[0]}-${ids[1]})?`);
		if (check) {
			// Send merge request
			await fetch(`${API}/users/merge`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					from_id: ids[0],
					to_id: ids[1]
				})
			}).then((res) => {
				if (res.status === 200) {
					alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
												<strong>Success!</strong> Users merged successfully.
												<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
											</div>`;
					// Remove the merged users
					for (let i in userBinds) {
						let e = userBinds[i];
						let id = e?.getAttribute('id');
						if (id === ids[0] || id === ids[1]) {
							//@ts-ignore
							let e = userBinds[i].parentElement.parentElement.parentElement;
							e!.classList.add('hide');
						}
					}
				} else {
					res.json().then((data) => {
						alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
													<strong>Error!</strong> ${data.details}.
													<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
												</div>`;
					});
				}
			});
		}
	}

	// Edit user
	function editUser(userId: string) {
		// Get user data
		window.location.href = `${base}/info/${userId}`;
	}
	let selectedUsersArray = [] as any;
	async function getUsersData() {
		for (let i = 0; i < Array.from(selectedIds).length; i++) {
			let userId = Array.from(selectedIds)[i];
			// Request user data
			await fetch(`${API}/users/${userId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error === undefined) {
						selectedUsersArray.push(data);
					} else {
						alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> ${data.error}.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
					}
				});
		}
	}
	// Download data
	async function downloadasCSV() {
		await getUsersData();
		alertCont.innerHTML = '';
		let fileName = prompt('Enter file name:', 'users');
		if (!fileName) {
			return;
		}
		if (fileName == null) fileName = 'users';
		let jsondata = JSON.parse(JSON.stringify(Array.from(selectedUsersArray)));
		let wb = XLSX.utils.book_new();
		let ws = XLSX.utils.json_to_sheet(jsondata);
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, `${fileName}.csv`);
	}
	async function downloadasExcel() {
		await getUsersData();
		alertCont.innerHTML = '';
		let fileName = prompt('Enter file name:', 'users');
		if (!fileName) {
			return;
		}
		if (fileName == null) fileName = 'users';
		let jsondata = JSON.parse(JSON.stringify(Array.from(selectedUsersArray)));
		let wb = XLSX.utils.book_new();
		let ws = XLSX.utils.json_to_sheet(jsondata);
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, `${fileName}.xlsx`);
	}
</script>

<!-- svelte-ignore missing-declaration -->
<svelte:head>
	<script
		defer
		src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
	<title>Search results</title>
</svelte:head>

<div class="loading" bind:this={loading}>
	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>

{#if resultsNumber == undefined}
	<div class="loading">
		<h1>Searching...</h1>
	</div>
{:else if resultsNumber == 0}
	<section class="notfound">
		<lottie-player src={lottieNotfound} background="transparent" speed="1" loop nocontrols />
		<h1>No results found</h1>
		<p>Try to search for something else.</p>
		<button
			class="btn btn-primary d-flex gap-3 align-items-center"
			on:click={() => (window.location.href = `${base}/admin/${adminId}`)}
		>
			<i class="fa fa-arrow-left" />
			Back
		</button>
	</section>
{:else if resultsNumber > 0}
	<section class="found">
		<img class="d1" src={dotsSrc} alt="" />
		<div class="d2" />
		<nav class="navbar navbar-expand-sm navbar-light sticky-top shadow">
			<div class="container">
				<div class="navbar-brand d-flex col align-items-center">
					<span class="fa fa-group ms-3 me-3" />
					<h4 class="p-0 m-0">Search results</h4>
				</div>
				<div class="navbar-nav">
					<button
						class="btn d-flex gap-3 align-items-center"
						on:click={() => (window.location.href = `${base}/admin/${adminId}`)}
					>
						<i class="fa fa-arrow-left" />
						Back
					</button>
				</div>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="row justify-content-center align-items-start">
				<div class="card filter p-0 col-sm shadow" style="max-width: 350px; min-width: max-content">
					<h4 class="card-header">
						<span class="fa fa-search" />
						Filter
					</h4>
					<div class="card-body p-3">
						<div class="form p-4 m-0" bind:this={formCont}>
							<div class="mb-3">
								<label for="email" class="form-label mb-0">Email address</label>
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
								<label for="fullName" class="form-label mb-0"
									>First name, surname or patronymic</label
								>
								<input
									type="text"
									class="form-control"
									id="fullName"
									placeholder="Enter the user name"
									bind:value={name}
								/>
							</div>
							<div class="mb-3">
								<label for="region">Permission</label>
								<select
									class="form-select form-select-sm"
									aria-label="Default select example"
									bind:value={userPermission}
								>
									<option selected>Choose...</option>
									{#each ['default', 'teacher', 'admin', 'super_admin'] as per}
										<option>{per}</option>
									{/each}
								</select>
							</div>
							<div class="mb-3">
								<label for="region">Region</label>
								<select
									class="form-select form-select-sm"
									aria-label="Default select example"
									bind:value={region}
								>
									<option selected>Choose...</option>
									{#each republics as republic}
										<option>{republic}</option>
									{/each}
								</select>
							</div>
							<div class="mb-3">
								<div class="form-group">
									<label for="education">Education type</label>
									<select
										class="form-select form-select-sm"
										aria-label="Default select example"
										bind:value={eduType}
									>
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
												<input
													type="text"
													class="form-control"
													id="school"
													placeholder="Enter your school name"
													bind:value={institute}
												/>
											</div>
											<!--School Year-->
											<div class="form-group col-md-4">
												<label for="schoolYear">School Year</label>
												<select
													class="form-select form-select"
													aria-label="Default select example"
													bind:value={year}
												>
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
												<input
													type="text"
													class="form-control"
													id="Institute"
													placeholder="Enter your Institute name"
													bind:value={institute}
												/>
											</div>
											<!--Institute  Year-->
											<div class="form-group col-md-4">
												<label for="Institute Year">Institute Year</label>
												<select
													class="form-select form-select"
													aria-label="Default select example"
													bind:value={year}
												>
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
												<input
													type="text"
													class="form-control"
													id="College"
													placeholder="Enter your College name"
													bind:value={institute}
												/>
											</div>
											<!--College  Year-->
											<div class="form-group col-md-4">
												<label for="College Year">College Year</label>
												<select
													class="form-select form-select"
													aria-label="Default select example"
													bind:value={year}
												>
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
					</div>
					<!-- <div class="managment" style="display: none">
						<div class="card-header d-flex justify-content-left align-items-center">
							<i class="fa fa-cogs me-3" style:font-size="20px" />
							<h4 class="card-title mt-2">Management</h4>
						</div>
						<div class="btn-group card-body p-3 gap-2 me-2 align-items-stretch" role="group">
							<button
								type="button"
								class="btn btn-primary d-flex align-items-center rounded-1"
								on:click={sellectAll}
							>
								<i class="fa fa-plus me-3" />
								Select all
							</button>
							<button
								type="button"
								class="btn btn-primary d-flex align-items-center rounded-1"
								on:click={deselectAll}
							>
								<i class="fa fa-minus me-3" />
								Deselect all
							</button>
							<button
								type="button"
								class="btn btn-primary d-flex align-items-center rounded-1"
								on:click={merge}
							>
								<i class="fa-solid fa-code-merge me-3" />
								Merge selected
							</button>
							<div class="dropdown d-flex align-items-center rounded-1  p-0">
								<button
									class="btn btn-primary dropdown-toggle"
									type="button"
									id="dropdownMenuButton1"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i class="fa fa-download me-3" />
									Download selected
								</button>
								<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
									<li class="dropdown-item">
										<span class="dropdown-item" style:cursor="pointer" on:click={downloadasCSV}>
											CSV
										</span>
									</li>
									<li class="dropdown-item">
										<span class="dropdown-item" style:cursor="pointer" on:click={downloadasExcel}>
											Excel (.xlsx)</span
										>
									</li>
								</ul>
							</div>
						</div>
					</div> -->
				</div>
				<div
					class="card results p-0 col-sm shadow"
					style="max-width: 350px; min-width: max-content"
				>
					<div class="card-body">
						{#each users as user, i}
							<div class="user hide d-flex flex-row align-items-stretch" bind:this={userCont}>
								{#if i % 2 == 0}
									<div class="userInfo even d-flex flex-row align-items-center">
										<div class="selectBox m-1 me-4 mb-0">
											<i
												class="select fa fa-square-o"
												id={user.id}
												bind:this={userBinds[i]}
												on:click|capture={() => handleSelect(i)}
											/>
										</div>
										<div class="info">
											<div class="d-flex justify-content-between align-items-center">
												<span class="d-inline">{user.name + ' ' + user.surname}</span>
												<i
													class="fa fa-edit m-1"
													style="cursor:pointer; color:#3490dc"
													on:click={() => editUser(user.id)}
												/>
											</div>
										</div>
									</div>
								{:else}
									<div class="userInfo d-flex flex-row align-items-center">
										<div class="selectBox m-1 me-4 mb-0">
											<i
												class="select fa fa-square-o"
												id={user.id}
												bind:this={userBinds[i]}
												on:click|capture={() => handleSelect(i)}
											/>
										</div>
										<div class="info">
											<div class="d-flex justify-content-between align-items-center">
												<span class="d-inline">{user.name + ' ' + user.surname}</span>
												<i
													class="fa fa-edit m-1"
													style="cursor:pointer; color:#3490dc"
													on:click={() => editUser(user.id)}
												/>
											</div>
										</div>
									</div>
								{/if}
							</div>
						{/each}
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
			</div>
		</div>
		<div class="toolbar shadow d-flex flex-row align-items-stretch" bind:this={toolbar}>
			<i
				class="fa fa-cogs me-3 d-flex justify-contnet-center align-items-center"
				on:click={toggleToolbar}
			/>
			<div class="btn-group-vertical gap-2 me-2 align-items-stretch" role="group">
				<button
					type="button"
					class="toolbarBtn d-flex align-items-center rounded-1"
					on:click={sellectAll}
				>
					<i class="fa fa-plus me-3" />
					Select all
				</button>
				<button
					type="button"
					class="toolbarBtn d-flex align-items-center rounded-1"
					on:click={deselectAll}
				>
					<i class="fa fa-minus me-3" />
					Deselect all
				</button>
				<button
					type="button"
					class="toolbarBtn d-flex align-items-center rounded-1"
					on:click={merge}
				>
					<i class="fa-solid fa-code-merge me-3" />
					Merge selected
				</button>
				<div class="dropdown toolbarBtn d-flex align-items-center rounded-1 p-0">
					<button
						class="btn toolbarBtn dropdown-toggle"
						type="button"
						id="dropdownMenuButton1"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i class="fa fa-download m-0 me-3" />
						Download selected
					</button>
					<ul class="dropdown-menu">
						<li class="dropdown-item">
							<span class="dropdown-item" style:cursor="pointer" on:click={downloadasCSV}>
								CSV
							</span>
						</li>
						<li class="dropdown-item">
							<span class="dropdown-item" style:cursor="pointer" on:click={downloadasExcel}>
								Excel (.xlsx)</span
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<div class="alertCont" bind:this={alertCont} />
	<div class="hide">keephideClass</div>
{/if}

<style lang="scss">
	@import '../../../../../lib/Assets/common.scss';
	.notfound {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 38px);
		font-family: 'Medium', sans-serif;
		p {
			font-family: 'Light', sans-serif;
		}
		lottie-player {
			max-width: 500px;
			margin-top: -40px;
		}
	}
	.found {
		@include bg;
		min-height: calc(100vh - 38px);
		background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);
		font-family: 'Medium', sans-serif;
		.card {
			margin: 20px !important;
			.form-select {
				margin: 0px;
				&:focus {
					border-bottom: 0px !important;
				}
			}
		}
		.results {
			min-width: max-content !important;
			max-width: 400px;
		}
		.userInfo {
			width: 100%;
		}
		.even {
			background-color: $bg-color;
		}
		.info {
			width: 100%;
			display: flex;
			flex-flow: column nowrap;
		}
		nav {
			background-color: white;
		}
		.form {
			position: relative;
			z-index: 1;
			font-family: 'Light', sans-serif;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
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
		input,
		.form-select {
			border-radius: 0;
			border: 0px;
			border-bottom: 2px solid $secondary-color;
			font-size: 15px;

			&:focus {
				border-bottom: 2px solid $primary-color !important;
				outline: none;
				box-shadow: none;
			}
		}
		.select {
			font-size: 20px;
			opacity: 0.8;
			cursor: pointer;
			color: $secondary-color;
		}
		.toolbar {
			--height: 190px;
			margin-right: -220px;
			position: fixed;
			right: 0;
			top: calc(50% - var(--height) / 2);
			width: max-content;
			height: var(--height);
			display: flex;
			justify-content: space-between;
			align-items: center;
			transition: all 0.3s ease-in-out;
			background-color: $secondary-color;
			z-index: 6;
			border: 1px solid rgba(74, 170, 235, 0.1);
			border-radius: 0.5rem;
			.fa-cogs {
				padding: 10px;
				padding-left: 20px;
				font-size: 30px;
				cursor: pointer;
				color: white;
			}
			.toolbarBtn {
				color: white;
				padding: 5px;
				background-color: transparent;
				border: none;
				&:hover {
					background-color: $secondary-color;
					color: white;
				}
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
				height: 100%;
				border: none;
				border-radius: 0px;
				background-color: $secondary-color;
				color: white;
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
	}
	.hide {
		display: none !important;
	}
	.alertCont {
		position: fixed;
		bottom: 30px;
		left: 30px;
	}
	@media screen and (max-width: 650px) {
		.filter,
		.results {
			max-width: 100% !important;
			min-width: 100% !important;
			width: 100% !important;
		}
	}
</style>
