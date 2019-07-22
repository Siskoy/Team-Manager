import { teamsService } from '../models/teamsService.js';

const catalogController = function () {
    function getTeamCatalog(ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined';
        teamsService
            .loadTeams()
            .then(data => {
                ctx.teams = data
                ctx.loadPartials({
                    header: '/templates/common/header.hbs',
                    footer: '/templates/common/footer.hbs',
                    team: 'templates/catalog/team.hbs'
                }).then(function () {
                    this.partial('/templates/catalog/teamCatalog.hbs');
                });
            });
    }

    function getTeamDetails(ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        teamsService.loadTeamDetails(ctx.params.id)
            .then(data => {
                ctx.teamId = data._id;
                ctx.isAuthor = sessionStorage.getItem('userId') === data._acl.creator;
                ctx.isOnTeam = sessionStorage.getItem('teamId') === data._id;
                ctx.name = data.name;
                ctx.comment = data.comment;
                if (data.members) {
                    ctx.members = data.members.map(name => {
                        return {
                            username: name
                        };
                    });
                }
                ctx.loadPartials({
                    header: '/templates/common/header.hbs',
                    footer: '/templates/common/footer.hbs',
                    teamControls: 'templates/catalog/teamControls.hbs',
                    teamMember: 'templates/catalog/teamMember.hbs'
                }).then(function () {
                    this.partial('/templates/catalog/details.hbs');
                });
            });
    }

    function getCreateTeam(ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');

        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs',
            createForm: '/templates/create/createForm.hbs'
        }).then(function () {
            this.partial('/templates/create/createPage.hbs');
        });
    }

    function postCreateTeam(ctx) {
        teamsService
            .createTeam(ctx.params.name, ctx.params.comment)
            .then(() => ctx.redirect('#/catalog'));
    }

    function joinTeam(ctx) {
        teamsService
            .joinTeam(ctx.params.id)
            .then(() => ctx.redirect(`#/catalog/` + ctx.params.id));
    }

    function leaveTeam(ctx) {
        teamsService
            .leaveTeam()
            .then(() => ctx.redirect('#/catalog/' + ctx.params.id));
    }

    function getEditInfo(ctx) {
        ctx.loggedIn = sessionStorage.getItem("userId") !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.teamId = ctx.params.id;
        ctx.loadPartials({
            header: '/templates/common/header.hbs',
            footer: '/templates/common/footer.hbs',
            editForm: '/templates/edit/editForm.hbs'
        }).then(function () {
            this.partial('/templates/edit/editPage.hbs');
        });
    }

    function postEditInfo(ctx) {
        teamsService
            .edit(ctx.params.id, ctx.params.name, ctx.params.comment)
            .then(() => ctx.redirect('#/catalog/' + ctx.params.id));

    }

    return {
        getTeamCatalog,
        getTeamDetails,
        getCreateTeam,
        postCreateTeam,
        joinTeam,
        leaveTeam,
        getEditInfo,
        postEditInfo,
    }
}()

export { catalogController };