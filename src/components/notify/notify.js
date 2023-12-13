import { createContext,  useState, useEffect } from 'react';
import {notification } from 'antd';
export const NotifiContext = createContext();
export const NotifiProvider = ({ children }) => {
  const [errorCode, setErrorCode] = useState(0);
  const [message, setMessage] = useState();
  const errorList = [

    //-----------------login-----------------
    // chưa nhập
    {
      "id": "LOGIN_001",
      "type": "SUCCESS",
      "message": "Đăng nhập thành công"
    },
    {
      "id": "LOGIN_002",
      "type": "ERROR",
      "message": "Vui lòng nhập mật khẩu"
    },
    {
      "id": 200,
      "type": "warring",
      "message": "warring 1"
    },


    {
      "id": 30,
      "type": "log",
      "message": "log 10"
    },
  ]
  useEffect(() => {
    if (errorCode !== 0) {
      const error = errorList.find((item) => item.id === errorCode);
      if (error) {
        setMessage(error);
      }
    }
  }, [errorCode]);


  return (
    <NotifiContext.Provider value={{ errorCode, setErrorCode, setMessage,message}}>
      {children}
    </NotifiContext.Provider>
  );
};




