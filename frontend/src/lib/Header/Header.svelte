<script lang="ts">
    import src from '$lib/Assets/imgs/logo.png';
</script>

<header>
    <img src={src} alt="Logo"/>
</header>

<style lang="scss">
    @import '../Assets/common.scss';

    header{
        width: 100vw;
        min-height: fit-content;
        align-items: center;
        background-color: white;
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 1;

        img{
            width: 130px;
            display: block;
            margin: auto;
            padding: 20px;
        }
    }
    
</style>
