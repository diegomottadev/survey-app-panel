import React from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import ImageBankList from './components/ImageBankList';

import ImageBankToolbar  from './components/ImageBankToolbar';


const ImageBank = () => {

    return (
        <div >
            <AppBreadcrumb meta={'Banco de imagenes'} /> 
            <div className="layout-content">

                <ImageBankToolbar />
                <ImageBankList />
           </div>
        </div>
    );
}
export default ImageBank;
