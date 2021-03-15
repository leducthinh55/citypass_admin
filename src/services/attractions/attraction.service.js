import axiosClient from 'src/utils/axios-client'
import { ATTRACTIONS, ATTRACTIONS_ALL } from "src/constants/api";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
const search = async (name, city, category, IsTemporarityClosed = false, sortBy = SORT_BY, sortDir = SORT_DIR, pageIndex = PAGE_INDEX, pageSize = PAGE_SIZE) => {
    try {
        const params = {
            name,
            city,
            category,
            IsTemporarityClosed,
            sortBy,
            sortDir,
            pageIndex,
            pageSize
        };
        const res = await axiosClient.get(ATTRACTIONS, { params });
        return res;
    } catch (error) {
        return {
            data: [],
            total: 0
        }
    }

}
const getAll = async() => {
    await axiosClient.get(ATTRACTIONS_ALL);
}
const create = async (data) => {
    return await axiosClient.post(ATTRACTIONS, data);
}
const update = async (data) => {
    return await axiosClient.put(ATTRACTIONS, data);
}
const searchById = async (id) => {
    try {
        const res = await axiosClient.get(`${ATTRACTIONS}/${id}`);
        return res;
    } catch (error) {
        return null

    }
}
const deleteAttraction = async (id) => {
    try {
        const res = await axiosClient.delete(`${ATTRACTIONS}/${id}`);
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
    getAll,
    searchById,
    deleteAttraction,
    create,
    update
}