import axios from "axios";
const userAPI = "http://localhost:8083/user";



const login = async (id, password) => {
  const body = {
    id: id,
    password: password,
  }
  const res = await axios.post(`${userAPI}/login`, body);

  if(res.data.statusCode === 200){
     localStorage.setItem("token", res.data.accessToken);
     localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  return res.data;
}

const loginByToken = async () => {
  try {
    // const refreshToken = await AsyncStorage.getItem("refreshToken");
    const refreshToken =  localStorage.getItem("refreshToken")
    console.log("token",refreshToken);
    const res = await axios.post(`${userAPI}/login-token`, {
        refreshToken: refreshToken,
    //   refreshToken: refreshToken,
    });
    
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const register = async(userName, password,email)=>{
  console.log("start register");
  const data = {
    id:userName,
    password:password,
    email:email
  }
  try
  {
    const res = await axios.post (`${userAPI}/register`,data)
    console.log("register",res.data);
    return res.data;
  }
  catch(error){
    console.log("cheat ",`${error}`);
}
}

const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${userAPI}/forgot-password`, {
      email: email,
    });
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

// viết hàm xóa user
  
export {
  login,
  loginByToken,
  register,
  forgotPassword,
};
