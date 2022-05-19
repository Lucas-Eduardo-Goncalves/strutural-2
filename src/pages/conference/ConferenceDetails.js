import React, { useState, useEffect, Suspense } from 'react';
import { Row, Col, Spin, InputNumber, Affix, Typography, Modal } from 'antd';
import { useParams, Switch, useHistory } from 'react-router-dom';
import { BarcodeOutlined, CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PageHeader } from '~/components/page-headers/page-headers';
import { Main } from '~/container/styled';
import { Button } from '~/components/buttons/buttons';
import { TopToolBox, HorizontalSeparator, InputError } from './Style';
import EmptyMessage from '~/components/emptyMessage';
import ItemsList from './overview/ItemsList';
import {
  CONFERENCE_ITEMS_URL,
  SAVE_ITEM_CONFERRED_URL,
  INFO_CONFERENCE_QUEUE_URL,
  STATUS_CONFERRED_ITEMS_URL,
  END_CONFERENCE_URL,
} from '~/utility/useLinks';
import axios from 'axios';
const { Text } = Typography;

function ConferenceDetails() {
  const history = useHistory();
  const { codPedido } = useParams();
  const [isLoader, setIsLoader] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const [conferenceLoading, setConferenceLoading] = useState(false);
  const [topInfo, setTopInfo] = useState(null);
  const [conferenceData, setConferenceData] = useState(null);
  const [barcodeText, setBarcodeText] = useState(null);
  const [barcodeError, setBarcodeError] = useState(false);
  const [quantityText, setQuantityText] = useState(1);
  const [numConf, setNumConf] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [divergencias, setDivergencias] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoader(true);
      const response = await axios.post(CONFERENCE_ITEMS_URL, {
        cod_pedido: codPedido,
      });
      if (response.data) {
        const responseBody = response.data.responseBody;
        setConferenceData(responseBody.result);

        const responseInfo = await axios.post(INFO_CONFERENCE_QUEUE_URL, {
          nuNota: codPedido,
        });
        const responseInfoBody = responseInfo.data.responseBody;
        setNumConf(responseInfoBody.numConf);
        setTopInfo({
          nroNota: responseInfoBody.numNota,
          vendedor: responseInfoBody.vendedor.$,
          parceiro: responseInfoBody.parceiro.$,
        });
        const responseStatus = await axios.post(STATUS_CONFERRED_ITEMS_URL, {
          nuConf: responseInfoBody.numConf,
        });
        const clientEvents = responseStatus.data.responseBody;
        const diverg = clientEvents.result;
        setDivergencias(diverg);
      }
      setIsLoader(false);
    }
    fetchData();
  }, [codPedido]);

  async function conferirItem() {
    if (barcodeText) {
      setBarcodeError(false);
      const filter = conferenceData.filter(
        obj => String(obj[0]) === String(barcodeText) || String(obj[16]) === String(barcodeText),
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
          codBar: String(barcodeText),
          qtde: quantityText,
        });
        setConferenceLoading(false);
        setExtraData({
          barcode: String(barcodeText),
          qtde: quantityText,
        });
      }
    } else {
      setBarcodeError(true);
    }
    setTimeout(() => {
      setExtraData(null);
    }, 200);
  }

  async function finalizarConferencia() {
    setEndLoading(true);
    await axios.post(END_CONFERENCE_URL, {
      nuConf: numConf,
    });
    setEndLoading(false);
    history.push(`/admin/conference`);
  }

  function confirm() {
    Modal.confirm({
      title: 'Finalizar Conferência',
      icon: <ExclamationCircleOutlined />,
      content: 'Deseja realmente finalizar a conferência?',
      okText: 'OK',
      cancelText: 'Cancelar',
      onOk: () => finalizarConferencia(),
    });
  }

  useEffect(() => {
    if (barcodeText) {
      setBarcodeError(false);
    }
  }, [barcodeText]);

  return (
    <>
      <PageHeader ghost title="Conferência de Itens" />
      <Main>
        <Row gutter={5}>
          <Col flex={1} className="product-content-col" xxl={24} lg={24} md={14} xs={24}>
            <TopToolBox style={{ paddingLeft: 5 }}>
              <Col xs={24}>
                <Row gutter={[16, 16]}>
                  <Text type="secondary">
                    <Text strong>Nro. Nota:</Text> {!topInfo ? 'Carregando...' : topInfo.nroNota}
                  </Text>
                  <HorizontalSeparator />
                  <Text type="secondary">
                    <Text strong>Vendedor:</Text> {!topInfo ? 'Carregando...' : topInfo.vendedor}
                  </Text>
                  <HorizontalSeparator />
                  <Text type="secondary">
                    <Text strong>Parceiro:</Text> {!topInfo ? 'Carregando...' : topInfo.parceiro}
                  </Text>
                </Row>
              </Col>
            </TopToolBox>
            <Affix offsetTop={84} style={{ width: '100%' }} target={() => window}>
              <TopToolBox style={{ background: '#F4F5F7', padding: '20px 0', marginTop: -20 }}>
                <Col xs={24}>
                  <Row gutter={[16, 16]}>
                    <Col className="ant-row" xs={24} xl={8}>
                      <InputNumber
                        addonAfter={<BarcodeOutlined />}
                        placeholder="Código de barras"
                        onChange={txt => setBarcodeText(txt)}
                        controls={false}
                        style={{
                          width: '100%',
                          border: `1px solid ${barcodeError ? '#f5222d' : 'transparent'}`,
                          borderRadius: 6,
                        }}
                      />
                    </Col>

                    <Col className="ant-row" xs={12} xl={4}>
                      <InputNumber
                        value={quantityText}
                        onChange={txt => setQuantityText(txt)}
                        placeholder="Quantidade"
                        style={{ width: '100%' }}
                      />
                    </Col>

                    <Col className="ant-row" xs={12} xl={4}>
                      <Button
                        icon={<CheckOutlined />}
                        onClick={conferirItem}
                        size="large"
                        type="primary"
                        loading={conferenceLoading}
                      >
                        {conferenceLoading ? 'Conferindo...' : 'Conferir'}
                      </Button>
                    </Col>

                    <Col className="ant-row" xs={12} xl={4}>
                      <Button
                        style={{ background: 'white' }}
                        onClick={confirm}
                        size="large"
                        type="danger"
                        outlined
                        loading={endLoading}
                      >
                        {endLoading ? 'Finalizando...' : 'Finalizar Conferência'}
                      </Button>
                    </Col>
                  </Row>
                  {barcodeError && <InputError>Digite o código de barras ou o código do produto</InputError>}
                </Col>
              </TopToolBox>
            </Affix>
            {isLoader ? (
              <div className="spin d-flex align-center-v">
                <Spin />
              </div>
            ) : (
              <>
                {!conferenceData ? (
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
                      <ItemsList data={conferenceData} extraData={extraData} divergencias={divergencias} />
                    </Suspense>
                  </Switch>
                )}
              </>
            )}
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default ConferenceDetails;
