import 'babel-polyfill';
import './index.less';
import {
    App
} from './framework/app';
import logger from './middlewares/logger';

/**
 * create app
 */
const app = App.getApp();

/**
 * set app configuration
 */
app.config({});

/**
 * set app middlewares
 */
app.middlewares([logger]);

/**
 * mount app on the document
 */
app.start('#root');