import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from 'components/Header/Header';
// import Home from 'pages/Home/Home';
// import Movies from 'pages/Movies/Movies';
// import CardFilm from '../pages/CardFilm/CardFilm';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const CardFilm = lazy(() => import('../pages/CardFilm/CardFilm'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<CardFilm />}>
            <Route path="cast" element={<Cast />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
};
