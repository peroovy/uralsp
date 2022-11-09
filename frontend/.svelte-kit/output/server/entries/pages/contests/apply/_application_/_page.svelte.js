import { c as create_ssr_component, b as subscribe, e as escape, d as add_attribute, f as add_styles, i as each } from "../../../../../chunks/index.js";
import { p as page } from "../../../../../chunks/stores.js";
import { d as dotsSrc } from "../../../../../chunks/dots.js";
import { s as sessionDuration } from "../../../../../chunks/sessionDuration.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
    code: '.loading.svelte-akqv6t.svelte-akqv6t{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.loading.svelte-akqv6t .spinner-border.svelte-akqv6t{width:3rem;height:3rem;border-width:0.25rem;color:#19334d}.contestForm.svelte-akqv6t.svelte-akqv6t{width:100vw;min-height:calc(100vh - 38px);align-items:center;background-image:#f0f5fa;position:relative;z-index:1;padding-bottom:30px}.contestForm.svelte-akqv6t .d1.svelte-akqv6t{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.contestForm.svelte-akqv6t .d2.svelte-akqv6t{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.contestForm.svelte-akqv6t .navbar.svelte-akqv6t{background-color:white}.contestForm.svelte-akqv6t .navbar nav.svelte-akqv6t{position:fixed;top:0px;z-index:100;flex-shrink:0;padding:10px 20px;font-family:"Light";font-size:15px !important}.contestForm.svelte-akqv6t .navbar nav .navbar-brand.svelte-akqv6t{align-items:center !important}.contestForm.svelte-akqv6t .navbar nav .dropdown-menu .dropdown-item .fa.svelte-akqv6t{margin-right:10px}.contestForm.svelte-akqv6t .card.svelte-akqv6t{font-family:"Light"}.contestForm.svelte-akqv6t .card .btn-outline-primary.svelte-akqv6t{border-color:#3490dc;color:#3490dc}.contestForm.svelte-akqv6t .card .btn-outline-primary.svelte-akqv6t:hover{background-color:#3490dc;color:white !important}.alert.svelte-akqv6t.svelte-akqv6t{position:fixed;bottom:20px;left:0;z-index:5}@media screen and (max-width: 2000px){.navbar-nav.svelte-akqv6t.svelte-akqv6t{margin:20px 0px}.navbar-nav.svelte-akqv6t.svelte-akqv6t::before{content:"";display:block;width:100%;height:1px;background-color:#19334d;margin-bottom:10px;opacity:0.2}}',
    map: null,
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let team_name;
    let $page, $$unsubscribe_page;
    $$unsubscribe_page = subscribe(page, (value) => ($page = value));
    sessionDuration();
    const data = $page.data;
    let { contest = data.contest, oldRequest = data.oldRequest, userId = data.userId, accessToken = data.accessToken, permissions = data.permissions, API = data.API } = $$props;
    let alertCont;
    let loading;
    if (Object.keys(contest).length == 0 || userId === void 0 || accessToken == void 0 || permissions == void 0);
    ({
        team_name,
        team: [],
        competition: contest.id,
    });
    for (let i = 0; i < contest.persons_amount; i++) {}
    let requestTemplates = [];
    if ($$props.contest === void 0 && $$bindings.contest && contest !== void 0) $$bindings.contest(contest);
    if ($$props.oldRequest === void 0 && $$bindings.oldRequest && oldRequest !== void 0) $$bindings.oldRequest(oldRequest);
    if ($$props.userId === void 0 && $$bindings.userId && userId !== void 0) $$bindings.userId(userId);
    if ($$props.accessToken === void 0 && $$bindings.accessToken && accessToken !== void 0) $$bindings.accessToken(accessToken);
    if ($$props.permissions === void 0 && $$bindings.permissions && permissions !== void 0) $$bindings.permissions(permissions);
    if ($$props.API === void 0 && $$bindings.API && API !== void 0) $$bindings.API(API);
    $$result.css.add(css);
    team_name = "";
    $$unsubscribe_page();
    return `${(($$result.head += `${(($$result.title = `<title>App Name | ${escape(contest.name)}-form</title>`), "")}`), "")}

<section class="${"container-fluid p-0 contestForm justify-content-center align-items-start svelte-akqv6t"}"><img class="${"d1 svelte-akqv6t"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
  <div class="${"d2 svelte-akqv6t"}"></div>

  <nav class="${"navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm mb-3 p-0 svelte-akqv6t"}"><div class="${"container"}"><div class="${"navbar-brand d-flex col align-items-center svelte-akqv6t"}"><span class="${"fa-brands fa-wpforms ms-3 me-3"}"></span>
        <h4 class="${"p-0 m-0"}">Contest application</h4></div>
      <div class="${"navbar-nav svelte-akqv6t"}"><button class="${"btn d-flex gap-3 align-items-center"}"><i class="${"fa fa-arrow-left svelte-akqv6t"}"></i>
          Back
        </button></div></div></nav>

  <div class="${"row col-12 m-0 p-0 justify-content-center"}"><div class="${"card col-md-5 p-0 svelte-akqv6t"}" style="${"max-width: 500px"}"><nav class="${"navbar card-header svelte-akqv6t"}"><div class="${"container-fluid justify-content-left"}"><div class="${"d-flex navbar-brand mb-0 justify-content-left align-items-center gap-3 p-3 svelte-akqv6t"}"><li class="${"fa fa-certificate svelte-akqv6t"}"></li>
            ${escape(contest.name)}</div>
          <button class="${"navbar-toggler"}" type="${"button"}" data-bs-toggle="${"collapse"}" data-bs-target="${"#compDetails"}" aria-controls="${"compDetails"}" aria-expanded="${"false"}" aria-label="${"Toggle navigation"}"><span class="${"fa fa-ellipsis-v svelte-akqv6t"}"></span></button>
          <div class="${"collapse navbar-collapse"}" id="${"compDetails"}"><ul class="${"navbar-nav gap-2 svelte-akqv6t"}"><table class="${"table table-borderless"}"><tr><td><i class="${"fa fa-calendar svelte-akqv6t"}"></i>
                    <strong>Starts on:</strong></td>
                  <td>${escape(new Date(Date.parse(contest.started_at)).toDateString())}</td></tr>
                <tr><td><i class="${"fa fa-clock svelte-akqv6t"}"></i>
                    <strong>Ends in:</strong></td>
                  <td>${escape(Math.floor((Date.parse(contest.registration_end) - Date.parse(Date())) / (1e3 * 60 * 60 * 24)))} days,
                    ${escape(Math.floor(((Date.parse(contest.registration_end) - Date.parse(Date())) % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)))} hours,
                    ${escape(Math.floor(((Date.parse(contest.registration_end) - Date.parse(Date())) % (1e3 * 60 * 60)) / (1e3 * 60)))} minutes
                  </td></tr>
                <tr><td class="${"d-flex"}"><i class="${"fa fa-group svelte-akqv6t"}"></i>
                    <strong>Contestants:</strong></td>
                  <td>${escape(contest.persons_amount)}</td></tr></table></ul></div></div></nav>
      <div class="${"card-body"}">${
        contest.persons_amount > 1
            ? `<div class="${"form-field mb-3"}"><label for="${"teamName"}">Team Name <span class="${"text-danger"}"${add_styles({ "font-size": `19px` })}>*</span></label>
            <input type="${"text"}" id="${"teamName"}" class="${"form-control"}" placeholder="${"Team Name"}"${add_attribute("value", team_name, 0)}></div>`
            : ``
    }
        <div class="${"row gap-1"}">${each(Array(contest.persons_amount), (_, i) => {
        return `${
            contest.persons_amount > 1
                ? `<button class="${"btn mb-0 btn-light border-0 rounded-0 btn-block"}" type="${"button"}" data-bs-toggle="${"collapse"}" data-bs-target="${
                      "#appLicationNum" + escape(i, true)
                  }" aria-expanded="${"false"}" aria-controls="${"appLicationNum" + escape(i, true)}">Application Number: ${escape(i + 1)}
              </button>`
                : ``
        }
            
            <div class="${"collapse mt-0 multi-collapse bg-light " + escape(i == 0 ? "show" : "", true)}" id="${"appLicationNum" + escape(i, true)}"${add_attribute("this", requestTemplates[i], 0)}>${
            contest.persons_amount > 1
                ? `<div class="${"form-field mb-3"}"><label for="${"teamName"}">Applicant Id <span class="${"text-danger"}"${add_styles({ "font-size": `19px` })}>*</span></label>
                  <input type="${"text"}" class="${"form-control"}" placeholder="${"Enter applicant Id ..."}">
                </div>`
                : ``
        }
              <div><!-- HTML_TAG_START -->${contest.request_template}<!-- HTML_TAG_END --></div>
              
            </div>`;
    })}</div>
        <div class="${"btn-group col-12 pt-3 "}">
          <div class="${"btn-group col-12 gap-1 d-flex justify-content-center align-items-center"}">${``}
            ${
                permissions === "teacher"
                    ? `<button class="${"btn btn-block btn-outline-primary rounded-0 svelte-akqv6t"}"><i class="${"fas fa-plus me-1"}"></i>
                Add another Application
              </button>`
                    : ``
            }
            ${
                oldRequest === void 0 || Object.keys(oldRequest).length <= 0
                    ? `<button class="${"btn btn-block btn-primary rounded-0"}" style="${"background-color: #3490dc; border-color: #3490dc"}"><li class="${"fa fa-paper-plane me-1 svelte-akqv6t"}"></li>
                Submit
              </button>`
                    : ``
            }</div></div></div></div></div>
  <div class="${"alert svelte-akqv6t"}"${add_attribute("this", alertCont, 0)}></div></section>

<div class="${"loading svelte-akqv6t"}"${add_attribute("this", loading, 0)}><div class="${"spinner-border svelte-akqv6t"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div>
</div>`;
});
export { Page as default };
