import React from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import './RegisterLogin.css';
import { registerUser } from "../CRUDcalls/users";

function Register() {
    const navigate = useNavigate();
    const onFinish  = async(values)=>{
        console.log(values);
        try{
            const response = await registerUser(values);
            console.log(response);
            if(response.success){
                message.success(response.message);
                navigate('/login');
            }
            else {
                message.error(response.message);
            }

        }
        catch(error){
            console.log(error);
            message.error('User Registration Failed, please try again');
        }
    };

    return (
        <div className="Register-main">
            <header className="App-header">
                
                <main className="main-area mw-500 text-center px-3">
                <section className="left-section">
                    <h1>Register to Quiz</h1>
                </section>
                <section className="right-section">
                    <Form layout="vertical"  onFinish={onFinish}>{/* //need to add onFinish function */}
                    <Form.Item
                        label="Name"
                        htmlFor="name"
                        name="name"
                        className="d-block"
                        rules={[{ required: true, message: "Name is required!" }]}
                    >
                        <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        rules={[{ required: true, message: "Email is required!" }]}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        htmlFor="email"
                        name="email"
                        className="d-block"
                        rules={[{ required: true, message: "Email is required!" }]}
                    >
                        <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        htmlFor="password"
                        name="password"
                        className="d-block"
                        rules={[{ required: true, message: "Password is required!" }]}
                    >
                        <Input
                        id="password"
                        type="password"
                        placeholder="Enter the password"
                        ></Input>
                    </Form.Item>

                    <Form.Item>
                        <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ fontSize: "1rem", fontWeight: "600", width:"80px" }}
                        >
                        Sign Up
                        </Button>
                    </Form.Item>
                    <Form.Item
                        label="Register as a Admin"
                        htmlFor="role"
                        name="role"
                        className="d-block text-center"
                        initialValue={false}
                        rules={[{ required: true, message: "Please select an option!" }]}
                    >
                        <div className="d-flex justify-content-start">
                        <Radio.Group
                            name="radiogroup"
                            className="flex-start"
                        >
                            <Radio value={'Admin'}>Yes</Radio>
                            <Radio value={'User'}>No</Radio>
                        </Radio.Group>
                        </div>
                    </Form.Item>
                    </Form>
                    <section className="register-to-login">
                    <p>
                        Already a user? <Link to="/login" className="login-now">Login now</Link>
                    </p>
                    </section>
                </section>
                </main>
            </header>
        </div>
    )
}
export default Register;