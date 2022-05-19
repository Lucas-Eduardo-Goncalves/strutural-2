import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from './styles';
import { ThemeLayout } from '../../layout/themeLayout';
import { useLenguage } from '../../hooks/useLenguage';

const Dashboard = () => {
  const { lenguageTexts } = useLenguage();

  return (
    <ThemeLayout>
      <PageHeader ghost title="Bem Vindo(a)" />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                <h2>{lenguageTexts.home.title}</h2>
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </ThemeLayout>
  );
};

export default Dashboard;
