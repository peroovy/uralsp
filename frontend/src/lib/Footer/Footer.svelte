<script lang="ts">
    let date = new Date();
    let year : number = date.getFullYear();
</script>

<footer>
    <p> © {year} AppName </p>
</footer>

<style lang="scss">
    footer{
        color: white;
        background-color: black;
        padding: 10px 0px;
        text-align: center;
        font-size: 12px;
        font-family: 'light';
        margin: 0px;
        p{
            padding: 0px;
            margin: 0px;
        }
    }
</style>