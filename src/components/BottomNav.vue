<template>
  <v-bottom-navigation
    fixed
  >
    <v-btn 
        value="home"
        to="/home"
    >
        <span>home</span>
        <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn 
        value="cart"
        to="/cart"
    >
      <span>Cart</span>
      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-btn
        value="account"
        to="/account"
    >
        <span>account</span>
        <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

