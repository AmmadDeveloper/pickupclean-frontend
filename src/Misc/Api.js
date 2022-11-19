import axios from "axios";

export function setCookie(name,value,days) {
  // var expires = "";
  // if (days) {
  //     var date = new Date();
  //     date.setTime(date.getTime() + (days*24*60*60*1000));
  //     expires = "; expires=" + date.toUTCString();
  // }
  // document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  window.sessionStorage.setItem(name,value);
}
export function getCookie(name) {
  // var nameEQ = name + "=";
  // var ca = document.cookie.split(';');
  // for(var i=0;i < ca.length;i++) {
  //     var c = ca[i];
  //     while (c.charAt(0)==' ') c = c.substring(1,c.length);
  //     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  // }
  // return null;
  return window.sessionStorage.getItem(name);
}
export function eraseCookie(name) {   
  window.sessionStorage.removeItem(name);
  // document.cookie = name+'=; Max-Age=-99999999;';  
}


// export const getCookie=(cname)=> {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for(let i = 0; i <ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

//For Development
//export const Serverurl="http://localhost:8000"
//For Production
export const Serverurl=""


export const LoginClient=axios.create({baseURL:Serverurl+'/panel/api/',});


export const AdminClient=axios.create({baseURL:Serverurl+'/panel/api/',});
AdminClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = getCookie("authtoken");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});