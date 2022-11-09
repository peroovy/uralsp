import { c as e } from "./singletons-58bd1d19.js";
import { b as o } from "./paths-9678c1af.js";
e.disable_scroll_handling;
const i = e.goto;
e.invalidate;
e.invalidateAll;
e.prefetch;
e.prefetch_routes;
e.before_navigate;
e.after_navigate;
function l() {
    const a = new Date().getTime();
    {
        let t = (parseInt(localStorage.getItem("expires_in")) * 1e3 - a) / (1e3 * 60);
        t <= 0 && i("/"),
            setInterval(() => {
                t <= 0 && (localStorage.clear(), (window.location.href = o));
            }, t * 1e3 * 60);
    }
}
export { i as g, l as s };
