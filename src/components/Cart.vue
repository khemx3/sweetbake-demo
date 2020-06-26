<template>
  <div>

      <div >
        <h1>{{orderselected.name}}</h1>
        <p>order รอบ xx</p>
        <p>order id: xx</p>
      </div>
      <div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">รายการ</th>
                <th class="text-left">จำนวน</th>
                <th class="text-left">ราคา</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div>
        <v-btn color="primary" to="/menu">แก้ไข</v-btn>
        <v-btn color="primary" to="/payment">จ่ายเงิน</v-btn>
        <div @click="clearOrder()">
          <v-btn color="primary" to="/home">ยกเลิกออเดอร์</v-btn>
        </div>
        
      </div>
    </div>

  
</template>

<script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            quantity: 1,
            price: 200,
          },
          {
            name: 'Frozen ass',
            quantity: 2,
            price: 200,
          },
          
        ],
      }
    },
    methods: {
        clearOrder: function() {
            this.$store.commit('SET_ORDERCARD', {
              ordercard: {
                  id: 0,
                  name: "",
                  date: "",
                  type: "",
              }
            })
        }
    },
    computed: {
        orderselected() {
            return this.$store.state.ordercard
        }
    },
  }
</script>