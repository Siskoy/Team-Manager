window.handler = window.handler || {};

import { auth } from '../models/auth.js';

handler.register = {
    get: function (ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs',
            registerForm: '/templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('/templates/register/registerPage.hbs');
        })
    },
    post: function (ctx) {
        auth.register(ctx.params.username, ctx.params.password, ctx.params.repeatPassword)
            .then(() => ctx.redirect('#/login'));
    }
}