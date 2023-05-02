import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PointOfSaleService from "../../services/pointOfSales/PointOfSaleService";
import AppBreadcrumb from "../../components/_pesitos/AppBreadcrumb";
import Error from "../../components/Error";
import PointOfSaleDetailItem from "./components/PointOfSaleDetailItem";
import { Toolbar } from "primereact/toolbar";

const PointOfSalesAllView = () => {
    
  const navigate = useNavigate();

  const [pointOfSales, setPointOfSales] = useState(null);
  const [totalPointOfSales, setTotalPointOfSales] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    async function loadLazyData() {
      try {
        setShowError(false);
        const {
          data: {
            data: { rows: result, count: total },
          },
        } = await PointOfSaleService.all();
        setPointOfSales(result);
         setTotalPointOfSales(total);
        // });
      } catch (err) {
        console.log(err);
        console.warn(
          "Hubo un problema con la carga del listado de puntos de ventas para impresión"
        );
        setShowError(true);
      }
    }
    loadLazyData();
  }, []);

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

  

    const toolbarLeftTemplate = () => {
        return (
            <div>
                <p><h2> {totalPointOfSales} puntos de ventas</h2></p>
            </div>
        );
    };

    const toolbarRightTemplate = () => {
        return (
            <>
            <Button
                  style={{ marginRight: '.5em' }}
                  label="Imprimir"
                  icon="pi pi-print"
                  onClick={() => window.print()} 
                  
                />
            <Button
                  label="Volver"
                  icon="pi pi-arrow-circle-left"
                  className="p-button-raised p-button-secondary"
                  onClick={goBackPointOfSaleList}
                />
        </>
        );
    };

  if (showError) {
    return (
      <Error
        mensaje={
          "Hubo un problema con la carga del listado de puntos de ventas para impresión"
        }
      ></Error>
    );
  }

  if(!pointOfSales){
    return(
        <Error mensaje={'Hubo un problema con la carga del listado de puntos de ventas'}></Error>
    );
  }

  return (
    <>
      <AppBreadcrumb meta={"Puntos de ventas / Impresión"} />
      <div className="layout-content">

        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar left={toolbarLeftTemplate} right={toolbarRightTemplate}></Toolbar>
                </div>
            </div>
        </div>

        <div className="grid">
          <div className="col-12">
            <div className="card">
              <h5>Impresión de puntos de venta</h5>
              <div id="invoice-content">
                {
                    pointOfSales.map((pointOfSale, key) => <PointOfSaleDetailItem key={key}  pointOfSale={pointOfSale} />)

                }
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointOfSalesAllView;
