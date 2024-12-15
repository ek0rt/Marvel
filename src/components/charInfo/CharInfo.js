import './charInfo.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelServices';
import setContent from '../../utils/setContent';

function CharInfo(props) {
    let [char, setChar] = useState(null)

     const {getCharacter, clearError, process, setProcess}  = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId ])

  
    let updateChar = () => {
        const {charId} = props;

        if(!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))
    }

    let onCharLoaded = (char) => {
        setChar(char)
    }  

        return (
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
        )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics, id} = data;


    let styleImg = {'objectFit': 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleImg = {'objectFit': 'unset'}
    }

    return (
        <>
            <div className="char__basics">
            <img src={thumbnail} alt="abyss" style={styleImg}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There is no comics with this character'}
            {
                comics.map((item, i) => {
                    // eslint-disable-next-line 
                    if(i > 5) return;
                    return (
                        <li className="char__comics-item" 
                        key={i}>
                             <Link to={`/comics/${item.resourceURI.substring(43)}`}> {item.name}</Link>                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;
