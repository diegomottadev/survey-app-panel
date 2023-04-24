import React  from 'react';
import AppBreadcrumb from '../../components/_pesitos/AppBreadcrumb';
import SurveyList from './components/SurveyList';

import SurveyToolbar  from './components/SurveyToolbar';


const Survey = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Encuentas | Resultados'} /> 
           <div className="layout-content">
            <SurveyToolbar />
            <SurveyList />
           </div>
        </div>
    );
}
export default Survey;
