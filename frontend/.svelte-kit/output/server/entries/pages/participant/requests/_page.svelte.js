import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component, i as each, e as escape } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { d as dotsSrc } from "../../../../chunks/dots.js";
import { l as lottieNotFoundSrc, N as Navbar } from "../../../../chunks/navbar.js";
import { s as sessionDuration } from "../../../../chunks/sessionDuration.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.loading.svelte-10xkaob.svelte-10xkaob{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.participant-container.svelte-10xkaob.svelte-10xkaob{width:100vw;min-height:calc(100vh - 38px);height:fit-content !important;align-items:center;background-color:#f0f5fa;overflow:hidden;position:relative;z-index:1}.participant-container.svelte-10xkaob .d1.svelte-10xkaob{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.participant-container.svelte-10xkaob .d2.svelte-10xkaob{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.participant-container.svelte-10xkaob nav .dropdown-menu .dropdown-item .fa.svelte-10xkaob{margin-right:10px}.participant-container.svelte-10xkaob .card-header.svelte-10xkaob{z-index:2}.participant-container.svelte-10xkaob .card-header .navbar-brand h4.svelte-10xkaob{font-family:"Medium"}.part_4.svelte-10xkaob.svelte-10xkaob{flex-shrink:0;padding:0px !important;padding-bottom:30px !important;margin:0px !important;width:100vw !important}.notFound.svelte-10xkaob.svelte-10xkaob{font-family:"light";font-size:18px;width:40%;padding-bottom:100px !important}.notFound.svelte-10xkaob h2.svelte-10xkaob{margin-top:-40px}.request-description.svelte-10xkaob.svelte-10xkaob{font-family:"light";line-height:25px;font-size:16px;text-align:justify;padding:8px}',
  map: null
};
let active = "requests";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let data = $page.data, requests = data.requests;
  data.API;
  let userInfo = data.userInfo;
  sessionDuration();
  let paricipantName = userInfo.name + " " + userInfo.surname;
  let userId = userInfo.id;
  let loading = "";
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>User requests</title>`, ""}<script defer src="${"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}" data-svelte="svelte-1o6vthh"><\/script>`, ""}

<div class="${"loading svelte-10xkaob"}"${add_attribute("this", loading, 0)}><lottie-player${add_attribute("src", lottieNotFoundSrc, 0)} background="${"transparent"}" speed="${"1"}" style="${"width: 300px; height: 300px;"}" loop autoplay></lottie-player></div>

<section class="${"participant-container svelte-10xkaob"}"><img class="${"d1 svelte-10xkaob"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
  <div class="${"d2 svelte-10xkaob"}"></div>

  ${validate_component(Navbar, "Navbar").$$render($$result, { userId, paricipantName, active }, {}, {})}

  <div class="${"part_4 d-flex justify-content-center align-items-start svelte-10xkaob"}"><div class="${"row part_4 justify-content-center align-items-center gap-3 p-0 m-0 svelte-10xkaob"}" id="${"requests"}">${requests.length == 0 ? `<div class="${"text-center p-3 notFound svelte-10xkaob"}" style="${"width: fit-content ;background: white"}"><lottie-player${add_attribute("src", lottieNotFoundSrc, 0)} background="${"transparent"}" style="${"max-width: 500px"}" speed="${"1"}" nocontrols></lottie-player>
          <h2 class="${"svelte-10xkaob"}">No requests found</h2>
          <small style="${"margin-top:-10px; display:block; opacity: 0.7"}">Please, try later.
          </small></div>` : `${each(requests, (request) => {
    let createdAt = new Date(Date.parse(request.created_at));
    return `
          <div class="${"card p-0 border-0 shadow-sm"}" style="${"width: 500px; flex-flow: column nowrap;"}"><h4 class="${"card-header p-4 m-0 svelte-10xkaob"}"><li class="${"fa fa-paper-plane me-1 svelte-10xkaob"}"></li>
              ${escape(request.team_name || request.competition_name || "No name")}</h4>
            <div class="${"card-body"}"><p class="${"request-description svelte-10xkaob"}">${escape(request.description ? request.description : "No description")}</p>

              <table class="${"table table-striped table-hover"}"><tbody><tr><th scope="${"row"}">Status</th>
                    <td>${escape(request.status)}</td></tr>
                  <tr><th scope="${"row"}">Created at</th>
                    <td>${escape(createdAt.toDateString())}, ${escape(createdAt.getHours() + ":" + createdAt.getMinutes() + ":" + createdAt.getSeconds())}</td></tr>
                  <tr><th scope="${"row"}">Participants IDs</th>
                    <td>${escape(request.participants.join(" ,"))}</td></tr>
                </tbody></table>
              <div class="${"btn gap-2"}"><button class="${"btn btn-primary btn-sm"}"><li class="${"fa fa-edit svelte-10xkaob"}"></li>
                  Edit
                </button>
                ${request.status != "canceled" && request.status != "cancelled" ? `<button class="${"btn btn-danger btn-sm"}"><li class="${"fa fa-trash svelte-10xkaob"}"></li>
                    Cancel
                  </button>` : `${request.status == "canceled" || request.status == "cancelled" ? `<button class="${"btn btn-success btn-sm"}"><li class="${"fa fa-trash-restore svelte-10xkaob"}"></li>
                    Renew
                  </button>` : ``}`}
              </div></div>
          </div>`;
  })}`}</div></div>
</section>`;
});
export {
  Page as default
};
