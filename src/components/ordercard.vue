<template>
    <div class="ma-2 mb-15">
        <v-row >
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item in openorder" :key="item.id">
                <v-card class="text-center " color="#b4a78d">
                <v-responsive >
                    <v-img
                    :src=item.url
                    class="grey darken-4"
                    ></v-img>
                </v-responsive>
                <v-card-text>
                    <div class="text-h6 ">{{item.name}}</div>
                    <!-- <div class="black--text">{{item.type}}</div> -->
                    <v-chip class="mt-2">{{item.date}}</v-chip>
                </v-card-text>
                
                
                <div  @click="selectCard(item)">
                    <v-btn 
                    to="/menu"
                    class="mb-2" depressed color="primary"
                    >
                        สั่งเลย
                    </v-btn>
                </div>
                

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
// import { mapState } from 'Vuex'

export default {
    name: 'OrderCard',
    data() {
        return {
            openorder: [
                {
                id: 1,
                name: 'Nutella Brownies',
                url: 'https://www.img.in.th/images/1c84cdcb4935c6eb6c7c7501055d170d.jpg'
                },
                {
                id: 2,
                name: 'Nutella Cup',
                url: 'https://www.img.in.th/images/541999340d24c09282bc9130d2c78752.jpg'
                },
                {
                id: 3,
                name: 'Combo Set',
                url: 'https://www.img.in.th/images/6be5c9719af116c54434c91f071b6c06.jpg'
                }
            ]
        }
    },
    methods: {
        selectCard: function(item) {
            this.$store.commit('SET_ORDERCARD', item)
        }
    }
}
</script>

<style >
    img { 
    width:100%; 
    height:100%; 
    } 
</style>