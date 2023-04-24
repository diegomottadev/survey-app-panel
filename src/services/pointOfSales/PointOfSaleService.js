import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const POINT_OF_SALES_API_BASE_URL = `${BASE_URL}/clients`;

class PointOfSaleService {

    create = (pointOfSale) => {
        return axios.post(POINT_OF_SALES_API_BASE_URL, pointOfSale);
    };


    get = (poinOfSaleId) => {
        return axios.get(`${POINT_OF_SALES_API_BASE_URL}/${poinOfSaleId}`);
    };

    update = async (poinOfSaleId, body) => {
        const response = await axios.put(`${POINT_OF_SALES_API_BASE_URL}/${poinOfSaleId}`, body);
        return response.data;
    };

    delete = async (poinOfSaleId) => {
        const response = await axios.delete(`${POINT_OF_SALES_API_BASE_URL}/${poinOfSaleId}`);
        return response.data;
    };

    all = async (params) => {

        let url = `${POINT_OF_SALES_API_BASE_URL}?page=${params.page+1}`;
        if(params.search!==null){
            let keys = Object.keys(params.search);
            url = `${POINT_OF_SALES_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
        }
        return await axios.get(url);
    }

    export= async (params) => {

        let url = `${POINT_OF_SALES_API_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${POINT_OF_SALES_API_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }

    import = async (formData) =>{
        let url = `${POINT_OF_SALES_API_BASE_URL}/import`;
        const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response
    }
}

export default new PointOfSaleService();