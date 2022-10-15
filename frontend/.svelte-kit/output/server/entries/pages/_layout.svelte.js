import { c as create_ssr_component, e as escape, v as validate_component } from "../../chunks/index.js";
const Footer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: 'footer.svelte-26xoul.svelte-26xoul{color:white;background-color:black;padding:10px 0px;text-align:center;font-size:12px;font-family:"light";margin:0px;position:relative;z-index:10}footer.svelte-26xoul p.svelte-26xoul{padding:0px;margin:0px}',
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let date = new Date();
  let year = date.getFullYear();
  $$result.css.add(css$1);
  return `<footer class="${"svelte-26xoul"}"><p class="${"svelte-26xoul"}">\xA9 ${escape(year)} AppName </p>
</footer>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: 'body{margin:0;padding:0;font-family:Arial, Helvetica, sans-serif;font-size:16px;background-color:#fff;overflow-x:hidden}@font-face{font-family:"Black";src:url("../lib/Assets/fonts/Raleway-Black.ttf") format("truetype")}@font-face{font-family:"Medium";src:url("../lib/Assets/fonts/Raleway-Medium.ttf") format("truetype")}@font-face{font-family:"Light";src:url("../lib/Assets/fonts/Raleway-Light.ttf") format("truetype")}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<link rel="${"stylesheet"}" href="${"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"}" integrity="${"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"}" crossorigin="${"anonymous"}" data-svelte="svelte-13k34gs"><link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}" data-svelte="svelte-13k34gs"><link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"}" data-svelte="svelte-13k34gs"><meta name="${"viewport"}" content="${"width=device-width, initial-scale=1, shrink-to-fit=no"}" data-svelte="svelte-13k34gs"><meta name="${"description"}" content="${"Some description!"}" data-svelte="svelte-13k34gs"><script src="${"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"}" integrity="${"sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"}" crossorigin="${"anonymous"}" data-svelte="svelte-13k34gs"><\/script><script src="${"https://accounts.google.com/gsi/client"}" async defer data-svelte="svelte-13k34gs"><\/script>`, ""}

<main>${slots.default ? slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
