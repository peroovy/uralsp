<script context="module">
	import { browser } from '$app/env';
	import { parsePayload } from '$lib/parse';

	// @ts-ignore
	export async function load({ params }) {
		if (!browser) return;
		let token = localStorage.getItem('access_token');
		const API = import.meta.env.VITE_API_URL;

		if (token == null) {
			return {
				// status: 301,
				// redirect: '/'
			};
		}
		let payload = parsePayload(token);
		let id = payload.user_id;
		let permission = payload.permission;
		if (permission != 'super_admin' && permission != 'admin') {
			return {
				status: 301,
				redirect: '/'
			};
		}

		// Retrieve all the available fields
		let fields = await fetch(`${API}/fields`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let fields_data = await fields.json();

		// In case of something goes wrong
		if (fields_data.error || fields.status !== 200) {
			return {
				// status: 301,
				// redirect: '/'
			};
		}

		// Parse the params
		let contestId = parseInt(params.contestId);

		let contest;
		if (!isNaN(contestId)) {
			// Retrieve the contest
			contest = await fetch(`${API}/competitions/${contestId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then((data) => data)
				.catch((err) => {
					return {
						status: 301,
						redirect: '/'
					};
				});
			// In case of something goes wrong
			if (contest.error != undefined) {
				return {
					status: 301,
					redirect: '/'
				};
			}
		}

		return {
			props: {
				id,
				permission,
				fields_data,
				access_token: token,
				contest,
				API
			}
		};
	}
</script>

<script lang="ts">
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import lottieInfoSrc from '$lib/Assets/animations/lottie-info.json?url';
	import lottieEmptySrc from '$lib/Assets/animations/lottie-empty.json?url';
	import type { CompetitionWithFields, Field } from '$lib/types';
	import { sessionDuration } from '$lib/sessionDuration';
	sessionDuration();

	export let id: number, permission: string, fields_data, access_token: string;
	export let contest: undefined | CompetitionWithFields;
	export let API: string = import.meta.env.VITE_API_URL;
	let questionId = '',
		questionTitle = '',
		default_value = '',
		questionType: string | undefined = undefined;

	let selectedOldField = {} as Field;
	let filtered = [] as Field[];
	let monitorId: number | undefined;
	let contestantsPerTeam: number | undefined;

	let suggestions: HTMLElement;
	let alertCont: HTMLElement;
	let formPreview: HTMLElement;
	let monitorsCont: HTMLElement;
	let sliderCont: HTMLElement;
	let loading: HTMLElement;
	let chooseUpdate: HTMLElement;
	// Demo element
	let demo = '' as unknown as HTMLElement;
	let controlsCont = [demo, demo, demo];

	let is_visible = false,
		is_requiered = false;
	let fields = fields_data;
	$: contestName = '';
	$: contestLink = '';
	$: startOn = '';
	$: startAt = '';
	$: regStartOn = '';
	$: regStartAt = '';
	$: regEndOn = '';
	$: regEndAt = '';
	$: category = '';

	let formFields = [] as Field[];

	function filterFields() {
		filtered = fields.filter((item: Field) => {
			if (questionId !== '') {
				if (item.name.toLowerCase().indexOf(questionId.toLowerCase()) === -1) {
					return false;
				}
			}
			return true;
		});
		if (filtered.length == 0) return;
		if (!suggestions.classList.contains('show')) {
			suggestions.classList.add('show');
		}
	}
	function chooseField(id: string) {
		selectedOldField = fields.find((item: Field) => {
			return item.id === id;
		});
		if (selectedOldField) {
			questionId = selectedOldField.id;
			questionTitle = selectedOldField.name;
			if (selectedOldField.type == 0) {
				questionType = 'Short answer question/ Single-line text input field';
			} else if (selectedOldField.type == 1) {
				questionType = 'Long answer question/ Multi-line text input field';
			} else if (selectedOldField.type == 2) {
				questionType = 'Upload file';
			}
		}
		is_visible = selectedOldField.is_visible;
		is_requiered = selectedOldField.is_required;
		default_value = selectedOldField.default_values[0];
	}
	function dupCheck(): boolean {
		let dup = false;
		formFields.forEach((item) => {
			if (item.id === questionId) {
				dup = true;
			}
		});
		return dup;
	}
	async function addFormField() {
		if (questionId == '') {
			showMessage('error', 'Please enter question id.');
			return;
		}
		if (questionTitle == '') {
			showMessage('error', 'Please enter question title');
			return;
		}
		if (questionType == '') {
			showMessage('error', 'Please select question type.');
			return;
		}
		// Duplicate check
		if (dupCheck()) {
			showMessage('error', 'Duplicate question id found!');
			return;
		}

		let questionTypeNum: number;
		if (questionType === 'Short answer question/ Single-line text input field') {
			questionTypeNum = 0;
		} else if (questionType === 'Long answer question/ Multi-line text input field') {
			questionTypeNum = 1;
		} else if (questionType === 'Upload file') {
			questionTypeNum = 2;
		}

		let newField = {
			id: questionId,
			name: questionTitle,
			type: questionTypeNum!,
			is_required: is_requiered,
			is_visible: is_visible,
			default_values: [default_value]
		};
		// If the selected field has been modified
		if (selectedOldField && selectedOldField.id == newField.id) {
			let index = fields.findIndex((item: Field) => {
				return item.id === questionId;
			});
			// compare the old and new field
			if (JSON.stringify(selectedOldField) != JSON.stringify(newField)) {
				// Check if the user want to update the field
				if (confirm(`Do you want to update the selected field with the id: ${questionId}?`)) {
					fields[index] = newField;
					// TODO: push the updates to the server
					showMessage('Success', 'Field updated successfully!');
				}
			} else {
				showMessage('Success', 'no changes on the selected field.');
			}
		} else {
			// Adding new field successfully
			showMessage('Success', 'New field has been added.');
			// Add the new field to the Server
			await fetch(`${API}/fields`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ` + access_token
				},
				body: JSON.stringify(newField)
			})
				.then((res) => {
					if (res.status === 200) {
						fields.push(newField);
					}
				})
				.catch((err) => {
					showMessage('error', 'Error adding new field.');
				})
				.finally(() => {
					questionId = '';
					questionTitle = '';
					questionType = '';
					is_visible = true;
					is_requiered = true;
					default_value = '';
				})
				.then(() => {
					filterFields();
				});
		}

		// Add the field to the form preview
		formFields.push(newField);

		// Reset All
		questionId = '';
		questionTitle = '';
		questionType = undefined;
		is_visible = false;
		is_requiered = false;
		default_value = '';
		selectedOldField = {} as Field;
		filtered = [];
		suggestions.classList.remove('show');
		addToPreview();
	}
	async function updateField() {
		// TODO: SEND updates to server
		let questionTypeNum = 0;
		if (questionType === 'Short answer question/ Single-line text input field') {
			questionTypeNum = 0;
		} else if (questionType === 'Long answer question/ Multi-line text input field') {
			questionTypeNum = 1;
		} else if (questionType === 'Upload file') {
			questionTypeNum = 2;
		}
		await fetch(`${API}/fields/${questionId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ` + access_token
			},
			body: JSON.stringify({
				name: questionTitle,
				type: questionTypeNum!,
				is_required: is_requiered,
				is_visible: is_visible,
				default_values: [default_value]
			})
		})
			.then((res) => {
				if (res.status === 200) {
					showMessage('Success', 'Field updated successfully!');
				} else {
					showMessage('Error', 'Something went wrong!');
				}
			})
			.catch((err) => {
				showMessage('Error', 'Something went wrong!: ' + err);
			});
		// update the selected old field
		selectedOldField = {
			id: questionId,
			name: questionTitle,
			type: questionTypeNum!,
			is_required: is_requiered,
			is_visible: is_visible,
			default_values: [default_value]
		};
		formFields.filter((item, index) => {
			if (item.id === selectedOldField.id) {
				formFields[index] = selectedOldField;
				// update the form preview
				addToPreview();
				// Show the success message
				showMessage('Success', 'The field has been updated.');
				// Reset the form
				questionId = '';
				questionTitle = '';
				questionType = undefined;
				is_visible = false;
				is_requiered = false;
				default_value = '';
				selectedOldField = {} as Field;
				filtered = [];
				suggestions.classList.remove('show');
			}
		});
	}
	async function removeField(): Promise<void> {
		if (selectedOldField) {
			if (confirm(`Do you want to delete the selected field with the id: ${selectedOldField.id}?`)) {
				let index = fields.findIndex((item: Field) => {
					return item.id === selectedOldField.id;
				});
				fields.splice(index, 1);
				// TODO: remove the field from the server
				await fetch(`${API}/fields/${selectedOldField.id}`, {
					method: 'DELETE',
					body: JSON.stringify({
						fields: fields
					})
				})
					.then((res) => {
						if (res.status === 200) {
							showMessage('Success', 'Field deleted successfully!');
						} else {
							showMessage('Error', 'Something went wrong!');
							return;
						}
					})
					.catch((err) => {
						showMessage('Error', 'Something went wrong!');
						return;
					});
				// Remove the field from the form preview
				formFields = formFields.filter((item) => {
					return item.id === selectedOldField.id ? false : true;
				});

				// Reset
				selectedOldField = {} as Field;
				filtered = [];
				suggestions.classList.remove('show');
				questionId = '';
				questionTitle = '';
				questionType = '';
				is_visible = false;
				is_requiered = false;
				default_value = '';
			}
		}
		addToPreview();
	}
	function addToPreview(): void {
		formPreview.innerHTML = '';
		formFields.forEach((field) => {
			let type = 'text';
			if (field.type == 0) {
				type = 'text';
			} else if (field.type === 1) {
				type = 'textarea';
			} else if (field.type == 2) {
				type = 'file';
			}

			let newField = document.createElement('div');
			newField.classList.add('form-field');
			if (type == 'textarea') {
				newField.innerHTML = `<div class="d-flex row col-12 m-0" data-id="${field.id.trim()}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${field.id}">${field.name}</label>
												${field.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ''}
											</div>
											<div class="d-flex gap-2 align-items-center" style="font-size: 13px">
												${field.is_visible ? '<span class="text-success">Visible</span>' : '<span class="text-danger">Hidden</span>'}
												<div class="mb-1">
													<li class="fa fa-edit me-1" data-click="${field.id}" style="cursor:pointer"/>
													<li class="fa fa-trash" data-click="${field.id}" style="cursor:pointer"/>
												</div>
											</div>
										</div>
									 	<textarea class="form-control" id="${field.id}" rows="3" ${field.is_required ? 'required' : ''}>${field.default_values[0]}</textarea>
									  </div>`;
			} else {
				newField.innerHTML = `<div class="d-flex row col-12 m-0 justify-content-between align-items-baseline" data-id="${field.id}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${field.id}" class="mb-1">${field.name}</label>
												${field.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ''}
											</div>
											<div class="d-flex gap-2 align-items-center" style="font-size: 13px">
												${field.is_visible ? '<span class="text-success">Visible</span>' : '<span class="text-danger">Hidden</span>'}
												<div class="mb-1">
													<li class="fa fa-edit me-1" data-click="${field.id}" class="editField" style="cursor:pointer"/>
													<li class="fa fa-trash" data-click="${field.id}" class="rmField" style="cursor:pointer"/>
												</div>
											</div>
										</div>
										<input type="${type}" class="form-control" placeholder="Enter ${field.name}" value="${field.default_values[0]}" ${
					field.is_required ? 'required' : ''
				}">
									</div>`;
			}
			formPreview.appendChild(newField);
			let editBtn = newField.children[0].children[0].children[1].children[1].children[0];
			let removeBtn = newField.children[0].children[0].children[1].children[1].children[1];
			editBtn.addEventListener('click', () => {
				if ((editBtn as HTMLElement).dataset.click) {
					let id = (editBtn as HTMLElement).dataset.click;
					if (!id) return;
					chooseField(id);
				}
			});
			removeBtn.addEventListener('click', () => {
				if ((removeBtn as HTMLElement).dataset.click) {
					let id = (removeBtn as HTMLElement).dataset.click;
					// Remove from formFields
					formFields = formFields.filter((field) => {
						return field.id != id;
					});
					// Remove from preview
					addToPreview();
					// Success message
					showMessage('Success', 'Field removed successfully');
				}
			});
		});
	}
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
	let monitors: Array<number> = [];
	function addMonitor(id: number | undefined, printMsg: boolean = true): void {
		if (permission != 'super_admin') return;
		if (id === undefined) {
			showMessage('Error', 'Please enter a valid ID');
			return;
		}
		// Check if the id is a number
		if (isNaN(id)) {
			showMessage('Error', 'Please add a valid field ID');
			return;
		}
		// Check if the id is already in the array
		if (monitors.includes(id)) {
			showMessage('Error', 'This ID is already in the monitor list');
			return;
		}
		// Add to array
		monitors.push(id);

		let newMonitor = document.createElement('div');
		newMonitor.className = 'admin d-flex gap-1 p-1 m-1 align-items-center justify-content-center bg-light';
		newMonitor.innerHTML = `<span style="font-size:18px"> ${id} </span> 
									<i class="fa fa-x ms-2" style="font-size:10px; color: gray; margin-top: 2px; cursor: pointer"></i>	`;
		newMonitor.style.width = 'fit-content';
		newMonitor.style.borderRadius = '40%';

		// Add to monitor list
		monitorsCont.appendChild(newMonitor);
		// Add event listener to remove button
		let removeBtn = newMonitor.children[1] as HTMLElement;
		removeBtn.addEventListener('click', () => {
			// Remove from array
			monitors = monitors.filter((id) => {
				return id != id;
			});
			// Remove from monitor list
			monitorsCont.removeChild(newMonitor);
		});
		// Success mesage
		if (printMsg) {
			showMessage('Success', `Monitor with id: ${id} added to monitor list.`);
		}
		monitorId = undefined;
	}
	function nextSlide(): void {
		let marginAmount = parseInt(sliderCont.style.marginLeft.split('vw')[0]);
		if (isNaN(marginAmount)) {
			marginAmount = 0;
		}
		if (marginAmount > -(sliderCont.children.length - 1) * 100) {
			sliderCont.style.marginLeft = `${marginAmount - 100}vw`;
		} else {
			sliderCont.style.marginLeft = `0vw`;
		}
	}
	function prevSlide(): void {
		let marginAmount = parseInt(sliderCont.style.marginLeft.split('vw')[0]);
		if (isNaN(marginAmount)) {
			marginAmount = 0;
		}
		if (marginAmount < 0) {
			sliderCont.style.marginLeft = `${marginAmount + 100}vw`;
		}
	}
	let comp = {
		name: 'string',
		registration_start: '2022-08-27T20:24:53.677Z',
		registration_end: '2022-08-27T20:24:53.677Z',
		started_at: '2022-08-27T20:24:53.677Z',
		persons_amount: 1,
		request_template: 'string',
		link: 'string',
		fields: ['string'],
		admins: [0]
	};
	async function create(): Promise<void> {
		if (permission != 'super_admin') return;
		comp.name = contestName;
		comp.registration_start = regStartOn + 'T' + regStartAt + ':00.000Z';
		comp.registration_end = regEndOn + 'T' + regEndAt + ':00.000Z';
		comp.started_at = startOn + 'T' + startAt + ':00.000Z';
		if (contestantsPerTeam === undefined) {
			comp.persons_amount = 1;
		} else {
			comp.persons_amount = contestantsPerTeam;
		}
		let template = '';
		formFields.forEach((field) => {
			let type = 'text';
			if (field.type === 1) {
				type = 'textarea';
			} else if (field.type == 2) {
				type = 'file';
			}

			let newField = document.createElement('div');
			newField.classList.add('form-field');
			if (type == 'textarea') {
				newField.innerHTML = `<div class="d-flex row col-12 m-0" data-id="${field.id.trim()}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${field.id}">${field.name}</label>
												${field.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ''}
											</div>
										</div>
									 	<textarea class="form-control" id="${field.id}" rows="3" ${field.is_required ? 'required' : ''}>${field.default_values[0]}</textarea>
									  </div>`;
			} else {
				newField.innerHTML = `<div class="d-flex row col-12 m-0 justify-content-between align-items-baseline" data-id="${field.id}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${field.id}" class="mb-1">${field.name}</label>
												${field.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ''}
											</div>
										</div>
										<input type="${type}" class="form-control" placeholder="Enter ${field.name}" value="${field.default_values[0]}" ${
					field.is_required ? 'required' : ''
				}">
									</div>`;
			}
			template += newField.innerHTML;
		});
		comp.request_template = template;
		comp.link = contestLink;
		comp.fields = formFields.map((field) => {
			return field.id;
		});
		comp.admins = monitors;
		await fetch(`${API}/competitions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`
			},
			body: JSON.stringify(comp)
		})
			.then((res) => {
				if (res.status === 200) {
					showMessage('Success', 'Competition created successfully.');
				} else {
					// show the error message
					showMessage('Error', 'Something went wrong.');
					res.json().then((data) => {
						showMessage(res.statusText, data.details !== undefined ? data.details : 'Please fill the form correctly!');
					});
				}
			})
			.catch((err) => {
				let error = '';
				showMessage('Error', 'Something went wrong: ' + err);
			});
	}

	async function update(whatToupdate : { all: boolean; form: boolean; admins: boolean }): Promise<void> {
		comp.name = contestName;
		comp.registration_start = regStartOn + 'T' + regStartAt + 'Z';
		comp.registration_end = regEndOn + 'T' + regEndAt + 'Z';
		comp.started_at = startOn + 'T' + startAt + 'Z';
		if (contestantsPerTeam === undefined) {
			comp.persons_amount = 1;
		} else {
			comp.persons_amount = contestantsPerTeam;
		}
		let template = '';
		formFields.forEach((field) => {
			let type = 'text';
			if (field.type == 1) {
				type = 'textarea';
			} else if (field.type == 2) {
				type = 'file';
			}

			let newField = document.createElement('div');
			newField.classList.add('form-field');
			if (type == 'textarea') {
				newField.innerHTML = `<div class="d-flex row col-12 m-0" data-id="${field.id.trim()}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${field.id}">${field.name}</label>
												${field.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ''}
											</div>
										</div>
									 	<textarea class="form-control" id="${field.id}" rows="3" ${field.is_required ? 'required' : ''}>${field.default_values[0]}</textarea>
									  </div>`;
			} else {
				newField.innerHTML = `<div class="d-flex row col-12 m-0 justify-content-between align-items-baseline" data-id="${field.id}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${field.id}" class="mb-1">${field.name}</label>
												${field.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ''}
											</div>
										</div>
										<input type="${type}" class="form-control" placeholder="Enter ${field.name}" value="${field.default_values[0]}" ${
					field.is_required ? 'required' : ''
				}">
									</div>`;
			}
			template += newField.innerHTML;
		});
		comp.request_template = template;
		comp.link = contestLink;
		comp.fields = formFields.map((field) => {
			return field.id;
		});
		comp.admins = monitors;
		chooseUpdate.style.display = 'none';

		if (whatToupdate.form) {
			// update the request template first
			await fetch(`${API}/competitions/${contest?.id}/request-template`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				},
				body: JSON.stringify({ request_template: comp.request_template })
			})
				.then((res) => {
					if (res.status === 200) {
						showMessage('Success', 'Request template updated successfully.');
					} else {
						// show the error message
						showMessage('Error', 'Something went wrong.');
						res.json().then((data) => {
							showMessage(res.statusText, data.details !== undefined ? data.details : 'Please fill the form correctly!');
						});
					}
				})
				.catch((err) => {
					let error = '';
					showMessage('Error', 'Something went wrong: ' + err);
				});
			// update the fields
			await fetch(`${API}/competitions/${contest?.id}/form`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				},
				body: JSON.stringify({ fields: comp.fields })
			})
				.then((res) => {
					if (res.status === 200) {
						showMessage('Success', 'Form fields updated successfully.');
					} else {
						// show the error message
						showMessage('Error', 'Something went wrong.');
						res.json().then((data) => {
							showMessage(res.statusText, data.details !== undefined ? data.details : 'Please fill the form correctly!');
						});
					}
				})
				.catch((err) => {
					let error = '';
					showMessage('Error', 'Something went wrong: ' + err);
				});
		}
		if (whatToupdate.admins) {
			await fetch(`${API}/competitions/${contest?.id}/admins`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				},
				body: JSON.stringify({ admins: comp.admins })
			})
				.then((res) => {
					if (res.status === 200) {
						showMessage('Success', "monitors' list updated successfully.");
					} else {
						// show the error message
						showMessage('Error', 'Something went wrong.');
						res.json().then((data) => {
							showMessage(res.statusText, data.details !== undefined ? data.details : 'Please fill the form correctly!');
						});
					}
				})
				.catch((err) => {
					let error = '';
					showMessage('Error', 'Something went wrong: ' + err);
				});
		}
		if (whatToupdate.all) {
			await fetch(`${API}/competitions/${contest?.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				},
				body: JSON.stringify(comp)
			})
				.then((res) => {
					if (res.status === 200) {
						showMessage('Success', 'competition updated successfully.');
					} else {
						// show the error message
						showMessage('Error', 'Something went wrong.');
						res.json().then((data) => {
							showMessage(res.statusText, data.details !== undefined ? data.details : 'Please fill the form correctly!');
						});
					}
				})
				.catch((err) => {
					let error = '';
					showMessage('Error', 'Something went wrong: ' + err);
				});
		}

	}

	$: updateEverthing = false;
	$: updateForm = false;
	$: updateAdmins = false;
	$: if (browser) {
		if (updateEverthing) {
			updateForm = false;
			updateAdmins = false;
			document.getElementById('flexSwitchCheck2')?.setAttribute('disabled', 'disabled');
			document.getElementById('flexSwitchCheck3')?.setAttribute('disabled', 'disabled');
		} else {
			document.getElementById('flexSwitchCheck2')?.removeAttribute('disabled');
			document.getElementById('flexSwitchCheck3')?.removeAttribute('disabled');
		}
	}

	function chooseUpdateFunction(): void {
		chooseUpdate.style.display = 'block';

		let updateObj = {
			all: updateEverthing,
			form: updateForm,
			admins: updateAdmins
		};

	}
	let slideContorls = `<div class="slideControls border-top">
							<div class="btn-group gap-1 col-12 justify-content-center align-items-center p-0 m-0">
								<button class="btn btn-sm btn-block p-2"><li class="me-1 fa fa-arrow-left"></li> Previous</button>
								<button class="btn btn-sm btn-block p-2">Next <li class="ms-1 fa fa-arrow-right"></li></button>
							</div>
						</div>`;
	onMount(() => {
		controlsCont.forEach((control, i) => {
			if (permission !== 'super_admin' && i == 2) {
				return;
			}
			let sliderBtns = control.children[0].children[0].children;
			sliderBtns[0].addEventListener('click', () => {
				prevSlide();
			});
			sliderBtns[1].addEventListener('click', () => {
				nextSlide();
			});
		});
		if (contest !== undefined) {
			contestName = contest.name;
			contestLink = contest.link;
			contestantsPerTeam = contest.persons_amount;

			// set the start date
			let start = new Date(contest.started_at);
			startOn = start.toISOString().split('T')[0];
			startAt = start.toTimeString().split(' ')[0];
			// set the start date
			let regStart = new Date(contest.registration_start);
			regStartOn = regStart.toISOString().split('T')[0];
			regStartAt = regStart.toTimeString().split(' ')[0];
			// set the end date
			let end = new Date(contest.registration_end);
			regEndOn = end.toISOString().split('T')[0];
			regEndAt = end.toTimeString().split(' ')[0];

			// update fields
			contest.fields.forEach((field) => {
				// add the default value
				field.default_values = [''];
			});
			formFields = contest.fields;
			addToPreview();
			if (permission === 'super_admin') {
				// hide the admin section
				contest.admins.forEach((monitor) => {
					addMonitor(monitor, false);
				});
			}

			// Replace the default next button with a custom one- Create contest btn
			// Create contest button
			let updateContestBtn = document.createElement('button');
			if (permission === 'super_admin') {
				updateContestBtn.className = 'btn btn-sm btn-block p-2';
				updateContestBtn.innerHTML = 'Update Contest <li class="fa fa-check-circle">';
				// Add event listener to create contest button
				updateContestBtn.addEventListener('click', () => {
					chooseUpdateFunction();
				});
				// Remove final button
				(controlsCont[2].children[0].children[0].children[1] as HTMLElement).style.display = 'none';
				// Add create contest button to final button
				controlsCont[2].children[0].children[0].appendChild(updateContestBtn);
			} else if (permission === 'admin') {
				updateContestBtn.className = 'btn btn-sm btn-block p-2';
				updateContestBtn.innerHTML = 'Update Contest <li class="fa fa-check-circle">';
				// Add event listener to create contest button
				updateContestBtn.addEventListener('click', () => {
					chooseUpdateFunction();
				});
				// Remove final button
				(controlsCont[1].children[0].children[0].children[1] as HTMLElement).style.display = 'none';
				// Add create contest button to final button
				controlsCont[1].children[0].children[0].appendChild(updateContestBtn);
			}
		} else {
			// Replace the default next button with a custom one- Create contest btn
			// Create contest button
			let createContestBtn = document.createElement('button');
			createContestBtn.className = 'btn btn-sm btn-block p-2';
			createContestBtn.innerHTML = 'Create Contest <li class="fa fa-check-circle">';
			// Add event listener to create contest button
			createContestBtn.addEventListener('click', () => {
				create();
			});
			// Remove final button
			(controlsCont[2].children[0].children[0].children[1] as HTMLElement).style.display = 'none';
			// Add create contest button to final button
			controlsCont[2].children[0].children[0].appendChild(createContestBtn);
		}

		loading.style.display = 'none';
	});
</script>

<svelte:head>
	<title>App Name| Create contests</title>
	<script defer src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
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
				<button class="btn d-flex gap-3 align-items-center" on:click={() => (window.location.href = `${base}/admin/${id}`)}>
					<i class="fa fa-arrow-left" />
					Back
				</button>
			</div>
		</div>
	</nav>
	<div class="container-fluid p-0">
		<div class="slideCont" bind:this={sliderCont}>
			<div class="slide" style="position: relative;">
				<div
					class="row shadow-sm justify-content-betweens align-items-center p-0 m-0"
					style="position: relative; z-index:10; background-color: white;"
				>
					<div class="card mb-4 col-md p-0 basicInfo" style="border: 10px solid white">
						<h1 class="card-title" style="padding: 15px; margin-bottom: 10px">
							<i class="fa fa-info-circle me-2" />
							Basic info
						</h1>
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
									<div class="col-md-7 form-group">
										<input bind:value={startOn} type="date" class="form-control" id="startDate" placeholder="Start date" />
									</div>
									<div class="col-md-5 form-group">
										<input bind:value={startAt} type="time" class="form-control" id="startTime" placeholder="Start time" />
									</div>
								</div>
								<h6>Registration start</h6>
								<div class="row p-0">
									<div class="col-md-7 form-group">
										<input type="date" class="form-control" id="regStart" placeholder="Registration start date" bind:value={regStartOn} />
									</div>
									<div class="col-md-5 form-group">
										<input type="time" class="form-control" id="regStartTime" placeholder="Registration start time" bind:value={regStartAt} />
									</div>
								</div>
								<h6>Registration end</h6>
								<div class="row p-0">
									<div class="col-md-7 form-group">
										<input type="date" class="form-control" id="regEnd" placeholder="Registration end date" bind:value={regEndOn} />
									</div>
									<div class="col-md-5 form-group">
										<input type="time" class="form-control" id="regEndTime" placeholder="Registration end time" bind:value={regEndAt} />
									</div>
								</div>
								<h6>Number of contestants per team</h6>
								<div class="form-group">
									<input
										bind:value={contestantsPerTeam}
										type="number"
										min="1"
										class="form-control"
										id="contestantsPerTeam"
										placeholder="Enter a Number ... "
									/>
								</div>
							</form>
						</div>
					</div>
					<lottie-player
						class="col-md lottie lottieInfo"
						src={lottieInfoSrc}
						style="width: 400px"
						background="transparent m-4"
						speed="1"
						autoplay
						loop
						nocontrols
					/>
					<div bind:this={controlsCont[0]}>{@html slideContorls}</div>
				</div>
			</div>
			<div class="slide" style="position: relative;">
				<div class="row shadow p-0 m-0 justify-content-between" style="position: relative; z-index: 10">
					<div class="card col-md border-0 rounded-0">
						<h1 class="m-0 card-title d-flex align-items-center p-3 border-0 rounded-0">
							<i class="fa-brands fa-wpforms me-2" style:font-size="30px" />
							Create Field
						</h1>
						<div class="card-body form-creator">
							<div class="form-group" style="position:relative; margin-bottom: 20px">
								<label for="question"> Question Id </label>
								<i class="ms-2" style="font-size: 13px;">>> Internal name </i>
								<input type="text" class="form-control m-0" placeholder="Enter question id" bind:value={questionId} on:input={filterFields} />
								<table
									class="table table-striped collapse"
									bind:this={suggestions}
									style="position: absolute; background-color: white; font-size:13px"
								>
									<tbody>
										{#if filtered.length != 0}
											{#each filtered as res, i}
												<tr style="cursor:pointer" on:click={() => chooseField(res.id)}>
													<th scope="row" class="ps-1 p-0">{i + 1}</th>
													<td class="p-0 pe-1 ps-2"> {res.id} </td>
												</tr>
											{/each}
										{/if}
									</tbody>
								</table>
							</div>
							<div class="form-group">
								<label for="question"> Question title </label>
								<i class="ms-2" style="font-size: 13px;">>> Displayed name </i>
								<input type="text" id="question" class="form-control" placeholder="Add a field" bind:value={questionTitle} />
							</div>
							<div class="form-group">
								<label for="QuestionType"> Question Type </label>
								<select class="form-select" id="QuestionType" bind:value={questionType}>
									<option selected> Select question type ... </option>
									<option>Long answer question/ Multi-line text input field</option>
									<option>Short answer question/ Single-line text input field</option>
									<option>Upload file</option>
									<!-- <option>Multiple choices question</option> -->
								</select>
							</div>
							{#if questionType === 'Short answer question/ Single-line text input field'}
								<div class="form-group">
									<label for="inputCategories"> Select field category </label>
									<select class="form-select" bind:value={category}>
										<option selected> Select field category ... </option>
										<option> Text </option>
										<option> Number </option>
										<option> Date </option>
										<option> Time </option>
										<option> Email </option>
										<option> Phone </option>
										<option> URL </option>
									</select>
								</div>
							{/if}
							{#if questionType === 'Long answer question/ Multi-line text input field' || questionType === 'Short answer question/ Single-line text input field'}
								<div class="form-group">
									<label for="defaultValue"> Default Value </label>
									<input type="text" id="defaultValue" class="form-control" placeholder="Specify the default value ..." bind:value={default_value} />
								</div>
							{/if}
							<div class=" form-group field_options">
								<div class="form-check form-switch">
									<input class="form-check-input" type="checkbox" id="Visible" bind:checked={is_visible} />
									<label class="form-check-label" for="Visible">Visible</label>
								</div>
								<div class="form-check form-switch">
									<input class="form-check-input" type="checkbox" id="Required" bind:checked={is_requiered} />
									<label class="form-check-label" for="Required">Required</label>
								</div>
							</div>
							<div class="btn-group gap-1 col-12 justify-content-center align-items-center">
								<button class="btn btn-primary btn-sm btn-block mt-3" on:click={addFormField}>Add field</button>
								{#if selectedOldField}
									<button class="btn btn-secondary btn-sm btn-block mt-3" on:click={updateField}>Update field</button>
									<button class="btn btn-danger btn-sm btn-block mt-3" on:click={removeField}>Remove field</button>
								{/if}
							</div>
						</div>
					</div>
					<div class="card col-md form-preview rounded-0 border-bottom-0">
						<h6 class="card-title form-preview-title border-bottom" style="margin: 0px -12px; padding: 15px">
							<i class="fa-regular fa-eye me-2" />
							Form Preview
						</h6>
						{#if formFields.length == 0}
							<lottie-player
								src={lottieEmptySrc}
								background="transparent"
								speed="1"
								style="height: 300px; margin-top: 30px"
								loop
								autoplay
								nocontrols
							/>
						{/if}
						<div class="card-body" bind:this={formPreview} />
					</div>
					<div bind:this={controlsCont[1]} style="background-color: white">{@html slideContorls}</div>
				</div>
			</div>
			{#if permission === 'super_admin'}
				<div class="slide">
					<div class="row col-12 justify-content-center">
						<div class="card p-0 mb-3 col-md-5">
							<h1 class="card-header" style="padding: 20px">
								<i class="fa-solid fa-gear me-1" />
								Set admin
							</h1>
							<div class="card-body">
								<div class="showSelectedAdmin d-flex" style="width: fit-content; flex-flow: row wrap;" bind:this={monitorsCont} />
								<input type="text" class="form-control" id="admin" placeholder="Enter admin id ..." bind:value={monitorId} />
								<button
									type="button"
									class="btn btn-primary btn-sm"
									on:click={() => {
										addMonitor(monitorId);
									}}>Add</button
								>
							</div>
							<div bind:this={controlsCont[2]} style="background-color: white">{@html slideContorls}</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div bind:this={alertCont} class="alertCont" />
</section>
<div class="loading" bind:this={loading}>
	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>
<div class="choose-update shadow" bind:this={chooseUpdate}>
	<div class="card">
		<div class="card-body">
			<h5 class="card-title">What do you want to update?</h5>
			<div class="form-check form-switch">
				<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck1" bind:checked={updateEverthing} />
				<label class="form-check-label" for="flexSwitchCheck1"> Everything </label>
			</div>
			<div class="form-check form-switch">
				<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck2" bind:checked={updateAdmins} />
				<label class="form-check-label" for="flexSwitchCheck2"> Admins list </label>
			</div>
			<div class="form-check form-switch">
				<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck3" bind:checked={updateForm} />
				<label class="form-check-label" for="flexSwitchCheck3"> Application' form </label>
			</div>
		</div>
		<button class="btn btn-primary btn-sm" on:click={()=> update({all: updateEverthing, admins: updateAdmins, form: updateForm})}> Update </button>
	</div>
</div>

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
		line-height: 1.4832;

		@include bg;
		@include navbar;
		nav {
			background-color: rgba(255, 255, 255);
		}
		input[type='text'],
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
			}
		}
		input[type='date'],
		input[type='time'] {
			margin: 5px 0px 10px 0px;
			font-size: 15px;
			color: $primary-color;
			padding: 5px;
			padding-right: 5px;
			text-align: center;
		}
		.alertCont {
			position: fixed;
			z-index: 20;
			bottom: 30px;
			left: 30px;
		}
		.slideCont {
			width: 400vw;
			display: flex;
			flex-flow: row nowrap;
			.slide {
				width: 100vw;
				min-height: calc(100vh - 38px);
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.choose-update {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 100;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: none;
		.card {
			width: max-content;
			height: max-content;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: white;
			border-radius: 10px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			padding: 20px;
			.form-check {
				margin: 10px 0px;
			}
			.btn {
				width: 100px;
				margin-bottom: 10px;
			}
		}
	}
	@media screen and (max-width: 760px) {
		.lottieInfo {
			display: none !important;
		}
		.slide {
			margin-top: 90px;
			margin-bottom: 40px !important;
		}
		.form-preview {
			margin-top: 20px;
		}
	}
</style>
