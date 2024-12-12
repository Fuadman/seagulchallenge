import apiService from '../services/api.service';
import {useEffect, useState} from 'react';
import MovieCard from "./MovieCard.tsx";
import {IMovie} from "../interfaces/IMovie.ts";

export default function Movies() {
    const [data, setData] = useState<IMovie[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const [rule, setRule] = useState('prime');
    const [page, setPage] = useState(1);
    const [language, setLanguage] = useState("en");
    const [category, setCategory] = useState("popular");
    const totalPages = 500;

    const fetchMovie = () => {
        const apiKey = '1b501bbda107113acc653f328a2e935d';
        setTimeout(() => {
            apiService
                .getMovies({
                    language,
                    apiKey,
                    page,
                    category
                })
                .then((data) => {
                    setData((prevData:IMovie[]) => [...prevData, ...data.data.results]);
                    setIsloading(false);
                });
        }, 0);
    }
    useEffect(() => {
        fetchMovie();
    }, [page]);
    const resetData = ()=>{
        if(data.length > 0){
            setPage(1);
            setData([]);
            fetchMovie();
        }
    }
    useEffect(() => {
        resetData();
    }, [language, category]);
    const handleScroll = () => {
        if (
            document.body.scrollHeight - 300 <
            window.scrollY + window.innerHeight
        ) {
            setIsloading(true);
        }
    };

    function debounce(func: any, delay: number) {
        let timeoutId: number;
        return function (...args: any) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    window.addEventListener("scroll", debounce(handleScroll, 20));
    useEffect(() => {
        if (isLoading && page+1<=totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isLoading]);

    const isPrimeNumber = (numb: number) => {
        let isPrime = true;
        if (numb < 2) {
            isPrime = false;
        } else {
            for (let i = 2; i <= numb / 2; i++) {
                if (numb % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        return isPrime;
    }
    const calculateRule = (ru: number) => {
        switch (rule) {
            case "oddeven":
                return ru % 2 == 0 ? 'red-background' : 'orange-background';
            case "prime":
                return isPrimeNumber(ru) ? 'red-background' : 'orange-background';
            default:
                return 'red-background';
        }
    };
    return (
        <>
            <div className={'movies-container'}>
                <div className={"filters-container"}>
                    <div className={"category"}>
                        Category:
                        <select value={category}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
                            <option value="popular">Popular</option>
                            <option value="top_rated">Top Rated</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="now_playing">Now Playing</option>
                        </select>
                    </div>
                    <div className={"filters"}>
                        <div className={"language"}>
                            Language:
                            <select value={language}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}>
                                <option value="en">en</option>
                                <option value="es">es</option>
                            </select>
                        </div>
                        <div className={"rule"}>
                            Rule:
                            <select value={rule}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRule(e.target.value)}>
                                <option value="prime">Prime</option>
                                <option value="oddeven">Odd / Even</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className="img-gallery">
                    {data.map((item:IMovie, i) => (
                        <MovieCard
                            tops={item}
                            key={item.id+i}
                            style={calculateRule(i)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
