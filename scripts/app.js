$(() => {
    Sammy('#main', async function () {
        this.use('Handlebars', 'hbs');

        //Home
        this.get('/', homeController.getHome);

        //User
        this.get('#/about', homeController.getAbout);

        this.get('#/register', userController.getRegister)
        this.post('#/register', userController.postRegister)

        this.get('#/login', userController.getLogin);
        this.post('#/login', userController.postLogin);

        this.get('#/logout', userController.logout);

        //Catalog-Team
        this.get('#/catalog', catalogController.getTeamCatalog);
        this.get('#/catalog/:id', catalogController.getTeamDetails);

        this.get('#/create', catalogController.getCreateTeam);
        this.post('#/create', catalogController.postCreateTeam);

        this.get('#/edit/:id', catalogController.getEditInfo);
        this.post('#/edit/:id', catalogController.postEditInfo);

        this.get('#/join/:id', catalogController.joinTeam);
        this.get('#/leave/:id', catalogController.leaveTeam);
    }).run('/');
});