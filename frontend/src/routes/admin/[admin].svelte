<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import src from '$lib/Assets/imgs/logo.png';
	import tempPhoto from '$lib/Assets/imgs/temp-photo.png';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { ContestType }  from '$lib/types';
	import lottie  from '$lib/Assets/animations/lottie-search?url';
	import lottieSelect from '$lib/Assets/animations/lottie-select.gif';
    import { republics } from '$lib/Assets/republics.json';
	import { searchparams }  from '$lib/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	
	let adminName = 'Admin';
	let userName = "Admin";
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

	let alertCont = '' as unknown as HTMLElement;
	let sliderCont = '' as unknown as HTMLElement;
	let formCont = '' as unknown as HTMLElement;
	let compsBinds = [] as HTMLElement[];

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
	function onKeyDown(event: KeyboardEvent){
		if(event.key === 'Enter'){
			queryParams();
		}
	}
	function slider(target: string){
		if(browser){
			if(target === "users"){
				localStorage.setItem('oldLocation', target);
				sliderCont.style.marginLeft = "0px";
			} else {
				localStorage.setItem('oldLocation', target);
				sliderCont.style.marginLeft = "-100vw";
			}
		}
	}
	let comps = [
		{
			"id": 0,
			"title": "Contest 1",
		},
		{
			"id": 1,
			"title": "Contest 2",
		},
		{
			"id": 2,
			"title": "Contest 3",
		},
		{
			"id": 3,
			"title": "Contest 4",
		},
		{
			"id": 4,
			"title": "Contest 5",
		},
		{
			"id": 5,
			"title": "Contest 6",
		},
		{
			"id": 6,
			"title": "Contest 7",
		},
		{
			"id": 7,
			"title": "Contest 8",
		},
		{
			"id": 8,
			"title": "Contest 9",
		},
		{
			"id": 9,
			"title": "Contest 10",
		},
		{
			"id": 10,
			"title": "Contest 11",
		}
	]
	let resultsNumber = comps.length;
	$: itemPerpage = 20;
	$: selectedComp = '';
	function pagination(page: number): void {
		let start = page * itemPerpage;
		let end = start + itemPerpage;
		if (end > comps.length) {
			end = comps.length;
		}
		// Hide all the items
		for (let i = 0; i < compsBinds.length; i++) {
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
	let filterCont = '' as unknown as HTMLElement; 
	function filterSlider(){
		if(filterCont.style.marginRight=="0px"){
			filterCont.style.marginRight = "-220px";
		} else {
			filterCont.style.marginRight = "0px";
		}
	}
	onMount(()=>{
		if(browser){
			let oldLocation = localStorage.getItem('oldLocation');
			if (oldLocation == null || oldLocation == undefined || oldLocation == '') {
				localStorage.setItem('basicNav', "users");
			} else {
				if(oldLocation == "users"){
					slider("users")
				} else {
					slider("comp")
				}
			}
		}
		pagination(0);
	})


function selectedCompItem(arg0: string) {
	if(browser){
		if (arg0 == "users") {
			slider("users");
		} else {
			slider("comp");
		}
	}
}
</script>

<svelte:head>
	<script defer src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
	<title>App Name | participant Name</title>
</svelte:head>

<svelte:window on:keydown={onKeyDown} />

<section class="admin-container">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />

	<nav class="navbar navbar-expand-lg navbar-light mb-5 sticky-top shadow-sm">
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
						<span class="nav-link active" id="ongoing" on:click={()=>slider("users")}> Users control </span>
					</li>
					<li class="nav-item" >
						<span class="nav-link" id="registered" on:click={()=>slider("competitions")}> Competitions control </span>
					</li>
					<li class="nav-item dropdown">
						<div
							class="nav-link dropdown-toggle d-flex align-items-center"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img src={tempPhoto} alt="Logo" class="part-photo" />
							<span> {adminName} </span>
						</div>
						<ul class="dropdown-menu mt-2 ms-3 rounded-0">
							<li class:active={$page.url.pathname === '/info'}>
								<a
									sveltekit:prefetch
									href="{base}/info/{1}"
									content="Home"
									class="dropdown-item nav-link"
								>
									<span class="fa fa-gears" />
									Settings
								</a>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li class="dropdown-item nav-link signOut">
								<span class="fa fa-sign-out" />
								Sign out
							</li>
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
					<div class="lottie-container col-lg-6 p-0">
						<lottie-player class="lottie-animations" src={lottie} speed="1" loop nocontrols autoplay></lottie-player>
					</div>
				</div>
			</div>
		</div>
		<div class="slide compHolder">
			<div class="card menu" bind:this={filterCont}>
				<li class="fa fa-filter" on:click={filterSlider}></li>
				<input type="text" class="form-control"  placeholder="Search by competition title ..." id="compName">
				<select class="form-select form-select-sm" aria-label="Default select example" id="compType">
					<option selected>Choose competition status ...</option>
					<option>ongoing</option>
					<option>upcoming</option>
					<option>past</option>
				</select>
				<button class="btn btn-light rounded-0"> Filter </button>
			</div>
			<div class="container-fluid mt-5">
				<div class="row justify-content-center">
					<div class="card col-md-6 comps compt-holder p-0 col-sm-6 shadow me-5 mt-0" style="max-width: max-content; min-width:min-content">
						<h4 class="card-header" style:padding-right="100px">
							<span class="fa fa-book" />
							Competitions
						</h4>
						<div class="card-body p-0 pt-1 shadow">
							{#each comps as comp, i}
							{#if i%2 == 0}
								<div bind:this={compsBinds[i]} class="comp even hide d-flex flex-row align-items-stretch justify-content-between">
									<span class="d-inline">{comp.title}</span>
									<i class="fa fa-edit m-1" style="cursor:pointer; color:#3490dc"></i>
								</div>
							{:else}
								<div bind:this={compsBinds[i]} class="comp hide d-flex flex-row align-items-stretch justify-content-between">
									<span class="d-inline">{comp.title}</span>
									<i class="fa fa-edit m-1" style="cursor:pointer; color:#3490dc"></i>
								</div>
							{/if}
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
					{#if selectedComp === "" }
					<div class="card p-0 col-md-6">
						<div class="card-body p-0 pt-1 shadow">
							<div class="noComp">
								<img src={lottieSelect} alt="" class="gif">
								<p>No Competition Selected, please click on <i class="fa fa-edit" />.</p>
							</div>
						</div>
					</div>
					{:else}
					<div class="card col-md-6 p-0">
						<div class="card-header">
							<span class="fa fa-info-circle" />
							Information
						</div>
						<div class="card-body">

						</div>
						<div class="card-header">
							<span class="fa-solid fa-tasks" />
							Form
						</div>
						<div class="card-body">
							
						</div>
						<div class="card-header">
							<span class="fa fa-users" />
							Applications
						</div>
						<div class="card-body">
							
						</div>
					</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="hide">keephideClass</div>
	<div bind:this={alertCont} class="alertCont"></div>
</section>

<style lang="scss">
	@import '../../lib/Assets/common.scss';
	nav{
		position: relative !important;
		background-color: rgb(236, 236, 236);
		margin-bottom: 0px !important; 
	}
	.admin-container{
		@include bg;
		@include navbar;
		padding: 0;
		margin: 0;
		background-color: #fff;
		min-height: 100vh;
		background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);;
		width: 100vw;
		min-height: 100vh;
		nav{
			width: 100vw !important;
			background-color: rgb(248, 248, 248);
			.nav-link{
				//color: rgba(255, 255, 255, 0.692) !important;
			}
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
			background-color: $bg-color;
			button{
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
		input[type="text"], input[type="email"], select{
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
		.lottie-animations{
			background-color: rgb(240, 240, 240);
			position: relative;
			z-index: 2;
		}
	}
	.sliderCont{
		width: 200vw;
		display: flex;
		flex-flow: row nowrap;
		transition: all 0.3s ease-in-out;
		.slide{
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
	.alertCont{
		position: fixed;
		bottom: 30px;
		left: 30px;
	}
	.card{
		border: none;
		border-radius: 0;
		background-color: #fff;
	}
	.hide {
		display: none !important;
	}
	.menu{
		position: sticky;
		top: 0;
		z-index: 5;
		display: flex !important;
		flex-flow: row wrap!important;
		justify-content: center !important;
		padding: 20px 0px;
		gap: 10px !important;
		margin-bottom: 20px !important;
		border-radius: 0px;
		width: 100vw !important;
		background: $secondary-color !important;
		color: white;
		font-family: "Light", sans-serif;
		
		input, select, button{
			width: 300px;
			height: 40px;
			border: none !important;
			margin: 0px !important;
			border-radius: 20px !important;
			padding: 0px 30px !important;
		}
		button{
			width: fit-content;
		}

	}
	.noComp{
		font-family: 'Light', sans-serif;
		height: 100%;
		text-align: center;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		p{
			font-size: 14px;
			align-self: center;
			color: #212529;
			margin-top: 190px;
			position: absolute;
			.fa{
				opacity: 0.3;
			}
		}
		.gif{
			width: 250px;
			height: 250px;
			margin-top: 0px;
			padding: 0px;
		}
	}
	.comps{
		font-family: "light", sans-serif;
		margin-top: 100px;
		.comp{
			padding: 6px 10px;
		}
		.even{
			background-color: $bg-color;
		}
		.info{
			width: 100%;
			display: flex;
			flex-flow: column nowrap;
			
		}
	}
	@media screen and (min-width: 1000px) {
		.navbar-nav {
			align-items: center !important;
		}
		.form-group{
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
	@media screen and (max-width: 800px){
		.compt-filter, .compt-holder{
			max-width: 100vw !important;
			margin: 0px !important;
			margin-bottom: 50px !important;
			width: 100vw;
		}
		.menu{
			--height: 180px;
			height: var(--height);
			position: absolute;
			right: 0px;
			top: calc(50% - var(--height)/2);
			flex-flow: column nowrap !important;
			padding: 20px !important;
			justify-content: left !important;
			width: fit-content !important;
			transition: all 0.3s ease-in-out;
			margin-right: -220px;
			input, select, button{
				width: 200px;
				height: 40px !important;
				border: none !important;
				margin: 0px !important;
				padding: 0px 30px;
				margin-left: 40px !important;
			}
			.fa{
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
			button{
				width: fit-content;
				background-color: $primary-color;
				color: white;
			}
		}
	}
	@media screen and (min-width: 800px){
		.menu{
			.fa{
				display: none !important;
			}
		}
	}
</style>
