import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppPage from "./components/main/appPage";
import { Provider } from "react-redux";
import configureStore from "./store/store";

ReactDOM.render(
    <Provider store={configureStore()}>
        <div className="container">
            <AppPage/>
        </div>
    </ Provider>,
    document.getElementById('app')
);
