import axios from "axios";
import { BaseUrl } from "@/config";
// import store from "../../store/model/index"
const instance = axios.create({
  baseURL: BaseUrl,
  timeout: 15000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code !== 200 && data.code !== 0) {
        if(Object.prototype.toString.call(data)=="[object Object]"&& !Object.keys(data).length||Object.prototype.toString.call(data)=="[object Array]"&& !data.length){
        //   store.commit("alare/SET_ALARE",{isAlare:true,msg:"Data is empty",toastType:"toast-warning"})
        }else{
          
        }
    }else{
      if(Object.prototype.toString.call(data.data)=="[object Object]"&& !Object.keys(data.data).length||Object.prototype.toString.call(data.data)=="[object Array]"&& !data.data.length){
        // store.commit("alare/SET_ALARE",{isAlare:true,msg:"Data is empty",toastType:"toast-warning"})
      }
    }
    return data;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

function get(url, params = {}) {
  return instance.get(url, { params });
}

function post(url, data = {}) {
  return instance.post(url, data);
}

// 上传文件
function uploadFile(url, file) {
  const formData = new FormData();
  formData.append("file", file);
  return instance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const request = (url, method, params = {}) => {
  if (method == "get") {
    return get(url, params);
  } else if (method == "post") {
    return post(url, params);
  } else if (method == "upload") {
    return uploadFile(url, file);
  }
};

export { request };
