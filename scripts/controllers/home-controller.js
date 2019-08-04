const homeController = function () {
    function getHome(context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function () {
                this.partial('/templates/home/home.hbs');
            });
    }

    function getAbout(context) {
        helper.addHeaderInfo(context);
        helper.loadPartials(context)
            .then(function () {
                this.partial('/templates/about/about.hbs');
            });
    }

    return {
        getHome,
        getAbout
    }
}()