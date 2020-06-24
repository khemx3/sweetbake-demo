<template>
    <div>
        <v-row class="mb-10">
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item in openorder" :key="item.id">
                <v-card class="text-center ma-3">
                <v-responsive class="pt-4">
                    <v-img
                    v-bind:src="require('../assets/' + item.type + '.jpg')"
                    max-height="125"
                    class="grey darken-4"
                    ></v-img>
                </v-responsive>
                <v-card-text>
                    <div class="text-subtitle-1 ">{{item.name}}</div>
                    <!-- <div class="black--text">{{item.type}}</div> -->
                    <v-chip class="mt-2">{{item.date}}</v-chip>
                </v-card-text>
                
                <v-btn class="ma-2" @click="selectCard(item)" depressed color="primary">สั่งเลย</v-btn>

                </v-card>
            </v-col>
        </v-row>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            selectCardObject: undefined,
            openorder: [
                {
                id: 1,
                name: 'รอบ วันที่ 24 มิถุนายน 2020',
                date: 'Wed, 24 june',
                type: 'kerry',
                },
                {
                id: 2,
                name: 'รอบ วันที่ 25 มิถุนายน 2020',
                date: 'Thu, 25 june',
                type: 'grab'
                },
                {
                id: 3,
                name: 'รอบ วันที่ 26 มิถุนายน 2020',
                date: 'Fri, 26 june',
                type: 'kerry'
                },
                {
                id: 4,
                name: 'รอบ วันที่ 27 มิถุนายน 2020',
                date: 'Sat, 27 june',
                type: 'grab'
                }
            ]
        }
    },
    methods: {
        selectCard: function(item) {
            this.selectCardObject = item
            console.log(this.selectCardObject)
        }
    }
}
</script>
