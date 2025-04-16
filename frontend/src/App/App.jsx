import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './Router';
import store from '../store/store';
import Header from '../components/header/Header';
import Navbar from '../components/nav/Navbar';
import './../App.css';
function App() {
  return (
    <Provider store={store}>
      <Header />
      <Navbar />
      <AppRouter />
    </Provider>
  );
}

export default App;