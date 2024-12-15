import './comicsList.scss';
import { useState,useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServices';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting': 
            return <Spinner/>;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed': 
            return <Component/>;
        case 'error': 
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
        
    }
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(140)
    const [charEnded, setCharEnded] = useState(false)
    const {loading, error, getAllComics, setProcess, process} =  useMarvelService();


   useEffect(() => {
        onRequest(offset, true);
   }, []) 

    const onRequest = (offset, initial) => {
       initial ?  setNewItemLoading(false) :  setNewItemLoading(true);
        getAllComics(offset)
        .then(ComicsListLoaded)
        .then(() => setProcess('confirmed'))
    }

    const ComicsListLoaded = (newComicsList) => {
        let enden = false;
        if (newComicsList.length < 12) {
            enden = true
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setCharEnded(enden)
    }

    let renderComicsList = (arr) => {
        let item = arr.map((item, i) => {
            return (
                <li key = {i} className="comics__item">
                <Link to={`${item.id}`} href="#">
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.prices}</div>
                </Link>
            </li>
            )
        })
        return (
            <ul className="comics__grid">
                {item};
             </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderComicsList(comicsList),  newItemLoading)}
            <button 
            disabled={newItemLoading}
            style={{'display' : charEnded ? `none` : 'block' }}
            onClick={() => onRequest(offset)}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;