import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const IMAGES_API_BASE_URL = `${BASE_URL}/images`;

class ImageBankService {

    import = async (formData) =>{
        let url = `${IMAGES_API_BASE_URL}`;
        const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response
    }

    all = async (params) => {

        let url = `${IMAGES_API_BASE_URL}?page=${1}&pageSize=`;

        if(params && params.page !== null){
        
            url = `${IMAGES_API_BASE_URL}?page=${params.page+1}`;
        }
        
        if(params &&  params.search!==null){
            let keys = Object.keys(params.search);
            url = `${IMAGES_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
        }
        return await axios.get(url);
    }
}

export default new ImageBankService();