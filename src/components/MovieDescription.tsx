import {IMovie} from "../interfaces/IMovie.ts";

interface IProps {
    tops: IMovie,
    style: string
}
const MovieDescription = ({ tops, style }: IProps) =>(
    <div className={style}>
        <div className={"movie-title"}>
            {tops.title}
        </div>
        <div className={"movie-release-date"}>
            {tops.release_date?.split('-')[0]}
        </div>
    </div>
);
export default MovieDescription;