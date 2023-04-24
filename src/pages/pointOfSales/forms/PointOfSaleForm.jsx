

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';
import PointOfSaleService from '../../../services/pointOfSales/PointOfSaleService';

const PointOfSaleForm = () => {
    const toast = useRef();
    const navigate = useNavigate();
    const { pointOfSaleId } = useParams();

    const [pointOfSale, setPointOfSale] = useState(null);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [errorResponse, setErrorResponse] = useState(false)

    useEffect(() => {
        const fetchPointOfSale = async () => {
          try {
            const {data:response} = await PointOfSaleService.get(pointOfSaleId);
            setPointOfSale(response.data);
            setName(response.data.name || '');
            setCode(response.data.code || '');
            setAddress(response.data.address || '');
            setCity(response.data.city || '');
            setProvince(response.data.province || '');

        } catch (error) {
            console.error(error);
          }
        };
    
        if (pointOfSaleId) {
          fetchPointOfSale();
        }
      }, [pointOfSaleId]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name ) {
            setErrorResponse(true)

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos obligatorios',
                life: 3000,
            });
            return;
        }

        const data = {
            name,
            code,
            address,
            city,
            province,
        };

        try {
            let response;
            if (pointOfSale) {
                response = await PointOfSaleService.update(pointOfSale.id, data);
                setErrorResponse(false)

                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Punto de venta ${name} actualizada`,
                    life: 3000,
                });
            } else {
                response = await PointOfSaleService.create(data);
                setErrorResponse(false)

                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Punto de venta ${name} creada`,
                    life: 3000,
                });
            }
            
            setName('');
            setCode('');
            setAddress('');
            setCity('');
            setProvince('');

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

    const goBackPointOfSaleList = () => {
        navigate('/pointOfSales');
      };


    return (
        <div>
            {pointOfSaleId ? <AppBreadcrumb meta={'Punto de venta / Editar'} /> : <AppBreadcrumb meta={'Punto de venta / Nuevo'} />}
            <div className="layout-content">

            <Toast ref={toast} onHide={() => {
                if(errorResponse) return
                navigate('/pointOfSales')
            
            }
            } />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>{pointOfSaleId ? 'Editar punto de venta' : 'Nueva punto de venta'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="card p-fluid">
                            <div className="field">
                                <label htmlFor="description">Codigo de Pto. venta</label>
                                    <InputText
                                        id="code"
                                        rows="4"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="name">Nombre</label>
                                    <InputText
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="address">Dirección</label>
                                    <InputText
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <div className="field">
                                    <label htmlFor="city">Ciudad</label>
                                    <InputText
                                        id="city"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>

                                
                                <div className="field">
                                    <label htmlFor="city">Province</label>
                                    <InputText
                                        id="province"
                                        type="text"
                                        value={province}
                                        onChange={(e) => setProvince(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="flex justify-content-end mt-2">
                                <div className="p-d-flex">
                                    <Button
                                       label="Volver"
                                        icon="pi pi-arrow-circle-left"
                                        className="p-button-raised p-button-secondary mr-2 mb-2"
                                        onClick={goBackPointOfSaleList}
                                    />
                                </div>
                                <div className="p-d-flex">
                                    <Button
                                        type="submit"
                                        label={pointOfSale ? 'Actualizar' : 'Guardar'}
                                        icon="pi pi-save"
                                        className="p-button-raised p-button-success"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PointOfSaleForm;
