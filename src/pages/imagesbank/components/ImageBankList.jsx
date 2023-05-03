
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../../components/Error';
import Swal from 'sweetalert2'
import { Toast } from 'primereact/toast';
import { BASE_URL } from "../../../helpers/BaseUrl"
import ImageBankService from '../../../services/imagesbank/ImageBankService';

const IMAGES_API_BASE_URL = `${BASE_URL}/images`;

const ImageBankList = () => {

    const dt = useRef(null);
    const toast = useRef();

    const navigate = useNavigate();

    const [images, setImages] = useState(false);
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
                const {data:{data:{rows:result, count:total}}} =  await ImageBankService.all(lazyParams)
                setTotalRecords(total);
                setImages(result);
                setLoadingDatatable(false);
               // });
            } catch (err){
                console.log(err);
                console.warn('Hubo un problema con la carga del listado de las imagenes de productos');
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

    const onDeleteImage = (imageId) => {
        Swal.fire({
            title: '',
            text: '¿Confirma eliminar la imagen permanentemente?',
            showCancelButton: true,
            confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
            cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#fbc02d',
          }).then( async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                  let imageDeleted = await ImageBankService.delete(imageId);
                //   Swal.fire('', `${imageDeleted.message}`, 'success')
                  toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `${imageDeleted.message}`,
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


    const actionBodyImage = (rowData) => {
        return (
            <div className="actions">
                    <img width="50" height="70"
                  src={`${IMAGES_API_BASE_URL}/${rowData.name}`}
                  className="img-fluid hover-shadow mx-auto d-block"
                  alt="image_id"
                />
            </div>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">

                <Button tooltip={"Eliminar"}  tooltipOptions={{ position: 'top' }} icon="pi pi-trash" className="p-button-raised p-button-danger p-mr-2" onClick={() => onDeleteImage(rowData.name)} />

            </div>
        );
    }

    if(showError){
        return(
                <Error mensaje={'Hubo un problema con la carga del listado de las imagenes de productos'}></Error>
        );
    } 

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Puntos de ventas</h5>
                    <Toast ref={toast} />

                     <DataTable ref={dt} value={images} lazy
                        paginator first={lazyParams.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                        loading={loadingDatatable}
                        className="p-datatable-gridlines" header={header}
                        >
                        <Column field="name" header="Cod. Imagen"  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="filename" header="Nombre de image"></Column>
                        <Column header="Imagen" body={actionBodyImage}></Column>
                        <Column  body={actionBodyTemplate}></Column>
                    </DataTable> 
                </div>
            </div>
        </div>
    )

            
}
export default ImageBankList;