<template>

  <div>
    <div>
      <h1>test</h1>
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
      <v-btn color="primary" to="/payment">จ่ายเงิน</v-btn>
      <v-btn color="primary" to="/home">ยกเลิกออเดอร์</v-btn>
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
            name: 'Frozen Yogurt',
            quantity: 2,
            price: 200,
          },
          
        ],
      }
    },
  }
</script>