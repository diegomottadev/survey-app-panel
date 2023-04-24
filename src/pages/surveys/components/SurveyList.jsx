
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import Error from '../../../components/Error';
import SurveyService from '../../../services/Surveys/SurveyService'
import { Toast } from 'primereact/toast';
import { BASE_URL } from "../../../helpers/BaseUrl"

export const SurveyList = () => {

    const dt = useRef(null);
    const toast = useRef();

    const IMAGE_API_BASE_URL = `${BASE_URL}/images`;
    const [surveys, setSurveys] = useState(false);
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
                const {data:{data:result, total:total}} =  await SurveyService.all(lazyParams)
                setTotalRecords(total);
                setSurveys(result);
                setLoadingDatatable(false);
               // });
            } catch (err){
                console.log(err);
                console.warn('Hubo un problema con la carga del listado de los resultados de las encuentas');
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

    // const onEditWayPay = (methodPaymentId) => {
    //     navigate(`/paymentMethods/${methodPaymentId}/edit`);
    // }


    // const onDeleteWayPay = (methodPaymentId) => {

    //     Swal.fire({
    //         title: '',
    //         text: '¿Confirma eliminar la forma de pago permanentemente?',
    //         showCancelButton: true,
    //         confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
    //         cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
    //         confirmButtonColor: '#2196F3',
    //         cancelButtonColor: '#fbc02d',
    //       }).then( async(result) => {
    //         /* Read more about isConfirmed, isDenied below */
    //         if (result.isConfirmed) {
    //               let wayPayDelete = await SurveyService.deletePaymentMethod(methodPaymentId);
    //             //   Swal.fire('', `${wayPayDelete.message}`, 'success')
    //               toast.current.show({
    //                 severity: 'success',
    //                 summary: 'Exito',
    //                 detail: `${wayPayDelete.message}`,
    //                 life: 3000,
    //             });
    //               setLazyParams({...lazyParams,page: lazyParams.page});
    //         } 
    //     })
    // }

    const header = (

        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0"></h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => onFilter(e)} placeholder="Buscar..." />
            </span>
        </div>
    );

    // const actionBodyTemplate = (rowData) => {
    //     return (
    //         <div className="actions">
    //             <Button tooltip={"Editar"}  tooltipOptions={{ position: 'top' }} icon="pi pi-pencil" className="p-button-raised p-button-success p-mr-2" onClick={() => onEditWayPay(rowData.id)} />
    //             <Button tooltip={"Eliminar"}  tooltipOptions={{ position: 'top' }} icon="pi pi-trash" className="p-button-raised p-button-danger p-mr-2" onClick={() => onDeleteWayPay(rowData.id)} />

    //             {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteTeacher(rowData)} /> */}
    //         </div>
    //     );
    // }

    const actionBodyImage = (rowData) => {
        return (
            <div className="actions">
                    <img width="100" height="140"
                  src={`${IMAGE_API_BASE_URL}/${rowData.image_name}`}
                  className="img-fluid hover-shadow mx-auto d-block"
                  alt="image_id"
                />
            </div>
        );
    }



    if(showError){
        return(
                <Error mensaje={'Hubo un problema con la carga del listado de los resultados de las encuentas'}></Error>
        );
    } 

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Resultados de las encuestas</h5>
                     <Toast ref={toast} />

                     <DataTable ref={dt} value={surveys} lazy
                        paginator first={lazyParams.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                        loading={loadingDatatable}
                        className="p-datatable-gridlines" header={header}
                        >
                        <Column field="pet" header="Mascota" ></Column>
                        <Column field="age" header="Año"  ></Column>
                        <Column field="size" header="Tamaño"  ></Column>
                        <Column field="necessity" header="Necesidad"  ></Column>
                        <Column field="answer" header="Producto Recomendado"  ></Column>
                        <Column header="Imagen"  body={actionBodyImage}></Column> 
                        <Column field="client.code" header="Punto de venta"></Column> 
                    </DataTable> 
                </div>
            </div>
        </div>
    )

            
}
export default SurveyList;