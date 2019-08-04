const homeController = function () {
    function getHome(ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs'
        }).then(function () {
            this.partial('/templates/home/home.hbs');
        });
    }

    function getAbout (ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs'
        }).then(function () {
            this.partial('/templates/about/about.hbs');
        });
    }

    return {
        getHome,
        getAbout
    }
}()