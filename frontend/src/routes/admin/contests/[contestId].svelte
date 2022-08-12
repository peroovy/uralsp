<script context="module">
	import { browser } from '$app/env';
	import { parsePayload } from '$lib/parse';

	export async function load() {
		if (!browser) return;
		let token = localStorage.getItem('access_token');
		if (token == null) {
			return {
				status: 301,
				redirect: '/'
			};
		}
		let payload = parsePayload(token);
		let id = payload.user_id;
		let permission = payload.permission;
		if (permission !== 'super_admin') {
			return {
				status: 301,
				redirect: '/'
			};
		}
        // Retrieve all the available fields 
        let fields = await fetch('http://127.0.0.1:8000/fields', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let fields_data = await fields.json();

        // In case of something goes wrong
        if (fields_data.error || fields.status !== 200) {
            return {
                status: 301,
                redirect: '/'
            };
        }

		return {
			props: {
				id,
				permission,
                fields_data
			}
		};
	}
</script>

<script lang="ts">
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import { sessionDuration } from '$lib/sessionDuration';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
	sessionDuration();

	export let id: number, permission: string, fields_data;

	$: question = '';
	$: questionType = 'Select question type ...';

	let contestName = '',
		contestLink = '',
		startOn = '',
		startAt = '',
		regStartOn = '',
		regStartAt = '',
		regEndOn = '',
		regEndAt = '';
	function create(): void {}

</script>

<svelte:head>
	<title>App Name| Create contests</title>
</svelte:head>

<section class="createContest">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />
	<nav class="navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm">
		<div class="container">
			<div class="navbar-brand d-flex col align-items-center">
				<span class="fa fa-plus-circle ms-3 me-3" />
				<h4 class="p-0 m-0">Create new contest</h4>
			</div>
			<div class="navbar-nav">
				<button class="btn d-flex gap-3 align-items-center" on:click={() => goto(`${base}/admin/${id}`)}>
					<i class="fa fa-arrow-left" />
					Back
				</button>
			</div>
		</div>
	</nav>
	<div class="container-fluid" style:margin-top="100px">
		<div class="row p-0 m-0 gap-4 col-12 justify-content-center align-items-start">
			<div class="card p-0 basicInfo col-md-4 shadow-sm" style="max-width: 400px; border: 10px solid white">
				<h3 class="card-header" style="margin: -10px; padding: 15px; margin-bottom: 10px">
					<i class="fa fa-info-circle me-2" />
					Basic info
				</h3>
				<div class="card-body">
					<form>
						<div class="form-group">
							<h6>Contest name</h6>
							<input bind:value={contestName} type="text" class="form-control" id="name" placeholder="Contest name" />
						</div>
						<div class="form-group">
							<h6>Contest Link</h6>
							<input bind:value={contestLink} type="text" class="form-control" id="link" placeholder="Contest link" />
						</div>
						<h6>Start</h6>
						<div class="row p-0">
							<div class="col-md-6 form-group">
								<input bind:value={startOn} type="date" class="form-control" id="startDate" placeholder="Start date" />
							</div>
							<div class="col-md-6 form-group">
								<input bind:value={startAt} type="time" class="form-control" id="startTime" placeholder="Start time" />
							</div>
						</div>
						<h6>Registration start</h6>
						<div class="row p-0">
							<div class="col-md-6 form-group">
								<input type="date" class="form-control" id="regStart" placeholder="Registration start date" bind:value={regStartOn} />
							</div>
							<div class="col-md-6 form-group">
								<input type="time" class="form-control" id="regStartTime" placeholder="Registration start time" bind:value={regStartAt} />
							</div>
						</div>
						<h6>Registration end</h6>
						<div class="row p-0">
							<div class="col-md-6 form-group">
								<input type="date" class="form-control" id="regEnd" placeholder="Registration end date" bind:value={regEndOn} />
							</div>
							<div class="col-md-6 form-group">
								<input type="time" class="form-control" id="regEndTime" placeholder="Registration end time" bind:value={regEndAt} />
							</div>
						</div>
					</form>
				</div>
				<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
					<button type="button" class="btn btn-primary" on:click={create}>
						<i class="fa-solid fa-add me-1" />
						Create
					</button>
					<button type="button" class="btn btn-secondary" on:click={() => goto(`${base}/admin/${id}`)}>
						<i class="fa-solid fa-ban me-1" />
						Cancel
					</button>
				</div>
			</div>
			<div class="createForm col-md-4 p-0" style="max-width: 400px">
				<div class="card form-preview shadow rounded-0 rounded-top">
					<div class="form-preview-header">
						<h6 class="card-header form-preview-title">
							<i class="fa-regular fa-eye" />
							Form Preview
						</h6>
					</div>
					<div class="card-body" />
				</div>
				<div class="card mt-4 shadow rounded-0 rounded-bottom mb-5">
					<h6 class="card-header d-flex align-items-center">
						<i class="fa-brands fa-wpforms me-1" style:font-size="20px" />
						Create Form
					</h6>
					<div class="card-body form-creator">
						<div class="form-group">
							<label for="question"> Question </label>
							<input type="text" id="question" class="form-control" placeholder="Add a field" bind:value={question} />
						</div>
						<div class="form-group">
							<label for="QuestionType"> Question Type </label>
							<select class="form-select" id="QuestionType" bind:value={questionType}>
								<option> Select question type ... </option>
								<option>Long answer question</option>
								<option>Short answer question</option>
                                <option>Upload file</option>
								<!-- <option>Multiple choices question</option> -->
							</select>
						</div>

						<button class="btn btn-primary btn-sm btn-block">Add</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import '../../../lib/Assets/common.scss';
	.createContest {
		width: 100vw;
		min-height: calc(100vh - 38px);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);
		font-family: 'Light', sans-serif;
		h6 {
			font-family: 'Medium', sans-serif;
		}
		@include bg;
		@include navbar;
		nav {
			background-color: rgba(255, 255, 255, 0.9);
		}
		input,
		select {
			border-radius: 0;
			border: 0px;
			border-bottom: 2px solid $secondary-color;
			margin-bottom: 20px;
			font-family: 'Light', sans-serif;
			font-size: 15px;
			&:focus {
				border-bottom: 2px solid $primary-color !important;
				outline: none;
				box-shadow: none;
				#basic-addon3 {
					background-color: $primary-color;
				}
			}
		}
	}
</style>
