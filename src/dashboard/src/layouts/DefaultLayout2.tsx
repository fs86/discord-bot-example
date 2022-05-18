import { ReactNode, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as AntdLayout, Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

interface DefaultLayout2Props {
  children: ReactNode;
}

const { Header: AntdHeader, Sider: AntdSider, Content: AntdContent } = AntdLayout;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content 1fr;
  height: 100vh;
  grid-template-areas:
    'sidebar header'
    'sidebar content';
`;

const Sidebar = styled(AntdSider)`
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.colors.navigation.background};
  color: #fff;
  padding-top: 50px;
`;

const Header = styled(AntdHeader)`
  grid-area: header;
  background-color: ${({ theme }) => theme.colors.header.background};
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  gap: 1rem;
  align-items: baseline;
  padding: 0 2rem;
  height: 50px;
  line-height: 50px;
  color: #fff;
`;

const HeaderAppName = styled.div`
  font-size: 18pt;
  display: flex;
`;

const Content = styled(AntdContent)`
  grid-area: content;
  background-color: ${({ theme }) => theme.colors.content.background};
  padding: 2rem;
  overflow-y: auto;
`;

const Menu = styled(AntdMenu)`
  background-color: ${({ theme }) => theme.colors.navigation.background};
  border: none;
  color: #fff;
`;

export function DefaultLayout2({ children }: DefaultLayout2Props) {
  const [collapsed, setCollapsed] = useState(false);

  function ToggleButton() {
    const Element = styled(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)`
      display: flex;
      font-size: 18px;
    `;

    return <Element onClick={() => setCollapsed(!collapsed)} />;
  }

  return (
    <Wrapper>
      <Sidebar trigger={null} width={200} collapsible collapsed={collapsed}>
        <Menu
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sidebar>
      <Header>
        <ToggleButton />
        <HeaderAppName>Dashboard</HeaderAppName>
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  );
}
