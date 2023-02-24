import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Layout,
  List,
  Menu,
  MenuProps,
  Row,
  theme,
} from "antd";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const ldata = [
    { titel: "铁", p: 2 },
    { titel: "铜", p: 4 },
    { titel: "铝", p: 1.5 },
    { titel: "纸壳子", p: 0.8 },
  ];

  const bdata = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
  const [current, setCurrent] = useState("home");
  const [txt, setTxt] = useState("");
  const [gdata, setGdata] = useState([{ title: "", price: 0, value: 0 }]);
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Layout>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "home",
              label: `Home`,
            },
            {
              key: "List",
              label: `List`,
            },
            {
              key: "App",
              label: `App`,
            },
          ]}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0px" }}></Breadcrumb>
        <div
          style={{ padding: 24, minHeight: 790, background: colorBgContainer }}
        >
          {current === "home" ? (
            <Row>
              <Col span={6}>
                <List
                  size="default"
                  header={<div>品类</div>}
                  bordered
                  dataSource={ldata}
                  renderItem={(item) => (
                    <List.Item
                      onClick={(e: any) => {
                        const v = gdata.pop() ?? {
                          title: "",
                          price: 0,
                          value: 0,
                        };
                        if (v.value > 0) {
                          gdata.push(v);
                        }
                        const str = e.target.innerText;
                        const ss = str.split(":");
                        const ss1 = ss[1].split(" ");
                        setGdata([
                          ...gdata,
                          { title: ss[0], price: ss1[0], value: 0 },
                        ]);
                      }}
                    >
                      {item.titel}:{item.p} 元/斤
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={17}>
                <List
                  bordered={true}
                  grid={{ gutter: 20, column: 4 }}
                  dataSource={gdata}
                  renderItem={(item) => (
                    <List.Item>
                      <Card title={item.title} bordered={false}>
                        <p>{item.price}元/斤</p>
                        <p>重量：{item.value}斤</p>
                        <p>总价：{item.value * item.price}斤</p>
                      </Card>
                    </List.Item>
                  )}
                />

                <Row>
                  <Col span={3} push={13}>
                    <Button
                      onClick={(e: any) => {
                        if (txt === "") {
                          return;
                        }
                        const v = gdata.pop() ?? {
                          title: "",
                          price: 0,
                          value: 0,
                        };

                        const t = Number.parseFloat(txt);
                        v.value = t;
                        setGdata([...gdata, v]);
                        setTxt("");
                      }}
                    >
                      添加
                    </Button>
                  </Col>
                  <Col span={3} push={14}>
                    <Button
                      onClick={() => {
                        let sum = 0.0;
                        gdata.forEach((a) => {
                          sum += a.price * a.value;
                        });
                        alert(sum);
                      }}
                    >
                      总价
                    </Button>
                  </Col>
                  <Col span={3} push={15}>
                    <Button>保存</Button>
                  </Col>
                  <Col span={12} pull={8}>
                    <Input placeholder="" value={txt} />
                  </Col>
                </Row>
                <Breadcrumb>计算器</Breadcrumb>
                <List
                  bordered={true}
                  grid={{ gutter: 15, column: 3 }}
                  dataSource={bdata}
                  renderItem={(item) => (
                    <List.Item>
                      <Button
                        size={"large"}
                        block={true}
                        onClick={(e: any) => {
                          setTxt(txt + e.target.innerText);
                        }}
                      >
                        {item}
                      </Button>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          ) : (
            ""
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
