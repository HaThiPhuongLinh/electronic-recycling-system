import axios from "axios";
const receivedAPI = {
    receivedItem: (quotingItemId) => {
        const url = `${process.env.REACT_APP_PORT_RECEIVING}/api/v1/received/new-item`;
        return axios.post(url, null, {
            params: { quoting_item_id: quotingItemId }
        });
    },

    getPENDINGItems: (status) => {
        const url = `${process.env.REACT_APP_PORT_RECEIVING}/api/v1/received/items`;
        return axios.get(url, {
            params: { status,},
        });
    },

    getACCEPTEDItems: (status) => {
        const url = `${process.env.REACT_APP_PORT_RECEIVING}/api/v1/assessment/items`;
        return axios.get(url, {
            params: { status,},
        });
    },
    
    updateReceivedItem: (payloadString, files) => {
        const url = `${process.env.REACT_APP_PORT_RECEIVING}/api/v1/received/update`;
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: {
                payload: payloadString
            }
        });
    },

    updateAssessedItem: (payloadString, files) => {
        const url = `${process.env.REACT_APP_PORT_RECEIVING}/api/v1/assessment/update`;
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: {
                payload: payloadString
            }
        });
    },

}

export default receivedAPI;