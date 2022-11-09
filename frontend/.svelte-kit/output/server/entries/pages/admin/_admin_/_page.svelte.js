import { c as create_ssr_component, b as subscribe, e as escape, d as add_attribute, f as add_styles, h as add_classes, i as each } from "../../../../chunks/index.js";
import { b as base } from "../../../../chunks/paths.js";
import { p as page } from "../../../../chunks/stores.js";
import { s as src } from "../../../../chunks/logo.js";
import { t as tempPhoto } from "../../../../chunks/temp-photo.js";
import { d as dotsSrc } from "../../../../chunks/dots.js";
import { r as republics } from "../../../../chunks/republics.js";
import { s as sessionDuration } from "../../../../chunks/sessionDuration.js";
const lottie = "/_app/immutable/assets/lottie-search-7327e10f.json";
const lottieSelect = "/_app/immutable/assets/lottie-select-12673578.gif";
const _page_svelte_svelte_type_style_lang = "";
const css = {
    code: '.loading.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.loading.svelte-1xk55ym .spinner-border.svelte-1xk55ym.svelte-1xk55ym{width:3rem;height:3rem;border-width:0.25rem;color:#19334d}nav.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{position:relative !important;background-color:rgb(236, 236, 236);margin-bottom:0px !important}.admin-container.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{padding:0;margin:0;background-color:#fff;background-image:linear-gradient(to bottom right, #19334d, #3490dc);width:100vw;overflow:hidden;min-height:calc(100vh - 38px);height:fit-content}.admin-container.svelte-1xk55ym .d1.svelte-1xk55ym.svelte-1xk55ym{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.admin-container.svelte-1xk55ym .d2.svelte-1xk55ym.svelte-1xk55ym{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.admin-container.svelte-1xk55ym nav.svelte-1xk55ym.svelte-1xk55ym{position:fixed;top:0px;z-index:100;flex-shrink:0;padding:10px 20px;font-family:"Light";font-size:15px !important}.admin-container.svelte-1xk55ym nav .navbar-brand.svelte-1xk55ym.svelte-1xk55ym{align-items:center !important}.admin-container.svelte-1xk55ym nav .navbar-brand.svelte-1xk55ym>img.svelte-1xk55ym{height:20px}.admin-container.svelte-1xk55ym nav .part-photo.svelte-1xk55ym.svelte-1xk55ym{width:30px;height:30px;border-radius:50%;margin-right:10px}.admin-container.svelte-1xk55ym nav .nav-item.svelte-1xk55ym.svelte-1xk55ym{cursor:pointer}.admin-container.svelte-1xk55ym nav .dropdown-menu.svelte-1xk55ym.svelte-1xk55ym{border:none;position:absolute;z-index:20;border-top:3px solid #19334d !important;padding:10px;max-width:fit-content}.admin-container.svelte-1xk55ym nav .dropdown-menu .dropdown-item.svelte-1xk55ym.svelte-1xk55ym{cursor:pointer;display:flex;justify-content:left;align-items:center}.admin-container.svelte-1xk55ym nav .dropdown-menu .dropdown-item.svelte-1xk55ym.svelte-1xk55ym:hover{background-color:transparent;color:#19334d}.admin-container.svelte-1xk55ym nav .dropdown-menu .dropdown-item .fa.svelte-1xk55ym.svelte-1xk55ym{margin-right:10px}.admin-container.svelte-1xk55ym nav.svelte-1xk55ym.svelte-1xk55ym{width:100vw !important;background-color:rgb(248, 248, 248)}.admin-container.svelte-1xk55ym .form.svelte-1xk55ym.svelte-1xk55ym{position:relative;z-index:1;font-family:"Light", sans-serif;display:flex;flex-flow:column nowrap;justify-content:center;background-color:#f0f5fa}.admin-container.svelte-1xk55ym .form h1.svelte-1xk55ym.svelte-1xk55ym{font-size:2.5rem;font-weight:bold;color:#212529;margin-bottom:1rem}.admin-container.svelte-1xk55ym .form button.svelte-1xk55ym.svelte-1xk55ym{background-color:#3490dc;color:white;border:none;border-radius:0.25rem;padding:0.5rem 1rem;font-size:1.25rem;font-weight:bold;cursor:pointer;transition:all 0.3s ease-in-out}.admin-container.svelte-1xk55ym .form button.svelte-1xk55ym.svelte-1xk55ym:hover{background-color:#343a40}.admin-container.svelte-1xk55ym input[type=text].svelte-1xk55ym.svelte-1xk55ym,.admin-container.svelte-1xk55ym input[type=email].svelte-1xk55ym.svelte-1xk55ym,.admin-container.svelte-1xk55ym select.svelte-1xk55ym.svelte-1xk55ym{border-radius:0;border:0px;border-bottom:2px solid #3490dc;margin-bottom:20px;font-size:15px}.admin-container.svelte-1xk55ym input[type=text].svelte-1xk55ym.svelte-1xk55ym:focus,.admin-container.svelte-1xk55ym input[type=email].svelte-1xk55ym.svelte-1xk55ym:focus,.admin-container.svelte-1xk55ym select.svelte-1xk55ym.svelte-1xk55ym:focus{border-bottom:2px solid #19334d !important;outline:none;box-shadow:none}.admin-container.svelte-1xk55ym .lottie-animations.svelte-1xk55ym.svelte-1xk55ym{background-color:rgb(240, 240, 240);position:relative;z-index:2}.sliderCont.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{width:200vw;display:flex;flex-flow:row nowrap;transition:all 0.3s ease-in-out;overflow:hidden}.sliderCont.svelte-1xk55ym .slide.svelte-1xk55ym.svelte-1xk55ym{width:100vw;position:relative;z-index:2;padding-bottom:30px}.paginationNav.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{padding-bottom:20px;font-size:18px;font-family:"Courier New", Courier, monospace;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center}.paginationNav.svelte-1xk55ym select.svelte-1xk55ym.svelte-1xk55ym{position:relative;width:70px;font-size:18px;margin:0px;height:100%;border:none;border-radius:0px;background-color:#3490dc;color:white}.paginationNav.svelte-1xk55ym select.svelte-1xk55ym.svelte-1xk55ym:focus{outline:none;box-shadow:none;border:none !important}.paginationNav.svelte-1xk55ym .pagination.svelte-1xk55ym.svelte-1xk55ym{padding:0px !important;max-width:max-content}.paginationNav.svelte-1xk55ym .pagination .page-link.svelte-1xk55ym.svelte-1xk55ym{background-color:#3490dc;border:none;width:35px;text-align:center;color:white;cursor:pointer}.alertCont.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{position:fixed;z-index:20;bottom:30px;left:30px}.card.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{border:none;border-radius:0;background-color:#fff}.hide.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{display:none !important}.menu.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{position:fixed !important;top:0;z-index:5;display:flex !important;flex-flow:row wrap !important;justify-content:center !important;padding:20px 0px;gap:10px !important;margin-bottom:20px !important;border-radius:0px;width:100vw !important;background:#3490dc !important;color:white;font-family:"Light", sans-serif}.menu.svelte-1xk55ym input.svelte-1xk55ym.svelte-1xk55ym,.menu.svelte-1xk55ym select.svelte-1xk55ym.svelte-1xk55ym,.menu.svelte-1xk55ym button.svelte-1xk55ym.svelte-1xk55ym{width:300px;height:40px;border:none !important;margin:0px !important;border-radius:20px !important;padding:0px 30px !important}.menu.svelte-1xk55ym button.svelte-1xk55ym.svelte-1xk55ym{width:fit-content}.noComp.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{font-family:"Light", sans-serif;height:100%;text-align:center;display:flex;flex-flow:row wrap;align-items:center;justify-content:center;align-items:center;overflow:hidden}.noComp.svelte-1xk55ym p.svelte-1xk55ym.svelte-1xk55ym{font-size:14px;align-self:center;color:#212529;margin-top:190px;position:absolute}.noComp.svelte-1xk55ym p .fa.svelte-1xk55ym.svelte-1xk55ym{opacity:0.3}.noComp.svelte-1xk55ym .gif.svelte-1xk55ym.svelte-1xk55ym{width:250px;height:250px;margin-top:0px;padding:0px}.comps.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{font-family:"light", sans-serif;margin-top:100px}.comps.svelte-1xk55ym .comp.svelte-1xk55ym.svelte-1xk55ym{padding:6px 10px}.comps.svelte-1xk55ym .even.svelte-1xk55ym.svelte-1xk55ym{background-color:#f0f5fa}table.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{font-family:"light", sans-serif}table.svelte-1xk55ym th.svelte-1xk55ym.svelte-1xk55ym{text-align:left;padding:10px;border-bottom:1px solid #ddd;font-family:"medium", sans-serif}.manage.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{font-family:"light", sans-serif;display:flex;flex-flow:row wrap;gap:20px;font-size:13px;opacity:0.8;color:black;position:absolute;z-index:5;bottom:110px}.manage.svelte-1xk55ym i.svelte-1xk55ym.svelte-1xk55ym{cursor:pointer}.manage.svelte-1xk55ym i.svelte-1xk55ym.svelte-1xk55ym:hover{opacity:1;color:#19334d}.apppag.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{padding:20px 0px;margin-bottom:35px}.apppag.svelte-1xk55ym .form-select.svelte-1xk55ym.svelte-1xk55ym,.apppag.svelte-1xk55ym .page-link.svelte-1xk55ym.svelte-1xk55ym{background-color:white !important;color:black !important;font-family:"light", sans-serif;font-size:14px}.apppag.svelte-1xk55ym .form-select.svelte-1xk55ym.svelte-1xk55ym{border-radius:0px 50px 50px 0px}.stickyBottom.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{position:absolute;bottom:0px;width:100%}@media screen and (min-width: 1000px){.navbar-nav.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{align-items:center !important}.form-group.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{align-items:center}}@media screen and (max-width: 1000px){.navbar-nav.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{margin:20px 0px}.navbar-nav.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym::before{content:"";display:block;width:100%;height:1px;background-color:#19334d;margin-bottom:10px;opacity:0.2}.navbar-nav.svelte-1xk55ym .dropdown-menu.svelte-1xk55ym.svelte-1xk55ym{position:absolute;top:100%;left:0;border:1px solid #19334d;border-radius:5px;padding:10px}.navbar-nav.svelte-1xk55ym .dropdown-menu .dropdown-item.svelte-1xk55ym.svelte-1xk55ym{display:flex;justify-content:left;align-items:center}.navbar-nav.svelte-1xk55ym .dropdown-menu .dropdown-item .fa.svelte-1xk55ym.svelte-1xk55ym{margin-right:10px}.lottie-animations.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{display:none}}@media screen and (max-width: 800px){.compt-holder.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{max-width:100vw !important;margin:0px !important;margin-bottom:50px !important;width:100vw}.menu.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{--height:180px;height:var(--height);position:absolute;right:0px;top:calc(50% - var(--height) / 2);flex-flow:column nowrap !important;padding:20px !important;justify-content:left !important;width:fit-content !important;transition:all 0.3s ease-in-out;margin-right:-220px}.menu.svelte-1xk55ym input.svelte-1xk55ym.svelte-1xk55ym,.menu.svelte-1xk55ym select.svelte-1xk55ym.svelte-1xk55ym,.menu.svelte-1xk55ym button.svelte-1xk55ym.svelte-1xk55ym{width:200px;height:40px !important;border:none !important;margin:0px !important;padding:0px 30px;margin-left:40px !important}.menu.svelte-1xk55ym .fa.svelte-1xk55ym.svelte-1xk55ym{height:var(--height);margin-top:-20px;margin-left:-20px;width:60px;position:absolute;font-size:20px;display:flex;justify-content:center;align-items:center;cursor:pointer}.menu.svelte-1xk55ym button.svelte-1xk55ym.svelte-1xk55ym{width:fit-content;background-color:#19334d;color:white}}@media screen and (min-width: 800px){.menu.svelte-1xk55ym.svelte-1xk55ym.svelte-1xk55ym{position:relative !important}.menu.svelte-1xk55ym .fa.svelte-1xk55ym.svelte-1xk55ym{display:none !important}}',
    map: null,
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let itemPerpage;
    let appsPerPage;
    let filtered;
    let selectedComp;
    let appLength;
    let req;
    let selectedCompID;
    let selectedCompName;
    let selectedCompRegStart;
    let selectedCompRegEnd;
    let selectedCompStart;
    let selectedCompLink;
    let selectedCompContestantsPerTeam;
    let request_template;
    let selectedCompMonitors;
    let per;
    let $page, $$unsubscribe_page;
    $$unsubscribe_page = subscribe(page, (value) => ($page = value));
    let data = $page.data;
    let { userInfo = data.userInfo, competitionsInfo = data.competitionsInfo, access_token = data.access_token } = $$props;
    let { permission = data.permission, API = data.API } = $$props;
    let { real_id = data.real_id } = $$props;
    sessionDuration();
    let adminName = "";
    let InstituteYear = ["1 (bachelor / specialty)", "2 (bachelor / specialty)", "3 (bachelor / specialty)", "4 (bachelor / specialty)", "5 (specialty)", "6 (specialty)", "1 (master)", "2 (master)"];
    let alertCont = "";
    let loading = "";
    let sliderCont = "";
    let formCont = "";
    let compResults = "";
    let compsBinds = [];
    let navBar = "";
    let email, name, eduType, institute;
    eduType = "Choose...";
    let comps = [];
    let filterCont = "";
    let resultsNumber = comps.length;
    let compName = "";
    let collegeYear = ["1 course", "2 course", "3 course", "4 course", "5 course"];
    let applicationBinds = [];
    let selectAllBtn = "";
    if ($$props.userInfo === void 0 && $$bindings.userInfo && userInfo !== void 0) $$bindings.userInfo(userInfo);
    if ($$props.competitionsInfo === void 0 && $$bindings.competitionsInfo && competitionsInfo !== void 0) $$bindings.competitionsInfo(competitionsInfo);
    if ($$props.access_token === void 0 && $$bindings.access_token && access_token !== void 0) $$bindings.access_token(access_token);
    if ($$props.permission === void 0 && $$bindings.permission && permission !== void 0) $$bindings.permission(permission);
    if ($$props.API === void 0 && $$bindings.API && API !== void 0) $$bindings.API(API);
    if ($$props.real_id === void 0 && $$bindings.real_id && real_id !== void 0) $$bindings.real_id(real_id);
    $$result.css.add(css);
    itemPerpage = 20;
    appsPerPage = 5;
    filtered = comps;
    selectedComp = "";
    appLength = 0;
    req = [];
    selectedCompID = 0;
    selectedCompName = "";
    selectedCompRegStart = "";
    selectedCompRegEnd = "";
    selectedCompStart = "";
    selectedCompLink = "";
    selectedCompContestantsPerTeam = 0;
    request_template = "";
    selectedCompMonitors = [];
    per = permission;
    $$unsubscribe_page();
    return `${
        (($$result.head += `<script defer src="${"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}" data-svelte="svelte-b3wssk"><\/script>${
            (($$result.title = `<title>App Name| ${escape(adminName)}</title>`), "")
        }`),
        "")
    }



<section class="${"admin-container svelte-1xk55ym"}"><img class="${"d1 svelte-1xk55ym"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
	<div class="${"d2 svelte-1xk55ym"}"></div>

	<nav class="${"navbar navbar-expand-lg navbar-light mb-5 sticky-top shadow-sm svelte-1xk55ym"}"${add_attribute(
        "this",
        navBar,
        0
    )}><div class="${"container-fluid p-0 d-flex justify-content-lg-around"}"><div class="${"navbar-brand svelte-1xk55ym"}"><img${add_attribute(
        "src",
        src,
        0
    )} alt="${"Logo"}" class="${"svelte-1xk55ym"}"></div>
			<button class="${"navbar-toggler svelte-1xk55ym"}" type="${"button"}" data-bs-toggle="${"collapse"}" data-bs-target="${"#participant-menu"}" aria-controls="${"participant-menu"}" aria-expanded="${"false"}" aria-label="${"Toggle navigation"}"><span class="${"navbar-toggler-icon"}"></span></button>
			<div class="${"collapse navbar-collapse flex-grow-0"}" id="${"participant-menu"}"><ul class="${"navbar-nav me-auto mb-20 mb-lg-0 col-12 justify-content-around svelte-1xk55ym"}"><li class="${"nav-item svelte-1xk55ym"}"><span class="${"nav-link active"}" id="${"Users"}">Users control </span></li>
					<li class="${"nav-item svelte-1xk55ym"}"><span class="${"nav-link"}" id="${"Competitions"}">Competitions control </span></li>
					${per === "super_admin" ? `<li class="${"nav-item svelte-1xk55ym"}"><span class="${"nav-link"}"${add_styles({ color: `rgba(0,0,0,.55)` })}>Create Competitions </span></li>` : ``}
					<li class="${"nav-item dropdown svelte-1xk55ym"}"><div class="${"nav-link dropdown-toggle d-flex align-items-center"}" role="${"button"}" data-bs-toggle="${"dropdown"}" aria-expanded="${"false"}"><img${add_attribute(
        "src",
        tempPhoto,
        0
    )} alt="${"Logo"}" class="${"part-photo svelte-1xk55ym"}">
							<span>${escape(adminName)}</span></div>
						<ul class="${"dropdown-menu mt-2 ms-3 rounded-0 svelte-1xk55ym"}"><li${add_classes(($page.url.pathname === "/info" ? "active" : "").trim())}><a sveltekit:prefetch href="${
        escape(base, true) + "/info/" + escape(real_id, true)
    }" content="${"Home"}" class="${"dropdown-item nav-link svelte-1xk55ym"}"><span class="${"fa fa-gears svelte-1xk55ym"}"></span>
									Settings
								</a></li>
							<li><hr class="${"dropdown-divider"}"></li>
							<button class="${"dropdown-item nav-link signOut svelte-1xk55ym"}"><span class="${"fa fa-sign-out svelte-1xk55ym"}"></span>
								Sign out
							</button></ul></li></ul></div></div></nav>
	<div class="${"sliderCont svelte-1xk55ym"}"${add_attribute(
        "this",
        sliderCont,
        0
    )}><div class="${"slide svelte-1xk55ym"}"><div class="${"container pt-5"}"><div class="${"row justify-content-center align-items-stretch shadow"}"><div class="${"form col-lg-6 p-4 m-0 svelte-1xk55ym"}"${add_attribute(
        "this",
        formCont,
        0
    )}><h1 class="${"form-header svelte-1xk55ym"}"><span class="${"fa fa-search svelte-1xk55ym"}"></span>
							Search
						</h1>
						<div class="${"mb-3"}"><label for="${"email"}" class="${"form-label"}">Email address</label>
							<input type="${"email"}" class="${"form-control svelte-1xk55ym"}" id="${"email"}" aria-describedby="${"emailHelp"}" placeholder="${"Enter the user email"}"${add_attribute("value", email, 0)}></div>
						<div class="${"mb-3"}"><label for="${"fullName"}" class="${"form-label mb-0"}">First name, surname or patronymic</label>
							<input type="${"text"}" class="${"form-control svelte-1xk55ym"}" id="${"fullName"}" placeholder="${"Enter the user name"}"${add_attribute("value", name, 0)}></div>
						<div class="${"mb-3"}"><label for="${"region"}">Permission</label>
							<select class="${"form-select form-select-sm svelte-1xk55ym"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(
        ["default", "teacher", "admin", "super_admin"],
        (per2) => {
            return `<option${add_attribute("value", per2, 0)}>${escape(per2)}</option>`;
        }
    )}</select></div>
						<div class="${"mb-3"}"><label for="${"region"}">Region</label>
							<select class="${"form-select form-select-sm svelte-1xk55ym"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(republics, (republic) => {
        return `<option${add_attribute("value", republic, 0)}>${escape(republic)}</option>`;
    })}</select></div>
						<div class="${"mb-3"}"><div class="${"form-group svelte-1xk55ym"}"><label for="${"education"}">Education type</label>
								<select class="${"form-select form-select-sm svelte-1xk55ym"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option><option value="${"School"}">School</option><option value="${"University"}">University</option><option value="${"College"}">College</option></select></div>
							${
                                eduType === "School"
                                    ? `<div class="${"d-flex justify-content-between p-0"}"><div class="${"row"}"><div class="${"form-group col-md-8 svelte-1xk55ym"}"><label for="${"school"}">School Name</label>
											<input type="${"text"}" class="${"form-control svelte-1xk55ym"}" id="${"school"}" placeholder="${"Enter your school name"}"${add_attribute("value", institute, 0)}></div>
										
										<div class="${"form-group col-md-4 svelte-1xk55ym"}"><label for="${"schoolYear"}">School Year</label>
											<select class="${"form-select form-select svelte-1xk55ym"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(Array(11), (_, i) => {
                                          return `<option${add_attribute("value", i + 1, 0)}>${escape(i + 1)}</option>`;
                                      })}</select></div></div></div>`
                                    : ``
                            }
							${
                                eduType === "University"
                                    ? `<div class="${"d-flex justify-content-between p-0"}"><div class="${"row"}"><div class="${"form-group col-md-8 svelte-1xk55ym"}"><label for="${"Institute"}">Institute Name</label>
											<input type="${"text"}" class="${"form-control svelte-1xk55ym"}" id="${"Institute"}" placeholder="${"Enter your Institute name"}"${add_attribute("value", institute, 0)}></div>
										
										<div class="${"form-group col-md-4 svelte-1xk55ym"}"><label for="${"Institute Year"}">Institute Year</label>
											<select class="${"form-select form-select svelte-1xk55ym"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(InstituteYear, (grade) => {
                                          return `<option${add_attribute("value", grade, 0)}>${escape(grade)}</option>`;
                                      })}</select></div></div></div>`
                                    : ``
                            }
							${
                                eduType === "College"
                                    ? `<div class="${"d-flex justify-content-between p-0"}"><div class="${"row"}"><div class="${"form-group col-md-8 svelte-1xk55ym"}"><label for="${"College"}">College Name</label>
											<input type="${"text"}" class="${"form-control svelte-1xk55ym"}" id="${"College"}" placeholder="${"Enter your College name"}"${add_attribute("value", institute, 0)}></div>
										
										<div class="${"form-group col-md-4 svelte-1xk55ym"}"><label for="${"College Year"}">College Year</label>
											<select class="${"form-select form-select svelte-1xk55ym"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(collegeYear, (grade) => {
                                          return `<option${add_attribute("value", grade, 0)}>${escape(grade)}</option>`;
                                      })}</select></div></div></div>`
                                    : ``
                            }</div>
						<button class="${"btn svelte-1xk55ym"}">Search</button></div>
					<div class="${"lottie-container col-lg-6 p-0"}"><lottie-player class="${"lottie-animations svelte-1xk55ym"}"${add_attribute(
        "src",
        lottie,
        0
    )} speed="${"1"}" loop nocontrols></lottie-player></div></div></div></div>
		<div class="${"slide svelte-1xk55ym"}"><div class="${"card menu svelte-1xk55ym"}"${add_attribute("this", filterCont, 0)}><li class="${"fa fa-filter svelte-1xk55ym"}"></li>
				<input type="${"text"}" class="${"form-control svelte-1xk55ym"}" placeholder="${"Search by competition title ..."}" id="${"compName"}"${add_attribute("value", compName, 0)}>
				<select class="${"form-select form-select-sm svelte-1xk55ym"}" aria-label="${"Default select example"}" id="${"compType"}"><option selected value="${"Choose competition status ..."}">Choose competition status ...</option><option value="${"Ongoing"}">Ongoing</option><option value="${"Upcoming"}">Upcoming</option><option value="${"Finished"}">Finished</option></select>
				<button class="${"btn btn-light rounded-0 svelte-1xk55ym"}">Filter </button></div>
			<div class="${"container col-12 p-0 d-flex align-items-center justify-content-center mt-5"}"><div class="${"row p-0 m-0 col-md gap-3 justify-content-center align-items-stretch"}"${add_attribute(
        "this",
        compResults,
        0
    )}><div class="${"card col-md-5 comps compt-holder p-0 col-sm-6 shadow mt-0 svelte-1xk55ym"}" style="${"max-width:500px; min-width:min-content"}"><h4 class="${"card-header"}"${add_styles({
        "padding-right": `100px`,
    })}><span class="${"fa fa-book svelte-1xk55ym"}"></span>
							Competitions
						</h4>
						<div class="${"card-body p-0 pt-1 shadow"}">${
        filtered.length > 0
            ? `${each(filtered, (comp, i) => {
                  return `${
                      i % 2 == 0
                          ? `<div class="${"comp even hide d-flex flex-row align-items-stretch justify-content-between svelte-1xk55ym"}"${add_attribute(
                                "this",
                                compsBinds[i],
                                0
                            )}><span class="${"d-inline"}">${escape(comp.name)}</span>
											<i class="${"fa fa-edit m-1 svelte-1xk55ym"}"${add_attribute("id", comp.id + "", 0)} style="${"cursor:pointer; color:#3490dc"}"></i>
										</div>`
                          : `<div class="${"comp hide d-flex flex-row align-items-stretch justify-content-between svelte-1xk55ym"}"${add_attribute(
                                "this",
                                compsBinds[i],
                                0
                            )}><span class="${"d-inline"}">${escape(comp.name)}</span>
											<i class="${"fa fa-edit m-1 svelte-1xk55ym"}"${add_attribute("id", comp.id + "", 0)} style="${"cursor:pointer; color:#3490dc"}"></i>
										</div>`
                  }`;
              })}`
            : `<div class="${"alert alert-warning"}" role="${"alert"}"><span class="${"fa fa-exclamation-triangle svelte-1xk55ym"}"></span>
									No competitions found, If you think that this is an error, please refresh the page.
								</div>`
    }</div>
						<div class="${"container-fluid p-0 pt-3 bg-light d-flex justify-content-center"}"><div class="${"row col-md-6 paginationNav justify-content-center align-items-center svelte-1xk55ym"}"><ul class="${"pagination m-0 p-3 svelte-1xk55ym"}">${each(
        Array(Math.ceil(resultsNumber / itemPerpage)),
        (_, i) => {
            return `<li class="${"page-item page-link svelte-1xk55ym"}">${escape(i + 1)}</li>`;
        }
    )}</ul>
								<select class="${"form-select svelte-1xk55ym"}">${each([5, 10, 15, 20, 25, 50], (i) => {
        return `<option class="${"dropdown-item svelte-1xk55ym"}"${add_attribute("value", i, 0)}>${escape(i)}</option>`;
    })}</select></div></div></div>
					${
                        selectedComp === ""
                            ? `<div class="${"card p-0 col-md-5 svelte-1xk55ym"}" style="${"max-width:500px"}"><div class="${"card-body p-0 pt-1 shadow"}"><div class="${"noComp svelte-1xk55ym"}"><img${add_attribute(
                                  "src",
                                  lottieSelect,
                                  0
                              )} alt="${""}" class="${"gif svelte-1xk55ym"}">
									<p class="${"svelte-1xk55ym"}">No Competition Selected, please click on <i class="${"fa fa-edit svelte-1xk55ym"}"></i>.</p></div></div></div>`
                            : `<div class="${"card col-md-5 p-0 svelte-1xk55ym"}" style="${"min-width: fit-content"}"><div class="${"card-header"}" data-bs-toggle="${"collapse"}" href="${"#info"}" role="${"button"}" aria-expanded="${"false"}" aria-controls="${"info"}"><span class="${"fa fa-info-circle svelte-1xk55ym"}"></span>
								Information
							</div>
							<div class="${"collapse card-body pt-0 pb-0"}" id="${"info"}"><div class="${"row"}"><table class="${"table table-striped table-sm svelte-1xk55ym"}"><tbody><tr><th scope="${"row"}" class="${"svelte-1xk55ym"}">ID</th>
												<td>${escape(selectedCompID)}</td></tr>
											<tr><th class="${"svelte-1xk55ym"}">Title</th>
												<td>${escape(selectedCompName)}</td></tr>
											<tr><th class="${"svelte-1xk55ym"}">Registration time</th>
												<td>From ${escape(selectedCompRegStart)}
													<br>
													To ${escape(selectedCompRegEnd)}</td></tr>
											<tr><th class="${"svelte-1xk55ym"}">Start</th>
												<td>${escape(selectedCompStart)}</td></tr>
											<tr><th class="${"svelte-1xk55ym"}">Registration link</th>
												<td><a${add_attribute("href", selectedCompLink, 0)}>Link </a></td></tr>
											<tr><th class="${"svelte-1xk55ym"}">Contestants per team</th>
												<td>${escape(selectedCompContestantsPerTeam)}</td></tr>
											<tr><th class="${"svelte-1xk55ym"}">Monitors&#39; IDs</th>
												${selectedCompMonitors.length == 0 ? `<td>No monitors</td>` : `<td>${escape(selectedCompMonitors.join(" ,"))}</td>`}</tr></tbody></table></div></div>
							<div class="${"card-header"}" data-bs-toggle="${"collapse"}" href="${"#form"}" role="${"button"}" aria-expanded="${"false"}" aria-controls="${"form"}"><span class="${"fa-solid fa-tasks"}"></span>
								Form
							</div>
							<div class="${"card-body collapse"}" id="${"form"}"><!-- HTML_TAG_START -->${request_template}<!-- HTML_TAG_END --></div>
							<div class="${"card-header d-flex justify-content-between align-items-center"}" data-bs-toggle="${"collapse"}" href="${"#applications"}" role="${"button"}" aria-expanded="${"false"}" aria-controls="${"applications"}"${add_styles(
                                  { "margin-bottom": `38px` }
                              )}><div><span class="${"fa fa-users svelte-1xk55ym"}"></span>
									Applications
								</div>
								<div><span class="${"badge badge-light text-primary"}">${escape(appLength)} available</span></div></div>
							<div class="${"card-body collapse show"}" id="${"applications"}"${add_styles({
                                  position: `relative`,
                              })}><div class="${"table"}"><table class="${"table table-striped table-sm svelte-1xk55ym"}"${add_styles({
                                  "margin-top": `-38px`,
                                  "margin-bottom": `100px`,
                              })}><thead><tr class="${"table-light"}"><th scope="${"col"}" class="${"ms-1 text-center svelte-1xk55ym"}"># </th>
												<th scope="${"col"}" class="${"ms-1 text-center svelte-1xk55ym"}">Id </th>
												<th scope="${"col"}" class="${"text-center svelte-1xk55ym"}">Status </th>
												<th scope="${"col"}" class="${"text-center svelte-1xk55ym"}">\u2116 of participants </th>
												<th scope="${"col"}" class="${"text-center svelte-1xk55ym"}">Actions </th></tr></thead>
										<tbody>${each(req, (application, i) => {
                                            return `<tr${add_attribute("id", application.id + "", 0)} class="${"text-center"}"${add_attribute(
                                                "this",
                                                applicationBinds[i],
                                                0
                                            )}><td><li class="${"fa fa-square-o svelte-1xk55ym"}"></li></td>
													<td>${escape(application.id)}</td>
													<td>${escape(application.status)}</td>
													<td class="${"text-center"}">${escape(application.participants.length)}</td>
													<td><div class="${"btn-group"}"><button class="${"btn btn-success btn-sm svelte-1xk55ym"}"><i class="${"fa fa-check-square svelte-1xk55ym"}"></i></button>
															<button class="${"btn btn-danger btn-sm svelte-1xk55ym"}"><i class="${"fa fa-ban svelte-1xk55ym"}"></i></button>
															<button class="${"btn btn-primary btn-sm svelte-1xk55ym"}"><i class="${"fa fa-eye svelte-1xk55ym"}"></i></button>
														</div></td>
												</tr>`;
                                        })}</tbody></table></div>
								<div class="${"manage svelte-1xk55ym"}"><i class="${"svelte-1xk55ym"}">&gt;&gt; Print selected as xlsx</i>
									<i class="${"svelte-1xk55ym"}"${add_attribute("this", selectAllBtn, 0)}>&gt;&gt; Select all </i></div>
								<div class="${"container-fluid p-0 pt-3 d-flex justify-content-center"}"><div class="${"row col-md-6 bg-light stickyBottom paginationNav apppag justify-content-center align-items-center svelte-1xk55ym"}"><ul class="${"pagination m-0 p-3 svelte-1xk55ym"}">${each(
                                  Array(Math.ceil(req.length / appsPerPage) === 0 ? 1 : Math.ceil(req.length / appsPerPage)),
                                  (_, i) => {
                                      return `<li class="${"page-item page-link svelte-1xk55ym"}">${escape(i + 1)}
												</li>`;
                                  }
                              )}</ul>
										<select class="${"form-select svelte-1xk55ym"}">${each([5, 10, 15, 20, 25, 50], (i) => {
                                  return `<option class="${"dropdown-item svelte-1xk55ym"}"${add_attribute("value", i, 0)}>${escape(i)}</option>`;
                              })}</select></div></div></div>
							<div class="${"btn-group stickyBottom svelte-1xk55ym"}"><button class="${"btn btn-primary rounded-0 svelte-1xk55ym"}" style="${"background-color:#3490dc; border: none"}"><i class="${"fa fa-edit svelte-1xk55ym"}"></i> Edit</button>
								<button class="${"btn btn-danger rounded-0 svelte-1xk55ym"}"><i class="${"fa fa-trash svelte-1xk55ym"}"></i> Delete</button></div></div>`
                    }</div></div></div></div>

	<div class="${"hide svelte-1xk55ym"}">keephideClass</div>
	<div class="${"alertCont svelte-1xk55ym"}"${add_attribute("this", alertCont, 0)}></div></section>
<div class="${"loading svelte-1xk55ym"}"${add_attribute(
        "this",
        loading,
        0
    )}><div class="${"spinner-border svelte-1xk55ym"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div>
</div>`;
});
export { Page as default };
