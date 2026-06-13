import React from 'react';
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { store } from './Rx/store/store';


render(
<Provider store={store}>
<BrowserRouter>
<App/>
</BrowserRouter>
</Provider>
,document.querySelector("#root"))