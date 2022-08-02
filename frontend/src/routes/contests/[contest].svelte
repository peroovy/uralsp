<script lang="ts">
	import { contest }  from '$lib/stores';
	import { onMount } from 'svelte';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { ContestType }  from '$lib/types'
	import { goto } from '$app/navigation';

	let contestObject: ContestType = {
		contestID: '',
		writerName: '',
		contestTitle: '',
		description: '',
		start_time: '',
		end_time: '',
		form: {
            longQuestion: [],
            shortQuestion: [],
            mcqs: [],
            uploads: []
        }
	};
	
	let ID: String, title : HTMLElement, description : HTMLElement, start_time : HTMLElement, end_time : HTMLElement, writer : HTMLElement;
	let remaningTime = '' as unknown as HTMLElement;
	let showApplication = '' as unknown as HTMLElement;
	let now = new Date();
	let end = new Date();
	function updateDate(){
		if(now > end){
			remaningTime.innerHTML = '<span class="text-danger">Contest has ended</span>';
		} else {
			// remainning time in days, hours, minutes, seconds
			let timeDiff = end.getTime() - now.getTime();
			let days = Math.floor(timeDiff / (1000 * 3600 * 24));
			let hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
			let minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
			remaningTime.innerHTML = `<span class="text-success">${days} days, ${hours} hours, ${minutes} minutes</span>`;
		}
	}
	onMount(() => {
		contestObject = JSON.parse($contest) as ContestType;
		ID = contestObject.contestID;
		title.innerHTML = contestObject.contestTitle;
		description.innerHTML = contestObject.description;
		start_time.innerHTML = contestObject.start_time;
		end_time.innerHTML = contestObject.end_time;
		writer.innerHTML = contestObject.writerName;
		end = new Date(contestObject.end_time);
		updateDate();
		if(now < end){
			showApplication.innerHTML = `<button class="btn btn-primary p-2 col-4"> <a class="link-light" href='./apply/${ID}-form' target="_blank" style="text-decoration: none;"> Show Application </a> </button>`;
		}
	});
	
	setInterval(() => {
		now = new Date();
		updateDate();
	}, 60000);
	
</script>

<svelte:head>
	<title>App Name | {ID}</title>
</svelte:head>

<section class="contest">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />
	<div class="container-fluid d-flex pt-5 justify-content-center">
		<div class="row col-md-9">
			<div class="card shadow p-0">
				<div class="card-header bg-light">
					<nav class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center">
						<div class="navbar-brand">
							<h1 class="m-0" bind:this={title}> Title </h1>
						</div>
					</nav>
				</div>
        <div class="contest-description">
			<h3>
				<i class="fa fa-book"></i>
				Contest Description
			</h3>
			<p bind:this={description}></p>
        </div>
        <div class="container-fluid contest-data">
			<h3>
				<i class="fa fa-info-circle"></i>
				Contest Information
			</h3>
			<div class="row m-3 align-items-left gap-3">
				<div class="time text-left">
				<i class="fa fa-clock-o me-2"></i>
				<span bind:this={start_time}></span>
				:
				<span bind:this={end_time}></span>
				</div>
				<div class="writer text-left">
				<i class="fa fa-user me-2"></i>
				<span bind:this={writer}></span>
				</div>
				<div class="remaning text-left">
				<i class="fa fa fa-hourglass-2 me-2"></i>
				<span bind:this={remaningTime}></span>
				</div>
			</div>
		</div>
		<div class="container-fluid contest-data" >
			<div class="row justify-content-center ms-1 mt-5 mb-5 align-items-left gap-3" bind:this={showApplication}>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import '../../lib/Assets/common.scss';

	.contest {
		width: 100vw;
		min-height: 100vh;
		align-items: center;
		background-color: $bg-color;
		@include bg;
		position: relative;
		z-index: 1;
    	padding-bottom: 30px;
		.card-header {
      		font-family: 'Light';
		}
		.contest-description {
				font-size: 16px;
				line-height: 30px;
				font-family: 'Medium';
				margin: 30px;
				text-align: justify;
			h3{
				font-family: 'Light';
				margin-bottom: 20px;
				color: $primary-color;
			}
		}
		.contest-data{
			font-family: 'Light';
			h3{
				color: $primary-color;
			}
			font-size: 20px;
			gap: 10px;
		}
	}
</style>
