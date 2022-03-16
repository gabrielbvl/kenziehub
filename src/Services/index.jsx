import axios from "axios";

const ApiKenzieHub = axios.create({
    baseURL: "https://kenziehub.herokuapp.com",
});

export default ApiKenzieHub;
