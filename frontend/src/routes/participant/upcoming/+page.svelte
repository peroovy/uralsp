<script lang="ts">
  import { page } from "$app/stores";
  import dotsSrc from "$lib/Assets/imgs/dots.png";
  import type { Competitions } from "$lib/types";
  import { onMount } from "svelte";
  import lottieNotFoundSrc from "$lib/Assets/animations/lottie-notfound2.json?url";
  import { sessionDuration } from "$lib/sessionDuration";
  import Navbar from "../navbar.svelte";

  let data = $page.data,
    upComming_competitions: Competitions = data.upComming_competitions;

  sessionDuration();
  let userId: number;
  let paricipantName = "";

  let loading = "" as unknown as HTMLElement;

  onMount(() => {
    loading.style.display = "none";
  });
</script>

<svelte:head>
  <title>Past registrations</title>
  <script
    defer
    src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</svelte:head>

<div class="loading" bind:this={loading}>
  <lottie-player
    src={lottieNotFoundSrc}
    background="transparent"
    speed="1"
    style="width: 300px; height: 300px;"
    loop
    autoplay
  />
</div>

<section class="participant-container">
  <img class="d1" src={dotsSrc} alt="" />
  <div class="d2" />

  <Navbar {userId} {paricipantName} />

  <div class="part_4 d-flex justify-content-center align-items-start">
    <div
      class="row justify-content-center align-items-center gap-3 p-0 m-0"
      style="flex-flow: column nowrap; gap: 30px; width: max-content"
      id="upcomming"
    >
      {#if upComming_competitions.length == 0}
        <div
          class="text-center p-3 notFound"
          style="width: fit-content; background: white"
        >
          <lottie-player
            src={lottieNotFoundSrc}
            background="transparent"
            style="max-width: 500px"
            speed="1"
            nocontrols
          />
          <h2>No Upcomming registerations!</h2>
          <small style="margin-top:-10px; display:block; opacity: 0.7">
            Please, try later.
          </small>
        </div>
      {/if}
      {#each upComming_competitions as competition}
        {@const diff =
          Date.parse(competition.registration_start) - Date.parse(Date())}
        {@const regDay = Date.parse(competition.registration_start)}
        {@const days = Math.floor(diff / (1000 * 60 * 60 * 24))}
        {@const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )}
        {@const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}
        {@const seconds = Math.floor((diff % (1000 * 60)) / 1000)}
        <div class="col-md">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-light">
              <nav
                class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center"
              >
                <div class="navbar-brand">
                  <h4 class="m-0">{competition.name}</h4>
                </div>
              </nav>
            </div>
            <div class="card-body gap-2">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row"><i class="fa-solid fa-calendar" /></th>
                    <td>Start date</td>
                    <td colspan="2">{new Date(regDay).toDateString()}</td>
                  </tr>
                  <tr>
                    <th scope="row"><i class="fa fa-clock" /></th>
                    <td colspan="2">Registeration will start in: </td>
                    <td>{days} day, {hours} hour, {minutes} min</td>
                  </tr>
                  <tr>
                    <th scope="row"><i class="fa fa-group" /></th>
                    <td colspan="2">Number of Contestant per team</td>
                    <td>{competition.persons_amount}</td>
                  </tr>
                </tbody>
              </table>
              <div class="btn btn-group gap-2">
                <button class="btn btn-primary">
                  <a class="link-light" href={competition.link} target="_blank">
                    <span class="fa fa-eye" />
                    <span> View full Contest</span>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
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
  .notFound {
    font-family: "light";
    font-size: 18px;
    width: 40%;
    padding-bottom: 100px !important;
    h2 {
      margin-top: -40px;
    }
  }
</style>
