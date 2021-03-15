import axiosClient from 'src/utils/axios-client'
import { TICKET_TYPE } from "src/constants/api";
import axios from "axios";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
const search = async (name, priceFrom, priceTo,priceType,attraction, city, sortBy = SORT_BY, sortDir = SORT_DIR, pageIndex = PAGE_INDEX, pageSize = PAGE_SIZE) => {
    try {
        const params = {
            name, priceFrom, priceTo,priceType, attraction, city,
            sortBy,
            sortDir,
            pageIndex,
            pageSize
        };
        const res = await axiosClient.get(TICKET_TYPE, { params });
        return res;
    } catch (error) {
        return {
            data: [],
            total: 0
        }
    }

}
const create = async (data) => {
    return await axiosClient.post(TICKET_TYPE, data);
}
const update = async (data) => {
    return await axiosClient.put(TICKET_TYPE, data);
}
const searchById = async (id) => {
    try {
        const res = await axiosClient.get(`${TICKET_TYPE}/${id}`);
        return res;
    } catch (error) {
        return null

    }
}
const deleteTicketType = async (id) => {
    try {
        const res = await axiosClient.delete(`${TICKET_TYPE}/${id}`);
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