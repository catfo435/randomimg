import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header'
import Category from './Category';

export default function MainPage() {
  return (
    <>
      <Header />
      <Category />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainPage />
);
