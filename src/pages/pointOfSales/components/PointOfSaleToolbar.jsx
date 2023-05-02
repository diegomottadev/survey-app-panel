
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { saveAs } from 'file-saver';
import PointOfSaleService from '../../../services/pointOfSales/PointOfSaleService';

const PointOfSaleToolbar = () => {

    const navigate = useNavigate();

    const navigateToPointOfSaleForm = () => {
        navigate('/pointOfSales/new');
    };

    const navigateToPointOfSaleAllView = () => {
        navigate('/pointOfSales/printAll');

    }

    const onExportToExcel = async () => {
        const url = await PointOfSaleService.export();
        const filename = 'pointOfSales.xlsx'; // Nombre del archivo
        saveAs(url, filename); // Guardar el archivo en una ubicación específica
    };

    const onImportExcel = async () => {
        navigate('/pointOfSales/import');
    };

    const toolbarLeftTemplate = () => {
        return (
            <>
                <Button label="Nuevo" icon="pi pi-plus-circle" style={{ marginRight: '.5em' }} onClick={navigateToPointOfSaleForm} />
                <Button label="Imprimir" icon="pi pi-print" className=' p-button-secondary' style={{ marginRight: '.5em' }} onClick={navigateToPointOfSaleAllView} />
            </>
        );
    };
    const toolbarRightTemplate = () => {
        return (
            <>
                <Button label="Importar" icon="pi pi-upload" style={{ marginRight: '.5em' }} className="p-button-info" onClick={onImportExcel} />
                <Button label="Exportar" icon="pi pi-file-excel" className="p-button-secondary" onClick={onExportToExcel} />
            </>
        );
    };



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar left={toolbarLeftTemplate} right={toolbarRightTemplate}></Toolbar>
                </div>
            </div>
        </div>
    );
   
}

export default PointOfSaleToolbar;