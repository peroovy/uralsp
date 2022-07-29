<script lang="ts">
	import Footer from '$lib/Footer/Footer.svelte';
</script>
<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
		integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
		crossorigin="anonymous"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/> <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
	<meta name="description" content="Some description!" />
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>
</svelte:head>

<main>
	<slot />
</main>

<Footer />

<style lang="scss">
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 16px;
		background-color: #fff;
		overflow-x: hidden;
	}
	// Colors
	$primary-color: #19334d;
	$secondary-color: #3490dc;
	$bg-color: #f0f5fa;
	// Fonts
	@font-face {
		font-family: 'Black';
		src: url("../lib/Assets/fonts/Raleway-Black.ttf") format('truetype');
	}
	@font-face {
		font-family: 'Medium';
		src: url("../lib/Assets/fonts/Raleway-Medium.ttf") format('truetype');
	}
	@font-face {
		font-family: 'Light';
		src: url("../lib/Assets/fonts/Raleway-Light.ttf") format('truetype');
	}

</style>
