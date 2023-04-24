import React from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import PointOfSaleList from './components/PointOfSaleList';

import PointOfSaleToolbar  from './components/PointOfSaleToolbar';


const PointOfSale = () => {

    return (
        <div >
            <AppBreadcrumb meta={'Puntos de ventas'} /> 
            <div className="layout-content">

                <PointOfSaleToolbar />
                <PointOfSaleList />
           </div>
        </div>
    );
}
export default PointOfSale;
