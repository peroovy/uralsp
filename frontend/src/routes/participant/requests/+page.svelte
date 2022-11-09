<script lang="ts">
    import { page } from "$app/stores";
    import dotsSrc from "$lib/Assets/imgs/dots.png";
    import type { Requests } from "$lib/types";
    import { onMount } from "svelte";
    import lottieNotFoundSrc from "$lib/Assets/animations/lottie-notfound2.json?url";
    import { sessionDuration } from "$lib/sessionDuration";
    import Navbar from "../navbar.svelte";
    import { base } from "$app/paths";
    let active = "requests";
    let data = $page.data,
        requests: Requests = data.requests,
        API = data.API,
        userInfo = data.userInfo;

    sessionDuration();

    let paricipantName = userInfo.name + " " + userInfo.surname;
    let userId = userInfo.id;

    let loading = "" as unknown as HTMLElement;
    function renewApplication(id: number) {
        let confirmation = confirm("Are you sure you want to renew your application?");
        if (!confirmation) return;
        fetch(`${API}/users/current/requests/${id}/renew`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        }).then((res) => {
            if (res.status == 200) {
                location.reload();
            } else {
                console.error(res);
            }
        });
    }

    function editApplication(id: number) {
        window.location.href = `${base}/contests/apply/${id}`;
    }

    function cancelApplication(id: number) {
        let confirmation = confirm("Are you sure you want to cancel your application?");
        if (!confirmation) return;
        fetch(`${API}/users/current/requests/${id}/cancel`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        }).then((res) => {
            if (res.status == 200) {
                location.reload();
            } else {
                console.error(res);
            }
        });
    }

    onMount(() => {
        loading.style.display = "none";
    });
</script>

<svelte:head>
    <title>User requests</title>
    <script defer src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</svelte:head>

<div class="loading" bind:this={loading}>
    <lottie-player src={lottieNotFoundSrc} background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay />
</div>

<section class="participant-container">
    <img class="d1" src={dotsSrc} alt="" />
    <div class="d2" />

    <Navbar {userId} {paricipantName} {active} />

    <div class="part_4 d-flex justify-content-center align-items-start">
        <div class="row part_4 justify-content-center align-items-center gap-3 p-0 m-0" id="requests">
            {#if requests.length == 0}
                <div class="text-center p-3 notFound" style="width: fit-content ;background: white">
                    <lottie-player src={lottieNotFoundSrc} background="transparent" style="max-width: 500px" speed="1" nocontrols />
                    <h2>No requests found</h2>
                    <small style="margin-top:-10px; display:block; opacity: 0.7"> Please, try later. </small>
                </div>
            {:else}
                {#each requests as request}
                    {@const createdAt = new Date(Date.parse(request.created_at))}
                    <div class="card p-0 border-0 shadow-sm" style="width: 500px; flex-flow: column nowrap;">
                        <h4 class="card-header p-4 m-0">
                            <li class="fa fa-paper-plane me-1" />
                            {request.team_name || request.competition_name || "No name"}
                        </h4>
                        <div class="card-body">
                            <p class="request-description">
                                {request.description ? request.description : "No description"}
                            </p>

                            <table class="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td>{request.status}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Created at</th>
                                        <td>{createdAt.toDateString()}, {createdAt.getHours() + ":" + createdAt.getMinutes() + ":" + createdAt.getSeconds()}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Participants IDs</th>
                                        <td>{request.participants.join(" ,")}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="btn gap-2">
                                <button class="btn btn-primary btn-sm" on:click={() => editApplication(request.competition)}>
                                    <li class="fa fa-edit" />
                                    Edit
                                </button>
                                {#if request.status != "canceled" && request.status != "cancelled"}
                                    <button class="btn btn-danger btn-sm" on:click={() => cancelApplication(request.id)}>
                                        <li class="fa fa-trash" />
                                        Cancel
                                    </button>
                                {:else if request.status == "canceled" || request.status == "cancelled"}
                                    <button class="btn btn-success btn-sm" on:click={() => renewApplication(request.id)}>
                                        <li class="fa fa-trash-restore" />
                                        Renew
                                    </button>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    @import "../../../lib/Assets/common.scss";
    .participant-container {
        width: 100vw;
        min-height: calc(100vh - 38px);
        height: fit-content !important;
        align-items: center;
        background-color: $bg-color;
        overflow: hidden;
        @include bg;
        position: relative;
        z-index: 1;
        @include navbar;
        .card-header {
            z-index: 2;
            .navbar-brand {
                h4 {
                    font-family: "Medium";
                }
            }
        }
        .contest-description {
            font-size: 15px;
            font-family: "Light";
            line-height: 1.5;
            margin: 15px;
            text-align: justify;
        }
        .link-light {
            text-decoration: none;
        }
    }
    .part_4 {
        flex-shrink: 0;
        padding: 0px !important;
        padding-bottom: 30px !important;
        margin: 0px !important;
        width: 100vw !important;
    }
    nav {
        position: sticky !important;
        z-index: 10 !important;
        background-color: #f8f9fa !important;
    }
    .notFound {
        font-family: "light";
        font-size: 18px;
        width: 40%;
        padding-bottom: 100px !important;
        h2 {
            margin-top: -40px;
        }
    }
    .request-description {
        font-family: "light";
        line-height: 25px;
        font-size: 16px;
        text-align: justify;
        padding: 8px;
    }
</style>
