import logo from './logo.svg';
import './App.css';
import Login from './components/home/login';
import { useContext, useEffect,useState } from 'react';
import { UserContext } from './context/userContext';
import Home from './components/home/home';
import { Routes, Route } from 'react-router-dom';
import Register from './components/home/register';
import Myform from './components/form/myform';
import { Flex } from 'antd';
import Marquee from 'react-fast-marquee';
import Forgot from './components/home/forgot';
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

  console.log({ user });
 
  return (
    <>
    <Flex style={{ paddingBottom:"10px"}}>
    
      <Marquee
      className="marquee"
        behavior="scroll"
        direction="left"
        speed="50"
        style={{ height: '50px', backgroundColor: '#eb2f964d' }}
      pauseOnHover gradient={false}>
        {/* Qua môn thầy trụ ^^  */}
      </Marquee>

    </Flex>
      <Routes>
        <Route path="" element={user ? <Home /> : <Login />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/forgot-password" element={<Forgot />} />
      </Routes>
      <Routes>
        {/* <Route exact path="/" element={user ? <Myform id="ok" /> : <Login />}/> */}
      </Routes>
    </>
  );
}

export default App;
