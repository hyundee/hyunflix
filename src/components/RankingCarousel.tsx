import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "styled-components";
import { IGetData } from "../api";
import RankingSlider from "./RankingSlider";

interface IRankingCarousel {
  data: IGetData | undefined;
  type: string;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  top: -100px;
  margin-bottom: 120px;
  background: none;
`;

const RankingCarouselBox = styled.div`
  height: 250px;
`;

const Row = styled(motion.div)`
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const Box = styled.div`
  position: relative;
  &:first-child {
    div {
      transform-origin: center left;
    }
  }
  &:last-child {
    div {
      transform-origin: center right;
    }
  }
`;

const Ranking = styled.div`
  position: absolute;
  bottom: 0;
  left: -5%;
  color: black;
  font-size: 12rem;
  font-weight: bolder;
  vertical-align: bottom;
  line-height: 0.5;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: #74747477;
`;

const Button = styled(motion.button)`
  width: 150px;
  height: 100%;
  position: absolute;
  left: -60px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  );
  opacity: 0;
  border: none;
  cursor: pointer;
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    display: inline-block;
    transform: rotate(225deg);
    position: absolute;
    top: 45%;
    left: 15%;
  }
`;

const Arrow = styled(motion.div)`
  position: absolute;
  height: 100%;
  top: 0;
  &:last-child {
    right: 0;
    button {
      opacity: 1;
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0)
      ) !important;
      &::after {
        transform: rotate(45deg);
        left: 15%;
      }
    }
  }
`;

const rowVariants = {
  start: (back: boolean) => {
    return { x: back ? -window.innerWidth - 10 : window.innerWidth + 10 };
  },
  animate: {
    x: 0,
  },
  exit: (back: boolean) => {
    return { x: back ? window.innerWidth + 10 : -window.innerWidth - 10 };
  },
};

const offset = 5;

function RankingCarousel({ data, type }: IRankingCarousel) {
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const prevBtn = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = data?.results.slice(0, 10).length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const nextBtn = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalMovies = data?.results.slice(0, 10).length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  return (
    <Wrapper>
      <RankingCarouselBox>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <Row
            custom={back}
            key={index}
            variants={rowVariants}
            initial="start"
            animate="animate"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie, idx) => (
                <Box className="box" key={movie.id}>
                  <RankingSlider {...movie} type={type} />
                  <Ranking className="num">
                    {index === 1 ? idx + 6 : idx + 1}
                  </Ranking>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <Arrow>
          <Button whileHover={{ opacity: 1 }} onClick={prevBtn}></Button>
        </Arrow>
        <Arrow>
          <Button onClick={nextBtn} whileHover={{ opacity: 1 }}></Button>
        </Arrow>
      </RankingCarouselBox>
    </Wrapper>
  );
}

export default RankingCarousel;
