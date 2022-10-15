import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component, i as each, e as escape } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { d as dotsSrc } from "../../../../chunks/dots.js";
import { l as lottieNotFoundSrc, N as Navbar } from "../../../../chunks/navbar.js";
import { s as sessionDuration } from "../../../../chunks/sessionDuration.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.loading.svelte-tdg4kv.svelte-tdg4kv{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.participant-container.svelte-tdg4kv.svelte-tdg4kv{width:100vw;min-height:calc(100vh - 38px);height:fit-content !important;align-items:center;background-color:#f0f5fa;overflow:hidden;position:relative;z-index:1}.participant-container.svelte-tdg4kv .d1.svelte-tdg4kv{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.participant-container.svelte-tdg4kv .d2.svelte-tdg4kv{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.participant-container.svelte-tdg4kv nav.svelte-tdg4kv{position:fixed;top:0px;z-index:100;flex-shrink:0;padding:10px 20px;font-family:"Light";font-size:15px !important}.participant-container.svelte-tdg4kv nav .navbar-brand.svelte-tdg4kv{align-items:center !important}.participant-container.svelte-tdg4kv nav .dropdown-menu .dropdown-item .fa.svelte-tdg4kv{margin-right:10px}.participant-container.svelte-tdg4kv .card-header.svelte-tdg4kv{z-index:2}.participant-container.svelte-tdg4kv .card-header .navbar-brand h4.svelte-tdg4kv{font-family:"Medium"}.participant-container.svelte-tdg4kv .link-light.svelte-tdg4kv{text-decoration:none}.part_4.svelte-tdg4kv.svelte-tdg4kv{flex-shrink:0;padding:0px !important;padding-bottom:30px !important;margin:0px !important;width:100vw !important}nav.svelte-tdg4kv.svelte-tdg4kv{position:sticky !important;z-index:10 !important;background-color:#f8f9fa !important}.notFound.svelte-tdg4kv.svelte-tdg4kv{font-family:"light";font-size:18px;width:40%;padding-bottom:100px !important}.notFound.svelte-tdg4kv h2.svelte-tdg4kv{margin-top:-40px}',
  map: null
};
let active = "ongoing";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let data = $page.data, ongoing_competition = data.ongoing_competition, userInfo = data.userInfo;
  sessionDuration();
  let paricipantName = userInfo.name + " " + userInfo.surname;
  let userId = userInfo.id;
  let loading = "";
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Ongoing registrations</title>`, ""}<script defer src="${"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}" data-svelte="svelte-1bo6wxh"><\/script>`, ""}

<div class="${"loading svelte-tdg4kv"}"${add_attribute("this", loading, 0)}><lottie-player${add_attribute("src", lottieNotFoundSrc, 0)} background="${"transparent"}" speed="${"1"}" style="${"width: 300px; height: 300px;"}" loop autoplay></lottie-player></div>

<section class="${"participant-container svelte-tdg4kv"}"><img class="${"d1 svelte-tdg4kv"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
  <div class="${"d2 svelte-tdg4kv"}"></div>

  ${validate_component(Navbar, "Navbar").$$render($$result, { userId, paricipantName, active }, {}, {})}

  <div class="${"part_4 d-flex justify-content-center align-items-start svelte-tdg4kv"}"><div class="${"row justify-content-center gap-4 justify-content-center align-items-center gap-3 p-0 m-0"}" style="${"flex-flow: column nowrap; gap: 30px; width: max-content"}" id="${"ongoing"}">${ongoing_competition.length == 0 ? `<div class="${"text-center p-3 notFound svelte-tdg4kv"}" style="${"width: fit-content ;background: white"}"><lottie-player${add_attribute("src", lottieNotFoundSrc, 0)} background="${"transparent"}" style="${"max-width: 500px"}" speed="${"1"}" nocontrols></lottie-player>
          <h2 class="${"svelte-tdg4kv"}">No ongoing registerations!</h2>
          <small style="${"margin-top:-10px; display:block; opacity: 0.7"}">Please, try later.
          </small></div>` : `${each(ongoing_competition, (comp) => {
    let diff = Date.parse(comp.registration_end) - Date.parse(Date()), regDay = new Date(Date.parse(comp.registration_start)).toDateString(), days = Math.floor(diff / (1e3 * 60 * 60 * 24)), hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60)), ApplyLink = "/contests/apply/" + comp.id;
    return `
          
          
          
          
          
          <div class="${"col-md"}"><div class="${"card shadow-sm border-0"}"><div class="${"card-header bg-light svelte-tdg4kv"}"><nav class="${"navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center svelte-tdg4kv"}"><div class="${"navbar-brand svelte-tdg4kv"}"><h4 class="${"m-0 svelte-tdg4kv"}">${escape(comp.name)}</h4></div>
                </nav></div>
              <div class="${"card-body gap-2"}"><table class="${"table"}"><tbody><tr><th scope="${"row"}"><i class="${"fa-solid fa-calendar"}"></i></th>
                      <td>Start date</td>
                      <td colspan="${"2"}">${escape(regDay)}</td></tr>
                    <tr><th scope="${"row"}"><i class="${"fa fa-clock svelte-tdg4kv"}"></i></th>
                      <td>Registeration ends in </td>
                      <td colspan="${"2"}">${escape(days)} days, ${escape(hours)} hours, ${escape(minutes)} mins</td></tr>
                    <tr><th scope="${"row"}"><i class="${"fa fa-group svelte-tdg4kv"}"></i></th>
                      <td colspan="${"2"}">Number of contestants per team</td>
                      <td>${escape(comp.persons_amount)}</td></tr>
                  </tbody></table>
                <div class="${"btn btn-group gap-2"}"><button class="${"btn btn-primary"}"><a class="${"link-light svelte-tdg4kv"}"${add_attribute("href", ApplyLink, 0)} target="${"_blank"}"><span class="${"fa fa-check-square-o svelte-tdg4kv"}"></span>
                      <span class="${"ptn-count"}">Apply </span>
                    </a></button>
                  <button class="${"btn btn-primary"}"><a class="${"link-light svelte-tdg4kv"}"${add_attribute("href", comp.link, 0)} target="${"_blank"}"><span class="${"fa fa-eye svelte-tdg4kv"}"></span>
                      <span>View full Contest</span></a>
                  </button></div>
              </div></div>
          </div>`;
  })}`}</div></div>
</section>`;
});
export {
  Page as default
};
