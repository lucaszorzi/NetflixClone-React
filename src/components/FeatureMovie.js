import React from 'react';
import './FeatureMovie.css';

export default ({item}) => {

    //pegar a data completa passada pela api e colocar numa tipo Date do js para depois extrair apenas o ano para mostrar na featured da home com o getFullYear()
    let firstData = new Date(item.first_air_date);
    //pegar o objeto que a api passa com todos os dados de genero (id, nome) para jogar só os nomes em outo array para mostrar na home
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if(description.length > 200)
        description = description.substring(0, 200) + '...';    

    return (
        <section className="featured" style= {{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} ponto{item.vote_average !== 1 ? 's' : ''}</div>
                        <div className="featured--year">{firstData.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}