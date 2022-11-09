import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, h as add_classes } from "./index.js";
import { b as base } from "./paths.js";
import { s as src } from "./logo.js";
import { t as tempPhoto } from "./temp-photo.js";
import { p as page } from "./stores.js";
const lottieNotFoundSrc = "/_app/immutable/assets/lottie-notfound2-01f50ee7.json";
const navbar_svelte_svelte_type_style_lang = "";
const css = {
    code: '.participant-container.svelte-1fotc2p.svelte-1fotc2p.svelte-1fotc2p{width:100vw}.participant-container.svelte-1fotc2p nav.svelte-1fotc2p.svelte-1fotc2p{position:fixed;top:0px;z-index:100;flex-shrink:0;padding:10px 20px;font-family:"Light";font-size:15px !important}.participant-container.svelte-1fotc2p nav .navbar-brand.svelte-1fotc2p.svelte-1fotc2p{align-items:center !important}.participant-container.svelte-1fotc2p nav .navbar-brand.svelte-1fotc2p>img.svelte-1fotc2p{height:20px}.participant-container.svelte-1fotc2p nav .part-photo.svelte-1fotc2p.svelte-1fotc2p{width:30px;height:30px;border-radius:50%;margin-right:10px}.participant-container.svelte-1fotc2p nav .nav-item.svelte-1fotc2p.svelte-1fotc2p{cursor:pointer}.participant-container.svelte-1fotc2p nav .dropdown-menu.svelte-1fotc2p.svelte-1fotc2p{border:none;position:absolute;z-index:20;border-top:3px solid #19334d !important;padding:10px;max-width:fit-content}.participant-container.svelte-1fotc2p nav .dropdown-menu .dropdown-item.svelte-1fotc2p.svelte-1fotc2p{cursor:pointer;display:flex;justify-content:left;align-items:center}.participant-container.svelte-1fotc2p nav .dropdown-menu .dropdown-item.svelte-1fotc2p.svelte-1fotc2p:hover{background-color:transparent;color:#19334d}.participant-container.svelte-1fotc2p nav .dropdown-menu .dropdown-item .fa.svelte-1fotc2p.svelte-1fotc2p{margin-right:10px}nav.svelte-1fotc2p.svelte-1fotc2p.svelte-1fotc2p{position:sticky !important;z-index:10 !important;background-color:#f8f9fa !important}@media screen and (min-width: 1000px){.navbar-nav.svelte-1fotc2p.svelte-1fotc2p.svelte-1fotc2p{align-items:center !important}}@media screen and (max-width: 1000px){.navbar-nav.svelte-1fotc2p.svelte-1fotc2p.svelte-1fotc2p{margin:20px 0px}.navbar-nav.svelte-1fotc2p.svelte-1fotc2p.svelte-1fotc2p::before{content:"";display:block;width:100%;height:1px;background-color:#19334d;margin-bottom:10px;opacity:0.2}.navbar-nav.svelte-1fotc2p .dropdown-menu.svelte-1fotc2p.svelte-1fotc2p{position:absolute;top:100%;left:0;border:1px solid #19334d;border-radius:5px;padding:10px}.navbar-nav.svelte-1fotc2p .dropdown-menu .dropdown-item.svelte-1fotc2p.svelte-1fotc2p{display:flex;justify-content:left;align-items:center}.navbar-nav.svelte-1fotc2p .dropdown-menu .dropdown-item .fa.svelte-1fotc2p.svelte-1fotc2p{margin-right:10px}}',
    map: null,
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $page, $$unsubscribe_page;
    $$unsubscribe_page = subscribe(page, (value) => ($page = value));
    let up, past, on, req;
    let { userId, paricipantName, active } = $$props;
    if ($$props.userId === void 0 && $$bindings.userId && userId !== void 0) $$bindings.userId(userId);
    if ($$props.paricipantName === void 0 && $$bindings.paricipantName && paricipantName !== void 0) $$bindings.paricipantName(paricipantName);
    if ($$props.active === void 0 && $$bindings.active && active !== void 0) $$bindings.active(active);
    $$result.css.add(css);
    $$unsubscribe_page();
    return `<div class="${"participant-container svelte-1fotc2p"}"><nav class="${"navbar navbar-expand-lg navbar-light mb-5 sticky-top shadow svelte-1fotc2p"}"><div class="${"container-fluid p-0 d-flex justify-content-lg-around"}"><div class="${"navbar-brand svelte-1fotc2p"}"><img${add_attribute(
        "src",
        src,
        0
    )} alt="${"Logo"}" class="${"svelte-1fotc2p"}"></div>
      <button class="${"navbar-toggler"}" type="${"button"}" data-bs-toggle="${"collapse"}" data-bs-target="${"#participant-menu"}" aria-controls="${"participant-menu"}" aria-expanded="${"false"}" aria-label="${"Toggle navigation"}"><span class="${"navbar-toggler-icon"}"></span></button>
      <div class="${"collapse navbar-collapse flex-grow-0"}" id="${"participant-menu"}"><ul class="${"navbar-nav me-auto mb-20 mb-lg-0 col-12 justify-content-around svelte-1fotc2p"}"><li class="${"nav-item svelte-1fotc2p"}"><span class="${"nav-link active"}"${add_attribute(
        "this",
        up,
        0
    )}>Upcoming registeration </span></li>
          <li class="${"nav-item svelte-1fotc2p"}"><span class="${"nav-link"}"${add_attribute("this", on, 0)}>Ongoing registeration </span></li>
          <li class="${"nav-item svelte-1fotc2p"}"><span class="${"nav-link"}" id="${"past"}"${add_attribute("this", past, 0)}>Past registeration </span></li>
          <li class="${"nav-item svelte-1fotc2p"}"><span class="${"nav-link"}"${add_attribute("this", req, 0)}>Requests </span></li>
          <li class="${"nav-item dropdown svelte-1fotc2p"}"><div class="${"nav-link dropdown-toggle d-flex align-items-center"}" role="${"button"}" data-bs-toggle="${"dropdown"}" aria-expanded="${"false"}"><img${add_attribute(
        "src",
        tempPhoto,
        0
    )} alt="${"Logo"}" class="${"part-photo svelte-1fotc2p"}">
              <span>${escape(paricipantName)}</span></div>
            <ul class="${"dropdown-menu mt-2 ms-3 rounded-0 svelte-1fotc2p"}"><li${add_classes(($page.url.pathname === "/info" ? "active" : "").trim())}><a sveltekit:prefetch href="${
        escape(base, true) + "/info/" + escape(userId, true)
    }" target="${"_blank"}" content="${"Home"}" class="${"dropdown-item nav-link svelte-1fotc2p"}"><span class="${"fa fa-gears svelte-1fotc2p"}"></span>
                  Settings
                </a></li>
              <li><hr class="${"dropdown-divider"}"></li>
              <li class="${"dropdown-item nav-link signOut svelte-1fotc2p"}"><span class="${"fa fa-sign-out svelte-1fotc2p"}"></span>
                Sign out
              </li></ul></li></ul></div></div></nav>
</div>`;
});
export { Navbar as N, lottieNotFoundSrc as l };
