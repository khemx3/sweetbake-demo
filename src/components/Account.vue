<template>
    <div> 
      <ThailandAutoComplete v-model="district" />
    </div> 
</template> 

<script> 
import ThailandAutoComplete from 'vue-thailand-address-autocomplete'

export default {
    components: {
        ThailandAutoComplete,
        
    },
    data () {
    return {
          district: '',
          amphoe: '',
          province: '',
          zipcode: ''
        }
    }
}
</script>