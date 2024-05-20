import axios from "axios";
const quotingAPI = {
    getListProducts: () => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/product`;
        return axios.get(url);
    },

    getProductById: async (productId) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/product/${productId}`;
        return axios.get(url);
    },
    getListConditions: () => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/condition`;
        return axios.get(url);
    },
    getPrice: async (productId, conditionIds) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/quote/get-price`;
        return axios.post(url, {
            productId: productId,
            conditionIds: conditionIds
        });
    },
    createOrder: async (data) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/quote`;
        return axios.post(url, data);
    },
    getAllOrders: async () => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/quote/items`;
        return axios.get(url);
    }
}

export default quotingAPI;