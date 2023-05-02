
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../../components/Error';
import PointOfSaleService from '../../../services/pointOfSales/PointOfSaleService'
import Swal from 'sweetalert2'
import { Toast } from 'primereact/toast';
import { BASE_URL } from "../../../helpers/BaseUrl"

const POINT_OF_SALES_API_BASE_URL = `${BASE_URL}/clients`;

const PointOfSaleList = () => {

    const dt = useRef(null);
    const toast = useRef();

    const navigate = useNavigate();

    const [pointOfSales, setPointOfSales] = useState(false);
    const [loadingDatatable, setLoadingDatatable] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showError, setShowError] = useState(false);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        search: null
    });

    useEffect(() => {
        async  function loadLazyData () {

            try {
                setLoadingDatatable(true);
                const {data:{data:{rows:result, count:total}}} =  await PointOfSaleService.all(lazyParams)
                setTotalRecords(total);
                setPointOfSales(result);
                setLoadingDatatable(false);
               // });
            } catch (err){
                console.log(err);
                console.warn('Hubo un problema con la carga del listado de los puntos de ventas');
                setShowError(true);
                setLoadingDatatable(false);
            }
        }
        loadLazyData();
    },[lazyParams]) 


    const onPage = (event) => {        
        let _lazyParams = { ...lazyParams, ...event };
        setLazyParams(_lazyParams);
    }

    const onFilter = (e) => {
        const search = { search: { name: e.target.value } };
        let _lazyParams = { ...lazyParams, ...search };
        _lazyParams['first'] = 0;
        setLazyParams(_lazyParams);
    }

    const onEditPointOfSale = (pointOfSaleId) => {
        navigate(`/pointOfSales/${pointOfSaleId}/edit`);
    }

    const onDetailPointOfSale = (pointOfSaleId) => {
        navigate(`/pointOfSales/${pointOfSaleId}/detail`);
    }

    const onDeletePointOfSale = (pointOfSaleId) => {
        Swal.fire({
            title: '',
            text: '¿Confirma eliminar el punto de venta permanentemente?',
            showCancelButton: true,
            confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
            cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#fbc02d',
          }).then( async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                  let pointOfSaleDeleted = await PointOfSaleService.delete(pointOfSaleId);
                //   Swal.fire('', `${pointOfSaleDeleted.message}`, 'success')
                  toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `${pointOfSaleDeleted.message}`,
                    life: 3000,
                });
                  setLazyParams({...lazyParams,page: lazyParams.page});
            } 
        })
    }

    const header = (

        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0"></h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => onFilter(e)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button tooltip={"Editar"}  tooltipOptions={{ position: 'top' }} icon="pi pi-pencil" className="p-button-raised p-button-success p-mr-2" onClick={() => onEditPointOfSale(rowData.id)} />
                <Button tooltip={"Eliminar"}  tooltipOptions={{ position: 'top' }} icon="pi pi-trash" className="p-button-raised p-button-danger p-mr-2" onClick={() => onDeletePointOfSale(rowData.id)} />
                <Button tooltip={"Ver"}  tooltipOptions={{ position: 'top' }} icon="pi pi-eye" className="p-button-raised p-button-info p-mr-2" onClick={() => onDetailPointOfSale(rowData.id)} />

                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteTeacher(rowData)} /> */}
            </div>
        );
    }

    const actionImageQRTemplate = (rowData) =>{
        return (
            <div className="actions">
                    <img width="100" height="140"
                  src={`${POINT_OF_SALES_API_BASE_URL}/${rowData.code}/qrcode`}
                  className="img-fluid hover-shadow mx-auto d-block"
                  alt={`qr-code-${rowData.code}`}
                />
            </div>
        );
    }

    if(showError){
        return(
                <Error mensaje={'Hubo un problema con la carga del listado de puntos de ventas'}></Error>
        );
    } 

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Puntos de ventas</h5>
                    <Toast ref={toast} />

                     <DataTable ref={dt} value={pointOfSales} lazy
                        paginator first={lazyParams.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                        loading={loadingDatatable}
                        className="p-datatable-gridlines" header={header}
                        >
                        <Column field="code" header="Cod. Pto. Venta"  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Nombre"  ></Column>
                        <Column field="address" header="Dirección"></Column>
                        <Column field="city" header="Ciudad"></Column>
                        <Column field="province" header="Provincia"></Column>
                        <Column header="Cod. QR" body={actionImageQRTemplate}></Column>

                        {/* <Column field="province" header="Provincia"></Column> */}

                        <Column body={actionBodyTemplate}></Column>
                    </DataTable> 
                </div>
            </div>
        </div>
    )

            
}
export default PointOfSaleList;