# Hyunflix
### https://hyundee.github.io/hyunflix
- 오픈 API Themoviedb를 활용한 넷플릭스 클론 코딩 사이트
<br/>
<br/>

## Preview
  > **주요 기능 (Home, Movie, Series)**

![main](https://github.com/hyundee/hyunflix/assets/125550186/2c07cefb-1da1-4386-92c2-2b2d47c58752)
  - React Query를 이용하여 TMDB 오픈 API를 데이터 호출
  - 현재 날짜 기준으로 Top10 리스트 화면에 구현
  - 콘텐츠 섹션마다 좌우 방향으로 슬라이드 가능
  - Framer-motion을 활용하여 슬라이드 호버 시 모달창 애니메이션 구현
  - 모달창 클릭 시 상세페이지로 랜딩
<br/>
<br/>

  > **검색 기능 (Search)**

![search_page](https://github.com/hyundee/hyunflix/assets/125550186/fab823dc-7a99-48e2-b660-d5aca1b47305)
  - 검색 아이콘 클릭 시 검색 창 애니메이션 구현
  - 찾고싶은 검색어를 입력 시 해당 검색어가 포함된 콘텐츠를 데이터를 호춣하여 카테고리별(Movie, TV Series)로 화면에 구현
  - Recoil를 활용하여 해당 검색어 값을 저장하여 콘텐츠 클릭 시 상세페이지로 랜딩
<br/>
<br/>

  > **상세 페이지**

<img width="840" alt="detail_page" src="https://github.com/hyundee/hyunflix/assets/125550186/00b91469-528f-4fd0-a7b8-e4209294026e"><br/>
  - 클릭한 콘텐츠 id와 매칭되는 데이터를 호출하여 대한 포스터, 제목, 줄거리, 장르, 평점 등을 화면에 구현
  - 닫기 아이콘 클릭 시 이전 페이지로 랜딩
<br/>
<br/>

## 기술스택
![React](https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white)
<br/>
<br/>
## 라이브러리
![React Router](https://img.shields.io/badge/reactrouter-FF4154?style=for-the-badge&logo=reactrouter&logoColor=white)
![React Query](https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
![styled-components](https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
![Framer](https://img.shields.io/badge/framer-0055FF?style=for-the-badge&logo=framer&logoColor=white)
<br/>
<br/>
## 설치 및 실행
1. git
```
  git clone https://github.com/hyundee/hyunflix.git
```
2. npm
```
  npm install
```
```
  npm start
```
