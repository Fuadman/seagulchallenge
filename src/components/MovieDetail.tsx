import {IMovie} from "../interfaces/IMovie.ts";

interface IProps {
    tops: IMovie
}
const MovieDetail = ({ tops }: IProps) => {
    const src = `https://image.tmdb.org/t/p/w780${tops.poster_path}`
    return (
        <div className={'movie-detail'}>
            <img
                alt={tops.original_title}
                src={src}
            />
            <div className={"movie-title"}>
                <span>Original Title:</span> {tops.original_title}
            </div>
            <div className={"movie-release-date"}>
                <span>Release Date:</span> {tops.release_date}
            </div>
            <div className={"movie-overview"}>
                <span>Overview:</span> {tops.overview}
            </div>
        </div>
    );
}
export default MovieDetail;