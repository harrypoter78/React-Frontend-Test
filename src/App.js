import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { Layout } from "antd";
import "./App.css";

const { Content } = Layout;
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout hasSider>
          <Sidebar /> {/* load sidebar */}
          <Layout className="site-layout" style={{ marginLeft: "200px" }}>
            <Content style={{ margin: "5% 16px 5%" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, textAlign: "center", height: "100%" }}
              >
                <Routes>
                  {/* load home page */}
                  <Route path="/" exact element={<Home />}></Route>
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
