import logo from './logo.svg';
import './App.css';
import Login from './components/home/login';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import Home from './components/home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/home/register';
import Myform from './components/form/myform';
import { Flex } from 'antd';
import Marquee from 'react-fast-marquee';
import Forgot from './components/home/forgot';
import Info from './components/info/info';
import Edit from './components/share/edit';
import View from './components/share/view';
function App() {

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    // check login
    const fetchData = async () => {
      // const res = await loginByToken();
      // console.log(res);
      // if (res?.statusCode === "200") {
      //   localStorage.setItem("accessToken", res.data?.accessToken);
      //   setUser(res.data);
      // }

    };
    fetchData();
  }, []);

  useEffect(() => {
  console.log("check userr ----", user);
  }, [user]);


  return (
    <>
      <Flex style={{ marginBottom: "10px", backgroundColor: '#eb2f964d', textAlign: "center", alignItems: "center" }}>

        <Marquee
          className="marquee"
          behavior="scroll"
          direction="left"
          speed="50"
          style={{ height: '50px' }}
          pauseOnHover gradient={false}>
          Qua môn thầy Trụ ^^
        </Marquee>
        {
          user ? (<Info />) : <></>
        }

      </Flex>
     
      <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/view" element={<View />} />
          <Route path="/view/:idshare" element={<View />} />
        </Routes>


    </>
  );
}

export default App;
