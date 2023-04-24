

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';
import PointOfSaleService from '../../../services/pointOfSales/PointOfSaleService';
import { FileUpload } from 'primereact/fileupload';
import { BASE_URL } from "../../../helpers/BaseUrl"

const POINT_OF_SALES_API_BASE_URL = `${BASE_URL}/clients`;

const PointOfSaleImport = () => {
    const toast = useRef();
    const navigate = useNavigate();
    const [errorResponse, setErrorResponse] = useState(false)
     
    const goBackPointOfSaleList = () => {
        navigate('/pointOfSales');
      };
    

    const handleFileUpload = async(event) => {
       
        try {



            const file = event.files[0]
            const formData = new FormData();
            formData.append('file', file);
            const response = await  PointOfSaleService.import(formData)
            setErrorResponse(false)  
            toast.current.show({
                severity: 'success',
                summary: 'Exito',
                detail: `${response.data.message}`,
                life: 3000,
            });
        

        } catch (error) {
            setErrorResponse(true)

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: `${error.response.data.message}`,
                    life: 3000,
                });
              } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error);
              }
        }
    };

    return (
        <div>
         <AppBreadcrumb meta={'Punto de venta / Importación'} />
            <div className="layout-content">

            <Toast ref={toast} onHide={(e) =>{       
                 if(!errorResponse){
                    navigate('/pointOfSales')
                 }
                
            }} />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Importar puntos de ventas</h5>

                            <FileUpload cancelLabel="Reiniciar" chooseLabel="Elegir archivo" uploadLabel="Importar" name="file" url={`${POINT_OF_SALES_API_BASE_URL}/import`} customUpload uploadHandler={handleFileUpload} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" maxFileSize={1000000} />
                            <div className="flex justify-content-end mt-2">
                                <div className="p-d-flex">
                                    <Button
                                       label="Volver"
                                        icon="pi pi-arrow-circle-left"
                                        className="p-button-raised p-button-secondary mr-2 mb-2"
                                        onClick={goBackPointOfSaleList}
                                    />
                                </div>
                             
                            </div>
                   
                    </div>
                </div>
            </div> 
        </div>
        </div>
    );
};

export default PointOfSaleImport;
