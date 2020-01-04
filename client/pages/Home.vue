<template>
  <div class="my-32">
    <h1 class="text-center text-brown" v-if="!auth">Mevn Auth</h1>
    <h1 class="text-center" v-else>Welcome, {{ user.name }}</h1>
    <GenerateQuote />
  </div>
</template>

<script>
import GenerateQuote from '../components/GenerateQuote.vue'

export default {
  components: {
    GenerateQuote
  }
}
</script>
