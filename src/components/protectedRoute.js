import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu, Avatar, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { HomeOutlined, LogoutOutlined, UserOutlined, TrophyOutlined, BookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getUsers } from "../CRUDcalls/users";

function ProtectedRoute({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const getValidUser = async () => {
        try {
            const response = await getUsers();
            if (response.success) {
                setUser(response.user);
            } else {
                message.error(response.message);
                navigateToLogin();
            }
        } catch (error) {
            setUser({});
            message.error(error.message);
            navigateToLogin();
        }
    };
    
    // Debounced navigation to prevent rapid firing
    const navigateToLogin = () => {
        if (localStorage.getItem('authToken')) {
            localStorage.removeItem('authToken');
        }
        navigate('/login');
        
    };

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getValidUser();
        } else {
            navigateToLogin();
        }
        // Cleanup to prevent multiple navigations
        return () => {
            setUser({});
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigateToLogin();
    };

    const navItems = [
        {
            label: <Link to="/">Home</Link>,
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/quizzes">My Quizzes</Link>,
            icon: <BookOutlined />,
        },
        {
            label: <Link to="/leaderboard">Leaderboard</Link>,
            icon: <TrophyOutlined />,
        },
        user && user.name && {
            label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar style={{ backgroundColor: '#f56a00', marginRight: '8px' }}>
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    {user.name}
                </div>
            ),
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to="/profile">My Profile</Link>,
                    icon: <UserOutlined />,
                },
                {
                    label: <span onClick={handleLogout}>Log Out</span>,
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ].filter(Boolean);

    return (
        <Layout>
            <Header
                className="d-flex justify-content-between"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#001529",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h3 className="demo-logo text-white m-0" style={{ color: "white", marginRight: "20px" }}>
                        QuizMaster
                    </h3>
                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}>
                        <Link to="/start-quiz" style={{ color: "#fff" }}>Start a Quiz</Link>
                    </Button>
                </div>
                <Menu theme="dark" mode="horizontal" items={navItems} />
            </Header>
            <div style={{ padding: 24, minHeight: 380, background: "#f0f2f5" }}>
                {children}
            </div>
        </Layout>
    );
}

export default ProtectedRoute;
