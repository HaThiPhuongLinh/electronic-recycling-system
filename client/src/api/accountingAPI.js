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
    },

    getAllTransactions: () => {
        const url = `${process.env.REACT_APP_PORT_ACCOUNTING}/api/v1/transaction/items`;
        return axios.get(url)
    },

    newResellItem: (quotingItemId) => {
        const url = `${process.env.REACT_APP_PORT_ACCOUNTING}/api/v1/resell/new-item`;
        return axios.post(url, null, {
            params: { quoting_item_id: quotingItemId }
        });
    },

    newRecyclingItem: (request) => {
        const url = `${process.env.REACT_APP_PORT_ACCOUNTING}/api/v1/recycling/new-item`;
        return axios.post(url, request);
    },

    getAccessories: () => {
        const url = `${process.env.REACT_APP_PORT_ACCOUNTING}/accessory`;
        return axios.get(url);
    }
}

export default accountingAPI;

