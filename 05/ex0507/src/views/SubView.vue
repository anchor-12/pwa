<template>
    <div>
        <h2>Sub Page</h2>
        <button @click="fnMainPage">Main</button>
    </div>
</template>
<script>

export default ({
    methods: {
        fnMainPage() {
            this.$router.push('/main');
        }
    }
})
</script>
