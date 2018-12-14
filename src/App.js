import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './Store';
import ProductPage from './Components/ProductPage';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ProductPage />
            </Provider>
        );
    }
}

export default App;
