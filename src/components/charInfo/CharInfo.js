import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import {Link} from "react-router-dom";

import "./charInfo.scss";

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const hasError = thumbnail.includes("image_not_available");
    const imgClassName = `randomchar__img ${hasError ? "error" : ""}`;

    return (
        <>
            <div className="char__basics">
                <img className={imgClassName} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a
                            target={"_blank"}
                            rel="noreferrer"
                            href={homepage}
                            className="button button__main"
                        >
                            <div className="inner">homepage</div>
                        </a>
                        <a
                            target={"_blank"}
                            rel="noreferrer"
                            href={wiki}
                            className="button button__secondary"
                        >
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Comics is not yet"}
                {comics.map((item, i) => {
                    const comicsId = item.resourceURI.split('/').pop();
                    return (
                        <li key={i} className="char__comics-item">
                            <Link to={`/comics/${comicsId}`}>
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
