import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import Heading from '~/components/heading/heading';
import { Button } from '~/components/buttons/buttons';
import usePrice from '~/utility/usePrice';
import { IMAGES_URL } from '~/utility/useLinks';
import { ProductCard } from '../Style';

const ProductCards = ({ product, action }) => {
  const name = product.Cadastro_DESCRPROD.$;
  const oldPrice = product.Preço_1.$;
  const newPrice = product.Preço_PROMO_1.$;
  const { price, basePrice, discount } = usePrice({
    amount: newPrice !== '0.00' ? parseFloat(newPrice) : parseFloat(oldPrice),
    baseAmount: parseFloat(oldPrice),
    currencyCode: 'BRL',
  });
  const id = product.Cadastro_CODPROD.$;
  const isPromo = product.ISPROMOCAO === 'true';
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      const url = `${IMAGES_URL}/${product.Cadastro_CODPROD.$}.jpg`;
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
  }, [product]);

  function handleClick() {
    const data = {
      id: id,
      name: name,
    };
    return action(data);
  }

  return (
    <ProductCard onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className='divImg'>
        <Button 
          onClick={handleClick} 
          block 
          size="small" 
          className="btn-cart" 
          type="primary"
        >
          {product.CODPROD.$}
        </Button>

        <img src={image} alt={`img${id}`} />
      </div>

      <div className='rigthDiv'>
        <p>{product.DESCRPROD.$}</p>
        <p><span className='title'>Marca: </span>{product.Cadastro_MARCA.$.trim()}</p>
        <p><span className='title'>NCM: </span> {product.Cadastro_REFFORN.$.trim()}</p>

        {product.ISPROMOCAO === "false" ? (
          <p className='value'>R$ {product.Preço_1.$}</p>
        ) : (
          <div className='promoDiv'>
            <p className='promoAnt'>R${product.Preço_1.$}</p>
            <p className='promoNew'>R${product.Preço_PROMO_1.$}</p>
          </div>
        )}
      </div>
    </ProductCard>
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
