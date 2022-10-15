import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../../../../../chunks/index.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { s as sessionDuration } from "../../../../../../chunks/sessionDuration.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.loading.svelte-pvwixh.svelte-pvwixh{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.loading.svelte-pvwixh .spinner-border.svelte-pvwixh{width:3rem;height:3rem;border-width:0.25rem;color:#19334d}.notfound.svelte-pvwixh.svelte-pvwixh{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(100vh - 38px);font-family:"Medium", sans-serif}.notfound.svelte-pvwixh p.svelte-pvwixh{font-family:"Light", sans-serif}.notfound.svelte-pvwixh lottie-player.svelte-pvwixh{max-width:500px;margin-top:-40px}.found.svelte-pvwixh.svelte-pvwixh{min-height:calc(100vh - 38px);background-image:linear-gradient(to bottom right, #19334d, #3490dc);font-family:"Medium", sans-serif}.found.svelte-pvwixh .d1.svelte-pvwixh{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.found.svelte-pvwixh .d2.svelte-pvwixh{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.found.svelte-pvwixh .card.svelte-pvwixh{margin:20px !important}.found.svelte-pvwixh .card .form-select.svelte-pvwixh{margin:0px}.found.svelte-pvwixh .card .form-select.svelte-pvwixh:focus{border-bottom:0px !important}.found.svelte-pvwixh .results.svelte-pvwixh{min-width:max-content !important;max-width:400px}.found.svelte-pvwixh .userInfo.svelte-pvwixh{width:100%}.found.svelte-pvwixh .even.svelte-pvwixh{background-color:#f0f5fa}.found.svelte-pvwixh .info.svelte-pvwixh{width:100%;display:flex;flex-flow:column nowrap}.found.svelte-pvwixh nav.svelte-pvwixh{background-color:white}.found.svelte-pvwixh .form.svelte-pvwixh{position:relative;z-index:1;font-family:"Light", sans-serif;display:flex;flex-flow:column nowrap;justify-content:center}.found.svelte-pvwixh .form button.svelte-pvwixh{background-color:#3490dc;color:white;border:none;border-radius:0.25rem;padding:0.5rem 1rem;font-size:1.25rem;font-weight:bold;cursor:pointer;transition:all 0.3s ease-in-out}.found.svelte-pvwixh .form button.svelte-pvwixh:hover{background-color:#343a40}.found.svelte-pvwixh input.svelte-pvwixh,.found.svelte-pvwixh .form-select.svelte-pvwixh{border-radius:0;border:0px;border-bottom:2px solid #3490dc;font-size:15px}.found.svelte-pvwixh input.svelte-pvwixh:focus,.found.svelte-pvwixh .form-select.svelte-pvwixh:focus{border-bottom:2px solid #19334d !important;outline:none;box-shadow:none}.found.svelte-pvwixh .select.svelte-pvwixh{font-size:20px;opacity:0.8;cursor:pointer;color:#3490dc}.found.svelte-pvwixh .toolbar.svelte-pvwixh{--height:190px;margin-right:-220px;position:fixed;right:0;top:calc(50% - var(--height) / 2);width:max-content;height:var(--height);display:flex;justify-content:space-between;align-items:center;transition:all 0.3s ease-in-out;background-color:#3490dc;z-index:6;border:1px solid rgba(74, 170, 235, 0.1);border-radius:0.5rem}.found.svelte-pvwixh .toolbar .fa-cogs.svelte-pvwixh{padding:10px;padding-left:20px;font-size:30px;cursor:pointer;color:white}.found.svelte-pvwixh .toolbar .toolbarBtn.svelte-pvwixh{color:white;padding:5px;background-color:transparent;border:none}.found.svelte-pvwixh .toolbar .toolbarBtn.svelte-pvwixh:hover{background-color:#3490dc;color:white}.found.svelte-pvwixh .paginationNav.svelte-pvwixh{padding-bottom:20px;font-size:18px;font-family:"Courier New", Courier, monospace;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center}.found.svelte-pvwixh .paginationNav select.svelte-pvwixh{position:relative;width:70px;font-size:18px;height:100%;border:none;border-radius:0px;background-color:#3490dc;color:white}.found.svelte-pvwixh .paginationNav .pagination.svelte-pvwixh{padding:0px !important;max-width:max-content}.found.svelte-pvwixh .paginationNav .pagination .page-link.svelte-pvwixh{background-color:#3490dc;border:none;width:35px;text-align:center;color:white;cursor:pointer}.hide.svelte-pvwixh.svelte-pvwixh{display:none !important}.alertCont.svelte-pvwixh.svelte-pvwixh{position:fixed;bottom:30px;left:30px}@media screen and (max-width: 650px){.filter.svelte-pvwixh.svelte-pvwixh,.results.svelte-pvwixh.svelte-pvwixh{max-width:100% !important;min-width:100% !important;width:100% !important}}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  sessionDuration();
  let data = $page.data;
  let { searchQueries = data.searchQueries, adminId = data.adminId, usersOrErr = data.usersOrErr } = $$props;
  let { token = data.token, real_id = data.real_id, API = data.API } = $$props;
  let loading;
  if ($$props.searchQueries === void 0 && $$bindings.searchQueries && searchQueries !== void 0)
    $$bindings.searchQueries(searchQueries);
  if ($$props.adminId === void 0 && $$bindings.adminId && adminId !== void 0)
    $$bindings.adminId(adminId);
  if ($$props.usersOrErr === void 0 && $$bindings.usersOrErr && usersOrErr !== void 0)
    $$bindings.usersOrErr(usersOrErr);
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.real_id === void 0 && $$bindings.real_id && real_id !== void 0)
    $$bindings.real_id(real_id);
  if ($$props.API === void 0 && $$bindings.API && API !== void 0)
    $$bindings.API(API);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `
${$$result.head += `<script defer src="${"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}" data-svelte="svelte-5ay6di"><\/script>${$$result.title = `<title>Search results</title>`, ""}`, ""}

<div class="${"loading svelte-pvwixh"}"${add_attribute("this", loading, 0)}><div class="${"spinner-border svelte-pvwixh"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div></div>

${`<div class="${"loading svelte-pvwixh"}"><h1>Searching...</h1></div>`}`;
});
export {
  Page as default
};
