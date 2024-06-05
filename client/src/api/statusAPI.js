import axios from "axios";
const statusAPI = {
    getStatusById:  (quotingItemId) => {
        const url = `${process.env.REACT_APP_PORT_STATUS}/api/v1/itemstatus/${quotingItemId}`;
        return axios.get(url);
    }
}

export default statusAPI;