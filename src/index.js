/**
 * index.js
 */
import './index.less';
import {
    App
} from './framework/app';
import logger from './middware/logger';

const app = App.getApp();

app.config({
    providerPath: './layout/layout',
    apiBaseUrl: 'http://localhost/api',
});

app.middlewares([logger]);

app.start('#root');