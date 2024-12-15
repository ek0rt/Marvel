import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelServices';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicID} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError}  = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicID])

    let updateComic = () => {
        clearError();
        getComic(comicID)
        .then(onComicLoaded)
    }

    let onComicLoaded = (comic) => {
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}></View> : null

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
        
    )
}

const View = ({comic}) => {
    const {thumbnail, descr, title, prices, pageCount, language} = comic;
  return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
  )
}

export default SingleComicPage;