import axios from "axios";

const CinemaAxios = axios.create({
    baseURL: "http://localhost:8080/api"
})

export default CinemaAxios