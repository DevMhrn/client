import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button,Form, Input, message   } from "antd";
import './RegisterLogin.css';
import { loginUser } from "../CRUDcalls/users";
import { useEffect } from "react";

function Login(){

    const navigate = useNavigate();
    const onFinish = async (values)=>{
        console.log(values);
        try{
            const response = await loginUser(values);
            console.log(response);
            if(response.success){
                message.success(response.message);
                localStorage.setItem('authToken', response.authToken);
                navigate('/');
            }
            else {
                message.error(response.message);
            }
        }
        catch(error){
            console.log(error);
            message.error('User Login Failed, please try again');
        }

        
    }
    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            navigate('/');
        }
    },[]);

    return(

        <div className="login-main">
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3 ">
                    <section className="left-section">
                        <h1>
                            Login to Quiz App
                        </h1>
                    </section>
                    <section className="right-section">
                    <Form layout="vertical" onFinish={onFinish} >  {/* //need to add onFinish function */}
                        <Form.Item
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[{ required: true, message: "Email is required" }]}
                            >
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter your Email"
                            ></Input>
                            </Form.Item>

                            <Form.Item
                            label="Password"
                            htmlFor="password"
                            name="password"
                            className="d-block"
                            rules={[{ required: true, message: "Password is required" }]}
                            >
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your Password"
                                
                            ></Input>
                            </Form.Item>

                            <Form.Item className="d-block">
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{ fontSize: "1rem", fontWeight: "600", width:"80px" }}
                            >
                                Login
                            </Button>
                            </Form.Item>
                        </Form>
                        <section className='login-to-register'>
                            <p>
                                New User? <Link to="/register" className='register-now'>Register Here</Link>
                            </p>
                        </section>
                    </section>

                </main>

            </header>
        </div>
    )
}
export default Login;