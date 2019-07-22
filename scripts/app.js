import { aboutController } from "./controllers/about-controller.js";
import { catalogController } from "./controllers/catalog-controller.js";
import { homeController } from "./controllers/home-controller.js";
import { userController } from "./controllers/user-controller.js";

$(() => {
    const app = Sammy('#main', async function () {
        this.use('Handlebars', 'hbs');

        //Home
        this.get('/', homeController.getHome);

        //About
        this.get('#/about', aboutController.getAbout);

        //Register
        this.get('#/register', userController.getRegister)
        this.post('#/register', userController.postRegister)

        //Login
        this.get('#/login', userController.getLogin);
        this.post('#/login', userController.postLogin);

        //Logout
        this.get('#/logout', userController.logout);

        //Catalog-Team
        this.get('#/catalog', catalogController.getTeamCatalog);
        this.get('#/catalog/:id', catalogController.getTeamDetails);
        this.get('#/create', catalogController.getCreateTeam);
        this.post('#/create', catalogController.postCreateTeam);
        this.get('#/join/:id', catalogController.joinTeam);
        this.get('#/leave', catalogController.leaveTeam);
        this.get('#/edit/:id', catalogController.getEditInfo);
        this.post('#/edit/:id', catalogController.postEditInfo);
    });

    app.run('/')
});