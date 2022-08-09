<script context="module" lang="ts">
	import { parsePayload } from '$lib/parse';
	import { browser } from '$app/env'; 

	// @ts-ignore
	export async function load({ params }) {
		if(browser){
			let id = params.info;
			// @ts-ignore
			let token = localStorage.getItem("access_token");
			if(token != null){
				let payload = parsePayload(token);
				let real_id = payload.user_id;
				// if the user is not the same as the participant, redirect to the home page
				if(real_id != id){
					return {
                    status: 300,
                    redirect: '/'
                };
				}

				let userInfo = await fetch(`http://localhost:8000/users/current/profile`, {
					method: 'GET',
					headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
				})
                .then(res => {
                    let userData = res.json();
                    return userData;
                })

				return {
					props: {
						userInfo,
					}
				}
			} else {
                return {
                    status: 300,
                    redirect: '/'
                };
			}
		}
	}
</script>

<script lang="ts">
    import dotsSrc from "$lib/Assets/imgs/dots.png";
    import russianFlag from '$lib/Assets/imgs/russian-flag.png';
    import { republics } from '$lib/Assets/republics.json';
    import type {UserData}  from '$lib/types'
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Login } from 'sveltegram';
    import { sessionDuration } from '$lib/sessionDuration';
    sessionDuration();

    $: educationType = "Choose ...";
    $: instName = "";
    $: instYear = "";
    let alertCont = '' as unknown as HTMLElement;

    interface SocialIDs{
        google: null|string,
        tele: null|string,
        vk: null|string
    }
    let ids : SocialIDs= {
        google: null,
        tele: null,
        vk: null
    }
    export let userInfo: UserData = {
        id: 0,
        name: "",
        surname: "",
        email: "",
        phone: "",
        city: "",
        region: "",
        institution_type: 0,
        institution_name: "",
        institution_faculty: "",
        institution_course: "",
        vkontakte_id: "",
        google_id: "",
        telegram_id: "",
        patronymic: '',
        permission: 0
    };
    
    let id = userInfo.id;
    let google = '' as unknown as HTMLElement;

    onMount(() => {
        if(userInfo.institution_type == 0){
            educationType = "School";
            instName = userInfo.institution_name;
            instYear = userInfo.institution_course;
        } else if(userInfo.institution_type == 2){
            educationType = "University";
            instName = userInfo.institution_name;
            instYear = userInfo.institution_course;
        } 

        ids.google = userInfo.google_id;
        ids.tele = userInfo.telegram_id;
        ids.vk = userInfo.vkontakte_id;

        if(browser){
            // @ts-ignore
            window.google.accounts.id.initialize({
                client_id: "868612228164-4rrjlhpktkg005qd25qp0f5sa55fuu5j.apps.googleusercontent.com",
                callback: handleCredentialResponse,
            });
            // @ts-ignore
            window.google.accounts.id.renderButton(google, {});
            // @ts-ignore  
            VK.init({
                apiId: 51395235
            });
            // @ts-ignore  
            VK.Widgets.Auth('vk_auth', {
                onAuth: async function(data:{uid:string, hash:string, first_name:string, last_name:string}) {
                    let uid = data.uid;
                    let hash = data.hash;
                    let fn = data.first_name;
                    let ln = data.last_name;
                    let authData = {
                        "uid": uid,
                        "first_name": fn,
                        "last_name": ln,
                        "hash": hash
                    }
                    await fetch('http://127.0.0.1:8000/users/current/link-vkontakte',{
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + access_tk
                        },
                        body: JSON.stringify(authData)
                    }).then(res => {
                        res.json().then(res => {
                                    let status = res.details;
                                    if(status === "Success"){
                                        userInfo.telegram_id = "";
                                        alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                            <strong> Success! </strong>
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>`;
                                        // Reload
                                        window.location.reload();
                                    } else {
                                        alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                                <strong> VK account already exists! </strong>
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>`;
                                    }
                                });
                    }).catch(err => {
                        alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                <strong> VK account should be unique! </strong>
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>`;
                    });
                }
            }); 
        }
    });
    let InstituteYear = [
        "1 (bachelor / specialty)",
        "2 (bachelor / specialty)",
        "3 (bachelor / specialty)",
        "4 (bachelor / specialty)",
        "5 (specialty)",
        "6 (specialty)",
        "1 (master)",
        "2 (master)",
    ]
    async function updateUserInfo(){
        userInfo.institution_type = (educationType == "School") ? 0 : 2;
        userInfo.institution_name = instName;
        userInfo.institution_course = instYear;

        const phoneValidation = /^\+7[0-9]{10}/;
        if (!phoneValidation.test(userInfo.phone)){
            alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong> Invalid phone number format! </strong> Please, enter your phone number in the format +7XXXXXXXXXX
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            return;
        }
        alertCont.innerHTML = '';
        let update = {
            name: userInfo.name,
            surname: userInfo.surname,
            email: userInfo.email,
            phone: userInfo.phone,
            city: userInfo.city,
            region: userInfo.region,
            institution_type: userInfo.institution_type,
            institution_name: userInfo.institution_name,
            institution_course: userInfo.institution_course,
        }
        // TODO: make a server request to update user info
        if(browser){
            let updateReq = await fetch(`http://localhost:8000/users/current/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
                },
                body: JSON.stringify(update)
            })
            .then(res => res.json().then(res => {
                if(res.detail[0].msg === "value is not a valid email address"){
                    alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong> Invalid email address! </strong> Please, try again with valid email address!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                    return;
                }
            })).catch(()=>{
                alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong> Email address already exists! </strong> Please, try again with unique email address!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                return;
            })
            alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong> Success! </strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
            return;
        }
    }

    async function unlink(socailID: string){
        let linkedNum = 0;
        for (let key in ids){
            //@ts-ignore
            if(ids[key] != null){
                linkedNum++;
            }
        }
        if(linkedNum == 1){
            alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong> You can't unlink all social networks! </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            return;
        }
        alertCont.innerHTML="";
        await fetch (`http://localhost:8000/users/current/unlink-${socailID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            }
        }).then(res => {
                res.json().then(res => {
                            let status = res.details;
                            if(status === "Success"){
                                userInfo.google_id = "";
                                alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong> Success! </strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
                                // Reload
                                window.location.reload();
                            } else {
                                alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong> Google account already exists! </strong>
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                            }
                        });
                    })
    }
    let access_tk : string|null;
    if(browser){
        access_tk = localStorage.getItem("access_token");
    }
    async function onTelegramAuth (user: {detail: {first_name: string, last_name: string ,username: string, photo_url: "string",id: number, auth_date: number, hash: string}}) {
        // send a post request to the server with the user data
        let data = {
            "id": user.detail.id,
            "first_name": user.detail.first_name,
            "last_name": user.detail.last_name,
            "username": user.detail.username,
            "photo_url": user.detail.photo_url,
            "auth_date": user.detail.auth_date,
            "hash": user.detail.hash
        };
        await fetch('http://localhost:8000/users/current/link-telegram', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_tk
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(res => {
                        let status = res.details;
                        if(status === "Success"){
                            userInfo.telegram_id = "";
                            alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong> Success! </strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
                            // Reload
                            window.location.reload();
                        } else {
                            alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong> Telegram account already exists! </strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
                        }
                    });
        }).catch(err => {
            alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong> Telegram account should be unique! </strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        });
    }

    interface googleRespond {
        clientId: string,
        credential: string
    };   

    async function handleCredentialResponse(response: googleRespond) {
        let credential = response.credential;
        
        let data = {
            "id_token": credential
        }
        await fetch('http://127.0.0.1:8000/users/current/link-google', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_tk
            },
            body: JSON.stringify(data)
        }).then(res => {
                res.json().then(res => {
                            let status = res.details;
                            if(status === "Success"){
                                userInfo.google_id = "";
                                alertCont.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong> Success! </strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
                                window.location.reload();
                            } else {
                                alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong> Google account already exists! </strong>
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`;
                            }
                        });
            }).catch(err => {
                alertCont.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong> Google account should be unique! </strong>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`;
            });
    }
</script>

<svelte:head>
    <meta name="description" content="Some description!">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="http://userapi.com/js/api/openapi.js" type="text/javascript" charset="windows-1251"></script>
    <title> App Name | {userInfo.name} {userInfo.surname} </title>
</svelte:head>

<section class="user-info">
    <img class="d1" src={dotsSrc} alt="">
	<div class="d2"></div>
    <nav class="navbar navbar-light sticky-top shadow" >
        <div class="navbar-brand d-flex col align-items-center">
            <span class="fa fa-gears ms-3 me-3"></span>
            <h4 class="p-0 m-0"> Settings </h4>
        </div>
    </nav>
    <div class="container d-flex justify-content-center mt-5">
        <div class="row p-0 m-0 col-12 justify-content-center">
            <div class="card shadow col-lg-6">
                <h5 class="card-title m-4 mt-4">
                    <i class="fa fa-info-circle"></i>
                    Basic Information
                </h5>
                <div class="card-body ms-4">
                    <!--Name-->
                    <label for="name">Full Name</label>
                    <div class="form-group d-flex gap-3 col-md-11">
                        <input type="text" class="form-control" id="name" placeholder="Enter first name" bind:value={userInfo.name}>
                        <input type="text" class="form-control" id="name" placeholder="Enter last name" bind:value={userInfo.surname}>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="Email Address">Email address</label>
                        <input type="email" class="form-control" id="Email Address" aria-describedby="emailHelp" placeholder="Enter email" bind:value={userInfo.email}>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="Email Address">User ID</label>
                        <input type="email" class="form-control" id="Email Address" aria-describedby="emailHelp" placeholder="Enter email" bind:value={id} disabled>
                        <small id="emailHelp" class="form-text text-muted">You won't be able to change this Id!</small>
                    </div>
                    <!--Phone Number-->
                    <div class="form-group col-md-11">
                        <label for="phoneNumber">Phone Number</label>
                        <div class="input-group mb-3">
                        <div class="input-group-prepend ">
                            <span class="input-group-text rounded-0 bg-white" id="basic-addon3"><img src={russianFlag} alt="The Russian flag" class="flag"/> </span>
                        </div>
                        <input type="text" class="form-control" id="phoneNumber" placeholder="Enter phone number" bind:value={userInfo.phone}>
                        </div>
                    </div>
                </div>
                <h5 class="card-title m-4 mt-0">
                    <i class="fa fa-map-marker"></i>
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
                        <input type="text" class="form-control" id="city" placeholder="Enter city" bind:value={userInfo.city}>
                    </div>
                </div>
                <h5 class="card-title m-4 mt-0">
                    <i class="fa fa-book"></i>
                    Education
                </h5>
                <div class="card-body ms-4">
                    <div class="form-group col-md-11">
                        <label for="education">Education type</label>
                        <select class="form-select form-select-sm" aria-label="Default select example" bind:value={educationType}>
                            <option selected>Choose...</option>
                            <option>School</option>
                            <option>University</option>
                        </select>
                    </div>
                    {#if educationType === 'School'}
                        <div class="d-flex col-md-11">
                            <div class="form-group col-md-11 justify-content-between">
                                <div class="row col-md-11 m-0 justify-content-between">
                                    <div class="form-group p-0 col-md-7">
                                        <label for="school">School Name</label>
                                        <input bind:value={instName} type="text" class="form-control" id="school" placeholder="Enter your school name">
                                    </div>
                                    <!--School Year-->
                                    <div class="form-group p-0 col-md-4">
                                        <label for="schoolYear">School Year</label>
                                        <select bind:value={instYear}  class="form-select form-select" aria-label="Default select example">
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
                    {#if educationType === 'University'}
                        <div class=" d-flex col-md-11 justify-content-between p-0">
                            <div class="row">
                                <div class="form-group col-md-8">
                                    <label for="Institute">Institute Name</label>
                                    <input bind:value={instName}  type="text" class="form-control" id="Institute" placeholder="Enter your Institute name">
                                </div>
                                <!--Institute  Year-->
                                <div class="form-group col-md-4">
                                    <label for="Institute Year">Institute Year</label>
                                    <select bind:value={instYear}  class="form-select form-select" aria-label="Default select example">
                                        <option selected>Choose...</option>
                                        {#each InstituteYear as grade}
                                        <option>{grade}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
                <h5 class="card-title m-4 mt-0 me-0 pe-0">
                    <i class='fa-solid fa-share-nodes'></i> 
                    Social Media
                </h5>
                <div class="card-body pt-0 mt-0 d-flex justify-content-center align-items-center">
                    <div class="btn-group gap-2 form-group col-md-11">
                        <button class="btn social btn-sm mt-2 mb-2 p-2">
                            <i class='fa fa-google me-3'></i>
                            {#if ids.google == null}
                            <span class="me-2"> Link your Google </span>
                            <div bind:this={google} class="googleBtnHolder"></div>
                            {:else}
                            <span class="me-2" on:click={()=>unlink("google")}> Unlink your Google </span>
                            {/if}
                        </button>
                        <button class="btn social btn-sm mt-2 mb-2 p-2">
                            <i class='fa fa-vk me-3'></i>
                            {#if ids.vk == null}
                            <span class="me-2"> Link your VK </span>
                            <div id="vk_auth" class="vkHolder"></div>
                            {:else}
                            <span class="me-2" on:click={()=>unlink("vkontakte")}> Unlink your VK </span>
                            {/if}
                        </button>
                        <button class="btn social btn-sm mt-2 mb-2 p-2">
                            <i class='fa fa-telegram me-3'></i>
                            {#if ids.tele == null}
                            <div class="telegramBtnHolder">
                                <Login username="zeyaddevbot" on:auth={onTelegramAuth}/>
                            </div>
                            <span class="me-2"> Link your Telegram </span>
                            {:else}
                            <span class="me-2" on:click={()=>unlink("telegram")}> Unlink your Telegram </span>
                            {/if}
                        </button>
                    </div>
                </div>
                <!-- Save button -->
                <div class="form-group col-md-11 m-4 mt-0">
                    <button on:click={updateUserInfo} class="btn btn-lg btn-primary mt-2 mb-2">
                        <i class="fa fa-save"></i>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="alertCont" bind:this={alertCont}></div>
</section>

<style lang="scss">
    @import '../../lib/Assets/common.scss';

    .user-info {
        min-height: 100vh;
        background-color: $bg-color;
        @include bg;
        padding-bottom: 30px;
        nav {
            font-family: "Medium";
            margin-bottom: 20px;
            background-color: white; 
        }
        .card{
            font-family: "Medium";
            .card-title{
                font-size: 1.5rem;
                font-weight: bold;
                margin: 10px 0;
            }
            .flag{
                width: 25px;
                margin: 2px;
            }
            input, select{
                border-radius: 0;
                border: 0px;
                border-bottom: 2px solid $secondary-color;
                margin-bottom: 20px;
                font-family: "Light", sans-serif;
                font-size: 15px;
                &:focus{
                    border-bottom: 2px solid $primary-color !important;
                    outline: none;
                    box-shadow: none;
                    #basic-addon3{
                        background-color: $primary-color;
                    }
                }
            }

            small#emailHelp{
                display: block;
                margin-top: -20px;
                margin-bottom: 20px;
            }
            
            #basic-addon3{
                border-radius: 0;
                border: 0px;
            }
        }
    }
    .social{
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
    .fa-google{
        background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        font-size: 20px;
    }
	.alertCont{
		position: fixed;
		bottom: 30px;
		left: 30px;
	}
    .fa-vk{
        background: conic-gradient(from -45deg, #45668e 110deg, #4a76a8 90deg 180deg, #4a76a8 180deg 270deg, #4a76a8 270deg) 73% 55%/150% 150% no-repeat;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        font-size: 20px;
    }
    .fa-telegram{
        background: conic-gradient(from -45deg, #0088cc 110deg, #0088cc 90deg 180deg, #0088cc 180deg 270deg, #0088cc 270deg) 73% 55%/150% 150% no-repeat;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        font-size: 20px;
    }
    .googleBtnHolder, .telegramBtnHolder{
        position: absolute;
        width: calc(100% + 20px) !important;
        height: 100% !important;
        margin-left: -20px;
        opacity: 1;
        scale: 20;
        opacity: 0.00000001;
        z-index: 20;
    }
    .vkHolder {
        margin-top: -300px;
        margin-left: 30px;
        position: absolute;
        scale: 5;
        opacity: 0.000001;
    }
</style>