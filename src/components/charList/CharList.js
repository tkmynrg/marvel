import { Component } from "react";
import MarvelService from "../../services/MarvelService";

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';


class CharList extends Component  {
    state = {
        char: {},
        loading: true,
        error: false,
        retryCount: 0,
        characters: []
    }

    marvelService = new MarvelService();


    allCharRender = () => {
        // вызываем метод для получения персонажей с сервера
        this.marvelService.getAllCharacters()
            .then(this.onAllCharLoaded) // обрабатываем ответ
    }

// обновляем состояние массива characters при получении ответа с сервера
    onAllCharLoaded = (characters) => {
        this.setState({
            characters,
            error: false,
        });
    }



    componentDidMount() {
        this.allCharRender();
    }

    render () {
        const {char,characters} = this.state;
        const charList = characters.map((char, index) => {
            const { id, name, thumbnail } = char;
            const hasError = thumbnail.includes("image_not_available.jpg");
            const imgClassName = ` ${hasError ? "error" : ""}`
            return (
                <li key={index} className="char__item">
                    <img className={imgClassName} src={thumbnail} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            );
        });
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charList}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;