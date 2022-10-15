import { c as create_ssr_component, b as subscribe, d as add_attribute, f as add_styles, i as each, e as escape } from "../../../../../chunks/index.js";
import { d as dotsSrc } from "../../../../../chunks/dots.js";
import { s as sessionDuration } from "../../../../../chunks/sessionDuration.js";
import { p as page } from "../../../../../chunks/stores.js";
const lottieInfoSrc = "/_app/immutable/assets/lottie-info-48823f28.json";
const lottieEmptySrc = "/_app/immutable/assets/lottie-empty-12812e10.json";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.loading.svelte-5fpjhc.svelte-5fpjhc.svelte-5fpjhc{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.loading.svelte-5fpjhc .spinner-border.svelte-5fpjhc.svelte-5fpjhc{width:3rem;height:3rem;border-width:0.25rem;color:#19334d}.createContest.svelte-5fpjhc.svelte-5fpjhc.svelte-5fpjhc{width:100vw;min-height:calc(100vh - 38px);display:flex;align-items:flex-start;justify-content:center;background-image:linear-gradient(to bottom right, #19334d, #3490dc);font-family:"Light", sans-serif;line-height:1.4832;overflow:hidden}.createContest.svelte-5fpjhc .d1.svelte-5fpjhc.svelte-5fpjhc{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.createContest.svelte-5fpjhc .d2.svelte-5fpjhc.svelte-5fpjhc{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.createContest.svelte-5fpjhc nav.svelte-5fpjhc.svelte-5fpjhc{position:fixed;top:0px;z-index:100;flex-shrink:0;padding:10px 20px;font-family:"Light";font-size:15px !important}.createContest.svelte-5fpjhc nav .navbar-brand.svelte-5fpjhc.svelte-5fpjhc{align-items:center !important}.createContest.svelte-5fpjhc nav .dropdown-menu .dropdown-item .fa.svelte-5fpjhc.svelte-5fpjhc{margin-right:10px}.createContest.svelte-5fpjhc nav.svelte-5fpjhc.svelte-5fpjhc{background-color:rgba(255, 255, 255, 0.95)}.createContest.svelte-5fpjhc input[type=text].svelte-5fpjhc.svelte-5fpjhc,.createContest.svelte-5fpjhc select.svelte-5fpjhc.svelte-5fpjhc{border-radius:0;border:0px;border-bottom:2px solid #3490dc;margin-bottom:20px;font-family:"Light", sans-serif;font-size:15px}.createContest.svelte-5fpjhc input[type=text].svelte-5fpjhc.svelte-5fpjhc:focus,.createContest.svelte-5fpjhc select.svelte-5fpjhc.svelte-5fpjhc:focus{border-bottom:2px solid #19334d !important;outline:none;box-shadow:none}.createContest.svelte-5fpjhc input[type=date].svelte-5fpjhc.svelte-5fpjhc,.createContest.svelte-5fpjhc input[type=time].svelte-5fpjhc.svelte-5fpjhc{margin:5px 0px 10px 0px;font-size:15px;color:#19334d;padding:5px;padding-right:5px;text-align:center}.createContest.svelte-5fpjhc .alertCont.svelte-5fpjhc.svelte-5fpjhc{position:fixed;z-index:20;bottom:30px;left:30px}.createContest.svelte-5fpjhc .slideCont.svelte-5fpjhc.svelte-5fpjhc{width:400vw;display:flex;flex-flow:row nowrap;overflow:hidden}.createContest.svelte-5fpjhc .slideCont .slide.svelte-5fpjhc.svelte-5fpjhc{width:100vw;min-height:calc(100vh - 38px);display:flex;justify-content:center;align-items:center}.choose-update.svelte-5fpjhc.svelte-5fpjhc.svelte-5fpjhc{width:100vw;height:100vh;position:fixed;z-index:100;top:0;background-color:rgba(0, 0, 0, 0.5);display:none}.choose-update.svelte-5fpjhc .card.svelte-5fpjhc.svelte-5fpjhc{width:max-content;height:max-content;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);background-color:white;border-radius:10px;display:flex;flex-flow:column nowrap;justify-content:space-between;align-items:center;padding:20px}.choose-update.svelte-5fpjhc .card.svelte-5fpjhc .form-check.svelte-5fpjhc{margin:10px 0px}.choose-update.svelte-5fpjhc .card.svelte-5fpjhc .btn.svelte-5fpjhc{width:100px;margin-bottom:10px}@media screen and (max-width: 760px){.lottieInfo.svelte-5fpjhc.svelte-5fpjhc.svelte-5fpjhc{display:none !important}.slide.svelte-5fpjhc.svelte-5fpjhc.svelte-5fpjhc{margin-top:90px;margin-bottom:40px !important}.form-preview.svelte-5fpjhc.svelte-5fpjhc.svelte-5fpjhc{margin-top:20px}}',
  map: null
};
let demo = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let contestName;
  let contestLink;
  let startOn;
  let startAt;
  let regStartOn;
  let regStartAt;
  let regEndOn;
  let regEndAt;
  let flag_update;
  let updateEverthing;
  let updateForm;
  let updateAdmins;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  sessionDuration();
  const data = $page.data;
  data.id;
  let permission = data.permission;
  data.fields_data;
  data.access_token;
  data.contest;
  data.API;
  let questionId = "", questionTitle = "";
  let filtered = [];
  let monitorId;
  let contestantsPerTeam;
  let suggestions;
  let alertCont;
  let formPreview;
  let monitorsCont;
  let sliderCont;
  let loading;
  let chooseUpdate;
  let controlsCont = [demo, demo, demo];
  let is_visible = false, is_requiered = false;
  let formFields = [];
  let slideContorls = `<div class="slideControls border-top">
							<div class="btn-group gap-1 col-12 justify-content-center align-items-center p-0 m-0">
								<button class="btn btn-sm btn-block p-2"><li class="me-1 fa fa-arrow-left"></li> Previous</button>
								<button class="btn btn-sm btn-block p-2">Next <li class="ms-1 fa fa-arrow-right"></li></button>
							</div>
						</div>`;
  $$result.css.add(css);
  contestName = "";
  contestLink = "";
  startOn = "";
  startAt = "";
  regStartOn = "";
  regStartAt = "";
  regEndOn = "";
  regEndAt = "";
  flag_update = false;
  updateEverthing = false;
  updateForm = false;
  updateAdmins = false;
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>App Name| Create contests</title>`, ""}<script defer src="${"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}" data-svelte="svelte-1xsxech"><\/script>`, ""}

<section class="${"createContest svelte-5fpjhc"}"><img class="${"d1 svelte-5fpjhc"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
	<div class="${"d2 svelte-5fpjhc"}"></div>
	<nav class="${"navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm svelte-5fpjhc"}"><div class="${"container"}"><div class="${"navbar-brand d-flex col align-items-center svelte-5fpjhc"}"><span class="${"fa fa-plus-circle ms-3 me-3 svelte-5fpjhc"}"></span>
				<h4 class="${"p-0 m-0"}">Create new contest</h4></div>
			<div class="${"navbar-nav"}"><button class="${"btn d-flex gap-3 align-items-center"}"><i class="${"fa fa-arrow-left svelte-5fpjhc"}"></i>
					Back
				</button></div></div></nav>
	<div class="${"container-fluid p-0"}"><div class="${"slideCont svelte-5fpjhc"}"${add_attribute("this", sliderCont, 0)}><div class="${"slide svelte-5fpjhc"}" style="${"position: relative;"}"><div class="${"row shadow-sm justify-content-betweens align-items-center p-0 m-0"}" style="${"position: relative; z-index:10; background-color: white;"}"><div class="${"card mb-4 col-md p-0 basicInfo"}" style="${"border: 10px solid white"}"><h1 class="${"card-title"}" style="${"padding: 15px; margin-bottom: 10px"}"><i class="${"fa fa-info-circle me-2 svelte-5fpjhc"}"></i>
							Basic info
						</h1>
						<div class="${"card-body"}"><form><div class="${"form-group"}"><h6>Contest name</h6>
									<input type="${"text"}" class="${"form-control svelte-5fpjhc"}" id="${"name"}" placeholder="${"Contest name"}"${add_attribute("value", contestName, 0)}></div>
								<div class="${"form-group"}"><h6>Contest Link</h6>
									<input type="${"text"}" class="${"form-control svelte-5fpjhc"}" id="${"link"}" placeholder="${"Contest link"}"${add_attribute("value", contestLink, 0)}></div>
								<h6>Start</h6>
								<div class="${"row p-0"}"><div class="${"col-md-7 form-group"}"><input type="${"date"}" class="${"form-control svelte-5fpjhc"}" id="${"startDate"}" placeholder="${"Start date"}"${add_attribute("value", startOn, 0)}></div>
									<div class="${"col-md-5 form-group"}"><input type="${"time"}" class="${"form-control svelte-5fpjhc"}" id="${"startTime"}" placeholder="${"Start time"}"${add_attribute("value", startAt, 0)}></div></div>
								<h6>Registration start</h6>
								<div class="${"row p-0"}"><div class="${"col-md-7 form-group"}"><input type="${"date"}" class="${"form-control svelte-5fpjhc"}" id="${"regStart"}" placeholder="${"Registration start date"}"${add_attribute("value", regStartOn, 0)}></div>
									<div class="${"col-md-5 form-group"}"><input type="${"time"}" class="${"form-control svelte-5fpjhc"}" id="${"regStartTime"}" placeholder="${"Registration start time"}"${add_attribute("value", regStartAt, 0)}></div></div>
								<h6>Registration end</h6>
								<div class="${"row p-0"}"><div class="${"col-md-7 form-group"}"><input type="${"date"}" class="${"form-control svelte-5fpjhc"}" id="${"regEnd"}" placeholder="${"Registration end date"}"${add_attribute("value", regEndOn, 0)}></div>
									<div class="${"col-md-5 form-group"}"><input type="${"time"}" class="${"form-control svelte-5fpjhc"}" id="${"regEndTime"}" placeholder="${"Registration end time"}"${add_attribute("value", regEndAt, 0)}></div></div>
								<h6>Number of contestants per team</h6>
								<div class="${"form-group"}"><input type="${"number"}" min="${"1"}" class="${"form-control"}" id="${"contestantsPerTeam"}" placeholder="${"Enter a Number ... "}"${add_attribute("value", contestantsPerTeam, 0)}></div></form></div></div>
					<lottie-player class="${"col-md lottie lottieInfo svelte-5fpjhc"}"${add_attribute("src", lottieInfoSrc, 0)} style="${"width: 400px"}" background="${"transparent m-4"}" speed="${"1"}" loop nocontrols></lottie-player>
					<div${add_attribute("this", controlsCont[0], 0)}><!-- HTML_TAG_START -->${slideContorls}<!-- HTML_TAG_END --></div></div></div>
			<div class="${"slide svelte-5fpjhc"}" style="${"position: relative;"}"><div class="${"row shadow p-0 m-0 justify-content-between"}" style="${"position: relative; z-index: 10"}"><div class="${"card col-md border-0 rounded-0 svelte-5fpjhc"}"><h1 class="${"m-0 card-title d-flex align-items-center p-3 border-0 rounded-0"}"><i class="${"fa-brands fa-wpforms me-2"}"${add_styles({ "font-size": `30px` })}></i>
							Create Field
						</h1>
						<div class="${"card-body form-creator"}"><div class="${"form-group"}" style="${"position:relative; margin-bottom: 20px"}"><label for="${"question"}">Question Id </label>
								<i class="${"ms-2"}" style="${"font-size: 13px;"}">&gt;&gt; Internal name </i>
								<input type="${"text"}" class="${"form-control m-0 svelte-5fpjhc"}" placeholder="${"Enter question id"}"${add_attribute("value", questionId, 0)}>
								<table class="${"table table-striped collapse"}" style="${"position: absolute; background-color: white; font-size:13px"}"${add_attribute("this", suggestions, 0)}><tbody>${filtered.length != 0 ? `${each(filtered, (res, i) => {
    return `<tr style="${"cursor:pointer"}"><th scope="${"row"}" class="${"ps-1 p-0"}">${escape(i + 1)}</th>
													<td class="${"p-0 pe-1 ps-2"}">${escape(res.id)}</td>
												</tr>`;
  })}` : ``}</tbody></table></div>
							<div class="${"form-group"}"><label for="${"question"}">Question title </label>
								<i class="${"ms-2"}" style="${"font-size: 13px;"}">&gt;&gt; Displayed name </i>
								<input type="${"text"}" id="${"question"}" class="${"form-control svelte-5fpjhc"}" placeholder="${"Add a field"}"${add_attribute("value", questionTitle, 0)}></div>
							<div class="${"form-group"}"><label for="${"QuestionType"}">Question Type </label>
								<select class="${"form-select svelte-5fpjhc"}" id="${"QuestionType"}"><option selected value="${" Select question type ... "}">Select question type ... </option><option value="${"Long answer question/ Multi-line text input field"}">Long answer question/ Multi-line text input field</option><option value="${"Short answer question/ Single-line text input field"}">Short answer question/ Single-line text input field</option><option value="${"Upload file"}">Upload file</option></select></div>
							${``}
							${``}
							<div class="${"form-group field_options"}"><div class="${"form-check form-switch svelte-5fpjhc"}"><input class="${"form-check-input"}" type="${"checkbox"}" id="${"Visible"}"${add_attribute("checked", is_visible, 1)}>
									<label class="${"form-check-label"}" for="${"Visible"}">Visible</label></div>
								<div class="${"form-check form-switch svelte-5fpjhc"}"><input class="${"form-check-input"}" type="${"checkbox"}" id="${"Required"}"${add_attribute("checked", is_requiered, 1)}>
									<label class="${"form-check-label"}" for="${"Required"}">Required</label></div></div>
							<div class="${"btn-group gap-1 col-12 justify-content-center align-items-center"}"><button class="${"btn btn-primary btn-sm btn-block mt-3 " + escape(flag_update ? "disabled" : "", true) + " svelte-5fpjhc"}">Add field</button>
								${flag_update ? `<button class="${"btn btn-secondary btn-sm btn-block mt-3 svelte-5fpjhc"}">Update field</button>
									<button class="${"btn btn-danger btn-sm btn-block mt-3 svelte-5fpjhc"}">Remove field</button>` : ``}</div></div></div>
					<div class="${"card col-md form-preview rounded-0 border-bottom-0 svelte-5fpjhc"}"><h6 class="${"card-title form-preview-title border-bottom"}" style="${"margin: 0px -12px; padding: 15px"}"><i class="${"fa-regular fa-eye me-2"}"></i>
							Form Preview
						</h6>
						${formFields.length == 0 ? `<lottie-player${add_attribute("src", lottieEmptySrc, 0)} background="${"transparent"}" speed="${"1"}" style="${"height: 300px; margin-top: 30px"}" loop nocontrols></lottie-player>` : ``}
						<div class="${"card-body"}"${add_attribute("this", formPreview, 0)}></div></div>
					<div style="${"background-color: white"}"${add_attribute("this", controlsCont[1], 0)}><!-- HTML_TAG_START -->${slideContorls}<!-- HTML_TAG_END --></div></div></div>
			${permission === "super_admin" ? `<div class="${"slide svelte-5fpjhc"}"><div class="${"row col-12 justify-content-center"}"><div class="${"card p-0 mb-3 col-md-5 svelte-5fpjhc"}"><h1 class="${"card-header"}" style="${"padding: 20px"}"><i class="${"fa-solid fa-gear me-1"}"></i>
								Set admin
							</h1>
							<div class="${"card-body"}"><div class="${"showSelectedAdmin d-flex"}" style="${"width: fit-content; flex-flow: row wrap;"}"${add_attribute("this", monitorsCont, 0)}></div>
								<input type="${"text"}" class="${"form-control svelte-5fpjhc"}" id="${"admin"}" placeholder="${"Enter admin id ..."}"${add_attribute("value", monitorId, 0)}>
								<button type="${"button"}" class="${"btn btn-primary btn-sm svelte-5fpjhc"}">Add</button></div>
							<div style="${"background-color: white"}"${add_attribute("this", controlsCont[2], 0)}><!-- HTML_TAG_START -->${slideContorls}<!-- HTML_TAG_END --></div></div></div></div>` : ``}</div></div>
	<div class="${"alertCont svelte-5fpjhc"}"${add_attribute("this", alertCont, 0)}></div></section>
<div class="${"loading svelte-5fpjhc"}"${add_attribute("this", loading, 0)}><div class="${"spinner-border svelte-5fpjhc"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div></div>
<div class="${"choose-update shadow svelte-5fpjhc"}"${add_attribute("this", chooseUpdate, 0)}><div class="${"card svelte-5fpjhc"}"><div class="${"card-body"}"><h5 class="${"card-title"}">What do you want to update?</h5>
			<div class="${"form-check form-switch svelte-5fpjhc"}"><input class="${"form-check-input"}" type="${"checkbox"}" role="${"switch"}" id="${"flexSwitchCheck1"}"${add_attribute("checked", updateEverthing, 1)}>
				<label class="${"form-check-label"}" for="${"flexSwitchCheck1"}">Everything </label></div>
			<div class="${"form-check form-switch svelte-5fpjhc"}"><input class="${"form-check-input"}" type="${"checkbox"}" role="${"switch"}" id="${"flexSwitchCheck2"}"${add_attribute("checked", updateAdmins, 1)}>
				<label class="${"form-check-label"}" for="${"flexSwitchCheck2"}">Admins list </label></div>
			<div class="${"form-check form-switch svelte-5fpjhc"}"><input class="${"form-check-input"}" type="${"checkbox"}" role="${"switch"}" id="${"flexSwitchCheck3"}"${add_attribute("checked", updateForm, 1)}>
				<label class="${"form-check-label"}" for="${"flexSwitchCheck3"}">Application&#39; form </label></div></div>
		<button class="${"btn btn-primary btn-sm svelte-5fpjhc"}">Update </button></div>
</div>`;
});
export {
  Page as default
};
