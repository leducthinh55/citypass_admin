import axiosClient from 'src/utils/axios-client'
import { PASS } from "src/constants/api";
import axios from "axios";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
const search = async (name, priceFrom, priceTo, attraction, city, sortBy = SORT_BY, sortDir = SORT_DIR, pageIndex = PAGE_INDEX, pageSize = PAGE_SIZE) => {
    try {
        const params = {
            name, priceFrom, priceTo, attraction, city,
            sortBy,
            sortDir,
            pageIndex,
            pageSize
        };
        const res = await axiosClient.get(PASS, { params });
        return res;
    } catch (error) {
        return {
            data: [],
            total: 0
        }
    }

}
const create = async (data) => {
    return await axiosClient.post(PASS, data);
}
const update = async (data) => {
    return await axiosClient.put(PASS, data);
}
const searchById = async (id) => {
    try {
        const res = await axiosClient.get(`${PASS}/${id}`);
        return res;
    } catch (error) {
        return null
    }
}
const deleteTicketType = async (id) => {
    try {
        const res = await axiosClient.delete(`${PASS}/${id}`);
        return res;
    } catch (error) {
        return {
            data: [],
            total: 0
        }
    }

}
export {
    search,
    searchById,
    deleteTicketType,
    create,
    update
}