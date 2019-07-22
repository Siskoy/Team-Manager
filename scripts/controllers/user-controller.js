import { auth } from '../models/auth.js';

const userController = function () {
    //Register
    function getRegister(ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs',
            registerForm: '/templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('/templates/register/registerPage.hbs');
        })
    }

    function postRegister(ctx) {
        auth.register(ctx.params.username, ctx.params.password, ctx.params.repeatPassword)
            .then(() => ctx.redirect('#/login'));
    }

    //Logout
    function logout(ctx) {
        auth.logout()
            .then(() => {
                sessionStorage.clear();
                ctx.redirect('/');
            });
    }

    //Login
    function getLogin(ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs',
            loginForm: '/templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('/templates/login/loginPage.hbs');
        })
    }

    function postLogin(ctx) {
        auth.login(ctx.params.username, ctx.params.password)
            .then(data => auth.saveSession(data))
            .then(() => ctx.redirect('/'));
    }

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout,
    }
}()

export { userController };