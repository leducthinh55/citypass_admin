import axiosClient from 'src/utils/axios-client'
import { CATEGORY } from "src/constants/api";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
const search = async (name, sortBy = SORT_BY, sortDir = SORT_DIR, pageIndex = PAGE_INDEX, pageSize = PAGE_SIZE) => {
    try {
        const params = {
            name,
            sortBy,
            sortDir,
            pageIndex,
            pageSize
        };
        const res = await axiosClient.get(CATEGORY, { params });
        return res;
    } catch (error) {
        return {
            data: [],
            total: 0
        }
    }

}

export {
    search
}