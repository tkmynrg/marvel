
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

    getAllCharacters = async () => {
        //read authorization doc
        const limit = 9;
        const offset = 250;
        const res = await this.getSource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&ts=${this._ts}&apikey=${this._apiKey}&hash=${this._md5Hash}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        //read authorization doc
        const limit = 9;
        const offset = 250;
        const res = await this.getSource(`${this._apiBase}characters/${id}?limit=${limit}&offset=${offset}&ts=${this._ts}&apikey=${this._apiKey}&&hash=${this._md5Hash}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 250)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;


