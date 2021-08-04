import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';



export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    //quando a tela for  carregada ele vai executar o código  te tiver ali dentro de userEffect
    useEffect(() => {
        const loadAll = async () => {
            //PEgando a lista total dos filmes
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //EScolhendo o filme featured da página inicial
            //Pegando todos os filmes originais da netflix
            let originals = list.filter(i=>i.slug === 'originals');
            //js para gerar um número aleatório
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length));
            //pegar os dados do filme especifico escolhido aleatóriamente
            let chosen = originals[0].items.results[randomChosen];
            //pegar as informações adicionais que não vieram na primeira chamada da api (numero de seasons)
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeatureData(chosenInfo);
        }

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10)
                setBlackHeader(true);
            else
                setBlackHeader(false);
        }

        window.addEventListener('scroll', scrollListener); //sempre que tiver o evento "scroll" ele vai rodar a função scrollListener

        //remover a função quando sair da página
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
        <div className="page">

            <Header black={blackHeader} />
            
            {featureData &&
                <FeatureMovie item={featureData} />
            }

            <section className="lists">
                {movieList.map((item, key) =>(
                    <div>
                        <MovieRow key={key} title={item.title} items={item.items} />
                    </div>
                ))}
            </section>

            <footer>
                Copiado com <span role="img" aria-label="coração">❤️</span> por mim. :)
            </footer>

            {movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://www.sortyourfuture.com/uploads/contributor/03198803f2ff2b4.gif" />
                </div>
            }
        </div>
    )
}