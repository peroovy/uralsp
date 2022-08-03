<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import src from '$lib/Assets/imgs/logo.png';
	import tempPhoto from '$lib/Assets/imgs/temp-photo.png';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { ContestType }  from '$lib/types';
	import lottie  from '$lib/Assets/animations/lottie-search?url';
    import { republics } from '$lib/Assets/republics.json';
	import { searchparams }  from '$lib/stores';
	import { goto } from '$app/navigation';

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
		if(target === "users"){
			sliderCont.style.marginLeft = "0px";
		} else {
			sliderCont.style.marginLeft = "-100vw";
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
									href="{base}/info/{userName}"
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
			<div class="container">
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
		<div class="slide">
			<div class="container">
				<div class="row justify-content-center align-items-stretch shadow">
					
				</div>
			</div>
		</div>
	</div>
	<div bind:this={alertCont} class="alertCont"></div>
</section>

<style lang="scss">
	@import '../../lib/Assets/common.scss';
	.admin-container {
		width: 100vw;
		min-height: 100vh;
		align-items: center;
		background-color: white;
		@include bg;
		text-align: left;
		display: flex;
		@include navbar;
		background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);;

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
		input, select{
			border-radius: 0;
			border: 0px;
			border-bottom: 2px solid $secondary-color;
			margin-bottom: 20px;
			//font-family: "Light";
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
		.sliderCont{
			width: 200vw;
			display: flex;
			flex-flow: row nowrap;
			transition: all 0.3s ease-in-out;
			.slide{
				width: 100vw;
			}
		}
	}
	.alertCont{
		position: fixed;
		bottom: 30px;
		left: 30px;
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
</style>
