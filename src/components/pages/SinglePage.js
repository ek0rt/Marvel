import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';

import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';


const SinglePage = ({Component, dataType}) => {
   const{id} = useParams();
   const {clearError, getComic, getCharacter, process, setProcess} =  useMarvelService()
   const [data, setData] = useState(null);

   useEffect(() => {
    updateChar()
   }, [id])

   const updateChar = () => {

    clearError();
        
    switch(dataType) {
        case 'comic': 
            getComic(id).then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            break;
        case 'character': 
            getCharacter(id).then(onCharLoaded)
            .then(() => setProcess('confirmed'))
      }
   }

   const onCharLoaded = (char) => {
    setData(char)
  }

  return (
    <>
        <AppBanner/>
        {setContent(process, Component, data)}
    </>
  )

}

export default SinglePage;