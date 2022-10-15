import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, f as add_styles, i as each } from "../../../../../chunks/index.js";
import { d as dotsSrc } from "../../../../../chunks/dots.js";
import { p as page } from "../../../../../chunks/stores.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.loading.svelte-wnp09j.svelte-wnp09j{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.loading.svelte-wnp09j .spinner-border.svelte-wnp09j{width:3rem;height:3rem;border-width:0.25rem;color:#19334d}.application.svelte-wnp09j.svelte-wnp09j{padding:0px;margin:0;background-color:#fff;min-height:100vh;background-image:linear-gradient(to bottom right, #19334d, #3490dc);width:100vw;min-height:calc(100vh - 38px)}.application.svelte-wnp09j .d1.svelte-wnp09j{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.application.svelte-wnp09j .d2.svelte-wnp09j{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.application.svelte-wnp09j nav.svelte-wnp09j{position:fixed;top:0px;z-index:100;flex-shrink:0;padding:10px 20px;font-family:"Light";font-size:15px !important}.application.svelte-wnp09j nav .navbar-brand.svelte-wnp09j{align-items:center !important}.application.svelte-wnp09j nav .dropdown-menu .dropdown-item .fa.svelte-wnp09j{margin-right:10px}.application.svelte-wnp09j nav.svelte-wnp09j{font-family:"Medium";margin-bottom:20px;background-color:white;width:100%}.application.svelte-wnp09j .basic-app-info.svelte-wnp09j{background-color:rgba(255, 255, 255, 0.98);font-family:"Medium";line-height:30px}.application.svelte-wnp09j .basic-app-info .btns.svelte-wnp09j{width:100%;display:flex;justify-content:center;gap:5px;align-items:center}.alert.svelte-wnp09j.svelte-wnp09j{position:fixed;bottom:20px;left:0;z-index:5}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let team_name;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const { app, permission, real_id, access_token, ownerName, comp, API } = $page.data;
  $page.data;
  let loading;
  let NParticipants = "";
  let alertCont = "";
  let requestTemplates = [];
  ({
    team_name,
    team: [],
    competition: comp.id
  });
  $$result.css.add(css);
  team_name = "";
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title> Requests </title>`, ""}`, ""}

<div class="${"application svelte-wnp09j"}"><img class="${"d1 svelte-wnp09j"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
	<div class="${"d2 svelte-wnp09j"}"></div>
	<nav class="${"navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm svelte-wnp09j"}"><div class="${"container"}"><div class="${"navbar-brand d-flex col align-items-center svelte-wnp09j"}"><span class="${"fa-brands fa-wpforms ms-3 me-3"}"></span>
				<h4 class="${"p-0 m-0"}">Application</h4></div>
			<div class="${"navbar-nav"}"><button class="${"btn d-flex gap-3 align-items-center"}"><i class="${"fa fa-arrow-left svelte-wnp09j"}"></i>
					Back
				</button></div></div></nav>

	<div class="${"container-fluid d-flex justify-content-center align-items-center"}" style="${"min-height: calc(100vh - 38px); width: 100vw;"}"><div class="${"row m-0 justify-content-center align-items-stretch gap-0"}"><div class="${"card col-md border-0 rounded-0 basic-app-info svelte-wnp09j"}" style="${"min-width: min-content;"}"><h3 class="${"card-title mb-2 mt-4 ms-1 me-5"}"><span class="${"fa fa-info-circle ms-0 me-2 svelte-wnp09j"}"></span>
					Basic Information
				</h3>
				<div class="${"card-body"}"><div class="${"row"}"><table class="${"table"}"><thead></thead>
							<tbody><tr><th scope="${"row"}">ID</th>
									<td colspan="${"3"}">${escape(app.id)}</td></tr>
								<tr><th scope="${"row"}">Status</th>
									<td colspan="${"3"}">${escape(app.status)}</td></tr>
								<tr><th scope="${"row"}">Owner<small class="${"ms-1"}" style="${"font-weight: 100; font-style: italic; font-size: 12px;"}">&gt;&gt; (N-ID) </small></th>
									<td colspan="${"3"}">${escape(ownerName)} - ${escape(app.owner)}</td></tr>
								<tr><th scope="${"row"}">Description</th>
									<td colspan="${"3"}">${escape(app.description)}</td></tr>
								<tr><th scope="${"row"}">Participants IDs</th>
									<td colspan="${"3"}">${escape(NParticipants)}</td></tr>
								<tr><th scope="${"row"}">Created on</th>
									<td colspan="${"3"}">${escape(new Date(Date.parse(app.created_at)).toDateString())}</td></tr>
								<tr><th scope="${"row"}">Competition</th>
									<td colspan="${"3"}">${escape(comp.name)}</td></tr></tbody></table>
						<div class="${"btns col-12 svelte-wnp09j"}"><button type="${"button"}" class="${"btn btn-success"}"><span class="${"fa fa-check svelte-wnp09j"}"></span>
								Accept
							</button>
							<button type="${"button"}" class="${"btn btn-secondary"}"><span class="${"fa fa-trash svelte-wnp09j"}"></span>
								Reject
							</button>
							<button type="${"button"}" class="${"btn btn-primary"}"><span class="${"fa fa-edit svelte-wnp09j"}"></span>
								Update
							</button>
							<button class="${"btn btn-danger"}"><li class="${"fa fa-trash svelte-wnp09j"}"></li>
								Remove
							</button></div></div></div></div>
			<div class="${"card col-md border-0 rounded-0 application-form"}"><h3 class="${"card-title mb-2 mt-4 ms-1"}"><span class="${"fa fa-file-alt ms-0 me-2 svelte-wnp09j"}"></span>
					Application Form
				</h3>
				<div class="${"card-body"}" style="${"position: relative;"}">${comp.persons_amount > 1 ? `<div class="${"form-field mb-3"}"><label for="${"teamName"}">Team Name <span class="${"text-danger"}"${add_styles({ "font-size": `19px` })}>*</span></label>
						<input type="${"text"}" id="${"teamName"}" class="${"form-control"}" placeholder="${"Team Name"}"${add_attribute("value", team_name, 0)}></div>` : ``}
					<div class="${"row gap-1"}">${each(Array(comp.persons_amount), (_, i) => {
    return `${comp.persons_amount > 1 ? `<button class="${"btn btn-light border-0 rounded-0 btn-block"}" type="${"button"}" data-bs-toggle="${"collapse"}" data-bs-target="${"#appLicationNum" + escape(i, true)}" aria-expanded="${"false"}" aria-controls="${"appLicationNum" + escape(i, true)}">Application Number: ${escape(i + 1)}
							</button>` : ``}
							<div class="${"collapse multi-collapse " + escape(i == 0 ? "show" : "", true)}" id="${"appLicationNum" + escape(i, true)}"${add_attribute("this", requestTemplates[i], 0)}>${comp.persons_amount > 1 ? `<div class="${"form-field mb-3"}"><label for="${"teamName"}">Applicant Id <span class="${"text-danger"}"${add_styles({ "font-size": `19px` })}>*</span></label>
									<input type="${"text"}" class="${"form-control"}" placeholder="${"Enter applicant Id ..."}">
								</div>` : ``}
								<div><!-- HTML_TAG_START -->${comp.request_template}<!-- HTML_TAG_END --></div>
								
							</div>`;
  })}</div></div></div></div></div></div>

<div class="${"loading svelte-wnp09j"}"${add_attribute("this", loading, 0)}><div class="${"spinner-border svelte-wnp09j"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div></div>

<div class="${"alert svelte-wnp09j"}"${add_attribute("this", alertCont, 0)}></div>`;
});
export {
  Page as default
};
