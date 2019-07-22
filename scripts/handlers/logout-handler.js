window.handler = window.handler || {};

import { auth } from '../models/auth.js';

handler.logout = function (ctx) {
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            ctx.redirect('/');
        });
}