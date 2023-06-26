import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";

export interface ISlider {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  media_type: string;
  release_date: string;
  type: string;
}

const SliderBox = styled(motion.div)<{ $bgImg: string }>`
  position: relative;
  height: 280px;
  background-image: url(${(props) => props.$bgImg});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 4px;
  cursor: pointer;
`;

const Info = styled(motion.div)`
  width: 100%;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 4px;
  opacity: 0;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 210px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Text = styled.div`
  padding: 12px 15px 15px;
  position: relative;
  div {
    &.top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      h4 {
        color: white;
        text-align: left;
        font-size: 20px;
        width: 80%;
      }
      button {
        width: 30px;
        height: 30px;
        border: 1px solid white;
        border-radius: 50%;
        background: ${(props) => props.theme.black.darker};
        opacity: 0.6;
        cursor: pointer;
        svg {
          text-align: center;
          fill: white;
          text-align: center;
        }
      }
    }
    &.bottom {
      color: hsla(0, 0%, 100%, 0.6);
      margin-top: -3px;
      span {
        font-size: 10px;
        border: 1px solid hsla(0, 0%, 100%, 0.6);
        border-radius: 2px;
        padding: 2px 5px;
        text-align: center;
        margin-right: 7px;
      }
    }
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.25,
    zIndex: 1,
    y: -10,
    boxShadow: "10px 10px 25px 0px black, -5px 0 20px 0px black",
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.5,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.1,
      delay: 0.5,
    },
  },
};

function RankingSlider({
  id,
  title,
  name,
  backdrop_path,
  poster_path,
  media_type,
  vote_average,
  release_date,
  type,
}: ISlider) {
  const navigate = useNavigate();
  const location = useLocation();
  const openDetailView = (id: number) => {
    location.pathname === "/"
      ? navigate(`${media_type}/${id}`)
      : navigate(`${location.pathname}/detail/${id}`);
  };
  return (
    <AnimatePresence>
      <SliderBox
        key={id}
        onClick={() => openDetailView(id)}
        variants={boxVariants}
        initial="nomal"
        whileHover="hover"
        transition={{ type: "tween" }}
        $bgImg={makeImagePath(poster_path, "w500")}
      >
        <Info variants={infoVariants}>
          <Cover
            style={{
              backgroundImage: `url(${makeImagePath(backdrop_path, "w500")})`,
            }}
          />
          <Text>
            <div className="top">
              <h4
                style={{
                  fontSize: (title ?? name).length > 18 ? "18px" : "20px",
                }}
              >
                {title ?? name}
              </h4>
              <motion.button whileHover={{ scale: 1.1, opacity: 1 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="10"
                  viewBox="0 0 10 15"
                >
                  <path d="M12.17 7.489a.6.6 0 010 1.022L.915 15.437a.6.6 0 01-.914-.511V1.074A.6.6 0 01.915.563z"></path>
                </svg>
              </motion.button>
            </div>
            <div className="bottom">
              <span>HD</span>
              {release_date ? <span>{release_date?.slice(0, 4)}</span> : null}
              <span>{vote_average.toFixed(1)}</span>
            </div>
          </Text>
        </Info>
      </SliderBox>
    </AnimatePresence>
  );
}

export default RankingSlider;
