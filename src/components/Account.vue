<template>
    <div class="ma-5">
        <p>{{userprofile.userId}}</p>
        <p>{{userprofile.displayname}}</p>
        <v-btn to="/address">address</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        userprofile() {
			return this.$store.state.profile;
		},
    }
}
</script>