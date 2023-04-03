
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'aed543bfcbb8b6ade58671ec0ef0b9a5';
    _md5Hash = '992e28432e27e0166986a9a97f4531bf';
    _ts = 1;
    getSource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        //read authorization doc
        const limit = 9;
        const offset = 250;
        return this.getSource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&ts=${this._ts}&apikey=${this._apiKey}&hash=${this._md5Hash}`);
    }

    getCharacter = (id) => {
        //read authorization doc
        const limit = 9;
        const offset = 250;
        return this.getSource(`${this._apiBase}characters/${id}?limit=${limit}&offset=${offset}&ts=${this._ts}&apikey=${this._apiKey}&&hash=${this._md5Hash}`);
    }
}

export default MarvelService;


