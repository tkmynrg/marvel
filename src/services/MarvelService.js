
import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

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

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}&ts=${_ts}&hash=${_md5Hash}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        //read authorization doc
        const limit = 9;
        const res = await request(`${_apiBase}characters/${id}?limit=${limit}&ts=${_ts}&apikey=${_apiKey}&hash=${_md5Hash}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(
            `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&ts=${_ts}&apikey=${_apiKey}&hash=${_md5Hash}`

        );
        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await request(
            `${_apiBase}comics/${id}?apikey=${_apiKey}&ts=${_ts}&hash=${_md5Hash}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            // optional chaining operator
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
        };
    };

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

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;


