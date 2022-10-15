<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import dotsSrc from "$lib/Assets/imgs/dots.png";
  import type {
    RequestsOut,
    UserRequest,
    CompetitionWithFields,
  } from "$lib/types";
  import { sessionDuration } from "$lib/sessionDuration";
  sessionDuration();

  const data = $page.data;
  export let contest: CompetitionWithFields = data.contest,
    oldRequest: UserRequest = data.oldRequest,
    userId: number = data.userId,
    accessToken: string = data.accessToken,
    permissions: string = data.permissions,
    API: string = data.API;

  let alertCont: HTMLDivElement;
  let loading: HTMLDivElement;
  let update_flag = false;
  let everyThingIsOk = true;
  if (
    Object.keys(contest).length == 0 ||
    userId === undefined ||
    accessToken == undefined ||
    permissions == undefined
  )
    everyThingIsOk = false;

  $: team_name = "";

  let application: RequestsOut = {
    team_name: team_name,
    team: [],
    competition: contest.id,
  };
  interface TeamMember {
    user_id: number;
    form: { field_id: string | undefined; value: string | undefined }[];
  }
  let demoField = {} as TeamMember;

  for (let i = 0; i < contest.persons_amount; i++) {
    application.team.push(demoField);
  }

  let requestTemplates: HTMLElement[] = [];
  function showMessage(msgTitle: string, msgbody: string): void {
    if (msgTitle === "Success") {
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
      alertCont.innerHTML = "";
    }, 2000);
  }

  function saveApp(index: number, mode = "msg"): string {
    let form = [];
    let template =
      requestTemplates[index].children[contest.persons_amount > 1 ? 1 : 0]
        .children;
    for (let i = 0; i < template.length; i++) {
      let fieldId = (template[i] as HTMLElement).dataset.id;
      let fieldValue = (template[i].children[1] as HTMLInputElement).value;
      let isRequired = contest.fields.find(
        (field) => field.id == fieldId
      )!.is_required;
      if (isRequired && fieldValue == "") {
        alertCont.style.display = "block";
        showMessage(
          "Error",
          `Please fill all required fields before submitting`
        );
        return "error";
      }
      form.push({
        field_id: fieldId,
        value: fieldValue,
      });
    }
    let contestants = contest.persons_amount;
    if (contestants == 1) {
      application.team = [
        {
          user_id: userId,
          form,
        },
      ];
    } else if (contestants > 1) {
      let applicant_id = (
        requestTemplates[index].children[0].children[1] as HTMLInputElement
      ).value;
      if (applicant_id == "") {
        console.log("applicant_id is empty");
        return "error";
      } else if (isNaN(parseInt(applicant_id))) {
        console.log("applicant_id is not a number");
        return "error";
      }
      let alreadySaved = application.team.find(
        (member) => member.user_id == parseInt(applicant_id)
      );
      if (alreadySaved) {
        let app_index = 0;
        application.team.every((member, index) => {
          if (member.user_id == parseInt(applicant_id)) {
            index = app_index;
          }
        });
        application.team[app_index].form = form;
      } else if (!alreadySaved && application.team.length < contestants) {
        application.team.push({
          user_id: parseInt(applicant_id),
          form,
        });
      } else {
        console.log("too many applicants");
        return "error";
      }
    }
    return "success";
  }

  async function submitRequest() {
    for (let i = 0; i < contest.persons_amount; i++) {
      let status = saveApp(i, "noMsg");
      if (status === "error") {
        alert("Please fill all the required fields");
        return;
      }
    }
    // Validate the application
    if (application.team.length < contest.persons_amount) {
      alert("Please add save all the applications first");
      return;
    }
    application.team_name = team_name;

    if (application.team_name === "" && contest.persons_amount > 1) {
      alert("Please enter a team name");
      return;
    }
    application.team_name = team_name;
    // send the request to the server and validate the response
    const response = await fetch(`${API}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(application),
    });
    if (response.status == 200) {
      showMessage("Success", "Your request has been sent successfully");
      setTimeout(() => {
        window.location.href = `${base}/participant/requests`;
      }, 1000);
    } else {
      let e = await response.json();
      showMessage(
        "Error",
        Array.isArray(e.detail)
          ? e.detail[0]
            ? e.detail[0].msg
            : "Something went wrong!"
          : e.detail
      );
    }
  }

  async function updateRequest() {
    for (let i = 0; i < contest.persons_amount; i++) {
      let status = saveApp(i, "noMsg");
      if (status == "error") {
        alert("Please fill all the required fields");
        return;
      }
    }
    application.team_name = team_name;

    if (application.team_name === "" && contest.persons_amount > 1) {
      alert("Please enter a team name");
      return;
    }
    // send the request to the server and validate the response
    const response = await fetch(`${API}/requests/${oldRequest.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(application),
    });
    if (response.status == 200) {
      showMessage("Success", "Your request has been updated successfully");
      setTimeout(() => {
        window.location.href = `${base}/participant/requests`;
      }, 1000);
    } else {
      let e = await response.json();
      showMessage(
        "Error",
        Array.isArray(e.detail)
          ? e.detail[0]
            ? e.detail[0].msg
            : "Something went wrong!"
          : e.detail
      );
    }
  }

  async function retreiveOldRequest() {
    // Reterive the old request and fill the form
    let old_respond = await fetch(`${API}/requests/` + contest.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (old_respond.ok) {
      let old_request = await old_respond.json();

      // Check if the user applied for this contest
      let applied = old_request.competition == contest.id;
      if (!applied) return;
      update_flag = true;
      // Fill the form
      for (let u = 0; u < contest.persons_amount; u++) {
        let template =
          requestTemplates[u].children[contest.persons_amount > 1 ? 1 : 0]
            .children;
        team_name = old_request.team_name;
        for (let i = 0; i < template.length; i++) {
          let fieldId = (template[i] as HTMLElement).dataset.id;

          let fieldValue = old_request.participants[i].form.find(
            (field: { field_id: string }) => field.field_id == fieldId
          )!.value;
          (template[i].children[1] as HTMLInputElement).value = fieldValue;
        }
      }
    }
  }

  onMount(() => {
    if (!everyThingIsOk) goto(base + "/");
    if (oldRequest) {
      retreiveOldRequest();
    }
    loading.style.display = "none";
  });
</script>

<svelte:head>
  <title>App Name | {contest.name}-form</title>
</svelte:head>

<section
  class="container-fluid p-0 contestForm justify-content-center align-items-start"
>
  <img class="d1" src={dotsSrc} alt="" />
  <div class="d2" />

  <nav
    class="navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm mb-3 p-0"
  >
    <div class="container">
      <div class="navbar-brand d-flex col align-items-center">
        <span class="fa-brands fa-wpforms ms-3 me-3" />
        <h4 class="p-0 m-0">Contest application</h4>
      </div>
      <div class="navbar-nav">
        <button
          class="btn d-flex gap-3 align-items-center"
          on:click={() =>
            (window.location.href = `${base}/participant/ongoing`)}
        >
          <i class="fa fa-arrow-left" />
          Back
        </button>
      </div>
    </div>
  </nav>

  <div class="row col-12 m-0 p-0 justify-content-center">
    <div class="card col-md-5 p-0" style="max-width: 500px">
      <nav class="navbar card-header">
        <div class="container-fluid justify-content-left">
          <div
            class="d-flex navbar-brand mb-0 justify-content-left align-items-center gap-3 p-3"
          >
            <li class="fa fa-certificate" />
            {contest.name}
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#compDetails"
            aria-controls="compDetails"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="fa fa-ellipsis-v" />
          </button>
          <div class="collapse navbar-collapse" id="compDetails">
            <ul class="navbar-nav gap-2">
              <table class="table table-borderless">
                <tr>
                  <td>
                    <i class="fa fa-calendar" />
                    <strong>Starts on:</strong>
                  </td>
                  <td
                    >{new Date(
                      Date.parse(contest.started_at)
                    ).toDateString()}</td
                  >
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-clock" />
                    <strong>Ends in:</strong>
                  </td>
                  <td>
                    {Math.floor(
                      (Date.parse(contest.registration_end) -
                        Date.parse(Date())) /
                        (1000 * 60 * 60 * 24)
                    )} days,
                    {Math.floor(
                      ((Date.parse(contest.registration_end) -
                        Date.parse(Date())) %
                        (1000 * 60 * 60 * 24)) /
                        (1000 * 60 * 60)
                    )} hours,
                    {Math.floor(
                      ((Date.parse(contest.registration_end) -
                        Date.parse(Date())) %
                        (1000 * 60 * 60)) /
                        (1000 * 60)
                    )} minutes
                  </td>
                </tr>
                <tr>
                  <td class="d-flex">
                    <i class="fa fa-group" />
                    <strong>Contestants:</strong>
                  </td>
                  <td>{contest.persons_amount}</td>
                </tr>
              </table>
            </ul>
          </div>
        </div>
      </nav>
      <div class="card-body">
        {#if contest.persons_amount > 1}
          <div class="form-field mb-3">
            <label for="teamName"
              >Team Name <span class="text-danger" style:font-size="19px"
                >*</span
              ></label
            >
            <input
              type="text"
              id="teamName"
              class="form-control"
              placeholder="Team Name"
              bind:value={team_name}
            />
          </div>
        {/if}
        <div class="row gap-1">
          {#each Array(contest.persons_amount) as _, i}
            {#if contest.persons_amount > 1}
              <button
                class="btn mb-0 btn-light border-0 rounded-0 btn-block"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#appLicationNum{i}"
                aria-expanded="false"
                aria-controls="appLicationNum{i}"
              >
                Application Number: {i + 1}
              </button>
            {/if}

            <div
              class="collapse mt-0 multi-collapse bg-light {i == 0
                ? 'show'
                : ''}"
              id="appLicationNum{i}"
              bind:this={requestTemplates[i]}
            >
              {#if contest.persons_amount > 1}
                <div class="form-field mb-3">
                  <label for="teamName">
                    Applicant Id
                    <span class="text-danger" style:font-size="19px">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter applicant Id ..."
                  />
                </div>
              {/if}
              <div>
                {@html contest.request_template}
              </div>
              <!-- <button
                class="btn btn-sm btn-secondary m-2 ms-0"
                style="max-width: max-content;"
                on:click={() => saveApp(i)}
              >
                <i class="fas fa-save me-1" />
                Save application
              </button> -->
            </div>
          {/each}
        </div>
        <div class="btn-group col-12 pt-3 ">
          <!-- Update the request -->
          <div
            class="btn-group col-12 gap-1 d-flex justify-content-center align-items-center"
          >
            {#if update_flag}
              <button
                class="btn btn-block btn-primary rounded-0"
                style="background-color: #3490dc; border-color: #3490dc"
                on:click={updateRequest}
              >
                <i class="fas fa-refresh me-1" />
                Update Application
              </button>
            {/if}
            {#if permissions === "teacher"}
              <button
                class="btn btn-block btn-outline-primary rounded-0"
                on:click={submitRequest}
              >
                <i class="fas fa-plus me-1" />
                Add another Application
              </button>
            {/if}
            {#if update_flag }
              <button
                class="btn btn-block btn-primary rounded-0"
                style="background-color: #3490dc; border-color: #3490dc"
                on:click={submitRequest}
              >
                <li class="fa fa-paper-plane me-1" />
                Submit
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="alert" bind:this={alertCont} />
</section>

<div class="loading" bind:this={loading}>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>

<style lang="scss">
  @import "../../../../lib/Assets/common.scss";

  .contestForm {
    width: 100vw;
    min-height: calc(100vh - 38px);
    align-items: center;
    background-image: $bg-color;
    @include bg;
    .navbar {
      background-color: white;
      @include navbar;
    }
    position: relative;
    z-index: 1;
    padding-bottom: 30px;
    .card {
      font-family: "Light";
      .btn-outline-primary {
        border-color: #3490dc;
        color: #3490dc;
        &:hover {
          background-color: #3490dc;
          color: white !important;
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
        content: "";
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
