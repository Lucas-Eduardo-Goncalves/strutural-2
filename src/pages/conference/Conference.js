import React, { useState, Suspense, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { Switch } from 'react-router-dom';
import { PageHeader } from '~/components/page-headers/page-headers';
import { Main } from '~/container/styled';
import EmptyMessage from '~/components/emptyMessage';
import List from './overview/List';
import axios from 'axios';
import { ThemeLayout } from "../../layout/themeLayout";
import Cookies from 'js-cookie';

function Conference() {
  const [conferenceData, setConferenceData] = useState(null);
  const token = Cookies.get("strutural-token");

  useEffect(() => {
    
    if(token) {
      async function fetchData() {
        const res = await axios.get("https://strutural.webi9.com.br/api/fila-conferencia-ac", {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if(res.data) {
          const responseBody = res.data.responseBody;
          setConferenceData(lastState => lastState ? [...lastState, ...responseBody.result] : responseBody.result);
        }
      }
      fetchData();
    }
  }, []);

  

  useEffect(() => {
    if(token) {
      async function fetchData() {
        const res = await axios.get("https://strutural.webi9.com.br/api/fila-conferencia-ea", {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if(res.data) {
          const responseBody = res.data.responseBody;
          setConferenceData(lastState => lastState ? [...lastState, ...responseBody.result] : responseBody.result);
        }
        
      }
  
      fetchData();
    }
  }, []);

  useEffect(() => {
    if(token) {
      async function fetchData() {
        const res = await axios.get("https://strutural.webi9.com.br/api/fila-conferencia-ar", {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if(res.data) {
          const responseBody = res.data.responseBody;
          setConferenceData(lastState => lastState ? [...lastState, ...responseBody.result] : responseBody.result);
        }
        
      }
  
      fetchData();
    }
  }, []);

  useEffect(() => {
    if(token) {
      async function fetchData() {
        const res = await axios.get("https://strutural.webi9.com.br/api/fila-conferencia-ra", {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        if(res.data) {
          const responseBody = res.data.responseBody;
          setConferenceData(lastState => lastState ? [...lastState, ...responseBody.result] : responseBody.result);
        }
      }
  
      fetchData();
    }
  }, []);

  return (
    <ThemeLayout>
      <PageHeader
        ghost
        title="Fila de Conferência"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <Button
              size="small"
              key="2"
              type="primary"
              onClick={() => {
                updateList();
              }}
            >
              <SyncOutlined size={12} />
              Atualizar
            </Button> */}
          </div>,
        ]}
      />
      <Main>
        <Row gutter={5}>
          <Col flex={1} className="product-content-col" xxl={24} lg={24} md={14} xs={24}>
            {!conferenceData ? (
              <div className="spin d-flex align-center-v">
                <Spin />
              </div>
            ) : (
              <>
                {!conferenceData ? (
                  <Col xs={24}>
                    <div className="spin">
                      <EmptyMessage text="" iconSize={70} textSize={14} />
                    </div>
                  </Col>
                ) : (
                  <Switch>
                    <Suspense
                      fallback={
                        <div className="spin d-flex align-center-v">
                          <Spin />
                        </div>
                      }
                    >
                      <List data={conferenceData} />
                    </Suspense>
                  </Switch>
                )}
              </>
            )}
          </Col>
        </Row>
      </Main>
    </ThemeLayout>
  );
}

export default Conference;
