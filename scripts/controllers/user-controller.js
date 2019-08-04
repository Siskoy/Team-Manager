const userController = function () {
    function getRegister(context) {
        helper.addHeaderInfo(context);
        helper.loadPartials(context, { 'registerForm': '/templates/register/registerForm.hbs' })
            .then(function () {
                this.partial('/templates/register/registerPage.hbs');
            })
    }

    function postRegister(context) {
        if (context.params.password !== context.params.repeatPassword) {
            auth.showError('Password and repeat password must match!');
            return;
        }

        auth.register(context.params.username, context.params.password)
            .then(() => {
                context.redirect('#/login');
                auth.showSuccess('Successfully registered!');
            });
    }

    function logout(context) {
        auth.logout()
            .then(() => {
                sessionStorage.clear();
                context.redirect('/');
                auth.showSuccess("You've logged out!");
            });
    }

    function getLogin(context) {
        helper.addHeaderInfo(context);
        helper.loadPartials(context, { 'loginForm': '/templates/login/loginForm.hbs' })
            .then(function () {
                this.partial('/templates/login/loginPage.hbs');
            })
    }

    function postLogin(context) {
        auth.login(context.params.username, context.params.password)
            .then(data => auth.saveSession(data))
            .then(() => {
                context.redirect('/');
                auth.showSuccess('Successfully loged in!')
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