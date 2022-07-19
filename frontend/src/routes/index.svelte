<script lang="ts">
    import Footer from "$lib/Footer/Footer.svelte";
    import logoSrc from "$lib/Assets/imgs/logo.png";   
    import dotsSrc from "$lib/Assets/imgs/dots.png";
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Some description!">
    <title> App Name | Signup </title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
</svelte:head>

<section class="signup">
	<img class="d1" src={dotsSrc} alt="">
    <div class="d1"></div>
	<div class="d2"></div>
    <div class="signup-form">
        <img src= {logoSrc} alt="logo" class="logo" />
        <p> Please sign up to continue </p>
        <div class="btn-group-vertical col-12">
            <button class="btn btn-lg btn-block btn-outline">
                <i class="fa fa-google"></i>
                <span> Sign up with Google </span> 
                <i class="fa fa-arrow-right"></i>
            </button>
            <button class="btn btn-lg btn-block btn-outline"> 
                <i class="fa fa-vk"></i>
                <span> Sign up with VK </span> 
                <i class="fa fa-arrow-right"></i>
            </button>
            <button class="btn btn-lg btn-block btn-outline"> 
                <i class="fa fa-telegram"></i>
                <span> Sign up with Telegram </span> 
                <i class="fa fa-arrow-right"></i>
            </button>
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
        .d1 {
			width: clamp(400px, 50vw, 800px);
			position: fixed;
			top: 50px;
			right: -100px;
			z-index: 0;
            opacity: 0.2;
        }
		.d2 {
			width: 800px;
			height: 800px;
			background-color: $primary-color;
			position: fixed;
			bottom: -200px;
			left: -200px;
			z-index: 0;
			border-radius: 50%;
			transform: rotate(-45deg);
            opacity: 0.1;
        }

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

    @media screen and (max-width: 450px){
        .signup-form{
            width: 100vw !important;
            border-radius: 0px !important;
        }
    }
</style>
