import axios from 'axios';
import { apiPaths } from './paths';
axios.defaults.withCredentials = true

const apiCall = async (apiType, id = null, data = null) => {
    switch(apiPaths[apiType].requestType){
        case 'get':
            return await axios.get(apiPaths[apiType].url + (id||""));
        case 'post':
            return await axios.post(apiPaths[apiType].url + (id||""), data)
        case 'delete':
            return await axios.delete(apiPaths[apiType].url + (id||""));
        case 'patch':
            return await axios.patch(apiPaths[apiType].url + (id||""), data);        
    }
}

export default apiCall;