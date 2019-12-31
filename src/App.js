import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle/>
                <IconStyle/>
                { renderRoutes(routes) }
            </HashRouter>
        </Provider>
  );
}

export default App;
