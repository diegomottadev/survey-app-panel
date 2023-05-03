
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';import ImageBankService from '../../../services/imagesbank/ImageBankService';
import { Toast } from 'primereact/toast';



const ImageBankToolbar = () => {
    const toast = useRef();

    const navigate = useNavigate();

    const navigateToImportImages = () => {
        navigate('/images/import');
    };


    const onDeleteAllImage = () => {
        Swal.fire({
            title: '',
            text: '¿Confirma eliminar todas imagenes permanentemente?',
            showCancelButton: true,
            confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
            cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#fbc02d',
          }).then( async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                  let imageDeleted = await ImageBankService.deleteAll();
                //   Swal.fire('', `${imageDeleted.message}`, 'success')
                  toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `${imageDeleted.message}`,
                    life: 3000,
                });

            } 
        })
    }

    const toolbarRightTemplate = () => {
        return (
            <>
                <Button label="Importar" icon="pi pi-upload" style={{ marginRight: '.5em' }} className="p-button-info" onClick={navigateToImportImages}/>
            </>
        );
    };


    const toolbarLeftTemplate = () => {
        return (
            <>
                <Button label="Borrar todo" icon="pi pi-trash" style={{ marginRight: '.5em' }} className="p-button-danger" onClick={onDeleteAllImage}/>
            </>
        );
    };
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card" >
                    <Toast ref={toast}  onHide={() => navigate('/images')}/>
                    <Toolbar left={toolbarLeftTemplate}  right={toolbarRightTemplate}></Toolbar>
                </div>
            </div>
        </div>
    );
   
}

export default ImageBankToolbar;