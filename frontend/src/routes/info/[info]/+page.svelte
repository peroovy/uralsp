<script lang="ts">
    import dotsSrc from "$lib/Assets/imgs/dots.png";
    import russianFlag from "$lib/Assets/imgs/russian-flag.png";
    import { republics } from "$lib/Assets/republics.json";
    import type { UserData } from "$lib/types";
    import { onMount } from "svelte";
    import { Login } from "sveltegram";
    import { sessionDuration } from "$lib/sessionDuration";
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { handleErrorMsg, printMsg } from "$lib/helpers";

    sessionDuration();
    const data = $page.data;
    const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const vkAppId = import.meta.env.VITE_VK_CLIENT_ID;
    const telgramBotId = import.meta.env.VITE_TELEGRAM_BOT;

    $: educationType = "";
    $: instName = "";
    $: instYear = "";
    $: instFacultyName = "";
    let alertCont: HTMLElement;

    // TODO: move it to the types file
    interface SocialIDs {
        google: null | string;
        tele: null | string;
        vk: null | string;
    }
    let ids: SocialIDs = {
        google: null,
        tele: null,
        vk: null,
    };

    let userInfo: UserData = data.userInfo;
    let real_id: number = data.real_id,
        real_permission: string = data.real_permission;

    let API: string = data.API;

    let id = userInfo.id;
    let google: HTMLElement;
    let loading: HTMLElement;
    let googleBtnHolder: HTMLElement;
    let VKBtnHolder: HTMLElement;
    let TeleBtnHolder: HTMLElement;
    let userPermission: string | undefined;
    let permissionsArr = ["default", "teacher", "admin", "super_admin"];

    onMount(() => {
        // destructuring the object
        let instType = userInfo.institution_type;
        educationType = instType ? instType.charAt(0).toUpperCase() + userInfo.institution_type.slice(1) : "Choose ...";
        ids.google = userInfo.google_id;
        ids.tele = userInfo.telegram_id;
        ids.vk = userInfo.vkontakte_id;
        instName = userInfo.institution_name;
        instYear = userInfo.institution_course;
        instFacultyName = userInfo.institution_faculty;
        userPermission = userInfo.permission;

        // if ids are not availabile, then disable the buttons
        if (userInfo.id != real_id) {
            if (ids.google === null || ids.google === undefined || ids.google === "") {
                googleBtnHolder.classList.add("disabled");
            }
            if (ids.tele === null || ids.tele === undefined || ids.tele === "") {
                TeleBtnHolder.classList.add("disabled");
            }
            if (ids.vk === null || ids.vk === undefined || ids.vk === "") {
                VKBtnHolder.classList.add("disabled");
            }
        }
        if (real_permission == "admin") {
            permissionsArr = ["default", "teacher"];
        }

        if (browser) {
            setTimeout(() => {
                let VK = window.VK || {};
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: googleId,
                        allowed_parent_origin: "https://reg.uralsp.ru/", // To allow the subdomain to use the google login
                        callback: handleCredentialResponse,
                    });
                    window.google.accounts.id.renderButton(google, {});
                }
                if (VK) {
                    VK.init({
                        apiId: vkAppId,
                    });

                    VK.Widgets.Auth("vk_auth", {
                        onAuth: async function (data: { uid: string; hash: string; first_name: string; last_name: string }) {
                            if (real_id != userInfo.id) {
                                printMsg("You can't change the social account of another user", "error", alertCont);
                                return;
                            }
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
                            let link_vk = await fetch(`${API}/users/current/link-vkontakte`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + access_tk,
                                },
                                body: JSON.stringify(authData),
                            });
                            if (link_vk.ok) {
                                printMsg("Your VK account has been linked successfully", "success", alertCont);
                                window.location.reload();
                            } else {
                                printMsg("error", "Something went wrong, please try again later", alertCont);
                            }
                        },
                    });
                }
            }, 1000);
        }
        loading.style.display = "none";
    });

    // TODO: move it to general usage file
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

    async function updateUserInfo() {
        userInfo.institution_type = educationType.charAt(0).toLowerCase() + educationType.slice(1);
        userInfo.institution_name = instName;
        userInfo.institution_course = instYear;
        userInfo.institution_faculty = instFacultyName;
        alertCont.innerHTML = "";

        if (educationType != userInfo.institution_type) {
            userInfo.institution_type = "";
        }

        let update = {
            name: userInfo.name,
            surname: userInfo.surname,
            email: userInfo.email,
            phone: userInfo.phone,
            city: userInfo.city,
            region: userInfo.region,
            institution_type: userInfo.institution_type == "" ? null : userInfo.institution_type,
            institution_name: userInfo.institution_name,
            institution_course: userInfo.institution_course,
            institution_faculty: userInfo.institution_faculty,
            permission: userPermission,
        };

        if (browser) {
            if (real_id == userInfo.id) {
                let profile_request = await fetch(`${API}/users/current/profile`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    },
                    body: JSON.stringify(update),
                });
                let profile_request_data = await profile_request.json();
                if (profile_request.ok) {
                    printMsg("Your profile has been updated successfully", "success",  alertCont);
                    window.location.reload();
                } else {
                    printMsg(handleErrorMsg(profile_request_data), "error", alertCont);
                }
            } else {
                update.permission = userPermission;
                let info_put_request = await fetch(`${API}/users/${userInfo.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    },
                    body: JSON.stringify(update),
                });

                let info_respond = await info_put_request.json();

                if (info_put_request.ok) {
                    printMsg("User info has been updated successfully", "success",  alertCont);
                    window.location.reload();
                } else {
                    printMsg(handleErrorMsg(info_respond), "error",  alertCont);
                }
            }
        }
    }

    async function unlink(socailID: string) {
        if (real_id != userInfo.id) {
            alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong> You can't unlink social networks from other users! </strong>
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>`;
            return;
        }
        let linkedNum = 0;
        let key: keyof SocialIDs;
        for (key in ids) {
            if (ids[key] != null) {
                linkedNum++;
            }
        }

        if (linkedNum == 1) {
            printMsg("You can't unlink all social networks", "error", alertCont);
            return;
        }
        let unlink_request = await fetch(`${API}/users/current/unlink-${socailID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        });

        let unlink_respond = await unlink_request.json();

        if (unlink_request.ok) {
            printMsg(`Your ${socailID} account has been unlinked successfully`, "success", alertCont);
            window.location.reload();
        } else {
            printMsg(handleErrorMsg(unlink_respond), "error", alertCont);
        }
    }

    let access_tk: string | null;
    if (browser) {
        access_tk = localStorage.getItem("access_token");
    }
    async function onTelegramAuth(user: {
        detail: {
            first_name: string;
            last_name: string;
            username: string;
            photo_url: "string";
            id: number;
            auth_date: number;
            hash: string;
        };
    }) {
        // send a post request to the server with the user data
        let data = {
            id: user.detail.id,
            first_name: user.detail.first_name,
            last_name: user.detail.last_name,
            username: user.detail.username,
            photo_url: user.detail.photo_url,
            auth_date: user.detail.auth_date,
            hash: user.detail.hash,
        };
        if (real_id != userInfo.id) {
            printMsg("You can't link social networks fom other users!", "error", alertCont);
            return;
        }

        let link_tele_request = await fetch(`${API}/users/current/link-telegram`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_tk,
            },
            body: JSON.stringify(data),
        });

        let link_tele_respond = await link_tele_request.json();

        if (link_tele_request.ok) {
            printMsg("Your telegram account has been linked successfully", "success", alertCont);
            window.location.reload();
            return;
        } else {
            printMsg(handleErrorMsg(link_tele_respond), "error", alertCont);
        }
    }

    // TODO: move this to types file
    interface googleRespond {
        clientId: string;
        credential: string;
    }

    async function handleCredentialResponse(response: googleRespond) {
        let credential = response.credential;
        if (real_id != userInfo.id) {
            alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong> You can't link social networks fom other users! </strong>
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>`;
            return;
        }
        let data = {
            id_token: credential,
        };
        let link_google_request = await fetch(`${API}/users/current/link-google`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_tk,
            },
            body: JSON.stringify(data),
        });

        let link_google_respond = await link_google_request.json();

        if (link_google_request.ok) {
            printMsg("Your google account has been linked successfully", "success", alertCont);
            window.location.reload();
            return;
        } else {
            printMsg(handleErrorMsg(link_google_respond), "error", alertCont);
        }
    }
</script>

<svelte:head>
    <meta name="description" content="Some description!" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <title>App Name | {userInfo.name} {userInfo.surname}</title>
    <script async defer src="https://vk.com/js/api/openapi.js" type="text/javascript" charset="windows-1251"></script>
</svelte:head>

<section class="user-info">
    <img class="d1" src={dotsSrc} alt="" />
    <div class="d2" />
    <nav class="navbar navbar-light sticky-top shadow">
        <div class="navbar-brand d-flex col align-items-center">
            <span class="fa fa-gears ms-3 me-3" />
            <h4 class="p-0 m-0">Settings</h4>
        </div>
    </nav>
    <div class="container d-flex justify-content-center mt-5">
        <div class="row p-0 m-0 col-12 justify-content-center">
            <div class="card shadow col-lg-6">
                <h5 class="card-title m-4 mt-4">
                    <i class="fa fa-info-circle" />
                    Basic Information
                </h5>
                <div class="card-body ms-4">
                    <!--Name-->
                    <label for="name">Full Name</label>
                    <div class="form-group d-flex gap-3 col-md-11">
                        <input type="text" class="form-control" id="name" placeholder="Enter first name" bind:value={userInfo.name} />
                        <input type="text" class="form-control" id="name" placeholder="Enter last name" bind:value={userInfo.surname} />
                    </div>
                    <div class="form-group col-md-11">
                        <label for="Email Address">Email address</label>
                        <input type="email" class="form-control" id="Email Address" aria-describedby="emailHelp" placeholder="Enter email" bind:value={userInfo.email} />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="Email Address">User ID</label>
                        <input type="email" class="form-control" id="Email Address" aria-describedby="emailHelp" placeholder="Enter email" bind:value={id} disabled />
                        <small id="emailHelp" class="form-text text-muted">You won't be able to change this Id!</small>
                    </div>
                    <!--Phone Number-->
                    <div class="form-group col-md-11">
                        <label for="phoneNumber">Phone Number</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend ">
                                <span class="input-group-text rounded-0 bg-white" id="basic-addon3"><img src={russianFlag} alt="The Russian flag" class="flag" /> </span>
                            </div>
                            <input type="text" class="form-control" id="phoneNumber" placeholder="Enter phone number" bind:value={userInfo.phone} data-mask="+7" />
                        </div>
                    </div>
                </div>
                <h5 class="card-title m-4 mt-0">
                    <i class="fa fa-map-marker" />
                    Address
                </h5>
                <div class="card-body ms-4">
                    <div class="form-group col-md-11">
                        <label for="region">Region</label>
                        <select class="form-select form-select-sm" aria-label="Default select example" bind:value={userInfo.region}>
                            <option selected>Choose...</option>
                            {#each republics as republic}
                                <option>{republic}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="city">City</label>
                        <input type="text" class="form-control" id="city" placeholder="Enter city" bind:value={userInfo.city} />
                    </div>
                </div>
                <h5 class="card-title m-4 mt-0">
                    <i class="fa fa-book" />
                    Education
                </h5>
                <div class="card-body ms-4">
                    <div class="form-group col-md-11">
                        <label for="education">Education type</label>
                        <select class="form-select form-select-sm" aria-label="Default select example" bind:value={educationType}>
                            <option selected>Choose...</option>
                            <option>School</option>
                            <option>University</option>
                            <option>College</option>
                        </select>
                    </div>
                    {#if educationType === "School"}
                        <div class="d-flex col-md-11">
                            <div class="form-group col-md-11 justify-content-between">
                                <div class="row col-md-11 m-0 justify-content-between">
                                    <div class="form-group p-0 col-md-7">
                                        <label for="school">School Name</label>
                                        <input bind:value={instName} type="text" class="form-control" id="school" placeholder="Enter your school name" />
                                    </div>
                                    <!--School Year-->
                                    <div class="form-group p-0 col-md-4">
                                        <label for="schoolYear">School Year</label>
                                        <select bind:value={instYear} class="form-select form-select" aria-label="Default select example">
                                            <option selected>Choose...</option>
                                            {#each Array(11) as _, i}
                                                <option>{i + 1}</option>
                                            {/each}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                    {#if educationType === "University"}
                        <div class=" d-flex col-md-11 justify-content-between p-0">
                            <div class="row">
                                <div class="form-group col-md-8">
                                    <label for="Institute">Institute Name</label>
                                    <input bind:value={instName} type="text" class="form-control" id="Institute" placeholder="Enter your Institute name" />
                                </div>
                                <div class="form-group col-md-8">
                                    <label for="Institute">Faculty/Institute</label>
                                    <input bind:value={instFacultyName} type="text" class="form-control" id="Institute" placeholder="Enter your Institute name" />
                                </div>
                                <!--Institute  Year-->
                                <div class="form-group col-md-4">
                                    <label for="Institute Year">Institute Year</label>
                                    <select bind:value={instYear} class="form-select" aria-label="select">
                                        <option selected>Choose...</option>
                                        {#each instituteYear as grade}
                                            <option>{grade}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                    {/if}
                    {#if educationType == "College"}
                        <div class=" d-flex col-md-11 justify-content-between p-0">
                            <div class="row">
                                <div class="form-group col-md-8">
                                    <label for="Institute">College name</label>
                                    <input bind:value={instName} type="text" class="form-control" id="Institute" placeholder="Enter your Institute name" />
                                </div>
                                <div class="form-group col-md-8">
                                    <label for="Institute">Direction (specialty)</label>
                                    <input bind:value={instFacultyName} type="text" class="form-control" id="Institute" placeholder="Enter your Institute name" />
                                </div>
                                <!--Institute  Year-->
                                <div class="form-group col-md-4">
                                    <label for="Institute Year">College Year</label>
                                    <select bind:value={instYear} class="form-select" aria-label="select">
                                        <option selected>Choose...</option>
                                        {#each collegeYear as grade}
                                            <option>{grade}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
                {#if real_id != userInfo.id}
                    <h5 class="card-title m-4 mt-2">
                        <i class="fa-solid fa-lock" />
                        Permission
                    </h5>
                    <div class="card-body ms-4 mt-0">
                        <label for="region">Permission</label>
                        <select class="form-select form-select-sm" aria-label="Default select example" bind:value={userPermission}>
                            <option selected>Choose...</option>
                            {#each permissionsArr as per}
                                <option>{per}</option>
                            {/each}
                        </select>
                    </div>
                {/if}
                <h5 class="card-title m-4 mt-0 me-0 pe-0">
                    <i class="fa-solid fa-share-nodes" />
                    Social Media
                </h5>
                <div class="card-body pt-0 mt-0 d-flex justify-content-center align-items-center">
                    <div class="btn-group gap-2 form-group col-md-11">
                        <button class="btn social btn-sm mt-2 mb-2 p-2" bind:this={googleBtnHolder}>
                            <i class="fa fa-google me-3" />
                            {#if ids.google == null}
                                <span class="me-2"> Link your Google </span>
                                <div bind:this={google} class="googleBtnHolder" />
                            {:else}
                                <span class="me-2" on:click={() => unlink("google")}> Unlink your Google </span>
                            {/if}
                        </button>
                        <button class="btn social btn-sm mt-2 mb-2 p-2" bind:this={VKBtnHolder}>
                            <i class="fa fa-vk me-3" />
                            {#if ids.vk == null}
                                <span class="me-2"> Link your VK </span>
                                <div id="vk_auth" class="vkHolder" />
                            {:else}
                                <span class="me-2" on:click={() => unlink("vkontakte")}> Unlink your VK </span>
                            {/if}
                        </button>
                        <button class="btn social btn-sm mt-2 mb-2 p-2" bind:this={TeleBtnHolder}>
                            <i class="fa fa-telegram me-3" />
                            {#if ids.tele == null}
                                <div class="telegramBtnHolder">
                                    <Login username={telgramBotId} on:auth={onTelegramAuth} />
                                </div>
                                <span class="me-2"> Link your Telegram </span>
                            {:else}
                                <span class="me-2" on:click={() => unlink("telegram")}> Unlink your Telegram </span>
                            {/if}
                        </button>
                    </div>
                </div>
                <!-- Save button -->
                <div class="form-group col-md-11 m-4 mt-0">
                    <button on:click={updateUserInfo} class="btn btn-lg btn-primary mt-2 mb-2">
                        <i class="fa fa-save" />
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="alertCont" bind:this={alertCont} />
</section>

<div class="loading" bind:this={loading}>
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>

<style lang="scss">
    @import "../../../lib/Assets/common.scss";

    .user-info {
        min-height: 100vh;
        background-color: $bg-color;
        @include bg;
        padding-bottom: 30px;
        nav {
            font-family: "Medium";
            margin-bottom: 20px;
            z-index: 10;
            background-color: white;
        }
        .card {
            font-family: "Medium";
            .card-title {
                font-size: 1.5rem;
                font-weight: bold;
                margin: 10px 0;
            }
            .flag {
                width: 25px;
                margin: 2px;
            }
            input,
            select {
                border-radius: 0;
                border: 0px;
                border-bottom: 2px solid $secondary-color;
                margin-bottom: 20px;
                font-family: "Light", sans-serif;
                font-size: 15px;
                &:focus {
                    border-bottom: 2px solid $primary-color !important;
                    outline: none;
                    box-shadow: none;
                    #basic-addon3 {
                        background-color: $primary-color;
                    }
                }
            }

            small#emailHelp {
                display: block;
                margin-top: -20px;
                margin-bottom: 20px;
            }

            #basic-addon3 {
                border-radius: 0;
                border: 0px;
            }
        }
    }
    .social {
        margin: 10px 0px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: left;
        align-items: center;
        overflow: hidden;
        position: relative;
    }
    .fa-google {
        background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        font-size: 20px;
    }
    .alertCont {
        position: fixed;
        bottom: 30px;
        left: 30px;
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
    .googleBtnHolder,
    .telegramBtnHolder {
        position: absolute;
        width: calc(100% + 20px) !important;
        height: 100% !important;
        margin-left: -20px;
        transform: scale(10);
        opacity: 0.02;
        z-index: 100;
        margin-top: 70px !important;
    }
    .vkHolder {
        margin-top: -370px;
        margin-left: 30px;
        position: absolute;
        transform: scale(4);
        opacity: 0.01;
    }
</style>
