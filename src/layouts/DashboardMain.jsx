import {useState} from 'react';
import {
    AppstoreFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, ConfigProvider} from 'antd';
import MainLogo from '../assets/images/foodZone-logo.png'
import {Link, Outlet} from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import {IoFastFood} from "react-icons/io5";
import {FaCartPlus} from "react-icons/fa";
import {IoIosSettings, IoMdArrowDropright} from "react-icons/io";
import {RiLogoutCircleRFill} from "react-icons/ri";

const {Header, Sider, Footer, Content} = Layout;
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(<Link to="/">DASHBOARD</Link>, 'sub1', <AppstoreFilled />, ),
    getItem('USERS', 'sub2', <HiUsers />, [
        getItem(<Link to="/admin-user">Admin Users</Link>, 's21', <IoMdArrowDropright />),
        getItem(<Link to="/customers">Customers</Link>, 's22', <IoMdArrowDropright />),
    ]),
    getItem(<Link to="/food-items">FOOD ITEMS</Link>, 'sub3', <IoFastFood />, ),
    getItem(<Link to="/orders">ORDERS</Link>, 'sub4', <FaCartPlus />, ),
    getItem('SETTINGS', 'sub5', <IoIosSettings />, [
        getItem(<Link to="/reset-password">Reset Password</Link>, 'sub51', <IoMdArrowDropright /> ),
    ])
];
function DashboardMain() {
    const [collapsed, setCollapsed] = useState(false);
    const onClick = (e) => {
        console.log('click ', e);
    };
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: "#faad14",
                    colorInfo: "#faad14",
                    colorWarning: "#fa541c",
                    colorBgBase: "#050606",
                    colorBgContainer: "#050606",
                    // borderRadius: 13,
                },
                components: {
                    Typography: {
                        fontSizeHeading1: 60

                    },
                    Carousel: {
                        colorBgContainer: "var(--primary-color)",
                        dotHeight: 10
                    },
                    // Card: {
                    //     colorTextDescription: "var(--text-color)",
                    //     colorTextHeading: "var(--text-color)",
                    //     colorBgContainer: "#050606",
                    //     colorBorderSecondary: "var(--primary-color)",
                    //     boxShadowCard: "      0 1px 2px -2px var(--primary-shadow-color),      0 3px 6px 0 var(--primary-shadow-color),      0 5px 12px 4px var(--primary-shadow-color)    "
                    // },
                    Button: {
                        colorPrimaryHover: "var(--primary-color)"
                    },
                    Segmented: {
                        itemSelectedBg:"#443111",
                        colorText: "var(--primary-color)"
                    },
                    Card: {
                        colorBgContainer: "rgba(250,173,20, 0.05)",
                        boxShadowTertiary:"0 1px 2px 0 rgba(250,173,20, 0.3), 0 1px 6px -1px rgba(250,173,20, 0.2), 0 2px 4px 0 rgba(250,173,20, 0.2)"
                    },
                    Modal: {
                        contentBg: "var(--model-background)"
                    }
                }
            }}
        >
            <Layout style={{backgroundColor:"white"}} className="min-h-screen min-w-screen">
                <Sider trigger={null} collapsible collapsed={collapsed} width={250}
                       style={{
                           backgroundColor:"var(--background-color)",
                           borderInlineEnd:"1px solid rgba(205, 247, 247, 0.22)",
                }}>
                    <div className="w-full h-auto flex items-center justify-center">
                        {(collapsed) ? <img src={MainLogo} alt="FoodZone Logo" className="h-[50px]"/>
                            : <img src={MainLogo} alt="FoodZone Logo" className="h-[150px]"/>}

                    </div>
                    <Menu
                        onClick={onClick}
                        style={{
                            borderInlineEnd: "1px solid rgba(0, 0, 0, 0.0)",
                            fontSize:"16px",
                            fontWeight:"600",
                        }}
                        // defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: "var(--background-color)",
                        }}
                        className="flex items-center justify-between"
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <p className="text-xl font-serif">Hi, Prabuddha</p>
                        <Button
                            type="text"
                            icon={<RiLogoutCircleRFill />}
                            onClick={() => {}}
                            style={{
                                fontSize: '16px',
                                textAlign: "center"
                            }}
                            className="flex items-center justify-center"
                        >
                            <p>Logout</p>
                        </Button>

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 12,
                            minHeight: 280,
                            color: "var(--text-color)"
                            //background: colorBgContainer,
                            // borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <p className="mb-0">
                            PSDev Design ©{new Date().getFullYear()} Created by Prabuddha Jayasekara
                        </p>
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default DashboardMain;