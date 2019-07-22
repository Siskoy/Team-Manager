window.handler = window.handler || {};

import { auth } from '../models/auth.js';

handler.logout = function (ctx) {
    auth.logout();
    sessionStorage.clear();
    ctx.redirect('/');
}