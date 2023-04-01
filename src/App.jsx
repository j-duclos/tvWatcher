import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { TVShowList } from "./components/TVShowList/TVShowList";
import s from "./style.module.css";
import { BACKDROP_URL } from "./config";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/logo.png";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        try {
            const popularTVShowList = await TVShowAPI.fetchPopulars();
            if (popularTVShowList.length > 0) {
                setCurrentTVShow(popularTVShowList[0]);
            }
        } catch (error) {
            alert(error);
        }
    }

    async function fetchRecommendations(tvShowId) {
        try {
            const recommendationListResp = await TVShowAPI.fetchRecommendations(tvShowId);
            if (recommendationListResp.length > 0) {
                setRecommendationList(recommendationListResp.slice(0, 10));
            }
        } catch (error) {
            alert(error);
        }
    }

    async function fetchByTitle(title) {
        try {
            const searchResponse = await TVShowAPI.fetchByTitle(title);
            if (searchResponse.length > 0) {
                setCurrentTVShow(searchResponse[0]);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTVShow) {
            fetchRecommendations(currentTVShow.id); 
        }
    }, [currentTVShow]);

    function updateCurrentTVShow(tvshow) {
        setCurrentTVShow(tvshow);
    }

    return (
        <div 
            className={s.main_container}
            style={{
                background: currentTVShow 
                ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), 
                    url("${BACKDROP_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` 
                : "black",
            }}
        >
             <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo 
                            img={logoImg} 
                            title={"Showvisor"} 
                            subtitle={"Shows to watch"}
                        />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <SearchBar onSubmit={fetchByTitle} />
                    </div> 
                </div>
             </div>
             <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommended_shows}>
                {currentTVShow && (
                    <TVShowList 
                        onClickItem={updateCurrentTVShow}
                        tvShowList={recommendationList} 
                    />
                )}
            </div>    
        </div>
    );
} 