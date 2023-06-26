import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import Logo from "../assets/logo_1.png";

export interface IList {
  id: number;
  poster_path: string;
  type: string;
}

const SliderBox = styled(motion.div)<{ $bgImg: string }>`
  height: 350px;
  background-image: url(${(props) => props.$bgImg});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 4px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1,
    y: -15,
    transition: {
      type: "tween",
      duration: 0.2,
      delay: 0.2,
    },
  },
};

function List({ id, poster_path, type }: IList) {
  const navigate = useNavigate();
  const openDetailView = (id: number) => navigate(`${type}/${id}`);
  return (
    <AnimatePresence>
      <SliderBox
        key={id}
        onClick={() => openDetailView(id)}
        variants={boxVariants}
        initial="nomal"
        whileHover="hover"
        transition={{ type: "tween" }}
        $bgImg={poster_path ? makeImagePath(poster_path, "w500") : Logo}
      ></SliderBox>
    </AnimatePresence>
  );
}

export default List;
