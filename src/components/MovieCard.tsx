import {useEffect, useState} from 'react';
import MovieDescription from "./MovieDescription.tsx";
import Modal from 'react-modal';
import loadingGif from '../assets/loadlurk-loading.gif';
import {IMovie} from "../interfaces/IMovie.ts";
import MovieDetail from "./MovieDetail.tsx";
interface IProps {
    tops: IMovie,
    style: string
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const loadImg = (src: string): Promise<string> =>
    new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => resolve(loadingGif);
    });
const MovieCard = ({ tops, style }: IProps) => {
    const cardStyle = "movie-description " + style;
    const [loaded, setLoaded] = useState(false);
    const [src, setSrc] = useState <string>(loadingGif);
    const [modalIsOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const load = async () => {
            await loadImg(
                `https://image.tmdb.org/t/p/w780${tops.poster_path}`
            ).then((src) => {
                setSrc(src);
                setLoaded(true);
            });
        };
        load();
    }, [src, setSrc]);
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div className="responsive">
            <div className="gallery">
                <img
                    alt={tops.original_title}
                    src={src}
                    onClick={openModal}
                />
                {loaded && <MovieDescription tops={tops} style={cardStyle}/>}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <MovieDetail tops={tops} />
                </Modal>
            </div>
        </div>
    )
};
export default MovieCard;