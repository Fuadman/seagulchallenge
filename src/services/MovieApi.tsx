import axios from "axios";
import {IDetailPayload} from "../interfaces/IPayloads.ts";
import { get, set } from 'idb-keyval';

export const getMoviesV2 = async ({ language, apiKey, page, category }: IDetailPayload)  => {
    const url = `https://api.themoviedb.org/3/movie/${category}?language=${language}&api_key=${apiKey}&page=${page}`;
    const cachedData = await get(url);
    if (cachedData) {
        setTimeout(() => {
        return cachedData;
        }, 1000);
    }
    const {data} = await axios.get(url);
    await set(url, data);
    return data;
}