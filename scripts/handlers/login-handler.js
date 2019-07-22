window.handler = window.handler || {};

import { auth } from '../models/auth.js';

handler.login = {
    get: function (ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs',
            loginForm: '/templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('/templates/login/loginPage.hbs');
        })
    },
    post: function (ctx) {
        auth.login(ctx.params.username, ctx.params.password)
            .then(data => auth.saveSession(data))
            .then(() => ctx.redirect('/'));
    }
}