import s from "./style.module.css";
import { TVShowListItem } from "../TVShowListItem/TVShowListItem";

export function TopTVShowList({ tvShowList, onClickItem }){
    return (
        <div>
            <div className={s.title}>Top Rated TV Shows:</div>
            <div className={s.list}>
                {
                    tvShowList.map((tvShow) => {
                        return (
                            <span className={s.tv_show_item} key={tvShow.id}>
                                <TVShowListItem 
                                    tvShow={tvShow} 
                                    onClick={onClickItem}
                                />
                            </span>
                        );
                    })
                }
            </div>
        </div>
    );
}