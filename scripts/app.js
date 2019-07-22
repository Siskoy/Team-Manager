$(() => {
    const app = Sammy('#main', async function () {
        this.use('Handlebars', 'hbs');

        //Home
        this.get('/', handler.getHome);
        
        //About
        this.get('#/about', handler.getAbout);

        //Logout
        this.get('#/logout', handler.logout);

        //Login
        this.get('#/login', handler.login.get);
        this.post('#/login', handler.login.post);

        //Register
        this.get('#/register', handler.register.get)
        this.post('#/register', handler.register.post)

        //Catalog-Team
        this.get('#/catalog', handler.team.getTeamCatalog);
        this.get('#/catalog/:id', handler.team.getTeamDetails);
        this.get('#/create', handler.team.getCreateTeam);
        this.post('#/create', handler.team.postCreateTeam);
        this.get('#/join/:id', handler.team.joinTeam);
        this.get('#/leave', handler.team.leaveTeam);
        this.get('#/edit/:id', handler.team.getEditInfo);
        this.post('#/edit/:id', handler.team.postEditInfo);
    }); 

    app.run('/');
});