import React, { useState } from "react";
import ProjectContainer from "./ProjectContainer";
import { Layout, Menu } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Page from "./Charts";
import Modal from "../modal/Modal";
import AddProjectBtn from "../Buttons&checks/AddProjectBtn";
import { useProjects, useArchivedProjects } from "../../actions/useQueryHook";

//CSSS
import "./ant.module.css";
import "antd/dist/antd.css";
import "../../index.css";
const { TabPane } = Tabs;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  //Fetch projects (axios)
  const [menuKey, setMenuKey] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const queryInfo = useProjects();

  const queryInfoArchived = useArchivedProjects(menuKey);

  const yearArray = [2019, 2020, 2021, "active"].reverse();

  // //const yearArray = new Set();

  // yearArray.add(new Date().getFullYear());

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
                        defaultSelectedKeys={["active"]}
                        style={{ height: "100%", borderRight: 0 }}
                        theme="dark"
                      >
                        <SubMenu
                          key="sub1"
                          icon={<LaptopOutlined />}
                          title="Database"
                        >
                          {yearArray.map((year) => {
                            return <Menu.Item key={year}>{year}</Menu.Item>;
                          })}
                        </SubMenu>
                      </Menu>
                    </Sider>
                    <Layout
                      style={{
                        padding: "24px 24px 24px",
                        backgroundColor: "#121212",
                      }}
                    >
                      <Content className="site-layout-background">
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
                        {queryInfo.status === "error" ? (
                          <h1 style={{ color: "red" }}>ERROR</h1>
                        ) : queryInfo.isLoading ? (
                          "LOADING......"
                        ) : menuKey === "active" && queryInfo.isSuccess ? (
                          <ProjectContainer
                            queryInfo={queryInfo?.data}
                            searchTerm={searchTerm}
                          />
                        ) : menuKey !== "active" &&
                          queryInfoArchived.isSuccess ? (
                          // <ArchivedContainer
                          // queryInfo={Array.from(queryInfoArchived?.data)}
                          // searchTerm={searchTerm}
                          // />

                          queryInfoArchived?.data.map((project) => (
                            <div
                              key={project.codename}
                              style={{ display: "flex" }}
                            >
                              <ul
                                style={{
                                  backgroundColor: "#1890ff",
                                  display: "flex",
                                  flexDirection: "column",
                                  padding: "1rem",
                                  margin: "1rem",
                                  minWidth: "20rem",
                                }}
                              >
                                <h3>Client Name: {project.clientName}</h3>
                                <h3>Project Codename: {project.codename}</h3>
                                <h4>Final Worth: {project.finalWorth}</h4>
                              </ul>
                            </div>
                          ))
                        ) : queryInfoArchived.isError ? (
                          "error"
                        ) : null}
                      </Content>
                    </Layout>
                  </Layout>
                </div>
              </TabPane>
              <TabPane
                style={{ width: "95vw", marginLeft: "3rem" }}
                tab="Charts"
                key="2"
              >
                <Page />
              </TabPane>
            </Tabs>
          </Menu>
        </Header>
      </Layout>

      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Dashboard;
