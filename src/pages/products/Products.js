import React, { useState, Suspense, useEffect } from 'react';
import { Row, Col, Spin, Input, Affix, Drawer } from 'antd';
import { Switch } from 'react-router-dom';
import { PageHeader } from '~/components/page-headers/page-headers';
import { Main } from '~/container/styled';
import { TopToolBox } from './Style';
import EmptyMessage from '~/components/emptyMessage';
import Grid from './overview/Grid';
import DetailsRight from './overview/DetailsRight';
import { SEARCH_PRODUCTS_URL } from '~/utility/useLinks';
import axios from 'axios';

import { ThemeLayout } from "../../layout/themeLayout";

const { Search } = Input;

function Products() {
  const [isLoader, setIsLoader] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  async function handleSearch(searchText) {
    if (searchText) {
      setIsLoader(true);
      const response = await axios.post(SEARCH_PRODUCTS_URL, {
        termo: searchText,
      });
      const responseBody = response.data.responseBody;
      const products = responseBody.produtos.produto;
      setSearchData(products);
      setIsLoader(false);
    }
  }

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    const windowWidth = window.screen.width;
    if (itemSelected && windowWidth <= 767) {
      showDrawer();
    }
  }, [itemSelected]);

  return (
    <ThemeLayout>
      <PageHeader ghost title="Consulta de Produtos" />
      <Main>
        <Row gutter={5}>
          <Col flex={1} className="product-content-col" xxl={14} lg={17} md={14} xs={24}>
            <TopToolBox>
              <Row gutter={[0, 15]} xs={24} justify="space-between">
                <Col xxl={10} lg={12} xs={24}>
                  <Search
                    placeholder="Digite o nome do produto"
                    size="default"
                    onSearch={text => handleSearch(text)}
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
            </TopToolBox>

            {isLoader ? (
              <div className="spin d-flex align-center-v">
                <Spin />
              </div>
            ) : (
              <>
                {!searchData ? (
                  <Col xs={24}>
                    <div className="spin">
                      <EmptyMessage text="Nenhuma informação" iconSize={70} textSize={20} />
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
                      <Grid data={searchData} action={data => setItemSelected(data)} />
                    </Suspense>
                  </Switch>
                )}
              </>
            )}
          </Col>
          <Col className="product-sidebar-col" xxl={10} xl={7} lg={7} md={10} xs={24} style={{ paddingLeft: 25 }}>
            <div>
              <Affix offsetTop={100} style={{ width: '100%' }} target={() => window}>
                <DetailsRight product={itemSelected} />
              </Affix>
            </div>
          </Col>
          <Drawer width="100%" title="Detalhes" placement="right" onClose={onClose} visible={drawerVisible}>
            <DetailsRight product={itemSelected} />
          </Drawer>
        </Row>
      </Main>
    </ThemeLayout>
  );
}

export default Products;
