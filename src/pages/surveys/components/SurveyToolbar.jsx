
import React from 'react';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { saveAs } from 'file-saver';
import SurveyService from '../../../services/Surveys/SurveyService';

const PaymentMethodToolbar = () => {


    const onExportToExcel = async () => {
        const url = await SurveyService.export();
        const filename = 'results.xlsx'; // Nombre del archivo
        saveAs(url, filename); // Guardar el archivo en una ubicación específica
    };

    // const toolbarLeftTemplate = () => {
    //     return (
    //         <>
    //             <Button label="Nuevo" icon="pi pi-plus-circle" style={{ marginRight: '.5em' }} onClick={navigateToMethodPaymentForm} />
    //         </>
    //     );
    // };
    const toolbarRightTemplate = () => {
        return (
            <>
                <Button label="Exportar" icon="pi pi-file-excel" className="p-button-secondary" onClick={onExportToExcel} />
            </>
        );
    };



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar  right={toolbarRightTemplate}></Toolbar>

                    {/* <Toolbar left={toolbarLeftTemplate} right={toolbarRightTemplate}></Toolbar> */}
                </div>
            </div>
        </div>
    );
   
}

export default PaymentMethodToolbar;