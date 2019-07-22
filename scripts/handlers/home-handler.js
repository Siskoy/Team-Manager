window.handler = window.handler || {};

handler.getHome = function (ctx) {
    ctx.loggedIn = sessionStorage.getItem("userId") !== null;
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: '/templates/common/header.hbs',
        footer: '/templates/common/footer.hbs'
    }).then(function () {
        this.partial('/templates/home/home.hbs');
    });
}