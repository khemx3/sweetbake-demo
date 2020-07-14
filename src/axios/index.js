import axios from 'axios'

export default axios.create({
    baseURL: 'https://asia-east2-sweetbake-backend.cloudfunctions.net/api/'
})