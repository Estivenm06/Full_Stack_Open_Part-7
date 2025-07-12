import { useGetData } from "./useGetData";

const useCountry = async (name) => {
    const { data } = await useGetData();
    
    const country = data.find(country => country.name.common.toUpperCase().includes(name.toUpperCase()));
    return { country }
};

export {
    useCountry
}