const aboutController = function () {
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
        getAbout
    }
}();

export { aboutController };