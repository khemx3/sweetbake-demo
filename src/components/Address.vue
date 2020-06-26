<template>
	<div class="pb-10 mb-5">
		<div class="ma-5">
			<v-row justify="center">
				<v-col cols="12">
					<p>ชื่อผู้รับ</p>
					<v-text-field
						v-model="name"
						hide-details
						label="Solo"
						placeholder="ชื่อผู้รับ"
						solo
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<p>เบอร์ติดต่อ</p>
					<v-text-field
						v-model="contact"
						hide-details
						label="Solo"
						placeholder="เบอร์ติดต่อ"
						solo
					></v-text-field>
				</v-col>
				<v-col cols="12">
					<p>รายละเอียดที่อยู่</p>
					<v-text-field
						v-model="address1"
						hide-details
						label="Solo"
						placeholder="รายละเอียดที่อยู่"
						solo
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="6" md="3">
					<ThailandAutoComplete
						v-model="district"
						type="district"
						@select="select"
						label="ตำบล"
						size="default"
						placeholder="ตำบล"
					/>
				</v-col>
				<v-col cols="12" sm="6" md="3">
					<ThailandAutoComplete
						v-model="amphoe"
						type="amphoe"
						@select="select"
						label="อำเภอ"
						size="default"
						placeholder="อำเภอ"
					/>
				</v-col>
				<v-col cols="12" sm="6" md="3">
					<ThailandAutoComplete
						v-model="province"
						type="province"
						@select="select"
						label="จังหวัด"
						size="default"
						placeholder="จังหวัด"
					/>
				</v-col>
				<v-col cols="12" sm="6" md="3">
					<ThailandAutoComplete
						v-model="zipcode"
						type="zipcode"
						@select="select"
						label="รหัสไปรษณีย์"
						size="default"
						placeholder="รหัสไปรษณีย์"
					/>
				</v-col>
			</v-row>
			<div>
				<v-btn @click="save()" color="success"> บันทึก </v-btn>
				<v-btn @click="clearAddress()" class="mx-2" color="error">
					ลบที่อยู่
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: "ภัคพล จือเหลียง",
			contact: "0882024221",
			address1: "66/1023",
			district: "บางเมือง",
			amphoe: "เมืองสมุทรปราการ",
			province: "สมุทรปราการ",
			zipcode: "10270",
		};
	},
	methods: {
		select(address) {
			this.district = address.district;
			this.amphoe = address.amphoe;
			this.province = address.province;
			this.zipcode = address.zipcode;
		},
		clearAddress() {
			this.address1 = "";
			this.district = "";
			this.amphoe = "";
			this.province = "";
			this.zipcode = "";
		},
		save() {
			alert("save");
		},
	},
};
</script>

<style lang="stylus"></style>
