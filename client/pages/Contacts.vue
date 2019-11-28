<template>
  <div class>
    <h1 class>{{contacts}}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    contacts() {
      this.user.contacts
    }
  }
}
</script>