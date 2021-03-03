import axiosClient from 'src/utils/axios-client'
import { ATTRACTIONS } from "src/constants/api";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
const search = async (name, city, IsTemporarityClosed = false, sortBy = SORT_BY, sortDir = SORT_DIR, pageIndex = PAGE_INDEX, pageSize = PAGE_SIZE) => {
    try {
        const params = {
            name,
            city,
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

export {
    search
}