let l = async function ({ fetch: o }) {
    await new Promise((a) => setTimeout(a, 500));
    let e = "http://localhost:8000",
        t = await o(`${e}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
    return (
        !t.ok && window.location.href != "https://reg.uralsp.ru/" && ((document.cookie = "sp_rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"), localStorage.clear()),
        { access_token: (await t.json()).access_token, API: e }
    );
};
const c = Object.freeze(
    Object.defineProperty({ __proto__: null, load: l }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { c as _, l };
