import axios from "axios";

const TestAxios = axios.create({
    baseURL: "http://localhost:8080/api"
})

export default TestAxios