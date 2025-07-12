import { getAll } from '../services/request'

const useGetData = async () => {
    const data = await getAll();

    return { data }
}

export {
    useGetData
}