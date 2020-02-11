import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import {Data} from "./application/Singers/data";

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle/>
                <IconStyle/>
                <Data>
                    { renderRoutes(routes) }
                </Data>

            </HashRouter>
        </Provider>
  );
}

export default App;
