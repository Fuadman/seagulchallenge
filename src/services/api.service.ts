import axios from 'axios';
import {IDetailPayload} from "../interfaces/IPayloads.ts";
class ApiService {
  getMovies({ language, apiKey, page, category }: IDetailPayload) {
    const url = `https://api.themoviedb.org/3/movie/${category}?language=${language}&api_key=${apiKey}&page=${page}`;

    return axios.get(url);
  }
}

export default new ApiService();
