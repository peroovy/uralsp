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

		if (browser) {
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
			const contest = await fetch(`http://localhost:8000/competitions/${contestId}`);
			// Get the user old requests
			const oldRequests = await fetch(`http://localhost:8000/requests`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			})
            if(oldRequests.status != 200 || contest.status != 200) {
                return {
                    status: 300,
                    redirect: '/'
                }
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
                }
                
            }
			// Check if the user has already made a request for this competition
			const oldRequest = (oldRequestsJson as Requests).find((request) => request.owner == contestId || request.participants.includes(userId));

			return {
				props: {
					contest: contestJson,
					oldRequest,
					userId,
					accessToken,
					permissions
				}
			};
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type { UserRequest, CompetitionWithFields } from '$lib/types';

	export let contest: CompetitionWithFields = {} as CompetitionWithFields,
		oldRequest: UserRequest = {} as UserRequest,
		userId: number,
		accessToken: string,
		permissions: string;

	let alertDiv: HTMLDivElement;

	let everyThingIsOk = true;
	if (Object.keys(contest).length == 0 || userId === undefined || accessToken == undefined || permissions == undefined) everyThingIsOk = false;

	onMount(() => {
        if (!everyThingIsOk) goto(base + '/');
        setTimeout(() => {
            
        }, 0);
    });

</script>

<svelte:head>
	<title>App Name | {contest.name}-form</title>
</svelte:head>

<section class="container-fluid p-0 m-0 pt-5 contestForm d-flex justify-content-center align-items-start">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />

    <div class="row col-12 m-0 p-0 justify-content-center">
        <div class="card col-md-4 p-0" style:max-width="fit-content">
            <nav class="navbar card-header">
                <div class="container-fluid justify-content-left">
                    <div class="d-flex navbar-brand mb-0 justify-content-left align-items-center gap-3 p-3">
                        <li class="fa fa-certificate" />
                        {contest.name}
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#compDetails" aria-controls="compDetails" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="fa fa-ellipsis-v"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="compDetails">
                        <ul class="navbar-nav gap-2">
                            <li class="nav-item">
                                <i class="fa fa-calendar"></i>
                                Starts on: 
                                {new Date(Date.parse(contest.started_at)).toDateString()}
                            </li>
                            <li class="nav-item">
                                <i class="fa fa-clock"></i>
                                Registration ends in: 
                                {new Date(Date.parse(contest.registration_end) - Date.now()).getDay()} days,
                                {new Date(Date.parse(contest.registration_end) - Date.now()).getHours()} hours,
                                {new Date(Date.parse(contest.registration_end) - Date.now()).getMinutes()} minutes
                            </li>
                            <li class="nav-item">
                                <i class="fa fa-group"></i>
                                Number of contestants per team: 
                                {contest.persons_amount}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div class="card-body">
                <div class="row gap-1">
                {#each Array(contest.persons_amount) as _, i}
                <button class="btn btn-light border-0 rounded-0 btn-block" type="button" data-bs-toggle="collapse" data-bs-target="#appLicationNum{i}" aria-expanded="false" aria-controls="appLicationNum{i}"> Application Number: {i+1} </button>
                <div class="collapse multi-collapse {(i == 0)? "show": ''}" id="appLicationNum{i}">
                    <div>
                        {@html contest.request_template}
                    </div>
                    <button class="btn btn-sm btn-primary m-2 ms-0 border-0" style="max-width: max-content; background-color: #3490dc"> 
                        <i class="fas fa-save me-1"></i>
                        Save 
                    </button>
                </div>
                {/each}
                </div>
                <div class="btn-group col-12 pt-3 ">
                    <button class="btn btn-block btn-primary rounded-0 border-0" style="background-color: #3490dc"> 
                        <li class="fa fa-paper-plane me-1"/>
                        Sumbit
                     </button>
                </div>
            </div>
        </div>
    </div>
	<div class="alert" bind:this={alertDiv} />
</section>

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
        .card{
            font-family: 'Light';
            .nav-item{
                font-size: 15px;
                font-family: 'Light';
                .fa{
                    margin-right: 10px;
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
