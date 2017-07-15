<template>
  <div>
    <img src="assets/images/logo.png">
    <h1>{{ msg }}</h1>

    <select v-model="spoken">
        <option>One</option>
        <option>Two Thre Four</option>
        <option>Barking at the Freaky Door</option>
        <option>What's in There?</option>
    </select>

    <button @click="speak(spoken)"> Speaker </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
        msg: 'Vue.js - The Progressive JavaScript Framework',
        spoken: 'Two Thre Four'
    }
  },

        methods: {
            speak (msg) {
                if (msg === void 0)
                    msg = 'bark bark bark'

                console.info(msg)
            }
        }
}
</script>

<style scoped>
h1 {
  padding: 0 .25em;
}
</style>
