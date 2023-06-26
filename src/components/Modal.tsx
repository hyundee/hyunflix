import { motion } from "framer-motion";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

interface IModal {
  type: string;
  pathName: string | null;
}

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

function Modal({ pathName, type }: IModal) {
  const moviePathMatch = useMatch(`movie/:movieId`);
  const tvPathMatch = useMatch(`tv/:seriesId`);
  const navigate = useNavigate();
  const onOverlayClick = () => navigate(`/`);
  return (
    <>
      {moviePathMatch || tvPathMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <Outlet context={{ onOverlayClick: onOverlayClick }} />
        </>
      ) : null}
    </>
  );
}

export default Modal;
