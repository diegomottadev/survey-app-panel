import React from "react";
import { BASE_URL } from "../../../helpers/BaseUrl";

const POINT_OF_SALES_API_BASE_URL = `${BASE_URL}/clients`;
const PointOfSaleDetailItem = ({ pointOfSale }) => {
  return (
    <div className="card p-fluid">
      <div className="invoice-wrapper">
        <div className="invoice-content">
          <div className="invoice-header">
            <div className="mx-auto d-block">
              <img
                src={`${POINT_OF_SALES_API_BASE_URL}/${pointOfSale.code}/qrcode`}
                alt={`qr-code-${pointOfSale.code}`}
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
                    <span>{pointOfSale.link}</span>
                    <span>{pointOfSale.code}</span>
                    <span>{pointOfSale.name}</span>
                    <span>{pointOfSale.address}</span>
                    <span>{pointOfSale.city}</span>
                    <span>{pointOfSale.province}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointOfSaleDetailItem;
