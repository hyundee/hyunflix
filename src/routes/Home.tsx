import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import {
  IGetData,
  getAllTrending,
  getMovieTrending,
  getTvTrending,
} from "../api";
import { categories } from "../atoms";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import RankingCarousel from "../components/RankingCarousel";
import Modal from "../components/Modal";

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

function Home() {
  const location = useLocation();
  const { data: allTrending, isLoading: allLoading } = useQuery<IGetData>(
    ["all", "allTrending"],
    getAllTrending
  );
  const { data: tvTrending, isLoading: tvLoading } = useQuery<IGetData>(
    ["tv", "tvTrending"],
    getTvTrending
  );
  const { data: movieTrending, isLoading: movieLoading } = useQuery<IGetData>(
    ["movie", "movieTrending"],
    getMovieTrending
  );
  const loading = allLoading || tvLoading || movieLoading;
  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner data={allTrending} />
          <List>
            <Title>Today TOP 10 </Title>
            <RankingCarousel data={allTrending} type={categories.ALL} />
            <Title>TV Trending </Title>
            <Carousel data={tvTrending} type={categories.TV} />
            <Title>MOVIE Trending </Title>
            <Carousel data={movieTrending} type={categories.MOVIE} />
          </List>
          <Modal pathName={location.search} type={categories.ALL} />
        </Wrapper>
      )}
    </>
  );
}

export default Home;
