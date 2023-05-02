import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppBreadcrumb from "../../../components/_pesitos/AppBreadcrumb";
import PointOfSaleService from "../../../services/pointOfSales/PointOfSaleService";
import Error from "../../../components/Error";
import { BASE_URL } from "../../../helpers/BaseUrl";
import "./PointOfSaleView.css";
import { Toolbar } from "primereact/toolbar";
const POINT_OF_SALES_API_BASE_URL = `${BASE_URL}/clients`;
const PointOfSaleView = () => {
  const toast = useRef();
  const navigate = useNavigate();
  const { pointOfSaleId } = useParams();

  const [pointOfSale, setPointOfSale] = useState(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [link, setLink] = useState("");
  const [errorResponse, setErrorResponse] = useState(false);

  useEffect(() => {
    const fetchPointOfSale = async () => {
      try {
        const { data: response } = await PointOfSaleService.get(pointOfSaleId);
        setPointOfSale(response.data);
        setName(response.data.name || "");
        setCode(response.data.code || "");
        setAddress(response.data.address || "");
        setCity(response.data.city || "");
        setProvince(response.data.province || "");
        setLink(response.data.link || "");
      } catch (error) {
        console.error(error);
      }
    };

    if (pointOfSaleId) {
      fetchPointOfSale();
    }
  }, [pointOfSaleId]);

  const goBackPointOfSaleList = () => {
    navigate("/pointOfSales");
  };

  const [printStyle, setPrintStyle] = useState(null);

  useEffect(() => {
    setPrintStyle(
      document.createElement("style", { media: "print" }).appendChild(
        document.createTextNode(`
          @page {
            size: auto;
            margin: 0mm;
            page-break-after: always;
          }
        `)
      )
    );
    return () => {
      printStyle && printStyle.remove();
    };
  }, []);

  const handleClick = () => {
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia("print");
      mediaQueryList.addEventListener("change", (mql) => {
        if (!mql.matches) {
          window.setTimeout(() => {
            window.close();
          }, 1000);
        }
      });
      const printParams = {
        base: "",
        checkReady: () => {
          return true;
        },
        printMode: window.printMode || 0,
        retainUI: false,
        stylesheet: printStyle,
        type: "pdf",
        documentTitle: document.title,
        pages: [1],
      };
      window.print(printParams);
    }
  };

  if (!pointOfSaleId) {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `No existe el punto de venta`,
      life: 3000,
    });
    <div>
      <div className="layout-content">
        <Toast
          ref={toast}
          onHide={() => {
            if (errorResponse) return;
            navigate("/pointOfSales");
          }}
        />
        <Error mensaje={"No existe el punto de venta"}></Error>
      </div>
    </div>;
  }


  const toolbarLeftTemplate = () => {
    return (
        <>
            <Button
                  style={{ marginRight: '.5em' }}
                  label="Imprimir"
                  icon="pi pi-print"
                  onClick={handleClick}
                  
                />
        </>
    );
};
const toolbarRightTemplate = () => {
    return (
        <>
           <Button
                  label="Volver"
                  icon="pi pi-arrow-circle-left"
                  className="p-button-raised p-button-secondary"
                  onClick={goBackPointOfSaleList}
                />
        </>
    );
};



const ToolBarDetail = () => (
    <div className="grid">
        <div className="col-12">
            <div className="card">
                <Toolbar left={toolbarLeftTemplate} right={toolbarRightTemplate}></Toolbar>
            </div>
        </div>
    </div>
);



  return (
    <>
      <AppBreadcrumb meta={"Punto de venta / Detalle"} />
      <div className="layout-content">
        <ToolBarDetail/>
        <div className="grid">
          <div className="col-12">
            <div className="card">
              <h5>Detalle punto de venta</h5>
              <div className="card p-fluid">
                <div id="invoice-content">
                  <div className="invoice-wrapper">
                    <div className="invoice-content">
                      <div className="invoice-header">
                        <div className="mx-auto d-block">
                          <img
                            src={`${POINT_OF_SALES_API_BASE_URL}/${code}/qrcode`}
                            alt={`qr-code-${code}`}
                          />
                        </div>
                      </div>
                      <div className="invoice-footer grid grid-nogutter">
                        <div className="col-12 md:col-12">
                          <div className="invoice-table-2 grid grid-nogutter">
                            <div className="col-6">
                              <div className="invoice-table-col header-col">
                                <span>Enlace de redirección</span>
                                <span>Cod.</span>
                                <span>Nombre</span>
                                <span>Dirección</span>
                                <span>Ciudad</span>
                                <span>Provincia</span>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="invoice-table-col content-col">
                                <span>{link}</span>
                                <span>{code}</span>
                                <span>{name}</span>
                                <span>{address}</span>
                                <span>{city}</span>
                                <span>{province}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointOfSaleView;
