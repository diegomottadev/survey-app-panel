import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const SURVEY_API_BASE_URL = `${BASE_URL}/surveys`;

class SurveyService {

    create = (methodPayment) => {
        return axios.post(SURVEY_API_BASE_URL, methodPayment);
    };

    all = async (params) => {
        let url = `${SURVEY_API_BASE_URL}?page=${params.page+1}`;
        if(params.search!==null){
            let keys = Object.keys(params.search);
            url = `${SURVEY_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
        }
        return await axios.get(url);
    }

    export= async (params) => {

        let url = `${SURVEY_API_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${CATEGORY_API_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;
      }
}

export default new SurveyService();