import React from 'react';
import imgDrug from '../../assets/drugs.jpg';
import css from './Shop.module.css';
import { fetchData } from 'api/api';

const ShopPage = () => {
    fetchData()
  return (
      <div className={css.container}>
          <div className={css.shops}>
              <ul className={css.shopList}>
                  <li>
                      <p>SHOPS:</p>
                  </li>
                  <li className={css.shopItem}>
                      <button className={css.shopBtn}>Drugs 24</button>
                  </li>
                  <li className={css.shopItem}>
                      <button className={css.shopBtn}>Pharm</button>
                  </li>
                  <li className={css.shopItem}>
                      <button className={css.shopBtn}>Etc.</button>
                  </li>
                  <li className={css.shopItem}>
                      <button className={css.shopBtn}>Etc.</button>
                  </li>
              </ul>
          </div>
          <div className={css.drugs}>
              <ul className={css.drugsList}>
                  <li className={css.drugItem}>
                      <img src={imgDrug} alt='drug' className={css.drugImage}></img>
                      <h3 className={css.title}>title</h3>
                      <button className={css.drugBtn}>add to Cart</button>
                  </li>
                   <li className={css.drugItem}>
                      <img src={imgDrug} alt='drug' className={css.drugImage}></img>
                      <h3 className={css.title}>title</h3>
                      <button className={css.drugBtn}>add to Cart</button>
                  </li>
              </ul> 
          </div>
    </div>
  )
}

export default ShopPage