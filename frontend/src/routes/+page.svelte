<script lang="ts">
    import logoSrc from "$lib/Assets/imgs/logo.png";
    import dotsSrc from "$lib/Assets/imgs/dots.png";
    import { base } from "$app/paths";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import { parsePayload } from "$lib/helpers";
    import type { TelegramPayload } from "$lib/types";

    const API = import.meta.env.VITE_API_URL;
    const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const vkAppId = import.meta.env.VITE_VK_CLIENT_ID;
    const telgramBotId = import.meta.env.VITE_TELEGRAM_BOT;

    let google: HTMLElement;
    let googlePseudo: HTMLElement;
    let loading: HTMLElement;
    let telgramBtn: HTMLElement;

    function redirect(per: string, user_id: number) {
        if (per === "super_admin" || per === "admin") {
            window.location.href = `${base}/admin/${user_id}`;
        } else {
            window.location.href = `${base}/participant/ongoing`;
        }
    }
    onMount(() => {
        if (browser) {
            // Access token exists and not expired
            let token = localStorage.getItem("access_token");
            let exp = localStorage.getItem("expires_in");
            if (token != null && exp != null) {
                let date = new Date(parseInt(exp) * 1000);
                let now = new Date();
                if (now < date) {
                    let payload = parsePayload(localStorage.getItem("access_token")!);
                    let per = payload.permission;
                    let id = payload.user_id;
                    redirect(per, id);
                } else {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("expires_in");
                }
            }

            interface googleRespond {
                clientId: string;
                credential: string;
            }

            async function handleCredentialResponse(response: googleRespond) {
                let credential = response.credential;

                let data = {
                    id_token: credential,
                };
                loading.style.display = "block";
                // fetch and store the cookies from the server
                await fetch(`${API}/auth/signin-google`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).then((res) => {
                    res.json().then((res) => {
                        let expiresIn = res.expires_in;
                        let token = res.access_token;
                        let cookie = res.cookie;
                        localStorage.setItem("access_token", token);
                        localStorage.setItem("expires_in", expiresIn);
                        let per = parsePayload(localStorage.getItem("access_token")!).permission;
                        let id = parsePayload(localStorage.getItem("access_token")!).user_id;
                        redirect(per, id);
                    });
                });
            }
            // Telegram auth btn
            window.telegramCallback = onTelegramAuth;
            let script = document.createElement("script");
            script.src = "https://telegram.org/js/telegram-widget.js?19";
            script.setAttribute("async", "true");
            script.setAttribute("data-telegram-login", telgramBotId);
            script.setAttribute("data-onauth", "window.telegramCallback(user)");
            telgramBtn.appendChild(script);
            setTimeout(() => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: googleId,
                        allowed_parent_origin: "https://reg.uralsp.ru/",
                        callback: handleCredentialResponse,
                    });
                    window.google.accounts.id.renderButton(google, {
                        size: "large",
                        theme: "outline",
                        text: "continue_with_google",
                    });
                }
                let VK = window.VK || {};
                if (VK) {
                    VK.init({
                        apiId: vkAppId,
                    });

                    VK.Widgets.Auth("vk_auth", {
                        onAuth: async function (data: { uid: string; hash: string; first_name: string; last_name: string }) {
                            let uid = data.uid;
                            let hash = data.hash;
                            let fn = data.first_name;
                            let ln = data.last_name;
                            let authData = {
                                uid: uid,
                                first_name: fn,
                                last_name: ln,
                                hash: hash,
                            };
                            loading.style.display = "block";
                            await fetch(`${API}/auth/signin-vkontakte`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(authData),
                            }).then((res) => {
                                res.json().then((res) => {
                                    let expiresIn = res.expires_in;
                                    let token = res.access_token;
                                    localStorage.setItem("access_token", token);
                                    localStorage.setItem("expires_in", expiresIn);
                                    let per = parsePayload(localStorage.getItem("access_token")!).permission;
                                    let id = parsePayload(localStorage.getItem("access_token")!).user_id;
                                    redirect(per, id);
                                });
                            });
                        },
                    });
                }
            }, 1000);
        }
        loading.style.display = "none";
    });
    function onTelegramAuth(user: TelegramPayload) {
        // send a post request to the server with the user data
        let data = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
            auth_date: user.auth_date,
            hash: user.hash,
        };
        loading.style.display = "block";
        fetch(`${API}/auth/signin-telegram`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                res.json().then((res) => {
                    let expiresIn = res.expires_in;
                    let token = res.access_token;
                    localStorage.setItem("access_token", token);
                    localStorage.setItem("expires_in", expiresIn);
                    let per = parsePayload(localStorage.getItem("access_token")!).permission;
                    let id = parsePayload(localStorage.getItem("access_token")!).user_id;
                    redirect(per, id);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="Some description!" />
    <title>App Name | Signup</title>
    <script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
        crossorigin="anonymous">
    </script>
    <script async defer src="https://vk.com/js/api/openapi.js" type="text/javascript" charset="windows-1251"></script>
</svelte:head>

<section class="signup">
    <img class="d1" src={dotsSrc} alt="" />
    <div class="d2" />
    <div class="signup-form">
        <img src={logoSrc} alt="logo" class="logo" />
        <p>Please sign up to continue</p>
        <div class="btn-group-vertical col-12">
            <div class="google">
                <div bind:this={google} class="googleBtnHolder" />
                <div class="btn btn-lg btn-block btn-outline" bind:this={googlePseudo}>
                    <i class="fa fa-google" />
                    <span> Continue with Google </span>
                    <i class="fa fa-arrow-right" />
                </div>
            </div>
            <div class="vk">
                <div id="vk_auth" class="vkHolder" />
                <div class="btn btn-lg btn-block btn-outline">
                    <i class="fa fa-vk" />
                    <span> Continue with VK </span>
                    <i class="fa fa-arrow-right" />
                </div>
            </div>
            <div class="tele">
                <div class="telegramBtnHolder" bind:this={telgramBtn} />
                <div class="btn btn-lg btn-block btn-outline">
                    <i class="fa fa-telegram" />
                    <span> Continue with Telegram </span>
                    <i class="fa fa-arrow-right" />
                </div>
            </div>
        </div>
    </div>
</section>
<div class="loading" bind:this={loading}>
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>

<style lang="scss">
    @import "../lib/Assets/common.scss";

    .signup {
        width: 100vw;
        min-height: calc(100vh - 38px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 40px;
        font-size: 18px;
        background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);

        @include bg;

        .signup-form {
            border: 1px solid rgba(0, 0, 0, 0.1);
            background-color: white;
            padding: 50px;
            border-radius: 5px;
            z-index: 2;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
            .logo {
                width: 100px;
                height: auto;
                display: block;
            }
            p {
                text-align: left;
                font-family: "light";
                font-size: 13px;
                opacity: 0.9;
                letter-spacing: 2px;
            }
            .btn {
                margin: 10px 0px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 3px;
                min-width: 300px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: left;
                align-items: center;
                overflow: hidden;
                position: relative;
                .fa-google {
                    background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    font-size: 20px;
                }

                .fa-vk {
                    background: conic-gradient(from -45deg, #45668e 110deg, #4a76a8 90deg 180deg, #4a76a8 180deg 270deg, #4a76a8 270deg) 73% 55%/150% 150% no-repeat;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    font-size: 20px;
                }

                .fa-telegram {
                    background: conic-gradient(from -45deg, #0088cc 110deg, #0088cc 90deg 180deg, #0088cc 180deg 270deg, #0088cc 270deg) 73% 55%/150% 150% no-repeat;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    font-size: 20px;
                }

                span {
                    margin-left: 20px;
                    font-family: "light";
                    font-size: 16px;
                    opacity: 0.9;
                    letter-spacing: 2px;
                }

                .fa-arrow-right {
                    position: absolute;
                    display: block;
                    width: 30px !important;
                    right: 10px;
                    top: 50%;
                    overflow: hidden;
                    transform: translateY(-50%);
                    font-size: 16px;
                    color: rgba(128, 128, 128, 0.719);
                    width: 30px;
                    visibility: hidden;
                    margin-right: 10px;
                    transition: all 0.2s ease-in-out;
                }

                &:hover {
                    background-color: #ebeef7;
                    border-color: $secondary-color;
                    .fa-arrow-right {
                        margin-right: -10px;
                        visibility: visible;
                    }
                }
            }
        }
    }

    .telegramBtnHolder,
    .googleBtnHolder {
        position: absolute;
        width: calc(100% + 20px) !important;
        height: 100% !important;
        margin-left: -20px;
        scale: 5;
        // Yandex compatibility
        transform: scale(5);
        opacity: 0.02;
        z-index: 100;
    }
    .telegramBtnHolder {
        margin-top: 30px !important;
    }
    .vk,
    .tele,
    .google {
        max-width: 318px;
        max-height: 80px;
        overflow: hidden;
        position: relative;
    }
    .vkHolder {
        margin-top: -120px;
        margin-left: 50px;
        position: absolute;
        transform: scale(2);
        opacity: 0.02;
        height: fit-content;
        z-index: 100;
    }
    @media screen and (max-width: 450px) {
        .signup-form {
            width: 100vw !important;
            border-radius: 0px !important;
        }
    }
</style>
