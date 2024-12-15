import { useState } from "react";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from '../form/Form-final';
import decoration from '../../resources/img/vision.png';
import { Helmet } from 'react-helmet';

const MainPage = () => {

    const [charId, setCharId] = useState(null)

    const  idTransfer = (id) => {
    setCharId(id)
    }
    
    return (
        <>
            <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
             />
             <title>Marvel information</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content"> 
                <ErrorBoundary>
                    <CharList idTransfer={idTransfer}></CharList>
                </ErrorBoundary>
                <div className='sidebar'>
                <ErrorBoundary>
                    <CharInfo charId={charId}></CharInfo>
                </ErrorBoundary>
                        <CharSearchForm/>

            </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;