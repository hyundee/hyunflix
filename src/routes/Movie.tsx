import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IGetData, getMoviePopular, getMovieRated, getUpComing } from "../api";
import { categories } from "../atoms";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import RankingCarousel from "../components/RankingCarousel";
import CategoryModal from "../components/CategoryModal";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.div`
  padding: 0 0 0 60px;
`;

const Title = styled.div`
  position: relative;
  font-size: 30px;
  font-weight: 400;
  top: -100px;
  margin-bottom: 5px;
`;

function Movie() {
  const location = useLocation();
  const { data: movieRated, isLoading: RatedLoading } = useQuery<IGetData>(
    ["movie", "movieRated"],
    getMovieRated
  );
  const { data: upComing, isLoading: upComingLoading } = useQuery<IGetData>(
    ["movie", "upComing"],
    getUpComing
  );
  const { data: moviePopular, isLoading: PopularLoading } = useQuery<IGetData>(
    ["movie", "moviePopular"],
    getMoviePopular
  );

  const loading = RatedLoading || upComingLoading || PopularLoading;
  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner data={movieRated} />
          <List>
            <Title>Movie TOP 10 </Title>
            <RankingCarousel data={movieRated} type={categories.MOVIE} />
            <Title>Movie Up Coming </Title>
            <Carousel data={upComing} type={categories.MOVIE} />
            <Title>Movie Popular</Title>
            <Carousel data={moviePopular} type={categories.MOVIE} />
            <CategoryModal type={categories.MOVIE} path={location.pathname} />
          </List>
        </Wrapper>
      )}
    </>
  );
}

export default Movie;
