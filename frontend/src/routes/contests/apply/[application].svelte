<script lang="ts">
	import { contest }  from '$lib/stores';
	import { onMount } from 'svelte';
	import dotsSrc from '$lib/Assets/imgs/dots.png';
	import type {Draft, Mcq, Form, ContestType }  from '$lib/types'
    
	let contestObject: ContestType = {
		contestID: '',
		writerName: '',
		contestTitle: '',
		description: '',
		start_time: '',
		end_time: '',
        form: {
            longQuestion: [],
            shortQuestion: [],
            mcqs: [],
            uploads: []
        },
	};
    
    let form_data: Form = {
        longQuestion: [],
        shortQuestion: [],
        mcqs: [],
        uploads: []
    };
	
	let ID: String, title : HTMLElement;
    let formContainer = "" as unknown as HTMLElement;
    let alertDiv = "" as unknown as HTMLElement;
	let submitted = true;
    let shortQuestion: string[] = [];
    let longQuestion: string[] = [];
    let mcqs: Mcq[] = [];
    let uploads: string[] = [];
    let email: string = '';
    let remaningTime : HTMLElement = '' as unknown as HTMLElement;
	let now = new Date();
	let end = new Date();
	
    function updateDate(){
        // remainning time in days, hours, minutes, seconds
        let timeDiff = end.getTime() - now.getTime();
        let days = Math.floor(timeDiff / (1000 * 3600 * 24));
        let hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
        let minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
        remaningTime.innerHTML = `${days} days, ${hours} hours, ${minutes} minutes</span>`;
	}
    let getDraft: Draft, draftReady: boolean = false;
	onMount(() => {
		contestObject = JSON.parse($contest) as ContestType;
		ID = contestObject.contestID;
		title.innerHTML = `${contestObject.contestTitle} - Application`;
		
        // remaning time
        end = new Date(contestObject.end_time);
		updateDate();
        
        //form Data
        form_data = contestObject.form;
        longQuestion = form_data.longQuestion;
        shortQuestion = form_data.shortQuestion;
        mcqs = form_data.mcqs;
        uploads = form_data.uploads;

        let temp = localStorage.getItem(`${ID}_draft`);
        if(temp){
            getDraft = JSON.parse(temp);
            draftReady = true;
        }

	});
    
    //validate checkBoxes
    function validateCheckBoxes(){        
        let checkBoxes = formContainer.querySelectorAll('input[type="checkbox"]');
        let textFields = formContainer.querySelectorAll('input[type="text"]');
        let email  = formContainer.querySelector('input[type="email"]');
        let textArea = formContainer.querySelectorAll('textarea');
        let radio = formContainer.querySelectorAll('input[type="radio"]');
        let uploadFields = formContainer.querySelectorAll('input[type="file"]');

        let check = false;
        let allRight = true;
        if(checkBoxes !=    null){
            for(let i=0; i < checkBoxes.length; i++){
                if((checkBoxes[i] as HTMLInputElement).checked){
                    check = true;
                    break;
                }
            }
            if(!check){
                allRight = false;
                return alert("Please fill all the form fields");
            }
        }
        if(textFields != null){
            for(let i=0; i < textFields.length; i++){
                if((textFields[i] as HTMLInputElement).value == ''){
                    allRight = false;
                    break;
                }
            }
        }
        if(textArea != null){
            for(let i=0; i < textArea.length; i++){
                if((textArea[i] as HTMLTextAreaElement).value == ''){
                    allRight = false;
                    break;
                }
            }
        }
        if(email != null){
            if((email as HTMLInputElement).value == ''){
                allRight = false;
            }
        }
        if(radio != null){
            for(let i=0; i < radio.length; i++){
                if((radio[i] as HTMLInputElement).checked){
                    check = true;
                    break;
                }
            }
            if(!check){
                allRight = false;
                return alert("Please fill all the form fields");
            }
        }
        if(uploadFields != null){
            for(let i=0; i < uploadFields.length; i++){
                if((uploadFields[i] as HTMLInputElement).value == ''){
                    allRight = false;
                    break;
                }
            }
        }


        if(allRight){
            return true;
        }
        return alert("Please fill all the form fields");
    }
	

    // update remaning time
	setInterval(() => {
		now = new Date();
		updateDate();
	}, 60000);
    
    // Save ansers as a drafr to localstorage
    function saveDraft(){

        let answers: Draft ={
            email: '',
            longQuestion: [{
                question: '',
                answer: ''
            }],
            shortQuestion: [{
                answer: '',
                question: ''
            }],
            mcqs: [{
                answer: [''],
                question: ''
            }],
        };

        // Email
        answers.email = email;
        //longQuestions;
        answers.longQuestion.pop(); // pop the empty temp
        for(let i=0; i < longQuestion.length; i++){
            answers.longQuestion.push({
                question: longQuestion[i],
                answer: (formContainer.querySelector(`#Ql${i}`)! as HTMLInputElement).value
            });
        }

        //shortQuestions
        answers.shortQuestion.pop(); // pop the empty temp
        for(let i=0; i < shortQuestion.length; i++){
            answers.shortQuestion.push({
                question: shortQuestion[i],
                answer: (formContainer.querySelector(`#Qs${i}`)! as HTMLInputElement).value
            });
        }

        //mcqs
        answers.mcqs.pop(); // pop the empty temp
        for(let i=0; i < mcqs.length; i++){
            let userAns = [];
            for(let d=0; d < mcqs[i].options.length; d++){
                if((formContainer.querySelector(`#formCheck${i}${d}`)! as HTMLInputElement).checked){
                    userAns.push(mcqs[i].options[d]);        
                }
            }
            answers.mcqs.push({
                question: mcqs[i].question,
                answer: userAns
            });
        }
        if(window !== undefined){
            localStorage.setItem(`${ID}_draft`, JSON.stringify(answers));
            alertDiv.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Draft Saved Successfully!</strong> 
                                        ${(contestObject.form.uploads.length > 0)? "Please note: files are not going to be saved!": ""}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`;
        }
    }

    
</script>

<svelte:head>
	<title>App Name | {ID}-form </title>
</svelte:head>

<section class="contestForm">
	<img class="d1" src={dotsSrc} alt="" />
	<div class="d2" />

	<div class="container-fluid d-flex p-0 pt-5 justify-content-center" bind:this={formContainer}>
		<div class="row m-0 p-0 align-self-center">
            <div class="card needs-validation shadow col-12 d-flex align-self-center p-0">
                <nav class="navbar card-header bg-light navbar-light mb-3 align-items-center">
                    <div class="navbar-brand">
                        <h4 class="m-0" bind:this={title}>Title</h4>
                    </div>
                    <button
                        class="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#form_data"
                        aria-controls="form_data"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="fa fa-ellipsis-v" style="font-size: 25px" />
                    </button>
                    <div class="collapse navbar-collapse" id="form_data">
                        <ul class="navbar-nav mr-auto justify-content-end gap-3">
                            <li class="nav-item d-flex align-items-center">
                                <i class="fa fa-hourglass-2 me-1" />
                                <span bind:this={remaningTime}> 00: 00</span>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="form-group align-self-center col-11 justify-content-center">
                    <label for="applicantEmail"> Email </label>
                    {#if draftReady}
                        <input type="email" class="form-control" value={getDraft.email} id="applicantEmail" placeholder="Enter email"/>
                    {:else}
                        <input type="email" class="form-control" bind:value={email} id="applicantEmail" placeholder="Enter email" />
                    {/if}

                </div>
                {#each shortQuestion as s, i}
                    <div class="form-group align-self-center col-11 justify-content-center">
                        <label for="Q{i}">{s}</label>
                        {#if draftReady}
                            <input required type="text" class="form-control" id="Qs{i}" placeholder="Enter Your Answer ..." value={getDraft.shortQuestion[i].answer} />
                        {/if}
                        {#if !draftReady}
                            <input required type="text" class="form-control" id="Qs{i}" placeholder="Enter Your Answer ..."/>
                        {/if}
                    </div>
                {/each}
                
                {#each longQuestion as l, i}
                    <div class="form-group align-self-center col-11 justify-content-center">
                        <label for="Ql{i}">{l}</label>
                        {#if draftReady}
                            <textarea class="form-control" id="Ql{i}" rows="3" placeholder="Enter Your Answer ..." value="{getDraft.longQuestion[i].answer}" required></textarea>
                        {/if}
                        {#if !draftReady}
                            <textarea class="form-control" id="Ql{i}" rows="3" placeholder="Enter Your Answer ..." required></textarea>
                        {/if}
                    </div>
                {/each}
                
                {#each mcqs as m, i}
                    <div class="form-check p-0 justify-content-center align-self-center col-11">
                        {#if m.numberOFAllowedOptions.one > 0}
                            <label for="formCheck{i}">{m.question}</label>
                            {#each m.options as o, d}
                                <fieldset class="form-check" required>
                                    {#if draftReady && getDraft.mcqs[i].answer.includes(o)}
                                        <input type="radio" name="formCheck{m.question}" class="form-check-input" id="formCheck{i}{d}" value="{o}" checked/>
                                    {/if}
                                    {#if !draftReady || !getDraft.mcqs[i].answer.includes(o)}
                                        <input type="radio" name="formCheck{m.question}" class="form-check-input" id="formCheck{i}{d}" value="{o}" />
                                    {/if}
                                    <label class="form-check-label" for="formCheck{i}{o}">
                                        {o}
                                    </label>
                                </fieldset>
                            {/each}
                        {:else}
                            <label for="formCheck{i}">{m.question}</label>
                            {#each m.options as o, d}
                                <fieldset class="form-check">
                                    {#if draftReady && getDraft.mcqs[i].answer.includes(o)}
                                        <input type="checkbox" class="form-check-input" name="formCheck{m.question}" id="formCheck{i}{d}" value="{o}" checked/>
                                    {/if}
                                    {#if !draftReady || !getDraft.mcqs[i].answer.includes(o)}
                                        <input type="checkbox" class="form-check-input" name="formCheck{m.question}" id="formCheck{i}{d}" value="{o}" />
                                    {/if}
                                    <label class="form-check-label" for="formCheck{i}{d}">
                                        {o}
                                    </label>
                                </fieldset>
                            {/each}
                        {/if}
                    </div>
                {/each}

                {#each uploads as u}
                    <div class="form-group justify-content-center align-self-center col-11">
                        <label for="uploads{u}" class="formUpload">{u}</label>
                        <div class="uploadinfo"> 
                            <input type="file" class="form-control-file" id="uploads{u}" required>
                        </div>
                    </div>
                {/each}

                <div class="form-group d-flex gap-3 justify-content-center align-items-center col-11 m-3">
                    <button class="btn btn-primary" on:click={validateCheckBoxes}>Submit</button>
                    <button class="btn btn-primary" on:click={saveDraft}>Save a draft</button>
                    {#if submitted}
                        <button class="btn btn-danger"> Retract  </button>
                    {/if}
                </div>

            </div>
		</div>
	</div>

    <div class="alert" bind:this={alertDiv}></div>
</section>

<style lang="scss">
	@import '../../../lib/Assets/common.scss';

	.contestForm {
		width: 100vw;
		min-height: 100vh;
		align-items: center;
		background-color: $bg-color;
		@include bg;
		position: relative;
		z-index: 1;
    	padding-bottom: 30px;
        nav {
			z-index: 3;
			position: sticky;
			padding: 10px 20px;
			font-family: 'Light';
			font-size: 15px !important;
			background-color: white;
		}
        .card{
            font-family: "Medium";
            input[type="text"],input[type="email"], textarea{
                border-radius: 0;
                border: 0px;
                border-bottom: 2px solid $secondary-color !important;
                margin-bottom: 20px;
                font-family: "Light";
                font-size: 15px;
                &:focus{
                    border-bottom: 2px solid $primary-color !important;
                    outline: none;
                    box-shadow: none;
                }
            }
            
            textarea{
                border: 1px solid rgba(128, 128, 128, 0.205);
            }
            input[type="radio"], input[type="checkbox"]{
                margin-top: 8px;
                margin-left: 0px;
                border-color: $primary-color;

            }
            input[type="radio"]:checked, input[type="checkbox"]:checked{
                background-color: $secondary-color;
                border-color: $secondary-color;
            }
            input[type="file"]{
                position: absolute;
                left: -75px;
            }
            .uploadinfo{
                overflow: hidden;
                position: relative;
                margin-top: -20px;
                height: 30px;
                font-family: "light";
                color: $secondary-color;
            }
            label[for="uploads"]{
                font-size: 15px;
                font-family: "Light";
                margin-bottom: 10px;
            }
            .formUpload{
                border: 1px solid rgba(177, 177, 177, 0.178);
                margin: 20px 0px;
                font-family: light;
                padding-left: 10px;
                box-shadow: 2px 2px 10px rgba(128, 128, 128, 0.055) inset;
                &::after{
                    content: "Browse";
                    padding: 10px 15px;
                    display: inline-block;
                    margin-left: 30px;
                    border: 2px solid $secondary-color;
                    cursor: pointer;
                    background-color: $secondary-color;
                    color: white;
                    font-family: 'Medium';
                }
            }
            
            .form-check-label{
                display: inline-block;
                margin: 5px 5px;
                font-size: 16px;
                font-family: 'Light';
                &:hover{
                    cursor: pointer;
                }
                color: $primary-color;
            }
        }
	}
    .alert{
        position: fixed;
        bottom: 20px;
        left: 0;
        z-index: 5;
    }
    @media screen and (max-width: 2000px) {
		.navbar-nav {
			margin: 20px 0px;
			&::before {
				content: '';
				display: block;
				width: 100%;
				height: 1px;
				background-color: $primary-color;
				margin-bottom: 10px;
				opacity: 0.2;
			}
		}
	}
</style>
