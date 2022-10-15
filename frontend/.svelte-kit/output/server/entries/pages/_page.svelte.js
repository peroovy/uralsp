import { c as create_ssr_component, d as add_attribute } from "../../chunks/index.js";
import { s as src } from "../../chunks/logo.js";
import { d as dotsSrc } from "../../chunks/dots.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.loading.svelte-dg45h2.svelte-dg45h2{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:white;z-index:1000;display:flex;justify-content:center;align-items:center}.loading.svelte-dg45h2 .spinner-border.svelte-dg45h2{width:3rem;height:3rem;border-width:0.25rem;color:#19334d}.signup.svelte-dg45h2.svelte-dg45h2{width:100vw;min-height:calc(100vh - 38px);display:flex;flex-direction:column;justify-content:center;align-items:center;line-height:40px;font-size:18px;background-image:linear-gradient(to bottom right, #19334d, #3490dc)}.signup.svelte-dg45h2 .d1.svelte-dg45h2{width:clamp(400px, 50vw, 800px);position:fixed;top:70px;right:-100px;z-index:0;opacity:0.2}.signup.svelte-dg45h2 .d2.svelte-dg45h2{width:800px;height:800px;background-color:#19334d;position:fixed;bottom:-200px;left:-200px;z-index:0;border-radius:50%;opacity:0.1}.signup.svelte-dg45h2 .signup-form.svelte-dg45h2{border:1px solid rgba(0, 0, 0, 0.1);background-color:white;padding:50px;border-radius:5px;z-index:2;box-shadow:1px 1px 5px rgba(0, 0, 0, 0.1)}.signup.svelte-dg45h2 .signup-form .logo.svelte-dg45h2{width:100px;height:auto;display:block}.signup.svelte-dg45h2 .signup-form p.svelte-dg45h2{text-align:left;font-family:"light";font-size:13px;opacity:0.9;letter-spacing:2px}.signup.svelte-dg45h2 .signup-form .btn.svelte-dg45h2{margin:10px 0px;border:1px solid rgba(0, 0, 0, 0.1);border-radius:3px;min-width:300px;display:flex;flex-flow:row nowrap;justify-content:left;align-items:center;overflow:hidden;position:relative}.signup.svelte-dg45h2 .signup-form .btn .fa-google.svelte-dg45h2{background:conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-size:20px}.signup.svelte-dg45h2 .signup-form .btn .fa-vk.svelte-dg45h2{background:conic-gradient(from -45deg, #45668e 110deg, #4a76a8 90deg 180deg, #4a76a8 180deg 270deg, #4a76a8 270deg) 73% 55%/150% 150% no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-size:20px}.signup.svelte-dg45h2 .signup-form .btn .fa-telegram.svelte-dg45h2{background:conic-gradient(from -45deg, #0088cc 110deg, #0088cc 90deg 180deg, #0088cc 180deg 270deg, #0088cc 270deg) 73% 55%/150% 150% no-repeat;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-size:20px}.signup.svelte-dg45h2 .signup-form .btn span.svelte-dg45h2{margin-left:20px;font-family:"light";font-size:16px;opacity:0.9;letter-spacing:2px}.signup.svelte-dg45h2 .signup-form .btn .fa-arrow-right.svelte-dg45h2{position:absolute;display:block;width:30px !important;right:10px;top:50%;overflow:hidden;transform:translateY(-50%);font-size:16px;color:rgba(128, 128, 128, 0.719);width:30px;visibility:hidden;margin-right:10px;transition:all 0.2s ease-in-out}.signup.svelte-dg45h2 .signup-form .btn.svelte-dg45h2:hover{background-color:#ebeef7;border-color:#3490dc}.signup.svelte-dg45h2 .signup-form .btn:hover .fa-arrow-right.svelte-dg45h2{margin-right:-10px;visibility:visible}.telegramBtnHolder.svelte-dg45h2.svelte-dg45h2,.googleBtnHolder.svelte-dg45h2.svelte-dg45h2{position:absolute;width:calc(100% + 20px) !important;height:100% !important;margin-left:-20px;scale:5;transform:scale(5);opacity:0.02;z-index:100}.telegramBtnHolder.svelte-dg45h2.svelte-dg45h2{margin-top:30px !important}.vk.svelte-dg45h2.svelte-dg45h2,.tele.svelte-dg45h2.svelte-dg45h2,.google.svelte-dg45h2.svelte-dg45h2{max-width:318px;max-height:80px;overflow:hidden;position:relative}.vkHolder.svelte-dg45h2.svelte-dg45h2{margin-top:-120px;margin-left:50px;position:absolute;transform:scale(2);opacity:0.02;height:fit-content;z-index:100}@media screen and (max-width: 450px){.signup-form.svelte-dg45h2.svelte-dg45h2{width:100vw !important;border-radius:0px !important}}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let google;
  let googlePseudo;
  let loading;
  let telgramBtn;
  $$result.css.add(css);
  return `${$$result.head += `<link rel="${"stylesheet"}" href="${"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"}" integrity="${"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"}" crossorigin="${"anonymous"}" data-svelte="svelte-21iq1o"><link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}" data-svelte="svelte-21iq1o"><meta name="${"viewport"}" content="${"width=device-width, initial-scale=1, shrink-to-fit=no"}" data-svelte="svelte-21iq1o"><meta name="${"description"}" content="${"Some description!"}" data-svelte="svelte-21iq1o">${$$result.title = `<title>App Name | Signup</title>`, ""}<script async defer src="${"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"}" integrity="${"sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"}" crossorigin="${"anonymous"}" data-svelte="svelte-21iq1o"><\/script><script async defer src="${"https://vk.com/js/api/openapi.js"}" type="${"text/javascript"}" charset="${"windows-1251"}" data-svelte="svelte-21iq1o"><\/script>`, ""}

<section class="${"signup svelte-dg45h2"}"><img class="${"d1 svelte-dg45h2"}"${add_attribute("src", dotsSrc, 0)} alt="${""}">
  <div class="${"d2 svelte-dg45h2"}"></div>
  <div class="${"signup-form svelte-dg45h2"}"><img${add_attribute("src", src, 0)} alt="${"logo"}" class="${"logo svelte-dg45h2"}">
    <p class="${"svelte-dg45h2"}">Please sign up to continue</p>
    <div class="${"btn-group-vertical col-12"}"><div class="${"google svelte-dg45h2"}"><div class="${"googleBtnHolder svelte-dg45h2"}"${add_attribute("this", google, 0)}></div>
        <div class="${"btn btn-lg btn-block btn-outline svelte-dg45h2"}"${add_attribute("this", googlePseudo, 0)}><i class="${"fa fa-google svelte-dg45h2"}"></i>
          <span class="${"svelte-dg45h2"}">Continue with Google </span>
          <i class="${"fa fa-arrow-right svelte-dg45h2"}"></i></div></div>
      <div class="${"vk svelte-dg45h2"}"><div id="${"vk_auth"}" class="${"vkHolder svelte-dg45h2"}"></div>
        <div class="${"btn btn-lg btn-block btn-outline svelte-dg45h2"}"><i class="${"fa fa-vk svelte-dg45h2"}"></i>
          <span class="${"svelte-dg45h2"}">Continue with VK </span>
          <i class="${"fa fa-arrow-right svelte-dg45h2"}"></i></div></div>
      <div class="${"tele svelte-dg45h2"}"><div class="${"telegramBtnHolder svelte-dg45h2"}"${add_attribute("this", telgramBtn, 0)}></div>
        <div class="${"btn btn-lg btn-block btn-outline svelte-dg45h2"}"><i class="${"fa fa-telegram svelte-dg45h2"}"></i>
          <span class="${"svelte-dg45h2"}">Continue with Telegram </span>
          <i class="${"fa fa-arrow-right svelte-dg45h2"}"></i></div></div></div></div></section>
<div class="${"loading svelte-dg45h2"}"${add_attribute("this", loading, 0)}><div class="${"spinner-border svelte-dg45h2"}" role="${"status"}"><span class="${"visually-hidden"}">Loading...</span></div>
</div>`;
});
export {
  Page as default
};
