<script lang="ts">
    import dotsSrc from "$lib/Assets/imgs/dots.png";
    import russianFlag from '$lib/Assets/imgs/russian-flag.png';
    import { republics } from '$lib/Assets/republics.json';
    let educationType : string;

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
</script>

<svelte:head>
    <meta name="description" content="Some description!">
    <title> App Name | participant Name </title>
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
                    <div class="form-group col-md-11">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter name">
                    </div>
                    <div class="form-group col-md-11">
                        <label for="Email Address">Email address</label>
                        <input type="email" class="form-control" id="Email Address" aria-describedby="emailHelp" placeholder="Enter email" disabled>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <!--Phone Number-->
                    <div class="form-group col-md-11">
                        <label for="phoneNumber">Phone Number</label>
                        <div class="input-group mb-3">
                        <div class="input-group-prepend ">
                            <span class="input-group-text rounded-0 bg-white" id="basic-addon3"><img src={russianFlag} alt="The Russian flag" class="flag"/> </span>
                        </div>
                        <input type="text" class="form-control" id="phoneNumber" placeholder="Enter phone number">
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
                        <select class="form-select form-select-sm" aria-label="Default select example">
                            <option selected>Choose...</option>
                            {#each republics as republic}
                            <option>{republic}</option>
                            {/each}
                        </select>
                    </div>    
                    <div class="form-group col-md-11">
                        <label for="city">City</label>
                        <input type="text" class="form-control" id="city" placeholder="Enter city">
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
                                        <input type="text" class="form-control" id="school" placeholder="Enter your school name">
                                    </div>
                                    <!--School Year-->
                                    <div class="form-group p-0 col-md-4">
                                        <label for="schoolYear">School Year</label>
                                        <select class="form-select form-select" aria-label="Default select example">
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
                                    <input type="text" class="form-control" id="Institute" placeholder="Enter your Institute name">
                                </div>
                                <!--Institute  Year-->
                                <div class="form-group col-md-4">
                                    <label for="Institute Year">Institute Year</label>
                                    <select class="form-select form-select" aria-label="Default select example">
                                        <option selected>Choose...</option>
                                        {#each InstituteYear as grade}
                                        <option>{grade}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                    {/if}
                    <!-- Save button -->
                    <div class="form-group col-md-11">
                        <button type="submit" class="btn btn-lg btn-primary mt-2 mb-2">
                            <i class="fa fa-save"></i>
                            Save
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
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


</style>