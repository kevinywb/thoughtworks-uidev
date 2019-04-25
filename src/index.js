/**
 * index.js
 */
import 'babel-polyfill';
import './index.less';
import {
    App
} from './framework/app';
import logger from './middware/logger';

const app = App.getApp();

app.config({});

app.middlewares([logger]);

app.start('#root');