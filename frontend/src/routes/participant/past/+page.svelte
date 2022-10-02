<script lang="ts">
  import { page } from "$app/stores";
  import dotsSrc from "$lib/Assets/imgs/dots.png";
  import type { Competitions } from "$lib/types";
  import { onMount } from "svelte";
  import lottieNotFoundSrc from "$lib/Assets/animations/lottie-notfound2.json?url";
  import { sessionDuration } from "$lib/sessionDuration";
  import Navbar from "../navbar.svelte";

  let data = $page.data,
    started_competitions: Competitions = data.started_competitions,
    userInfo = data.userInfo;
    
  sessionDuration();

  let paricipantName = userInfo.name + " " + userInfo.surname;
  let userId = userInfo.id;

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
      class="row justify-content-center align-items-center gap-3 p-0 m-0 "
      id="past"
    >
      <div class="col-md">
        {#if started_competitions.length == 0}
          <div
            class="text-center p-3 notFound"
            style="width: fit-content ;background: white"
          >
            <lottie-player
              src={lottieNotFoundSrc}
              background="transparent"
              style="max-width: 500px"
              speed="1"
              nocontrols
            />
            <h2>No past registerations!</h2>
            <small style="margin-top:-10px; display:block; opacity: 0.7">
              Please, try later.
            </small>
          </div>
        {:else}
          {#each started_competitions as comp}
            {@const StartDay = new Date(
              Date.parse(comp.started_at)
            ).toDateString()}

            <div class="col-md-5" style:width="fit-content">
              <div class="card shadow-sm border-0">
                <div class="card-header bg-light">
                  <nav
                    class="navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center"
                  >
                    <div class="navbar-brand">
                      <h4 class="m-0">{comp.name}</h4>
                    </div>
                  </nav>
                </div>
                <div class="card-body gap-2">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th scope="row"><i class="fa-solid fa-calendar" /></th>
                        <td>Start date</td>
                        <td colspan="2">{StartDay}</td>
                      </tr>
                      <tr>
                        <th scope="row"><i class="fa fa-group" /></th>
                        <td colspan="2">Number of Contestant per team</td>
                        <td>{comp.persons_amount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="btn btn-group gap-2">
                    <button class="btn btn-primary">
                      <a class="link-light" href={comp.link} target="_blank">
                        <span class="fa fa-eye" />
                        <span> View full Contest</span>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
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
</style>
