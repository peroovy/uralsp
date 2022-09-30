<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import type { RequestsOut } from '$lib/types';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import { page } from '$app/stores';
	
	const { app, permission, real_id, access_token, ownerName, comp, API} = $page.data;
	const data = $page.data;

	let loading : HTMLDivElement;
	let NParticipants = '';
	let alertCont = '' as unknown as HTMLDivElement;
	let requestTemplates: HTMLElement[] = [];

	function showMessage(msgTitle: string, msgbody: string): void {
		if (msgTitle === 'Success') {
			alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
										<strong>Success</strong> ${msgbody}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
		} else {
			alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error</strong> ${msgbody}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`;
		}
		setTimeout(() => {
			alertCont.innerHTML = '';
		}, 2000);
	}

	// Applications
	async function acceptApplication(id: number) {
		let confirmAccept = confirm('Are you sure you want to accept this application?');
		if (!confirmAccept) return;
		let description = prompt('Enter description:', 'Accepted');
		await fetch(`${API}/requests/${id}/process`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			},
			body: JSON.stringify({
				status: 'accepted',
				description: description
			})
		})
			.then((res) => {
				if (res.status == 200) {
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
			});
	}
	async function declineApplication(id: number) {
		let confirmDecline = confirm('Are you sure you want to reject this application?');
		if (!confirmDecline) return;
		let description = prompt('Enter description:', 'Rejected');
		await fetch(`${API}/requests/${id}/process`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + access_token
			},
			body: JSON.stringify({
				status: 'rejected',
				description: description
			})
		})
			.then((res) => {
				if (res.status == 200) {
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
			});
	}

	$: team_name = '';

	let application: RequestsOut = {
		team_name: team_name,
		team: [],
		competition: comp.id
	};
	function saveApp(index: number, mode = 'msg'): void {
		let applicant_id = (requestTemplates[index].children[0].children[1] as HTMLInputElement).value;
		let template = requestTemplates[index].children[1].children;
		let form = [];
		if (applicant_id == '') {
			if (mode == 'msg') showMessage('Error', 'Please enter a valid applicant ID');
			return;
		} else if (isNaN(parseInt(applicant_id))) {
			if (mode == 'msg') showMessage('Error', 'Please enter a valid applicant ID');
			return;
		}
		for (let i = 0; i < template.length; i++) {
			let fieldId = (template[i] as HTMLElement).dataset.id;
			let fieldValue = (template[i].children[1] as HTMLInputElement).value;
			let isRequired = comp.fields.find((field) => field.id == fieldId)!.is_required;
			if (isRequired && fieldValue == '') {
				alert('Please fill all the required fields');
				alertCont.style.display = 'block';
				return;
			}
			form.push({
				field_id: fieldId,
				value: fieldValue
			});
		}
		// check if the user saved this application before
		for (let i = 0; i < application.team.length; i++) {
			if (application.team[i].user_id == parseInt(applicant_id)) {
				application.team[i].form = form;
				if (mode == 'msg') showMessage('Success', 'Application saved successfully');
				return;
			}
		}
		application.team.push({
			user_id: parseInt(applicant_id),
			form
		});
		if (mode == 'msg') showMessage('Success', 'Application saved successfully');
	}
	async function updateRequest() {
		// Validate the application
		if (application.team.length < comp.persons_amount) {
			alert('Please add save all the applications first');
			return;
		}
		application.team_name = team_name;

		if (application.team_name === '') {
			alert('Please enter a team name');
			return;
		}
		// send the request to the server and validate the response
		const response = await fetch(`${API}/requests/${app.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`
			},
			body: JSON.stringify(application)
		});
		if (response.status == 200) {
			showMessage('Success', 'Your request has been sent successfully');
		} else {
			showMessage('Error', response.statusText);
		}
	}

	function deleteApplication(id: number) {
		let confirmation = confirm('Are you sure you want to delete this application?');
		if (!confirmation) return;
		fetch(`${API}/requests/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('access_token')
			}
		}).then((res) => {
			if (res.status == 200) {
				window.location.reload();
			} else {
				console.error(res);
			}
		});
	}
	onMount(() => {
		NParticipants = app.participants.map((p) => p.user_id).join(' ,');
		for (let u = 0; u < comp.persons_amount; u++) {
			saveApp(u, 'silent');
			let template = requestTemplates[u].children[1].children;
			team_name = app.team_name;
			for (let i = 0; i < template.length; i++) {
				(requestTemplates[i].children[0].children[1] as HTMLInputElement).value = app.participants[i].user_id.toString();
				let fieldId = (template[i] as HTMLElement).dataset.id;
				let fieldValue = app.participants[i].form.find((field) => field.field_id == fieldId)!.value;
				if (!fieldValue) fieldValue = '';
				(template[i].children[1] as HTMLInputElement).value = fieldValue;
			}
		}

		loading.style.display = 'none';

	});
</script>

<svelte:head>
	<title> Requests </title>
</svelte:head>

<div class="application">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />
	<nav class="navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm">
		<div class="container">
			<div class="navbar-brand d-flex col align-items-center">
				<span class="fa-brands fa-wpforms ms-3 me-3" />
				<h4 class="p-0 m-0">Application</h4>
			</div>
			<div class="navbar-nav">
				<button class="btn d-flex gap-3 align-items-center" on:click={() => (window.location.href = `${base}/admin/${real_id}`)}>
					<i class="fa fa-arrow-left" />
					Back
				</button>
			</div>
		</div>
	</nav>

	<div class="container-fluid d-flex justify-content-center align-items-center" style="min-height: calc(100vh - 38px); width: 100vw;">
		<div class="row m-0 justify-content-center align-items-stretch gap-0">
			<div class="card col-md border-0 rounded-0 basic-app-info" style="min-width: min-content;">
				<h3 class="card-title mb-2 mt-4 ms-1 me-5">
					<span class="fa fa-info-circle ms-0 me-2" />
					Basic Information
				</h3>
				<div class="card-body">
					<div class="row">
						<table class="table">
							<thead />
							<tbody>
								<tr>
									<th scope="row">ID</th>
									<td colspan="3">{app.id}</td>
								</tr>
								<tr>
									<th scope="row">Status</th>
									<td colspan="3">{app.status}</td>
								</tr>
								<tr>
									<th scope="row">Owner<small class="ms-1" style="font-weight: 100; font-style: italic; font-size: 12px;"> >> (N-ID) </small> </th>
									<td colspan="3">{ownerName} - {app.owner}</td>
								</tr>
								<tr>
									<th scope="row">Description</th>
									<td colspan="3">{app.description}</td>
								</tr>
								<tr>
									<th scope="row">Participants IDs</th>
									<td colspan="3">{NParticipants}</td>
								</tr>
								<tr>
									<th scope="row">Created on</th>
									<td colspan="3">{new Date(Date.parse(app.created_at)).toDateString()}</td>
								</tr>
								<tr>
									<th scope="row">Competition</th>
									<td colspan="3">{comp.name}</td>
								</tr>
							</tbody>
						</table>
						<div class="btns col-12">
							<button type="button" class="btn btn-success" on:click={() => acceptApplication(app.id)}>
								<span class="fa fa-check" />
								Accept
							</button>
							<button type="button" class="btn btn-secondary" on:click={() => declineApplication(app.id)}>
								<span class="fa fa-trash" />
								Reject
							</button>
							<button type="button" class="btn btn-primary" on:click={() => updateRequest()}>
								<span class="fa fa-edit" />
								Update
							</button>
							<button class="btn btn-danger" on:click={() => deleteApplication(app.id)}>
								<li class="fa fa-trash" />
								Remove
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="card col-md border-0 rounded-0 application-form">
				<h3 class="card-title mb-2 mt-4 ms-1">
					<span class="fa fa-file-alt ms-0 me-2" />
					Application Form
				</h3>
				<div class="card-body" style="position: relative;">
					<div class="form-field mb-3">
						<label for="teamName">Team Name <span class="text-danger" style:font-size="19px">*</span></label>
						<input type="text" id="teamName" class="form-control" placeholder="Team Name" bind:value={team_name} />
					</div>
					<div class="row gap-1">
						{#each Array(comp.persons_amount) as _, i}
							<button
								class="btn btn-light border-0 rounded-0 btn-block"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#appLicationNum{i}"
								aria-expanded="false"
								aria-controls="appLicationNum{i}"
							>
								Application Number: {i + 1}
							</button>
							<div class="collapse multi-collapse {i == 0 ? 'show' : ''}" id="appLicationNum{i}" bind:this={requestTemplates[i]}>
								<div class="form-field mb-3">
									<label for="teamName">Applicant Id <span class="text-danger" style:font-size="19px">*</span></label>
									<input type="text" class="form-control" placeholder="Enter applicant Id ..." />
								</div>
								<div>
									{@html comp.request_template}
								</div>
								<button
									class="btn btn-sm btn-primary m-2 ms-0 border-0"
									style="max-width: max-content; background-color: #3490dc"
									on:click={() => saveApp(i)}
								>
									<i class="fas fa-save me-1" />
									Save application
								</button>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="loading" bind:this={loading}>
	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>

<div bind:this={alertCont} class="alert" />

<style lang="scss">
	@import '../../../../lib/Assets/common.scss';
	.application {
		@include bg;
		@include navbar;
		nav {
			font-family: 'Medium';
			margin-bottom: 20px;
			background-color: white;
			width: 100%;
		}
		padding: 0px;
		margin: 0;
		background-color: #fff;
		min-height: 100vh;
		background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);
		width: 100vw;
		min-height: calc(100vh - 38px);
		.basic-app-info {
			background-color: rgba(255, 255, 255, 0.98);
			font-family: 'Medium';
			line-height: 30px;
			.btns {
				width: 100%;
				display: flex;
				justify-content: center;
				gap: 5px;
				align-items: center;
			}
		}
	}
	.alert {
		position: fixed;
		bottom: 20px;
		left: 0;
		z-index: 5;
	}
</style>
