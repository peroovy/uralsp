<script context="module">
	//@ts-ignore
	export async function load({ params }) {
		return {
			props: {
				adminId: params.adminId,
				searchQueries: params.q
			}
		};
	}
</script>

<script lang="ts">
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import lottieNotfound from '$lib/Assets/animations/lottie-notFound.json?url';
	import { onMount, onDestroy } from 'svelte';
    import * as XLSX from 'xlsx';
	const { utils } = XLSX;
    import { republics } from '$lib/Assets/republics.json';
	import { searchparams }  from '$lib/stores';

	export let searchQueries, adminId: string;
	let userCont = '' as unknown as HTMLElement;
	let toolbar = '' as unknown as HTMLElement;
	let alertCont = '' as unknown as HTMLElement;
	$: itemPerpage = 5;


	// filter data
	let InstituteYear = [
        "1 (bachelor / specialty)",
        "2 (bachelor / specialty)",
        "3 (bachelor / specialty)",
        "4 (bachelor / specialty)",
        "5 (specialty)",
        "6 (specialty)",
        "1 (master)",
        "2 (master)",
    ]
	let formCont = '' as unknown as HTMLElement;
	let email: string, name: string, region: string | undefined, eduType: string | undefined, institute: string, year: string;
	eduType = "Choose...";
	interface searchParams {
		email: string,
		name: string,
		region: string | undefined,
		eduType: string | undefined,
		institute: string,
		year: string,
	};
	let searchParams: searchParams = {
		email: '',
		name: '',
		region: '',
		eduType: '',
		institute: '',
		year: '',
	};
	function queryParams(){
		searchParams.email = email;
		searchParams.name = name;
		searchParams.region = (region === "Choose...") ? undefined : region;
		searchParams.eduType = (region === "Choose...") ? undefined : eduType;
		searchParams.institute = institute;
		searchParams.year = year;
		
		// form validation
		let arrValues = [searchParams.email, searchParams.name, searchParams.region, searchParams.eduType, searchParams.institute, searchParams.year];
		let check = arrValues.every(item => item === undefined);
		if(check){
			alertCont.innerHTML =  `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please fill at least one field.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}
		alertCont.innerHTML = '';

		// saving search params to store
		searchparams.set(JSON.stringify(searchParams));
		// removing the undefinded values from the search params
		searchParams = JSON.parse(JSON.stringify(searchParams));
		//@ts-ignore
		const myURL = new URLSearchParams(searchParams);
		goto(`${base}/admin/AdminID/${myURL.toString()}`);
	}

	let selectedIds = new Set<string>();
	let userBinds = [] as HTMLElement[];
	function handleSelect(index: number) {
		let e = userBinds[index];
		let b = (e.parentElement?.nextElementSibling as HTMLElement).children[2].children[0];
		let id = b?.getAttribute('id');
		if (e!.classList.contains('fa-square-o')) {
			e!.classList.remove('fa-square-o');
			e!.classList.add('fa-check-square-o');
			b!.innerHTML = `<i class="fa fa-minus me-1"></i>  
            Deselect`;
			selectedIds.add(id!);
		} else {
			e!.classList.remove('fa-check-square-o');
			e!.classList.add('fa-square-o');
			selectedIds.delete(id!);
			b!.innerHTML = `<i class="fa fa-plus me-1"></i> Select`;
		}
	}

	let users = [
		{
			id: '1',
			name: 'John Doe',
			role: 'Participant'
		},
		{
			id: '2',
			name: 'Jane Doe',
			role: 'Teacher'
		},
		{
			id: '3',
			name: 'Jack Doe',
			role: 'Admin'
		},
		{
			id: '4',
			name: 'Jill Doe',
			role: 'Participant'
		},
		{
			id: '5',
			name: 'Joe Doe',
			role: 'Participant'
		},
		{
			id: '6',
			name: 'Jenny Doe',
			role: 'Teacher'
		},
		{
			id: '7',
			name: 'Juan Doe',
			role: 'Teacher'
		},
		{
			id: '8',
			name: 'Jenny Doe',
			role: 'Participant'
		},
		{
			id: '9',
			name: 'Juan Doe',
			role: 'Teacher'
		},
		{
			id: '10',
			name: 'Jenny Doe',
			role: 'Teacher'
		}
	];

	let headers = '';
	
	onMount(() => {
		// Hide all the items except the first 5
		for (let i = 0; i < itemPerpage; i++) {
			//@ts-ignore
			let e = userBinds[i].parentElement.parentElement.parentElement;
			e!.classList.remove('hide');
		}
		Object.keys(users[0]).map((key) => headers+= `${key},`);
		// remove last comma
		headers = headers.slice(0, -1);
	});

	let resultsNumber = users.length;

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
			let b = (e.parentElement?.nextElementSibling as HTMLElement).children[2].children[0];
			let id = b?.getAttribute('id');
			if (e!.classList.contains('fa-square-o')) {
				e!.classList.remove('fa-square-o');
				e!.classList.add('fa-check-square-o');
				b!.innerHTML = `<i class="fa fa-minus me-1"></i>  
                Deselect`;
				selectedIds.add(id!);
			}
		}
	}
	function deselectAll(): void {
		for (let i in userBinds) {
			let e = userBinds[i];
			let b = (e.parentElement?.nextElementSibling as HTMLElement).children[2].children[0];
			let id = b?.getAttribute('id');
			if (e!.classList.contains('fa-check-square-o')) {
				e!.classList.remove('fa-check-square-o');
				e!.classList.add('fa-square-o');
				selectedIds.delete(id!);
				b!.innerHTML = `<i class="fa fa-plus me-1"></i> Select`;
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
	function merge() {
		let ids = Array.from(selectedIds);
		if (ids.length < 2) {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please sellect at least two users.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}
		alertCont.innerHTML = '';
	}

    // Download data
	let selectedUsersArray = new Set();
	function updateSelected(){
		selectedUsersArray = new Set();
		for (let i = 0; i < users.length; i++) {
			if (selectedIds.has(users[i].id)) {
				selectedUsersArray.add(users[i]);
			}
		}
	}
	function downloadasCSV() {
		updateSelected();
		//check for empty set
		if(selectedUsersArray.size === 0){
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please sellect at least one user.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}
		alertCont.innerHTML= '';
		let fileName = prompt('Enter file name:', 'users');
		if(fileName == null) fileName = 'users';
		let jsondata = JSON.parse(JSON.stringify(Array.from(selectedUsersArray)));
		let wb = XLSX.utils.book_new();
		let ws = XLSX.utils.json_to_sheet(jsondata);
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, `${fileName}.csv`);
	}
	function downloadasExcel(){
		updateSelected();
			//check for empty set
			if(selectedUsersArray.size === 0){
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please sellect at least one user.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
			return;
		}
		alertCont.innerHTML= '';
		let fileName = prompt('Enter file name:', 'users');
		if(fileName == null) fileName = 'users';
		let jsondata = JSON.parse(JSON.stringify(Array.from(selectedUsersArray)));
		let wb = XLSX.utils.book_new();
		let ws = XLSX.utils.json_to_sheet(jsondata);
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, `${fileName}.xlsx`);
	}
	
</script>

<svelte:head>
	<script
		defer
		src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
	<title>Search results</title>
</svelte:head>
{#if resultsNumber == 0}
	<section class="notfound">
		<lottie-player
			src={lottieNotfound}
			background="transparent"
			speed="1"
			loop
			autoplay
			nocontrols
		/>
		<h1>No results found</h1>
		<p>Try to search for something else.</p>
		<button
			class="btn btn-primary d-flex gap-3 align-items-center"
			on:click={() => goto(`${base}/admin/${adminId}`)}
		>
			<i class="fa fa-arrow-left" />
			Back
		</button>
	</section>
{:else}
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
						on:click={() => goto(`${base}/admin/${adminId}`)}
					>
						<i class="fa fa-arrow-left" />
						Back
					</button>
				</div>
			</div>
		</nav>
		<div class="container-fluid p-5">
			<div class="row justify-content-center align-items-start">
				<div class="card p-0 col-sm-5 shadow">
					<h4 class="card-header">
						<span class="fa fa-search" />
						Filter
					</h4>
					<div class="card-body p-3">
						<div class="form p-4 m-0" bind:this={formCont}>
							<div class="mb-3">
								<label for="email" class="form-label">Email address</label>
								<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter the user email" bind:value={email}>
							</div>
							<div class="mb-3">
								<label for="fullName" class="form-label">Full Name</label>
								<input type="text" class="form-control" id="fullName" placeholder="Enter the user full name" bind:value={name}>
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
									</select>
								</div>
								{#if eduType === 'School'}
									<div class="d-flex justify-content-between p-0">
										<div class="row">
											<div class="form-group col-md-8">
												<label for="school">School Name</label>
												<input type="text" class="form-control" id="school" placeholder="Enter your school name" bind:value={institute}>
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
												<input type="text" class="form-control" id="Institute" placeholder="Enter your Institute name" bind:value={institute}>
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
							</div>
							<button class="btn" on:click={queryParams}>Search</button>
						</div>
					</div>
					<div class="managment">
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
										<span class="dropdown-item" style:cursor="pointer" on:click={downloadasCSV}> CSV </span>
									</li>
									<li class="dropdown-item">
										<span class="dropdown-item" style:cursor="pointer" on:click={downloadasExcel}> Excel (.xlsx)</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="card results p-0 col-sm-5 shadow">
					<div class="card-body">
						{#each users as user, i}
							<div class="user hide d-flex flex-row align-items-stretch" bind:this={userCont}>
								{#if i%2 == 0}
								<div class="userInfo even d-flex flex-row align-items-stretch">
									<div class="selectBox m-1 me-4">
										<i
											class="select fa fa-square-o"
											id={user.id}
											bind:this={userBinds[i]}
											on:click|capture={() => handleSelect(i)}
										/>
									</div>
									<div class="info">
										<div class="d-flex justify-content-between">
											<span class="d-inline">{user.name}</span>
											<i class="fa fa-edit m-1" style="cursor:pointer; color:#3490dc"></i>
										</div>
										<!-- <small class="d-block">
											<span class="role">{user.role}</span>
										</small> -->
									</div>
								</div>
								{:else}
								<div class="userInfo d-flex flex-row align-items-stretch">
									<div class="selectBox m-1 me-4">
										<i
											class="select fa fa-square-o"
											id={user.id}
											bind:this={userBinds[i]}
											on:click|capture={() => handleSelect(i)}
										/>
									</div>
									<div class="info">
										<div class="d-flex justify-content-between">
											<span class="d-inline">{user.name}</span>
											<i class="fa fa-edit m-1" style="cursor:pointer; color:#3490dc"></i>
										</div>
										<!-- <small class="d-block">
											<span class="role">{user.role}</span>
										</small> -->
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
		<div class="toolbar d-flex flex-row align-items-stretch" bind:this={toolbar}>
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
							<span class="dropdown-item" style:cursor="pointer" on:click={downloadasCSV}> CSV </span>
						</li>
						<li class="dropdown-item">
							<span class="dropdown-item" style:cursor="pointer" on:click={downloadasExcel}> Excel (.xlsx)</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<div class="alertCont" bind:this={alertCont} />
	<div class="hide">keephide</div>
{/if}

<style lang="scss">
	@import '../../../lib/Assets/common.scss';
	.notfound {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 40px);
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
			.form-select{
				margin: 0px;
				&:focus{
					border-bottom: 0px !important;
				}
			}
		}
		.results{
			min-width: max-content !important;
			max-width: 400px;
		}
		.userInfo{
			width: 100%;
		}
		.even{
			background-color: $bg-color;
		}
		.info{
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
			font-family: "Light", sans-serif;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			h1{
				font-size: 2.5rem;
				font-weight: bold;
				color: #212529;
				margin-bottom: 1rem;
			}
			button, .card-body > button{
				background-color: $secondary-color;
				color: white;
				border: none;
				border-radius: 0.25rem;
				padding: 0.5rem 1rem;
				font-size: 1.25rem;
				font-weight: bold;
				cursor: pointer;
				transition: all 0.3s ease-in-out;
				&:hover{
					background-color: #343a40;
				}
			}
		}
		input, .form-select{
			border-radius: 0;
			border: 0px;
			border-bottom: 2px solid $secondary-color;
			margin-bottom: 20px;
			font-size: 15px;
			
			&:focus{
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
			background-color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			transition: all 0.3s ease-in-out;
			background-color: $primary-color;

			.fa-cogs {
				padding: 10px;
				font-size: 30px;
				cursor: pointer;
				color: $secondary-color;
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
	@media screen and (max-width: 1350px) {
		.managment {
			display: none !important;
			.btn-group {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10px;
				button {
					background-color: $secondary-color;
					border: none;
				}
			}
		}
		.toolbar {
			display: fixed !important;
		}
	}
	@media screen and (min-width: 1350px) {
		.managment {
			display: block !important;
			.btn-group {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10px;
				button {
					background-color: $secondary-color;
					border: none;
				}
			}
		}
		.toolbar {
			display: none !important;
		}
	}
</style>
