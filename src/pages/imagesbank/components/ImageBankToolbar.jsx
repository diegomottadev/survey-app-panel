
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';;

const ImageBankToolbar = () => {

    const navigate = useNavigate();

    const navigateToImportImages = () => {
        navigate('/images/import');
    };


    const toolbarRightTemplate = () => {
        return (
            <>
                <Button label="Importar" icon="pi pi-upload" style={{ marginRight: '.5em' }} className="p-button-info" onClick={navigateToImportImages}/>
            </>
        );
    };



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar  right={toolbarRightTemplate}></Toolbar>
                </div>
            </div>
        </div>
    );
   
}

export default ImageBankToolbar;