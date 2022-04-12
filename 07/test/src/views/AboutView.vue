<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="fnGoSub"></v-btn>
  </div>
</template>
<script>
export default {
  props: ['message'],
  methods: {
    fnGoSub: function () {
      this.$router.push({
        name: 'sub',
        params: {
          something: this.message
        }
      });
    }
  }
}
</script>
