import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const data = require("../languageProvider/locales/en_US.json"); //text content from JSON

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {" "}
      <div className="logo">{data["sidebar.logo"]}</div>
      <Menu theme="dark" mode="inline" className="menu">
        <Menu.Item key="1">
          <Link to="/">{data["sidebar.menu"]}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
