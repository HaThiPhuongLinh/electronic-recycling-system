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

    getConditionById: async (conditionId) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/condition/${conditionId}`;
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

    getOrderById: async (quotingItemId) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/quote/item/${quotingItemId}`;
        return axios.get(url);
    },

    getAllOrders: async () => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/quote/items`;
        return axios.get(url);
    },

    updateCondition: async (data) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/condition`;
        return await axios.put(url, data);
    },

    addCondition: async (data) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/condition`;
        return await axios.post(url, data);
    },

    updateProduct: async (data) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/product`;
        return await axios.put(url, data);
    },

    deleteProduct: async (id) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/product/${id}`;
        return await axios.delete(url);
    },

    addProduct: async (data) => {
        const url = `${process.env.REACT_APP_PORT_QUOTING}/api/v1/product`;
        return await axios.post(url, data);
    },
}

export default quotingAPI;