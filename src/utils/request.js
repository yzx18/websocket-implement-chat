import request from 'axios'

const service=request.create({
     baseURL:"http://localhost",
     timeout:20000
 })
request.interceptors.request.use(config=>{
    if(localStorage.getItem("token")){
        config.headers['token'] = localStorage.getItem("token")
    }
    return config
})
export  default  service


