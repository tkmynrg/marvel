
import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'aed543bfcbb8b6ade58671ec0ef0b9a5';
    const _md5Hash = '992e28432e27e0166986a9a97f4531bf';
    const _ts = 1;
    const _baseOffset = 250;

   const getAllCharacters = async (offset = _baseOffset) => {
        //read authorization doc
        const limit = 9;
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&ts=${_ts}&apikey=${_apiKey}&hash=${_md5Hash}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        //read authorization doc
        const limit = 9;
        const res = await request(`${_apiBase}characters/${id}?limit=${limit}&ts=${_ts}&apikey=${_apiKey}&hash=${_md5Hash}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 250)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10)
        }
    }

    return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;


