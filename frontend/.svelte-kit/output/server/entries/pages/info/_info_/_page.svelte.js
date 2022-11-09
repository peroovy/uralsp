import { c as create_ssr_component, j as createEventDispatcher, d as add_attribute, b as subscribe, e as escape, i as each, v as validate_component } from "../../../../chunks/index.js";
import { d as dotsSrc } from "../../../../chunks/dots.js";
import { r as republics } from "../../../../chunks/republics.js";
import { s as sessionDuration } from "../../../../chunks/sessionDuration.js";
import { p as page } from "../../../../chunks/stores.js";
const russianFlag =
    "data:image/png;base64,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";
const Post_svelte_svelte_type_style_lang = "";
const Discussions_svelte_svelte_type_style_lang = "";
const Login_svelte_svelte_type_style_lang = "";
const css$1 = {
    code: "div.svelte-jfwjhx{width:100%;display:flex;justify-content:center}",
    map: null,
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let div;
    let { username = "" } = $$props;
    let { size = "medium" } = $$props;
    let { authType = "callback" } = $$props;
    let { redirectURL = "" } = $$props;
    let { requestAccess = false } = $$props;
    let { buttonRadius = 10 } = $$props;
    createEventDispatcher();
    if ($$props.username === void 0 && $$bindings.username && username !== void 0) $$bindings.username(username);
    if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
    if ($$props.authType === void 0 && $$bindings.authType && authType !== void 0) $$bindings.authType(authType);
    if ($$props.redirectURL === void 0 && $$bindings.redirectURL && redirectURL !== void 0) $$bindings.redirectURL(redirectURL);
    if ($$props.requestAccess === void 0 && $$bindings.requestAccess && requestAccess !== void 0) $$bindings.requestAccess(requestAccess);
    if ($$props.buttonRadius === void 0 && $$bindings.buttonRadius && buttonRadius !== void 0) $$bindings.buttonRadius(buttonRadius);
    $$result.css.add(css$1);
    return `<div class="${"svelte-jfwjhx"}"${add_attribute("this", div, 0)}></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
    code: '.loading.svelte-zs98s6.svelte-zs98s6{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.loading.svelte-zs98s6 .spinner-border.svelte-zs98s6{width:3rem;height:3rem;border-width:0.25rem;color:#19334d}.user-info.svelte-zs98s6.svelte-zs98s6{min-height:100vh;background-color:#f0f5fa;padding-bottom:30px}.user-info.svelte-zs98s6 .d1.svelte-zs98s6{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.user-info.svelte-zs98s6 .d2.svelte-zs98s6{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.user-info.svelte-zs98s6 nav.svelte-zs98s6{font-family:"Medium";margin-bottom:20px;z-index:10;background-color:white}.user-info.svelte-zs98s6 .card.svelte-zs98s6{font-family:"Medium"}.user-info.svelte-zs98s6 .card .card-title.svelte-zs98s6{font-size:1.5rem;font-weight:bold;margin:10px 0}.user-info.svelte-zs98s6 .card .flag.svelte-zs98s6{width:25px;margin:2px}.user-info.svelte-zs98s6 .card input.svelte-zs98s6,.user-info.svelte-zs98s6 .card select.svelte-zs98s6{border-radius:0;border:0px;border-bottom:2px solid #3490dc;margin-bottom:20px;font-family:"Light", sans-serif;font-size:15px}.user-info.svelte-zs98s6 .card input.svelte-zs98s6:focus,.user-info.svelte-zs98s6 .card select.svelte-zs98s6:focus{border-bottom:2px solid #19334d !important;outline:none;box-shadow:none}.user-info.svelte-zs98s6 .card input:focus #basic-addon3.svelte-zs98s6,.user-info.svelte-zs98s6 .card select:focus #basic-addon3.svelte-zs98s6{background-color:#19334d}.user-info.svelte-zs98s6 .card small#emailHelp.svelte-zs98s6{display:block;margin-top:-20px;margin-bottom:20px}.user-info.svelte-zs98s6 .card #basic-addon3.svelte-zs98s6{border-radius:0;border:0px}.social.svelte-zs98s6.svelte-zs98s6{margin:10px 0px;border:1px solid rgba(0, 0, 0, 0.1);border-radius:3px;display:flex;flex-flow:row nowrap;justify-content:left;align-items:center;overflow:hidden;position:relative}.fa-google.svelte-zs98s6.svelte-zs98s6{background:conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-size:20px}.alertCont.svelte-zs98s6.svelte-zs98s6{position:fixed;bottom:30px;left:30px}.fa-vk.svelte-zs98s6.svelte-zs98s6{background:conic-gradient(from -45deg, #45668e 110deg, #4a76a8 90deg 180deg, #4a76a8 180deg 270deg, #4a76a8 270deg) 73% 55%/150% 150% no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-size:20px}.fa-telegram.svelte-zs98s6.svelte-zs98s6{background:conic-gradient(from -45deg, #0088cc 110deg, #0088cc 90deg 180deg, #0088cc 180deg 270deg, #0088cc 270deg) 73% 55%/150% 150% no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-size:20px}.googleBtnHolder.svelte-zs98s6.svelte-zs98s6,.telegramBtnHolder.svelte-zs98s6.svelte-zs98s6{position:absolute;width:calc(100% + 20px) !important;height:100% !important;margin-left:-20px;transform:scale(10);opacity:0.02;z-index:100;margin-top:70px !important}.vkHolder.svelte-zs98s6.svelte-zs98s6{margin-top:-370px;margin-left:30px;position:absolute;transform:scale(4);opacity:0.01}',
    map: null,
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let educationType;
    let instName;
    let instFacultyName;
    let $page, $$unsubscribe_page;
    $$unsubscribe_page = subscribe(page, (value) => ($page = value));
    sessionDuration();
    const data = $page.data;
    const telgramBotId = "zeyaddevbot";
    let alertCont;
    let userInfo = data.userInfo;
    let real_id = data.real_id;
    data.real_permission;
    data.API;
    let id = userInfo.id;
    let google;
    let loading;
    let googleBtnHolder;
    let VKBtnHolder;
    let TeleBtnHolder;
    let permissionsArr = ["default", "teacher", "admin", "super_admin"];
    let instituteYear = [
        "1st year undergraduate/specialist",
        "2nd year undergraduate/specialist",
        "3rd year undergraduate/specialist",
        "4th year undergraduate/specialist",
        "5 course specialist",
        "6 (specialty)",
        "1st Master's course",
        "2nd year master's degree",
        "Graduate student",
    ];
    let collegeYear = ["1 course", "2 course", "3 course", "4 course", "5 course"];
    $$result.css.add(css);
    educationType = "";
    instName = "";
    instFacultyName = "";
    $$unsubscribe_page();
    return `${
        (($$result.head += `<meta name="${"description"}" content="${"Some description!"}" data-svelte="svelte-1b57mjl"><link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}" data-svelte="svelte-1b57mjl">${
            (($$result.title = `<title>App Name | ${escape(userInfo.name)} ${escape(userInfo.surname)}</title>`), "")
        }<script async defer src="${"https://vk.com/js/api/openapi.js"}" type="${"text/javascript"}" charset="${"windows-1251"}" data-svelte="svelte-1b57mjl"><\/script>`),
        "")
    }

<section class="${"user-info svelte-zs98s6"}"><img class="${"d1 svelte-zs98s6"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
  <div class="${"d2 svelte-zs98s6"}"></div>
  <nav class="${"navbar navbar-light sticky-top shadow svelte-zs98s6"}"><div class="${"navbar-brand d-flex col align-items-center"}"><span class="${"fa fa-gears ms-3 me-3"}"></span>
      <h4 class="${"p-0 m-0"}">Settings</h4></div></nav>
  <div class="${"container d-flex justify-content-center mt-5"}"><div class="${"row p-0 m-0 col-12 justify-content-center"}"><div class="${"card shadow col-lg-6 svelte-zs98s6"}"><h5 class="${"card-title m-4 mt-4 svelte-zs98s6"}"><i class="${"fa fa-info-circle"}"></i>
          Basic Information
        </h5>
        <div class="${"card-body ms-4"}">
          <label for="${"name"}">Full Name</label>
          <div class="${"form-group d-flex gap-3 col-md-11"}"><input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"name"}" placeholder="${"Enter first name"}"${add_attribute(
        "value",
        userInfo.name,
        0
    )}>
            <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"name"}" placeholder="${"Enter last name"}"${add_attribute("value", userInfo.surname, 0)}></div>
          <div class="${"form-group col-md-11"}"><label for="${"Email Address"}">Email address</label>
            <input type="${"email"}" class="${"form-control svelte-zs98s6"}" id="${"Email Address"}" aria-describedby="${"emailHelp"}" placeholder="${"Enter email"}"${add_attribute(
        "value",
        userInfo.email,
        0
    )}>
            <small id="${"emailHelp"}" class="${"form-text text-muted svelte-zs98s6"}">We&#39;ll never share your email with anyone else.</small></div>
          <div class="${"form-group col-md-11"}"><label for="${"Email Address"}">User ID</label>
            <input type="${"email"}" class="${"form-control svelte-zs98s6"}" id="${"Email Address"}" aria-describedby="${"emailHelp"}" placeholder="${"Enter email"}" disabled${add_attribute(
        "value",
        id,
        0
    )}>
            <small id="${"emailHelp"}" class="${"form-text text-muted svelte-zs98s6"}">You won&#39;t be able to change this Id!</small></div>
          
          <div class="${"form-group col-md-11"}"><label for="${"phoneNumber"}">Phone Number</label>
            <div class="${"input-group mb-3"}"><div class="${"input-group-prepend "}"><span class="${"input-group-text rounded-0 bg-white svelte-zs98s6"}" id="${"basic-addon3"}"><img${add_attribute(
        "src",
        russianFlag,
        0
    )} alt="${"The Russian flag"}" class="${"flag svelte-zs98s6"}"></span></div>
              <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"phoneNumber"}" placeholder="${"Enter phone number"}" data-mask="${"+7"}"${add_attribute(
        "value",
        userInfo.phone,
        0
    )}></div></div></div>
        <h5 class="${"card-title m-4 mt-0 svelte-zs98s6"}"><i class="${"fa fa-map-marker"}"></i>
          Address
        </h5>
        <div class="${"card-body ms-4"}"><div class="${"form-group col-md-11"}"><label for="${"region"}">Region</label>
            <select class="${"form-select form-select-sm svelte-zs98s6"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(
        republics,
        (republic) => {
            return `<option${add_attribute("value", republic, 0)}>${escape(republic)}</option>`;
        }
    )}</select></div>
          <div class="${"form-group col-md-11"}"><label for="${"city"}">City</label>
            <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"city"}" placeholder="${"Enter city"}"${add_attribute("value", userInfo.city, 0)}></div></div>
        <h5 class="${"card-title m-4 mt-0 svelte-zs98s6"}"><i class="${"fa fa-book"}"></i>
          Education
        </h5>
        <div class="${"card-body ms-4"}"><div class="${"form-group col-md-11"}"><label for="${"education"}">Education type</label>
            <select class="${"form-select form-select-sm svelte-zs98s6"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option><option value="${"School"}">School</option><option value="${"University"}">University</option><option value="${"College"}">College</option></select></div>
          ${
              educationType === "School"
                  ? `<div class="${"d-flex col-md-11"}"><div class="${"form-group col-md-11 justify-content-between"}"><div class="${"row col-md-11 m-0 justify-content-between"}"><div class="${"form-group p-0 col-md-7"}"><label for="${"school"}">School Name</label>
                    <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"school"}" placeholder="${"Enter your school name"}"${add_attribute("value", instName, 0)}></div>
                  
                  <div class="${"form-group p-0 col-md-4"}"><label for="${"schoolYear"}">School Year</label>
                    <select class="${"form-select form-select svelte-zs98s6"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(
                        Array(11),
                        (_, i) => {
                            return `<option${add_attribute("value", i + 1, 0)}>${escape(i + 1)}</option>`;
                        }
                    )}</select></div></div></div></div>`
                  : ``
          }
          ${
              educationType === "University"
                  ? `<div class="${"d-flex col-md-11 justify-content-between p-0"}"><div class="${"row"}"><div class="${"form-group col-md-8"}"><label for="${"Institute"}">Institute Name</label>
                  <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"Institute"}" placeholder="${"Enter your Institute name"}"${add_attribute("value", instName, 0)}></div>
                <div class="${"form-group col-md-8"}"><label for="${"Institute"}">Faculty/Institute</label>
                  <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"Institute"}" placeholder="${"Enter your Institute name"}"${add_attribute("value", instFacultyName, 0)}></div>
                
                <div class="${"form-group col-md-4"}"><label for="${"Institute Year"}">Institute Year</label>
                  <select class="${"form-select svelte-zs98s6"}" aria-label="${"select"}"><option selected value="${"Choose..."}">Choose...</option>${each(instituteYear, (grade) => {
                        return `<option${add_attribute("value", grade, 0)}>${escape(grade)}</option>`;
                    })}</select></div></div></div>`
                  : ``
          }
          ${
              educationType == "College"
                  ? `<div class="${"d-flex col-md-11 justify-content-between p-0"}"><div class="${"row"}"><div class="${"form-group col-md-8"}"><label for="${"Institute"}">College name</label>
                  <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"Institute"}" placeholder="${"Enter your Institute name"}"${add_attribute("value", instName, 0)}></div>
                <div class="${"form-group col-md-8"}"><label for="${"Institute"}">Direction (specialty)</label>
                  <input type="${"text"}" class="${"form-control svelte-zs98s6"}" id="${"Institute"}" placeholder="${"Enter your Institute name"}"${add_attribute("value", instFacultyName, 0)}></div>
                
                <div class="${"form-group col-md-4"}"><label for="${"Institute Year"}">College Year</label>
                  <select class="${"form-select svelte-zs98s6"}" aria-label="${"select"}"><option selected value="${"Choose..."}">Choose...</option>${each(collegeYear, (grade) => {
                        return `<option${add_attribute("value", grade, 0)}>${escape(grade)}</option>`;
                    })}</select></div></div></div>`
                  : ``
          }</div>
        ${
            real_id != userInfo.id
                ? `<h5 class="${"card-title m-4 mt-2 svelte-zs98s6"}"><i class="${"fa-solid fa-lock"}"></i>
            Permission
          </h5>
          <div class="${"card-body ms-4 mt-0"}"><label for="${"region"}">Permission</label>
            <select class="${"form-select form-select-sm svelte-zs98s6"}" aria-label="${"Default select example"}"><option selected value="${"Choose..."}">Choose...</option>${each(
                      permissionsArr,
                      (per) => {
                          return `<option${add_attribute("value", per, 0)}>${escape(per)}</option>`;
                      }
                  )}</select></div>`
                : ``
        }
        <h5 class="${"card-title m-4 mt-0 me-0 pe-0 svelte-zs98s6"}"><i class="${"fa-solid fa-share-nodes"}"></i>
          Social Media
        </h5>
        <div class="${"card-body pt-0 mt-0 d-flex justify-content-center align-items-center"}"><div class="${"btn-group gap-2 form-group col-md-11"}"><button class="${"btn social btn-sm mt-2 mb-2 p-2 svelte-zs98s6"}"${add_attribute(
        "this",
        googleBtnHolder,
        0
    )}><i class="${"fa fa-google me-3 svelte-zs98s6"}"></i>
              ${`<span class="${"me-2"}">Link your Google </span>
                <div class="${"googleBtnHolder svelte-zs98s6"}"${add_attribute("this", google, 0)}></div>`}</button>
            <button class="${"btn social btn-sm mt-2 mb-2 p-2 svelte-zs98s6"}"${add_attribute("this", VKBtnHolder, 0)}><i class="${"fa fa-vk me-3 svelte-zs98s6"}"></i>
              ${`<span class="${"me-2"}">Link your VK </span>
                <div id="${"vk_auth"}" class="${"vkHolder svelte-zs98s6"}"></div>`}</button>
            <button class="${"btn social btn-sm mt-2 mb-2 p-2 svelte-zs98s6"}"${add_attribute("this", TeleBtnHolder, 0)}><i class="${"fa fa-telegram me-3 svelte-zs98s6"}"></i>
              ${`<div class="${"telegramBtnHolder svelte-zs98s6"}">${validate_component(Login, "Login").$$render($$result, { username: telgramBotId }, {}, {})}</div>
                <span class="${"me-2"}">Link your Telegram </span>`}</button></div></div>
        
        <div class="${"form-group col-md-11 m-4 mt-0"}"><button class="${"btn btn-lg btn-primary mt-2 mb-2"}"><i class="${"fa fa-save"}"></i>
            Save
          </button></div></div></div></div>
  <div class="${"alertCont svelte-zs98s6"}"${add_attribute("this", alertCont, 0)}></div></section>

<div class="${"loading svelte-zs98s6"}"${add_attribute("this", loading, 0)}><div class="${"spinner-border svelte-zs98s6"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div>
</div>`;
});
export { Page as default };
