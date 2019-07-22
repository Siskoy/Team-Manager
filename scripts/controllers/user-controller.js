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
        if (ctx.params.password !== ctx.params.repeatPassword) {
            auth.showError('Password and repeat password must match!');
            return;
        }

        auth.register(ctx.params.username, ctx.params.password, ctx.params.repeatPassword)
            .then(() => {
                auth.showInfo('Successfully registered!')
                ctx.redirect('#/login');
            });
    }

    //Logout
    function logout(ctx) {
        auth.logout()
            .then(() => {
                auth.showInfo("You've logged out!");
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
            .then(() => {
                auth.showInfo('Successfully loged in!')
                ctx.redirect('/');
            })
            .catch(() => auth.showError('Wrong username or password!'));
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