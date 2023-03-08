import request from '../utils/request'

 export function login(data){
    return request({
        url:'/login',
        method:'post',
        data:data,
        baseURL:"http://localhost:9001"
    })
 }
