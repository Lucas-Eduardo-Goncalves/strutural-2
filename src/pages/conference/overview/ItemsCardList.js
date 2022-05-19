import React, { useState, useEffect } from 'react';
import { Row, Col, Tag } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined, SyncOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Heading from '~/components/heading/heading';
// import { Button } from '~/components/buttons/buttons';
import { IMAGES_URL } from '~/utility/useLinks';
import { ProductCard } from '../Style';

const ItemsCardList = ({ item, data, divergencias }) => {
  const [image, setImage] = useState(null);
  const [qtyChecked, setQtyChecked] = useState(0);
  const [status, setStatus] = useState('AGUARDANDO');

  useEffect(() => {
    if (item) {
      const url = item[17];
      const defaultUrl = `${IMAGES_URL}/pp.jpg`;
      const img = new Image();
      img.src = url;
      if (img.complete) {
        setImage(url);
      } else {
        img.onload = () => {
          setImage(url);
        };

        img.onerror = () => {
          setImage(defaultUrl);
        };
      }
    }
    if (data) {
      if ((data.barcode === item[16] || data.barcode === item[0]) && qtyChecked < parseFloat(item[4])) {
        const total = qtyChecked + parseFloat(data.qtde);
        if (total > 0 && total < item[4]) {
          setQtyChecked(total);
          setStatus('EM_CONFERENCIA');
        } else if (total >= parseFloat(item[4])) {
          setQtyChecked(parseFloat(item[4]));
          setStatus('CONFERIDO');
        }
      }
    }
  }, [item, data]);

  useEffect(() => {
    if (divergencias.length !== 0) {
      let filter;
      if (Array.isArray(divergencias)) {
        filter = divergencias.filter(obj => String(obj[2]) === String(item[0]));
      } else {
        const array = [];
        array.push(divergencias);
        filter = array.filter(obj => String(obj[2]) === String(item[0]));
      }
      if (filter.length !== 0) {
        if (parseFloat(filter[0][8]) >= parseFloat(item[4])) {
          setQtyChecked(parseFloat(item[4]));
          setStatus('CONFERIDO');
        } else {
          const qtdConf = parseFloat(filter[0][8]);
          setQtyChecked(qtdConf);
          if (qtdConf === 0) {
            setStatus('AGUARDANDO');
          } else if (qtdConf > 0 && qtdConf < parseFloat(item[4])) {
            setStatus('EM_CONFERENCIA');
          } else if (qtdConf >= parseFloat(item[4])) {
            setStatus('CONFERIDO');
          }
        }
      }
      /*  */
    }
  }, [divergencias, item]);

  return (
    <ProductCard className="list-view" style={{ marginBottom: 20 }}>
      <div className="product-list">
        <Row gutter={15}>
          {window.screen.width > 767 && (
            <Col md={5} xs={24} style={{ alignSelf: 'center' }}>
              <figure>
                <img style={{ width: '100%' }} src={image} alt="" />
              </figure>
            </Col>
          )}
          <Col md={14} xs={24} style={{ marginTop: window.screen.width > 767 ? -17 : 0 }}>
            <div className="product-single-description">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'left' }}>
                {window.screen.width <= 767 && (
                  <div style={{ width: 80, height: 80, overflow: 'hidden' }}>
                    <figure>
                      <img style={{ width: '100%' }} src={image} alt="" />
                    </figure>
                  </div>
                )}
                <div style={{ paddingLeft: window.screen.width > 767 ? 0 : 15 }}>
                  <Heading className="product-single-title" as="h5">
                    {item[1]}
                  </Heading>
                </div>
              </div>
              <p>
                {window.screen.width <= 767 && <br />}
                <strong>Cód Produto:</strong> {item[0]} <br />
                <strong>Unidade:</strong> {item[5]} <br />
                <strong>Descrição Local:</strong> {item[11]} <br />
                <strong>Ref. Fornecedor:</strong> {item[13]} <br />
                <strong>Marca:</strong> {item[15]} <br />
                <strong>Cód Barras:</strong> {item[16]}
              </p>
            </div>
          </Col>
          <Col md={5} xs={24}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                paddingRight: 5,
              }}
            >
              <div>
                <div style={{ width: '100%' }}>
                  <p>
                    Quantidade total:{' '}
                    <strong>
                      <span style={{ fontSize: 15 }}>{parseFloat(item[4])}</span>
                    </strong>{' '}
                    <br />
                    Quantidade conferida:{' '}
                    <strong>
                      <span
                        style={{
                          color:
                            qtyChecked === 0 ? '#cf1322' : qtyChecked < parseFloat(item[4]) ? '#096dd9' : '#52c41a',
                          fontSize: 15,
                        }}
                      >
                        {parseFloat(qtyChecked)}
                      </span>
                    </strong>
                  </p>
                </div>
                <Tag
                  icon={
                    status === 'AGUARDANDO' ? (
                      <ExclamationCircleOutlined />
                    ) : status === 'EM_CONFERENCIA' ? (
                      <SyncOutlined spin />
                    ) : (
                      <CheckOutlined />
                    )
                  }
                  color={status === 'AGUARDANDO' ? 'warning' : status === 'EM_CONFERENCIA' ? 'processing' : 'success'}
                  style={{ padding: '8px 10px', fontSize: 13 }}
                >
                  {status === 'AGUARDANDO'
                    ? 'Aguardando Conferência'
                    : status === 'EM_CONFERENCIA'
                    ? 'Em Conferência'
                    : 'Conferido'}
                </Tag>
              </div>

              {/* <div className="product-single-action" style={{ marginRight: 2, marginBottom: 5 }}>
                <Button size="small" type="primary">
                  Conferir
                </Button>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </ProductCard>
  );
};

ItemsCardList.propTypes = {
  product: PropTypes.array,
};

export default ItemsCardList;
