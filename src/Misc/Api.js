import axios from "axios";


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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
