<template>
    <div :style="myStyle">
        <div class="pt-2">
            <v-img src="https://www.img.in.th/images/e885984d07530fe69ca7f954aa62a079.jpg"></v-img>
        </div>
        
        <ordercard/>
    </div> 
</template>

<script>


  export default {
    components: {
      ordercard: () => import('./ordercard'),
    },
    data() {
      return {
        myStyle:{
            backgroundColor:"#C9BC9C" 
            }
      }
    },
  }
</script>
