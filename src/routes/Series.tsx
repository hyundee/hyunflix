import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IGetData, getTvPopular, getTvRated, getTvTrending } from "../api";
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

function Series() {
  const location = useLocation();
  const { data: tvRated, isLoading: RatedLoading } = useQuery<IGetData>(
    ["tv", "tvRated"],
    getTvRated
  );
  const { data: tvTrending, isLoading: TrendingLoading } = useQuery<IGetData>(
    ["tv", "tvTrending"],
    getTvTrending
  );
  const { data: tvPopular, isLoading: PopularLoading } = useQuery<IGetData>(
    ["tv", "tvPopular"],
    getTvPopular
  );
  const loading = RatedLoading || TrendingLoading || PopularLoading;
  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper>
          <Banner data={tvRated} />
          <List>
            <Title>Series TOP 10 </Title>
            <RankingCarousel data={tvRated} type={categories.TV} />
            <Title>TV Trending</Title>
            <Carousel data={tvTrending} type={categories.TV} />
            <Title>TV Popular</Title>
            <Carousel data={tvPopular} type={categories.TV} />
          </List>
          <CategoryModal type={categories.TV} path={location.pathname} />
        </Wrapper>
      )}
    </>
  );
}

export default Series;
