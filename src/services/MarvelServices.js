import { useHttp } from "../components/hooks/http.hook";

const useMarvelService = () => {

  const {request, clearError, process, setProcess} = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
  const  _apiKey = 'apikey=7f67276edf45bf4f05ecb7c670180655';
  const  _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
  }

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
}

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
}

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  }

  const getAllComics = async (offset = 0) => {
      const res = await request(`${_apiBase}comics?limit=12&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformComics);
    }


  const _transformComics = (comics) => {
    return {
        id: comics.id,
        thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
        language: comics.textObjects.language || 'en-us',
        description: comics.description || 'There is no description',
        title: comics.title,
        prices: comics.prices[0].price ? `${comics.prices[0].price}$` : 'nicht verfugbar',

    }
}

  const _transformCharacter = (char) => {
      return {
          id: char.id,
          name: char.name,
          description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
          thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
          homepage: char.urls[0].url,
          wiki: char.urls[1].url,
          comics: char.comics.items
      }
  }



  return {
          clearError, 
          process, 
          request, 
          getAllComics, 
          setProcess,
          getComic, 
          getAllCharacters, 
          getCharacter, 
          getCharacterByName} 
  
}

export default useMarvelService;