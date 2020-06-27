<template>
    <div class="ma-5">
        <div>
            <p>{{orderselected.id}}</p>
            <p>{{orderselected.name}}</p>
            <p>{{orderselected.date}}</p>
            <p>{{orderselected.type}}</p>
        </div>
    </div> 
</template>

<script>


  export default {
    data() {
        return {
            bakery: [
                {   
                    img: "",
                    name: "Nutella Brownies",
                    price: 79
                },
                {   
                    img: "",
                    name: "Nutella Cup",
                    price: 55
                }
            ],
            combobox: [
            ]
        }
    },
    computed: {
        orderselected() {
            return this.$store.state.ordercard
        }
    },
  }
</script>