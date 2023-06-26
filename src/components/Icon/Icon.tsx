import { motion } from "framer-motion";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { bookmarkState, likeState } from "../../atoms";
import { ReactComponent as Play } from "../../assets/Play.svg";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { ReactComponent as Check } from "../../assets/Check.svg";
import HeartSvg from "./HeartSvg";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -12px;
`;

const PlayBtn = styled(motion.button)`
  width: 85px;
  height: 40px;
  font-size: 16px;
`;

const CircleBtn = styled(motion.div)`
  display: inherit;
  span {
    font-size: 15px;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
`;

function Icon() {
  const [bookmark, setBookmark] = useRecoilState(bookmarkState);
  const [like, setLike] = useRecoilState(likeState);
  const onBookmark = () => setBookmark((prev) => !prev);
  const onLike = () => setLike((prev) => !prev);
  return (
    <Wrapper>
      <PlayBtn whileHover={{ opacity: 0.6 }} className="play_btn">
        <Play width="20" height="15" />
        PLAY
      </PlayBtn>
      <CircleBtn className="circle_icon">
        <motion.span
          onClick={onBookmark}
          animate={{
            borderColor: bookmark
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 255, 255, 0.5)",
          }}
          whileHover={{ borderColor: "rgba(255, 255, 255, 1)" }}
        >
          {bookmark ? (
            <Check width="25" height="25" />
          ) : (
            <Plus width="25" height="25" />
          )}
        </motion.span>
        <motion.span
          onClick={onLike}
          animate={{
            borderColor: like
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255, 255, 255, 0.5)",
          }}
          whileHover={{ borderColor: "rgba(255, 255, 255, 1)" }}
        >
          {like ? (
            <HeartSvg width="25" height="25" fill="white"></HeartSvg>
          ) : (
            <HeartSvg width="25" height="25" fill="none"></HeartSvg>
          )}
        </motion.span>
      </CircleBtn>
    </Wrapper>
  );
}

export default Icon;
