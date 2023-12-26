import { createContext,  useState, useEffect } from 'react';
import {notification } from 'antd';
export const NotifiContext = createContext();
export const NotifiProvider = ({ children }) => {
  const [errorCode, setErrorCode] = useState(0);
  const [message, setMessage] = useState();
  const errorList = [

    //-----------------login-----------------
    {
      "id": "LOGIN_001",
      "type": "SUCCESS",
      "message": "Đăng nhập thành công"
    },
    {
      "id": "LOGIN_002",
      "type": "ERROR",
      "message": "User không tồn tại"
    },
    {
      "id": "LOGIN_003",
      "type": "ERROR",
      "message": "Sai mật khẩu"
    },
    {
      "id": "LOGIN_004",
      "type": "ERROR",
      "message": "Tài khoản chưa được xác thực"
    },
    {
      "id": "LOGIN_005",
      "type": "ERROR",
      "message": "Lỗi không xác định"
    },
    //-----------------register-----------------
    {
      "id": "REGISTER_001",
      "type": "SUCCESS",
      "message": "Đăng ký thành công, kiểm tra email để xác thực"
    },
    {
      "id": "REGISTER_002",
      "type": "ERROR",
      "message": "User đã tồn tại"
    },
    {
      "id": "REGISTER_003",
      "type": "ERROR",
      "message": "User đã tồn tịa nhưng chưa xác thực"
    },
    {
      "id": "REGISTER_004",
      "type": "ERROR",
      "message": "Lỗi không xác định"
    },
    //-----------------forgot-----------------

    //-----------------change password-----------------
    //-----------------Note-----------------
    {
      "id": "NOTE_001",
      "type": "SUCCESS",
      "message": "Tạo note thành công"
    },
    {
      "id": "NOTE_002",
      "type": "ERROR",
      "message": "Lỗi tạo note, vui lòng thử lại"
    },
  
    {
      "id": "NOTE_003",
      "type": "SUCCESS",
      "message": "Xóa note thành côngĐổi màu thành công"
    }
    ,
    {
      "id": "NOTE_004",
      "type": "ERROR",
      "message": "Lỗi xóa note, vui lòng thử lại"
    },
    {
      "id": "NOTE_005",
      "type": "SUCCESS",
      "message": "Xóa note thành công"
    },
    {
      "id": "NOTE_006",
      "type": "SUCCESS",
      "message": "Sao chép note thành công"
    },
    {
      "id": "NOTE_007",
      "type": "SUCCESS",
      "message": "Lưu note thành công"
    },
    {
      "id": "NOTE_008",
      "type": "SUCCESS",
      "message": "Cập nhật thành công"
    }
    ,







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




