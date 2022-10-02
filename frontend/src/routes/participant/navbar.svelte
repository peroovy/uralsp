<script lang="ts">
  import { base } from "$app/paths";
  import src from "$lib/Assets/imgs/logo.png";
  import tempPhoto from "$lib/Assets/imgs/temp-photo.png";
  import { page } from "$app/stores";

  let navBar: HTMLElement;

  function signout(): void {
    localStorage.clear();
    window.location.href = base + "/";
  }

  export let userId: number, paricipantName: string, active: string;
  
  controlActive(active);
  
  function controlActive(activeEle: string): void {
		let navs = navBar.querySelectorAll('.nav-link');
		for (let ele in navs) {
			if (navs[ele].nodeName == 'SPAN' && navs[ele].id === activeEle && navs[ele].classList.contains('active')) {
				return;
			}
		}
		// Deactivate all navs
		for (let ele in navs) {
			if (navs[ele].nodeName == 'SPAN') {
				navs[ele].classList.remove('active');
			}
		}
		// Activate the Clicked Nav
		for (let i = 0; i < navs.length; i++) {
			if (navs[i].nodeName == 'SPAN' && navs[i].id === activeEle) {
				navs[i].classList.toggle('active');
			}
		}
	}
  
</script>

<div class="participant-container">
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
        <ul
          class="navbar-nav me-auto mb-20 mb-lg-0 col-12 justify-content-around"
          bind:this={navBar}
        >
          <li
            class="nav-item"
            on:click={() => {
              window.location.href = base + "/participant/upcoming";
            }}
          >
            <span class="nav-link active" id="upcoming"> Upcoming registeration </span>
          </li>
          <li
            class="nav-item"
            on:click={() => {
              window.location.href = base + "/participant/ongoing";
            }}
          >
            <span class="nav-link" id="onging"> Ongoing registeration </span>
          </li>
          <li
            class="nav-item"
            on:click={() => {
              window.location.href = base + "/participant/past";
            }}
          >
            <span class="nav-link" id="past"> Past registeration </span>
          </li>
          <li
            class="nav-item"
            on:click={() => {
              window.location.href = base + "/participant/requests";
            }}
          >
            <span class="nav-link" id="requests"> Requests </span>
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
              <li class:active={$page.url.pathname === "/info"}>
                <a
                  sveltekit:prefetch
                  href="{base}/info/{userId}"
                  target="_blank"
                  content="Home"
                  class="dropdown-item nav-link"
                >
                  <span class="fa fa-gears" />
                  Settings
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li class="dropdown-item nav-link signOut" on:click={signout}>
                <span class="fa fa-sign-out" />
                Sign out
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

<style lang="scss">
  @import "../../lib/Assets/common.scss";
  
  .participant-container {
    width: 100vw;
    @include navbar;
  }
  
  nav {
    position: sticky !important;
    z-index: 10 !important;
    background-color: #f8f9fa !important;
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
        content: "";
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