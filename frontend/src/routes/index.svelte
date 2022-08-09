<script lang="ts">
    import logoSrc from "$lib/Assets/imgs/logo.png";   
    import dotsSrc from "$lib/Assets/imgs/dots.png";
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { browser } from '$app/env';
    import { onMount } from "svelte";
    import { Login } from 'sveltegram';
    import { parsePayload } from '$lib/parse';
    
    let google = '' as unknown as HTMLElement;

    function redirct(per: number, user_id: string) {
        if(per == 0 || per == 1){
            goto(`${base}/participant/${user_id}`);
        } else {
            goto(`${base}/admin/${user_id}`);
        }
    }
    onMount(() => {
        if(browser){

            // Access token exists and not expired
            let token = localStorage.getItem('access_token');
            let exp = localStorage.getItem('expires_in');
            if( token != null && exp != null){
                // @ts-ignore
                let date = new Date(parseInt(localStorage.getItem('expires_in'))*1000);
                let now = new Date();
                if(now < date){
                    let payload = parsePayload(localStorage.getItem('access_token')!);
                    let per = payload.permission;
                    let id = payload.user_id;
                    redirct(per, id);
                } else {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('expires_in');
                }
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
                await fetch('http://127.0.0.1:8000/auth/signin-google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    res.json().then(res => {
                        let expiresIn = res.expires_in;
                        let token = res.access_token;
                        localStorage.setItem('access_token', token);
                        localStorage.setItem('expires_in', expiresIn);
                        let per = parsePayload(localStorage.getItem('access_token')!).permission;  
                        let id = parsePayload(localStorage.getItem('access_token')!).user_id;
                        redirct(per, id);
                    });
                });
            }

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
                    await fetch('http://127.0.0.1:8000/auth/signin-vkontakte',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(authData)
                    }).then(res => {
                        res.json().then(res => {
                            let expiresIn = res.expires_in;
                            let token = res.access_token;
                            localStorage.setItem('access_token', token);
                            localStorage.setItem('expires_in', expiresIn);
                            let per = parsePayload(localStorage.getItem('access_token')!).permission;  
                            let id = parsePayload(localStorage.getItem('access_token')!).user_id;
                            redirct(per, id);
                        });
                });
                }
            }); 
        }
    });
    function onTelegramAuth (user: {detail: {first_name: string, last_name: string ,username: string, photo_url: "string",id: number, auth_date: number, hash: string}}) {
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
        console.log(data);
        fetch('http://localhost:8000/auth/signin-telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(res => {
                        let expiresIn = res.expires_in;
                        let token = res.access_token;
                        localStorage.setItem('access_token', token);
                        localStorage.setItem('expires_in', expiresIn);
                        let per = parsePayload(localStorage.getItem('access_token')!).permission;  
                        let id = parsePayload(localStorage.getItem('access_token')!).user_id;
                        redirct(per, id);
                    });
        }).catch(err => {
            console.log(err);
        });
    }

</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Some description!">
    <title> App Name | Signup </title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="http://userapi.com/js/api/openapi.js" type="text/javascript" charset="windows-1251"></script>
</svelte:head>

<section class="signup">
	<img class="d1" src={dotsSrc} alt="">
	<div class="d2"></div>
    <div class="signup-form">
        <img src= {logoSrc} alt="logo" class="logo" />
        <p> Please sign up to continue </p>
        <div class="btn-group-vertical col-12">
            <button class="btn btn-lg btn-block btn-outline">
                <i class="fa fa-google"></i>
                <span> Sign up with Google </span> 
                <i class="fa fa-arrow-right"></i>
                <div bind:this={google} class="googleBtnHolder"></div>
            </button>
            
            <button class="btn btn-lg btn-block btn-outline"> 
                <i class="fa fa-vk"></i>
                <span> Sign up with VK </span> 
                <i class="fa fa-arrow-right"></i>
                <div id="vk_auth" class="vkHolder"></div>
            </button>
            <div class="btn btn-lg btn-block btn-outline"> 
                <i class="fa fa-telegram"></i>
                <span> Sign up with Telegram </span> 
                <i class="fa fa-arrow-right"></i>
                <div class="telegramBtnHolder">
                    <Login username="zeyaddevbot" on:auth={onTelegramAuth}/>
                </div>
            </div>
        </div>
	</div>
    
</section>

<style lang="scss">
    @import "../lib/Assets/common.scss";

    .signup{
        width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 40px;
		font-size: 18px;
		background-image: linear-gradient(to bottom right, $primary-color, $secondary-color);;
        
        @include bg;

        .signup-form {
			border: 1px solid rgba(0, 0, 0, 0.1);
			background-color: white;
			padding: 50px;
			border-radius: 5px;
			z-index: 2;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
            .logo{
                width: 100px;
                height: auto;
                display: block;
            }
            p{
                text-align: left;
                font-family: 'light';
                font-size: 13px;
                opacity: 0.9;
                letter-spacing: 2px;
            }
            .btn{
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

                .fa-google{
                    background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    font-size: 20px;
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
                
                span{
                    margin-left: 20px;
                    font-family: 'light';
                    font-size: 16px;
                    opacity: 0.9;
                    letter-spacing: 2px;
                }

                .fa-arrow-right{
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

                &:hover{
                    background-color: #ebeef7;
                    border-color: $secondary-color;
                    .fa-arrow-right{
                        margin-right: -10px;
                        visibility: visible;
                    }
                }
            }
		}
    }

    .googleBtnHolder, .telegramBtnHolder{
        position: absolute;
        width: calc(100% + 20px) !important;
        height: 100% !important;
        margin-left: -20px;
        opacity: 1;
        scale: 1;
        opacity: 0.000001;
        z-index: 20;
    }
    .vkHolder {
        margin-top: -180px;
        margin-left: 50px;
        position: absolute;
        scale: 2;
        opacity: 0.000001;
    }
    @media screen and (max-width: 450px){
        .signup-form{
            width: 100vw !important;
            border-radius: 0px !important;
        }
    }
</style>
