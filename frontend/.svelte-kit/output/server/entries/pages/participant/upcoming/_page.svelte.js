import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component, i as each, e as escape } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { d as dotsSrc } from "../../../../chunks/dots.js";
import { l as lottieNotFoundSrc, N as Navbar } from "../../../../chunks/navbar.js";
import { s as sessionDuration } from "../../../../chunks/sessionDuration.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
    code: '.loading.svelte-fyijzj.svelte-fyijzj{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.participant-container.svelte-fyijzj.svelte-fyijzj{width:100vw;min-height:calc(100vh - 38px);height:fit-content !important;align-items:center;background-color:#f0f5fa;overflow:hidden;position:relative;z-index:1}.participant-container.svelte-fyijzj .d1.svelte-fyijzj{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.participant-container.svelte-fyijzj .d2.svelte-fyijzj{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.participant-container.svelte-fyijzj nav.svelte-fyijzj{position:fixed;top:0px;z-index:100;flex-shrink:0;padding:10px 20px;font-family:"Light";font-size:15px !important}.participant-container.svelte-fyijzj nav .navbar-brand.svelte-fyijzj{align-items:center !important}.participant-container.svelte-fyijzj nav .dropdown-menu .dropdown-item .fa.svelte-fyijzj{margin-right:10px}.participant-container.svelte-fyijzj .card-header.svelte-fyijzj{z-index:2}.participant-container.svelte-fyijzj .card-header .navbar-brand h4.svelte-fyijzj{font-family:"Medium"}.participant-container.svelte-fyijzj .link-light.svelte-fyijzj{text-decoration:none}nav.svelte-fyijzj.svelte-fyijzj{position:sticky !important;z-index:10 !important;background-color:#f8f9fa !important}.part_4.svelte-fyijzj.svelte-fyijzj{flex-shrink:0;padding:0px !important;padding-bottom:30px !important;margin:0px !important;width:100vw !important}.notFound.svelte-fyijzj.svelte-fyijzj{font-family:"light";font-size:18px;width:40%;padding-bottom:100px !important}.notFound.svelte-fyijzj h2.svelte-fyijzj{margin-top:-40px}',
    map: null,
};
let active = "upcoming";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $page, $$unsubscribe_page;
    $$unsubscribe_page = subscribe(page, (value) => ($page = value));
    let data = $page.data,
        upComming_competitions = data.upComming_competitions,
        userInfo = data.userInfo;
    sessionDuration();
    let paricipantName = userInfo.name + " " + userInfo.surname;
    let userId = userInfo.id;
    let loading = "";
    $$result.css.add(css);
    $$unsubscribe_page();
    return `${
        (($$result.head += `${
            (($$result.title = `<title>Upcoming registrations</title>`), "")
        }<script defer src="${"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}" data-svelte="svelte-7bk648"><\/script>`),
        "")
    }

<div class="${"loading svelte-fyijzj"}"${add_attribute("this", loading, 0)}><lottie-player${add_attribute(
        "src",
        lottieNotFoundSrc,
        0
    )} background="${"transparent"}" speed="${"1"}" style="${"width: 300px; height: 300px;"}" loop autoplay></lottie-player></div>

<section class="${"participant-container svelte-fyijzj"}"><img class="${"d1 svelte-fyijzj"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
  <div class="${"d2 svelte-fyijzj"}"></div>
  ${validate_component(Navbar, "Navbar").$$render($$result, { userId, paricipantName, active }, {}, {})}

  <div class="${"part_4 d-flex justify-content-center align-items-start svelte-fyijzj"}"><div class="${"row justify-content-center align-items-center gap-3 p-0 m-0"}" style="${"flex-flow: column nowrap; gap: 30px; width: max-content"}" id="${"upcomming"}">${
        upComming_competitions.length == 0
            ? `<div class="${"text-center p-3 notFound svelte-fyijzj"}" style="${"width: fit-content; background: white"}"><lottie-player${add_attribute(
                  "src",
                  lottieNotFoundSrc,
                  0
              )} background="${"transparent"}" style="${"max-width: 500px"}" speed="${"1"}" nocontrols></lottie-player>
          <h2 class="${"svelte-fyijzj"}">No Upcomming registerations!</h2>
          <small style="${"margin-top:-10px; display:block; opacity: 0.7"}">Please, try later.
          </small></div>`
            : ``
    }
      ${each(upComming_competitions, (competition) => {
          let diff = Date.parse(competition.registration_start) - Date.parse(Date()),
              regDay = Date.parse(competition.registration_start),
              days = Math.floor(diff / (1e3 * 60 * 60 * 24)),
              hours = Math.floor((diff % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)),
              minutes = Math.floor((diff % (1e3 * 60 * 60)) / (1e3 * 60));
          return `
        
        
        
        
        
        <div class="${"col-md"}"><div class="${"card shadow-sm border-0"}"><div class="${"card-header bg-light svelte-fyijzj"}"><nav class="${"navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center svelte-fyijzj"}"><div class="${"navbar-brand svelte-fyijzj"}"><h4 class="${"m-0 svelte-fyijzj"}">${escape(
              competition.name
          )}</h4></div>
              </nav></div>
            <div class="${"card-body gap-2"}"><table class="${"table"}"><tbody><tr><th scope="${"row"}"><i class="${"fa-solid fa-calendar"}"></i></th>
                    <td>Start date</td>
                    <td colspan="${"2"}">${escape(new Date(regDay).toDateString())}</td></tr>
                  <tr><th scope="${"row"}"><i class="${"fa fa-clock svelte-fyijzj"}"></i></th>
                    <td colspan="${"2"}">Registeration will start in: </td>
                    <td>${escape(days)} day, ${escape(hours)} hour, ${escape(minutes)} min</td></tr>
                  <tr><th scope="${"row"}"><i class="${"fa fa-group svelte-fyijzj"}"></i></th>
                    <td colspan="${"2"}">Number of Contestant per team</td>
                    <td>${escape(competition.persons_amount)}</td></tr>
                </tbody></table>
              <div class="${"btn btn-group gap-2"}"><button class="${"btn btn-primary"}"><a class="${"link-light svelte-fyijzj"}"${add_attribute(
              "href",
              competition.link,
              0
          )} target="${"_blank"}"><span class="${"fa fa-eye svelte-fyijzj"}"></span>
                    <span>View full Contest</span></a>
                </button></div>
            </div></div>
        </div>`;
      })}</div></div>
</section>`;
});
export { Page as default };
