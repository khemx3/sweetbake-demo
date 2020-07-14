<template>
	<div>
		<div class="ma-2 mb-15">
			<v-row class="justify-center">
				<v-col
					cols="12"
					sm="6"
					md="4"
					lg="3"
					v-for="item in menus"
					:key="item.id"
				>
					<v-card class="text-center" color="#b4a78d">
						<v-responsive>
							<v-img
								:src="item.url"
								class="grey darken-4"
							></v-img>
						</v-responsive>
						<v-card-text>
							<div class="text-h6 ">{{ item.name }}</div>
							<v-row class="justify-center">
								<v-icon @click="decrease(item)"
									>mdi-minus</v-icon
								>
								<v-chip>{{ item.count }}</v-chip>
								<v-icon @click="increase(item)"
									>mdi-plus</v-icon
								>
							</v-row>
							<div class="black--text"></div>
						</v-card-text>

						<div>
							<v-btn
								class="mb-2 white--text"
								depressed
								color="brown"
								:disabled="item.count == 0"
								@click="selectCard(item)"
							>
								เพิ่มใส่ตะกร้า
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</div>
		<div>
			<v-dialog v-model="dialog">
				<v-card>
					<v-card-title 
						>เพิ่ม {{dialogItem.name}} ใส่ตะกร้า</v-card-title
					>

					<v-card-text>
						จำนวน {{dialogItem.count}} ชิ้น
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn
							color="green darken-1"
							text
							@click="dialog = false"
						>
							ปิด
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
<script>
// import { mapState } from 'Vuex'

export default {
	name: "OrderCard",
	data() {
		return {
            dialog: false,
            dialogItem: {name: "", count: 0},
		};
	},
	methods: {
		selectCard: function(item) {
			this.dialogItem.name = item.name
			this.dialogItem.count = item.count
            this.dialog = true;
			this.$store.commit('ADD_CART', item)
		},
		increase: function(item) {
			this.$store.commit('EDIT_COUNT_INCREASE', item)
		},
		decrease: function(item) {
			if (item.count > 0) {
				this.$store.commit('EDIT_COUNT_DECREASE', item)
			}
		},
    },
    computed: {
		menus() {
			return	this.$store.state.menu
		}
    }
};
</script>

<style>
img {
	width: 100%;
	height: 100%;
}
</style>
