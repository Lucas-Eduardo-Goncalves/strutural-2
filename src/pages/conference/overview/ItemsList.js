import React, { useState } from 'react';
import { Row, Col, Modal, InputNumber, Button, Input } from 'antd';
import { useParams } from "react-router-dom"
import ItemsCardList from './ItemsCardList';
import Heading from '~/components/heading/heading';
import { CheckOutlined, BarcodeOutlined } from '@ant-design/icons';
import axios from 'axios';

import { SAVE_ITEM_CONFERRED_URL } from "../../../utility/useLinks";
import Cookies from 'js-cookie';

const ItemsList = ({ numConf, data, extraData, divergencias, setExtraData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemModalInfo, setItemModalInfo] = useState(undefined);

  const [quantityText, setQuantityText] = useState(0);
  const [codBar, setCodBar] = useState("");

  const [conferenceLoading, setConferenceLoading] = useState(false);
  const { codPedido } = useParams();
  const token = Cookies.get("strutural-token");

  const handlOpenModal = (item) => {
    setItemModalInfo(item);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setItemModalInfo(undefined);
    setModalIsOpen(false);
  };

  console.log(data)

  async function conferirItem() {
    if (itemModalInfo) {
      if(itemModalInfo[0] !== codBar) {
        Modal.warning({
          title: 'Aviso',
          content: (
            <div>
              <p>O código de barra dos produtos não são iguais</p>
            </div>
          ),
        });
        return
      }

      const filter = data.filter(
        obj => String(obj[0]) === String(itemModalInfo[0]) || String(obj[16]) === String(itemModalInfo[16]),
      );
      const total = filter[0][4];
      const codProd = filter[0][0];
      if (parseFloat(quantityText) > parseFloat(total)) {
        Modal.warning({
          title: 'Aviso',
          content: (
            <div>
              <p>Quantidade conferida maior que a quantidade negociada no pedido/nota.</p>
              <p>Produto: {codProd}</p>
            </div>
          ),
        });
      } else {
        setConferenceLoading(true);
        await axios.post(SAVE_ITEM_CONFERRED_URL, {
          numConf: numConf,
          nunNota: codPedido,
          codBar: String(itemModalInfo[0]),
          qtde: quantityText,
        },
        { headers: {
          authorization: `Bearer ${token}`
          }
        });
        setConferenceLoading(false);
        setExtraData({
          barcode: String(itemModalInfo[0]),
          qtde: quantityText,
        });
        Modal.warning({
          title: 'Sucesso',
          content: (
            <div>
              <p>O item foi editado com sucesso</p>
            </div>
          ),
        });
      }
    } else {
      setBarcodeError(true);
    }
    setTimeout(() => {
      setExtraData(null);
    }, 200);
  }

  return (
    <Row gutter={15}>
      {data.length ? (
        data.map((item, index) => {
          return (
            <Col xs={24} key={index}>
              <ItemsCardList 
                item={item} 
                data={extraData} 
                divergencias={divergencias} 
                onClick={() => handlOpenModal(item)}
              />
            </Col>
          );
        })
      ) : (
        <Col xs={24}>
          <Heading as="h1">Nenhuma informação</Heading>
        </Col>
      )}
      
      {modalIsOpen && (
        <Modal
          title={itemModalInfo[1]}
          visible
          onCancel={handleCloseModal}
          footer={null}
          maskClosable={false}
          width={600}
        > 
          <div>
            <span style={{ fontWeight: 600 }}>Código do Produto:</span>
            <Input
              value={codBar}
              onChange={txt => setCodBar(txt.target.value)}
              addonAfter={<BarcodeOutlined />}
              placeholder="Código de barras"
              style={{ width: '100%', marginBottom: "1rem" }}
            />

            <span style={{ fontWeight: 600 }}>Qtde:</span>
            <InputNumber
              value={quantityText}
              onChange={txt => setQuantityText(txt)}
              placeholder="Quantidade"
              style={{ width: '100%' }}
            />

            <Button
              style={{ marginTop: "1rem" }}
              icon={<CheckOutlined />}
              onClick={conferirItem}
              size="large"
              type="primary"
              loading={conferenceLoading}
            >
              {conferenceLoading ? 'Conferindo...' : 'Conferir'}
            </Button>
          </div>
        </Modal>
      )}
    </Row>
  );
};

export default ItemsList;
