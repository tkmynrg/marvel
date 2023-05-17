import React, { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./randomChar.scss";

const RandomChar = () => {
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();


    useEffect(() => {
        updateChar();
    },[]);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
            getCharacter(id)
            .then(onCharLoaded);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = errorMessage || spinner || <View char={char} />;

    return (
        <div className="randomchar">
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    // const hasError = thumbnail.includes("image_not_available");
    const imgClassName = `randomchar__img`;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClassName} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a target={"_blank"} href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a target={"_blank"} href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
