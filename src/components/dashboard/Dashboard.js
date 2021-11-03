import React, { useState } from "react";
import ProjectContainer from "./ProjectContainer";
import { testData } from "./data";
import "antd/dist/antd.css";
import "../../index.css";
import { Layout, Menu } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Page from "./Charts";
import Modal from "../modal/Modal";

import "./ant.module.css";
import AddProjectBtn from "../Buttons&checks/AddProjectBtn";

const { TabPane } = Tabs;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const [menuKey, setMenuKey] = useState(Number);

  return (
    <>
      <Layout>
        <Header className="header" style={{ padding: "0px" }}>
          {/* <div className="logo" /> */}
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Tabs
              style={{ color: "white" }}
              size="large"
              className="ant_tabs"
              defaultActiveKey="1"
            >
              <TabPane style={{ width: "100vw" }} tab="Tracker" key="1">
                <div>
                  <Layout>
                    <Sider
                      collapsible
                      collapsedWidth="0"
                      defaultCollapsed
                      width={200}
                      className="site-layout-background"
                    >
                      <Menu
                        onSelect={(e) => setMenuKey(e.key)}
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        style={{ height: "100%", borderRight: 0 }}
                        theme="dark"
                      >
                        <SubMenu
                          key="sub1"
                          icon={<LaptopOutlined />}
                          title="Database"
                        >
                          <Menu.Item key="1">2021</Menu.Item>
                          <Menu.Item key="2">2020</Menu.Item>
                          <Menu.Item key="3">2019</Menu.Item>
                          <Menu.Item key="4">2018</Menu.Item>
                        </SubMenu>
                      </Menu>
                    </Sider>
                    <Layout
                      style={{
                        padding: "24px 24px 24px",
                        backgroundColor: "#121212",
                      }}
                    >
                      <Content
                        className="site-layout-background"
                        // style={{
                        //   padding: 24,
                        //   margin: 0,
                        //   minHeight: 280,
                        // }}
                      >
                        <div className="top_bar">
                          <AddProjectBtn onClick={openModal} />
                          <input
                            className="search_bar"
                            type="text"
                            placeholder="Find project..."
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                          />
                        </div>

                        <ProjectContainer
                          testData={testData}
                          searchTerm={searchTerm}
                        />
                      </Content>
                    </Layout>
                  </Layout>
                </div>
              </TabPane>
              <TabPane style={{ width: "100vw" }} tab="Charts" key="2">
                <Page />
              </TabPane>
            </Tabs>
          </Menu>
        </Header>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </Layout>
    </>
  );
};

export default Dashboard;
