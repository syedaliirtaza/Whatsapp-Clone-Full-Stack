import axios from 'axios';


// this is like saying is the base url for any req we make is this
// which is in our case "http://localhost:9000" but we'll cahnge it once we deploy our app

const instance = axios.create({
    baseURL: "http://localhost:9000"
});

export default instance;
