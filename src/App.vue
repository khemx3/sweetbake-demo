<template>
  <v-app>
    <router-view/>
    <BottomNav/>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
      BottomNav: () => import('./components/BottomNav'),
    }
  }
</script>
