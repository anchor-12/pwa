<template>
    <div>{{something}}</div>    
</template>
<script>
export default {
    name: 'SubView',
    data: function () {
        console.log(this);
        return this.$route.params;
    },
    beforeMount() {
        //console.log(this.$router.something);
        console.log(this.$route.params);
    }
}
</script>
