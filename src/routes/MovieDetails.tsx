import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useOutletContext, useParams } from "react-router-dom";
import { IGetMovieDetails, getMovieDetails } from "../api";
import { makeImagePath } from "../utils";
import { ReactComponent as Close } from "../assets/Close.svg";
import Icon from "../components/Icon/Icon";
import Logo from "../assets/logo_1.png";

interface IMovieDetails {
  onOverlayClick: () => void;
}

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieModal = styled(motion.div)`
  position: fixed;
  width: 60vw;
  height: 80vh;
  top: 120px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.veryDark};
  overflow: scroll;
`;

const Info = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center top;
  height: 480px;
`;

const Text = styled.div`
  position: relative;
  padding: 0 40px 40px;
  top: -140px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 60px;
  font-weight: 500;
  position: relative;
  width: 70%;
  line-height: 1;
`;

const Interaction = styled.div`
  .circle_icon {
    svg {
      width: 20px;
      height: 20px;
      fill: white;
    }
  }
`;

const Overview = styled.div`
  position: relative;
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  font-weight: 300;
  p {
    font-size: 26px;
    font-weight: 300;
    margin: 0 0 10px;
  }
`;

const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  border: none;
  border-radius: 50%;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  svg {
    vertical-align: middle;
    text-align: center;
    padding: 2px;
  }
`;

const Tag = styled.div`
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  span {
    font-size: 17px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 2px;
    padding: 2px 5px;
    text-align: center;
    margin-right: 8px;
  }
`;

const Genres = styled.div`
  display: inline-block;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  div {
    display: inline-block;
    margin-right: 8px;
    &:not(:last-child) {
      &::after {
        display: inline-block;
        width: 3px;
        height: 3px;
        margin-left: 10px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        vertical-align: middle;
        content: "";
      }
    }
  }
`;

const overlayVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, zIndex: 2 },
  exit: { opacity: 0 },
};

const MovieDetails = () => {
  const { onOverlayClick } = useOutletContext<IMovieDetails>();
  const { movieId } = useParams() as { movieId: string };
  const { data: MovieDetails, isLoading } = useQuery<IGetMovieDetails>(
    ["movie", movieId],
    () => getMovieDetails(movieId)
  );
  const bgImg = MovieDetails?.backdrop_path || MovieDetails?.poster_path;
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <AnimatePresence>
          <MovieModal
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween" }}
            layoutId={movieId}
          >
            {MovieDetails && (
              <Info>
                <Cover
                  style={{
                    backgroundImage: `linear-gradient(to top, #141414, transparent), url(${
                      bgImg
                        ? makeImagePath(
                            MovieDetails?.backdrop_path ??
                              MovieDetails?.poster_path
                          )
                        : Logo
                    })`,
                  }}
                />
                {/* makeImagePath(MovieDetails?.backdrop_path ?? MovieDetails?.poster_path) */}
                <Text>
                  <Title
                    style={{
                      fontSize:
                        MovieDetails.title?.length > 18 ? "45px" : "60px",
                    }}
                  >
                    {MovieDetails.title}
                  </Title>
                  <Interaction>
                    <Icon />
                  </Interaction>
                  <Tag>
                    <span>HD</span>
                    <span>{MovieDetails.release_date.slice(0, 4)}</span>
                    <span>{MovieDetails.runtime}Min</span>
                    <span>{MovieDetails.vote_average.toFixed(1)}</span>
                  </Tag>
                  <Genres>
                    {MovieDetails.genres.map((g, idx) => (
                      <div key={idx}>{g.name}</div>
                    ))}
                  </Genres>
                  <Overview>
                    <p>{MovieDetails.tagline}</p>
                    {MovieDetails.overview}
                  </Overview>
                </Text>
                <CloseBtn onClick={onOverlayClick}>
                  <Close width="24" height="24" />
                </CloseBtn>
              </Info>
            )}
          </MovieModal>
        </AnimatePresence>
      )}
    </>
  );
};

export default MovieDetails;
