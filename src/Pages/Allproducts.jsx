import React from 'react';
import Cloths from '../components/Cloths';
import Electronics from '../components/Electronics';
import HomeAppliances from '../Pages/HomeAppliances';
import CombineProducts from '../components/CombineProducts';

const AllProducts = () => {
  return (
    <div>
      <Cloths />
      <Electronics />
      <HomeAppliances />
      <CombineProducts />
    </div>
  );
};

export default AllProducts;
