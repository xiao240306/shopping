import axios from "axios";

const http=axios.create({
    baseURL:'http://localhost:3000',
    timeout:3000
})

http.interceptors.request.use(
    (config)=>{

    return config;
    },
    (error)=>{

    }
);

http.interceptors.response.use(
    (response)=>{


        return response;
    },
    (error)=>{
        
    }
)
export default http;