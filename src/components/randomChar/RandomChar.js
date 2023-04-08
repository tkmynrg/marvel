import { Component } from "react";
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
        retryCount: 0
    }

    MAX_RETRY_COUNT = 5;

    marvelService = new MarvelService(); //тоже самое что и this.marvelService, то есть создаем конструктор - синтаксис полей класса

    componentDidMount() {
        this.updateChar();
    }


    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            retryCount: 0,
            error: false
        });
    }

    onError = () => {
        const { retryCount } = this.state;

        if (retryCount < this.MAX_RETRY_COUNT) {
            this.setState({
                retryCount: retryCount + 1
            }, () => {
                this.updateChar();
            });
        } else {
            this.setState({
                loading: false,
                error: true,
                retryCount: 0
            });
        }
    }

    updateChar = () => {
        const { retryCount } = this.state;
        this.onCharLoading();

        if (retryCount < this.MAX_RETRY_COUNT) {
            const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
            this.marvelService
                .getCharacter(id)
                .then(this.onCharLoaded)
                .catch(this.onError);
        }
        if (this.state.error) {
            this.onCharLoading();
        }
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = errorMessage || spinner || <View char={char}/>

        return (
            <div className="randomchar">
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div
                            className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const hasError = thumbnail.includes("image_not_available");
    const imgClassName = `randomchar__img ${hasError ? "error" : ""}`;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClassName}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a target={'_blank'} href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a target={'_blank'} href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;