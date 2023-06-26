import { styled } from "styled-components";
import { IGetData } from "../api";
import { makeImagePath } from "../utils";
import Icon from "./Icon/Icon";

interface IBanner {
  data: IGetData | undefined;
}

const Wrapper = styled.div<{ $bgImg: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgImg});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 4.5vw;
  font-weight: 700;
  text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 3px;
  width: 65%;
`;

const Overview = styled.p`
  font-size: 1.2vw;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  width: 40%;
`;

const Interaction = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  button {
    width: 120px;
    height: 50px;
    font-size: 21px;
  }
  div {
    display: inherit;
    span {
      font-size: 15px;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

function Banner({ data }: IBanner) {
  return (
    <Wrapper $bgImg={makeImagePath(data?.results[0].backdrop_path || "")}>
      <Title>{data?.results[0].original_title ?? data?.results[0].name}</Title>
      <Overview>{data?.results[0].overview}</Overview>
      <Interaction>
        <Icon />
      </Interaction>
    </Wrapper>
  );
}

export default Banner;
