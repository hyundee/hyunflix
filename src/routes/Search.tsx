import { useQuery } from "@tanstack/react-query";
import { IGetData, getMovieSearch, getTvSearch } from "../api";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { categories, keywordState } from "../atoms";
import { useRecoilValue } from "recoil";
import List from "../components/List";
import CategoryModal from "../components/CategoryModal";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  top: 80px;
  padding: 60px;
`;

const Box = styled.div`
  position: initial;
  &:last-child {
    margin-top: 50px;
  }
`;

const Text = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 60px 5px;
  p {
    width: 75%;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    padding-top: 15px;
  }
`;

const Title = styled.div`
  position: relative;
  font-size: 25px;
  font-weight: 400;
  margin: 0 0 5px 10px;
`;

function Search() {
  const keyword = useRecoilValue(keywordState);
  const { data: MovieSearch, isLoading: MovieLoading } = useQuery<IGetData>(
    ["movie", keyword],
    () => getMovieSearch(keyword)
  );
  const { data: TvSearch, isLoading: TvLoading } = useQuery<IGetData>(
    ["tv", keyword],
    () => getTvSearch(keyword)
  );
  const loading = MovieLoading || TvLoading;
  return (
    <Wrapper>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Box>
            <Title>Movie</Title>
            {MovieSearch?.results.length !== 0 ? (
              <Row>
                {MovieSearch?.results.slice(0, 6).map((list) => (
                  <div key={list.id}>
                    <List key={list.id} type={categories.MOVIE} {...list} />
                    <p>{list.title ?? list.name}</p>
                  </div>
                ))}
              </Row>
            ) : (
              <Text>Not Found</Text>
            )}
            <CategoryModal path={keyword} type={categories.MOVIE} />
          </Box>
          <Box>
            <Title>TV Series</Title>
            {TvSearch?.results.length !== 0 ? (
              <Row>
                {TvSearch?.results.slice(0, 6).map((list) => (
                  <div key={list.id}>
                    <List key={list.id} type={categories.TV} {...list} />
                    <p>{list.title ?? list.name}</p>
                  </div>
                ))}
              </Row>
            ) : (
              <Text>Not Found</Text>
            )}
            <CategoryModal path={keyword} type={categories.TV} />
          </Box>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
