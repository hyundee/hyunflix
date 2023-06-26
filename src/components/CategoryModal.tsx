import { motion } from "framer-motion";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

interface ICategoryModal {
  type: string;
  path: string | null;
}

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

function CategoryModal({ type, path }: ICategoryModal) {
  const moviePathMatch = useMatch("movie/detail/:movieId");
  const tvPathMatch = useMatch("tv/detail/:seriesId");
  const searchMoviePath = useMatch(`search/${type}/:movieId`);
  const searchTvPath = useMatch(`search/${type}/:seriesId`);
  const navigate = useNavigate();
  const onOverlayClick = () => {
    searchMoviePath || searchTvPath
      ? navigate(`/search?keyword=${path}`)
      : navigate(`/${type}`);
  };
  return (
    <>
      {moviePathMatch || tvPathMatch || searchMoviePath || searchTvPath ? (
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

export default CategoryModal;
