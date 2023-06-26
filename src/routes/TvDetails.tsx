import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useOutletContext, useParams } from "react-router-dom";
import { IGetTvDetails, getTvDetails } from "../api";
import { makeImagePath } from "../utils";
import { ReactComponent as Close } from "../assets/Close.svg";
import Icon from "../components/Icon/Icon";
import Logo from "../assets/logo_1.png";

interface ITvDetails {
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
  overflow: auto;
  background-color: ${(props) => props.theme.black.veryDark};
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

const Episodes = styled.div`
  text-align: end;
  span {
    font-size: 18px;
    color: ${(props) => props.theme.white.lighter};
    vertical-align: middle;
    &:first-child {
      margin-right: 10px;
      &::after {
        display: inline-block;
        height: 17px;
        width: 1px;
        margin-left: 10px;
        margin-bottom: -2px;
        background-color: ${(props) => props.theme.white.lighter};
        content: "";
      }
    }
  }
`;

const Genres = styled.div`
  display: inline-block;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: -5px;
`;

const overlayVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, zIndex: 1 },
  exit: { opacity: 0 },
};

const TvDetails = () => {
  const { onOverlayClick } = useOutletContext<ITvDetails>();
  const { seriesId } = useParams() as { seriesId: string };
  const { data: TvDetails, isLoading } = useQuery<IGetTvDetails>(
    ["tv", seriesId],
    () => getTvDetails(seriesId)
  );
  const bgImg = TvDetails?.backdrop_path || TvDetails?.poster_path;
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
            layoutId={seriesId}
          >
            {TvDetails && (
              <Info>
                <Cover
                  style={{
                    backgroundImage: `linear-gradient(to top, #141414, transparent), url(${
                      bgImg
                        ? makeImagePath(
                            TvDetails?.backdrop_path ?? TvDetails?.poster_path
                          )
                        : Logo
                    })`,
                  }}
                />
                <Text>
                  <Title
                    style={{
                      fontSize: TvDetails.name?.length > 18 ? "45px" : "60px",
                    }}
                  >
                    {TvDetails.name}
                  </Title>
                  <Interaction>
                    <Icon />
                  </Interaction>
                  <Tag>
                    <span>HD</span>
                    <span>
                      {TvDetails.first_air_date.slice(0, 4) ??
                        TvDetails.last_air_date.slice(0, 4)}
                    </span>
                    <span>{TvDetails.vote_average.toFixed(1)}</span>
                  </Tag>
                  <Genres>
                    {TvDetails.genres.map((g, idx) => (
                      <span key={idx} className="dot">
                        {g.name}
                      </span>
                    ))}
                  </Genres>
                  <Episodes>
                    <span>EP. {TvDetails.number_of_episodes}</span>
                    <span>Seasons {TvDetails.number_of_seasons}</span>
                  </Episodes>
                  <Overview>
                    <p>{TvDetails.tagline}</p>
                    {TvDetails.overview}
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

export default TvDetails;
