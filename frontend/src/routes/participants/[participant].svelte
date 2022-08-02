<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import {contest}  from '$lib/stores';
	import src from '$lib/Assets/imgs/logo.png';
	import tempPhoto from '$lib/Assets/imgs/temp-photo.png';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { ContestType }  from '$lib/types'
	
	let userName = "userName";
	let paricipantName = 'Participant Name';
    let contestObject : ContestType= {
		contestID: 'ID',
		contestTitle: 'Contest Name',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Etiam erat velit scelerisque in dictum non consectetur a. Rhoncus aenean vel elit scelerisque mauris. Rutrum quisque non tellus orci. Aliquam sem fringilla ut morbi tincidunt. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Leo vel orci porta non. Eget dolor morbi non arcu risus quis varius quam quisque. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Congue eu consequat ac felis donec. Sit amet massa vitae tortor condimentum lacinia quis. Consequat mauris nunc congue nisi vitae suscipit tellus. Montes nascetur ridiculus mus mauris vitae ultricies. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Maecenas accumsan lacus vel facilisis volutpat est. Gravida rutrum quisque non tellus orci. At imperdiet dui accumsan sit. Adipiscing elit duis tristique sollicitudin nibh sit amet. Tellus molestie nunc non blandit massa enim nec dui. Pellentesque dignissim enim sit amet venenatis urna. Et odio pellentesque diam volutpat. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Tortor at auctor urna nunc. Pulvinar neque laoreet suspendisse interdum consectetur. Magna sit amet purus gravida quis blandit turpis cursus in. Velit scelerisque in dictum non consectetur a erat. At tempor commodo ullamcorper a lacus vestibulum. Massa ultricies mi quis hendrerit dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut placerat orci nulla pellentesque dignissim. Nibh tellus molestie nunc non. In pellentesque massa placerat duis ultricies lacus sed turpis. Enim ut tellus elementum sagittis.',
        start_time: 'August 1, 2022',
		end_time: 'August 22, 2022',
		writerName: 'Writer Name',
		form: {
            shortQuestion: ["What is your first name?", "What is your last name?"],
            longQuestion: ["How is your life Going?"],
            mcqs: [{
				question: "What is your favorite color?",
				numberOfOptions: 4,
				options: ["Red", "Blue", "Green", "Yellow"],
				numberOFAllowedOptions: {
					one: 1,
					more: 0
				}
			}, 
			{
				question: "What is your favorite food?",
				numberOfOptions: 4,
				options: ["Pizza", "Pasta", "Burger", "Sandwich"],
				numberOFAllowedOptions: {
					one: 0,
					more: 1
				}
			}],
			uploads: ["Upload your CV"],
		},
    }
    let showContest = () => {
		contest.set(JSON.stringify(contestObject));
    }


	// Sections slider
	let sectionHolders = "" as unknown as HTMLElement;
	let navBar = "" as unknown as HTMLElement;

	function toSec(name: string): void{
		controlActive(name);
		if(name == "ongoing"){
			sectionHolders.style.marginLeft = "0px";
		} else if (name == "registered"){
			sectionHolders.style.marginLeft = "-100vw";
		} else if (name == "past"){
			sectionHolders.style.marginLeft = "-300vw";
		} else if (name == "pending"){
			sectionHolders.style.marginLeft = "-200vw";
		}
	}

	function controlActive(activeEle : string): void{
		let navs = navBar.querySelectorAll(".nav-link");
		for(let i = 0; i < navs.length; i++){
			navs[i].classList.remove("active");
		}
		(navBar.querySelector(`#${activeEle}`) as HTMLElement).classList.add("active");
	}
</script>

<svelte:head>
	<title>App Name | participant Name</title>
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
					<li class="nav-item" on:click={()=>toSec("ongoing")}>
						<span class="nav-link active" id="ongoing"> Ongoing Contests </span>
					</li>
					<li class="nav-item" on:click={()=>toSec("registered")}>
						<span class="nav-link" id="registered"> Registered Contests </span>
					</li>
					<li class="nav-item" on:click={()=>toSec("pending")}> 
						<span class="nav-link" id="pending"> Pending Requests </span>
					</li>
					<li class="nav-item" on:click={()=>toSec("past")}>
						<span class="nav-link" id="past"> Past Contests </span>
					</li>
					<li class="nav-item dropdown">
						<div
							class="nav-link dropdown-toggle d-flex align-items-center"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img src={tempPhoto} alt="Logo" class="part-photo" />
							<span> {paricipantName} </span>
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

	<div class="parts-container p-0" bind:this={sectionHolders}>
		<div class="row part_4 justify-content-center" id="ongoing">
			<div class="col-md-6">
				<div class="card shadow-sm border-0">
					<div class="card-header bg-light">
						<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
							<div class="navbar-brand">
								<h4 class="m-0">onGoing: Contest title</h4>
							</div>
							<button
								class="navbar-toggler border-0"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#contest_1_data"
								aria-controls="contest_1_data"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span class="fa fa-ellipsis-v" style="font-size: 25px" />
							</button>
							<div class="collapse navbar-collapse" id="contest_1_data">
								<ul class="navbar-nav mr-auto col-12 justify-content-end gap-3">
									<li class="nav-item d-flex align-items-center">
										<i class="fa fa-pencil me-1" />
										<span id="WriterName"> Writer Name </span>
									</li>
									<li class="nav-item">
										<i class="fa fa-calendar me-1" />
										<span id="WriterName"> 15 Aug, 20:00 Am </span>
									</li>
								</ul>
							</div>
						</nav>
					</div>
					<div class="card-body gap-2">
						<p class="contest-description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
							consectetur sagittis, nisl nisi consectetur nisi, euismod eget nisl nisi euismod eget
							nisl nisi.
						</p>
						<div class="btn btn-group gap-2 on:click={showContest}">
							<button class="btn btn-primary">
								<a class="link-light" href="/contests/apply/{contestObject.contestID}-apply" target="_blank">
									<span class="fa fa-check-square-o" />
									<span class="ptn-count"> Apply </span>
								</a>
							</button>
							<button class="btn btn-primary" on:click={showContest}>
								<a class="link-light" href="/contests/{contestObject.contestID}" target="_blank">
									<span class="fa fa-eye" />
									<span> View full Contest</span>
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row part_4 justify-content-center" id="registered">
			<div class="col-md-6">
				<div class="card shadow-sm border-0">
					<div class="card-header bg-light">
						<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
							<div class="navbar-brand">
								<h4 class="m-0">registered: Contest title</h4>
							</div>
							<button
								class="navbar-toggler border-0"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#contest_1_data"
								aria-controls="contest_1_data"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span class="fa fa-ellipsis-v" style="font-size: 25px" />
							</button>
							<div class="collapse navbar-collapse" id="contest_1_data">
								<ul class="navbar-nav mr-auto col-12 justify-content-end gap-3">
									<li class="nav-item d-flex align-items-center">
										<i class="fa fa-pencil me-1" />
										<span id="WriterName"> Writer Name </span>
									</li>
									<li class="nav-item">
										<i class="fa fa-calendar me-1" />
										<span id="WriterName"> 15 Aug, 20:00 Am </span>
									</li>
								</ul>
							</div>
						</nav>
					</div>
					<div class="card-body gap-2">
						<p class="contest-description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
							consectetur sagittis, nisl nisi consectetur nisi, euismod eget nisl nisi euismod eget
							nisl nisi.
						</p>
						<div class="btn btn-group gap-2 on:click={showContest}">
							<button class="btn btn-primary">
								<a class="link-light" href="/contests/apply/{contestObject.contestID}-apply" target="_blank">
									<span class="fa fa-check-square-o" />
									<span class="ptn-count"> Apply </span>
								</a>
							</button>
							<button class="btn btn-primary" on:click={showContest}>
								<a class="link-light" href="/contests/{contestObject.contestID}" target="_blank">
									<span class="fa fa-eye" />
									<span> View full Contest</span>
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row part_4 justify-content-center" id="pending">
			<div class="col-md-6">
				<div class="card shadow-sm border-0">
					<div class="card-header bg-light">
						<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
							<div class="navbar-brand">
								<h4 class="m-0">pending: Contest title</h4>
							</div>
							<button
								class="navbar-toggler border-0"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#contest_1_data"
								aria-controls="contest_1_data"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span class="fa fa-ellipsis-v" style="font-size: 25px" />
							</button>
							<div class="collapse navbar-collapse" id="contest_1_data">
								<ul class="navbar-nav mr-auto col-12 justify-content-end gap-3">
									<li class="nav-item d-flex align-items-center">
										<i class="fa fa-pencil me-1" />
										<span id="WriterName"> Writer Name </span>
									</li>
									<li class="nav-item">
										<i class="fa fa-calendar me-1" />
										<span id="WriterName"> 15 Aug, 20:00 Am </span>
									</li>
								</ul>
							</div>
						</nav>
					</div>
					<div class="card-body gap-2">
						<p class="contest-description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
							consectetur sagittis, nisl nisi consectetur nisi, euismod eget nisl nisi euismod eget
							nisl nisi.
						</p>
						<div class="btn btn-group gap-2">
							<button class="btn btn-primary on:click={showContest}">
								<a class="link-light" href="/contests/apply/{contestObject.contestID}-apply" target="_blank">
									<span class="fa fa-pencil" />
									<span class="ptn-count"> Edit Your Application </span>
								</a>
							</button>
							<button class="btn btn-primary" on:click={showContest}>
								<a class="link-light" href="/contests/{contestObject.contestID}" target="_blank">
									<span class="fa fa-eye" />
									<span> View full Contest</span>
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row part_4 justify-content-center" id="past">
			<div class="col-md-6">
				<div class="card shadow-sm border-0">
					<div class="card-header bg-light">
						<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
							<div class="navbar-brand">
								<h4 class="m-0">past: Contest title</h4>
							</div>
							<button
								class="navbar-toggler border-0"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#contest_1_data"
								aria-controls="contest_1_data"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span class="fa fa-ellipsis-v" style="font-size: 25px" />
							</button>
							<div class="collapse navbar-collapse" id="contest_1_data">
								<ul class="navbar-nav mr-auto col-12 justify-content-end gap-3">
									<li class="nav-item d-flex align-items-center">
										<i class="fa fa-pencil me-1" />
										<span id="WriterName"> Writer Name </span>
									</li>
									<li class="nav-item">
										<i class="fa fa-calendar me-1" />
										<span id="WriterName"> 15 Aug, 20:00 Am </span>
									</li>
								</ul>
							</div>
						</nav>
					</div>
					<div class="card-body gap-2">
						<p class="contest-description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
							consectetur sagittis, nisl nisi consectetur nisi, euismod eget nisl nisi euismod eget
							nisl nisi.
						</p>
						<div class="btn btn-group gap-2">
							<button class="btn btn-primary" on:click={showContest}>
								<a class="link-light" href="/contests/{contestObject.contestID}" target="_blank">
									<span class="fa fa-eye" />
									<span> View full Contest</span>
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import '../../lib/Assets/common.scss';
	.participant-container {
		width: 100vw;
		min-height: 100vh;
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
		width: 100vw;
		flex-direction: row nowrap;
	}
	.part_4{
		flex-shrink: 0;
		padding: 0px !important;
		margin: 0px !important;
		width: 100% !important;
	}
	nav{
		position: sticky !important;
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
