import React from 'react';
import { Row, Col, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons';
import Heading from '~/components/heading/heading';
import { Button } from '~/components/buttons/buttons';
import { ProductCard } from '../Style';

const ProductCardList = ({ product }) => {
  return (
    <ProductCard className="list-view" style={{ marginBottom: 20 }}>
      <div className="product-list-pc" style={{display: "flex"}}>
        <div className="product-single-description">
          <Heading className="product-single-title" as="h5">
            {product[1]}
          </Heading>
          <strong>Número Único:</strong> {product[2]} <br />
          <strong>Data:</strong> {product[5]} <br />
          <strong>Empresa:</strong> {product[7]} <br />
          <strong>Conferente:</strong> {product[19]} <br />
          <strong>Tipo:</strong> {product[9]} <br />
          
        </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
          boxSizing: 'border-box',
          paddingRight: 5,
          marginLeft: "auto",
        }}
      >
        <div>
          <Tag
            icon={product[22] === 'A' ? <SyncOutlined spin /> : <ExclamationCircleOutlined />}
            color={product[22] === 'A' ? 'success' : 'warning'}
            style={{ padding: '8px 10px', fontSize: 13 }}
          >
            {product[22] === 'A' ? 'Em Andamento' : 'Aguardando Conferência'}
          </Tag>
          <div className="product-single-action">
            <NavLink to={`conferenceDetails/${product[2]}`}>
              <Button size="small" type="primary">
                Acessar Conferência
              </Button>
            </NavLink>
          </div>
        </div>

        {/* <div className="product-single-action" style={{ marginRight: 2, marginBottom: 5 }}>
      <Button size="small" type="primary">
        Conferir
      </Button>
    </div> */}
      </div>
      </div>
    </ProductCard>
  );
};

ProductCardList.propTypes = {
  product: PropTypes.array,
};

export default ProductCardList;
