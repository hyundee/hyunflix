import { atom } from "recoil";

export enum categories {
  "TV" = "tv",
  "MOVIE" = "movie",
  "ALL" = "all",
}

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TV,
});

export const bookmarkState = atom({
  key: "bookmark",
  default: false,
});

export const likeState = atom({
  key: "like",
  default: false,
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});
