import axios from "axios";
const accountingAPI = {
    newTransacton: (quotingItemId) => {
        const url = `${process.env.REACT_APP_PORT_ACCOUNTING}/api/v1/transaction/new-item`;
        return axios.post(url, null, {
            params: { quoting_item_id: quotingItemId }
        });
    },

    checkTransaction: (quotingItemId) => {
        const url = `${process.env.REACT_APP_PORT_ACCOUNTING}/api/v1/transaction/item`;
        return axios.get(url, {
            params: { quoting_item_id: quotingItemId }
        });
    }
}

export default accountingAPI;

