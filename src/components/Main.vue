<template>
    <div>
        <div>
            <div class="text-h4 mt-6 text-center">
                รอบที่เปิด
            </div>
        </div>
        
        <ordercard/>
    </div> 
</template>

<script>


  export default {
    components: {
      ordercard: () => import('./ordercard'),
    },
  }
</script>
