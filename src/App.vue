<template>
  <v-app>
    <router-view/>
    <bottomNav/>
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
