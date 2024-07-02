import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const Film = () => {
    const [film, setFilm] = useState({
        id: 0,
        producer: "",
        title: "",
        episode_id: "",
        director: "",
        release_date: "",
        opening_crawl: "",
    });

    let params = useParams();
    let filmId = params.filmid;

    useEffect(()=> {
        const fetchFilmById = async () => {
            const response = await fetch('http://localhost:3000/api/films/${filmId}');
            if(!response.ok){
                throw new Error("Data could not be fetched!");
            }
            const json_response = await response.json();
            setFilm(json_response[0]);
        };

        fetchFilmById();
    }, [filmId]);

    return (
        <div>
            <h1 id ="title">{film?.title}</h1>
            <section id="generalInfo">
                <p>ID: {film?.id}</p>
                <p>Producer: {film?.producer}</p>
                <p>Episode: {film?.episode_id}</p>
                <p>Director: {film?.director}</p>
                <p>Release Date: {film?.release_date}</p>

            </section>
            <section id="openingCrawl">
                <h2>Opening Crawl</h2>
                <p>{film?.opening_crawl}</p>
            </section>
        </div>
    );
};