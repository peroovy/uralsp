<script lang="ts">
	import Footer from '$lib/Footer/Footer.svelte';

</script>

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
	}
</style>
