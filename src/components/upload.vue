<template>
    <div>
        <p>{{$route.params.orderId}}</p>
        <input type="file" @change="onFileSelected">
        <v-btn color="primary" @click="onUpload">Upload</v-btn>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            selectedFile: null
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
            const fd = new FormData();
            fd.append(this.$route.params.orderId, this.selectedFile, this.selectedFile.name)
            axios.post('', fd)
                .then(res => {
                    // eslint-disable-next-line no-console
                    console.log(res)
                }) 
        }
    }
}
</script>