import { FiveStarRating } from "../FiveStarRating/FiveStarRating";
import s from "./style.module.css";

export function TVShowDetail({ tvShow }){
    const rating = tvShow.vote_average / 2;
    return <div>
        <div className={s.title}>{tvShow.name}</div> 
        <div className={s.rating_container}>
            
            <span className={s.rating}>{rating}/5 <FiveStarRating rating={rating} /></span>
        </div>
        <div className={s.overview}>{tvShow.overview}</div>
    </div>;
}