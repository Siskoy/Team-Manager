const catalogController = function () {
    async function getTeamCatalog(context) {
        helper.addHeaderInfo(context);
        context.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined';
        context.teams = await teamsService.loadTeams();

        helper.loadPartials(context, { team: 'templates/catalog/team.hbs' })
            .then(function () {
                this.partial('/templates/catalog/teamCatalog.hbs');
            });
    }

    async function getTeamDetails(context) {
        helper.addHeaderInfo(context);

        context.team = await teamsService.loadTeamDetails(context.params.id);
        context.team.isAuthor = sessionStorage.getItem('userId') === context.team._acl.creator;
        context.team.isOnTeam = sessionStorage.getItem('teamId') === context.team._id;

        helper.loadPartials(context, {
            'teamControls': 'templates/catalog/teamControls.hbs',
            'teamMember': 'templates/catalog/teamMember.hbs'
        })
            .then(function () {
                this.partial('/templates/catalog/details.hbs');
            });
    }

    function getCreateTeam(context) {
        helper.addHeaderInfo(context);

        helper.loadPartials(context, { 'createForm': '/templates/create/createForm.hbs' })
            .then(function () {
                this.partial('/templates/create/createPage.hbs');
            });
    }

    function postCreateTeam(context) {
        teamsService
            .createTeam(context.params.name, context.params.comment)
            .then(() => {
                context.redirect('#/catalog');
                auth.showSuccess('Successfully created a team!');
            })
            .catch(() => auth.showError('Failed at team creation!'));
    }

    function joinTeam(context) {
        teamsService
            .joinTeam(context.params.id)
            .then(() => {
                context.redirect(`#/catalog/` + context.params.id);
                auth.showSuccess('Successfully joined the team!');
            });
    }

    function leaveTeam(context) {
        teamsService
            .leaveTeam()
            .then(() => {
                context.redirect('#/catalog');
                auth.showSuccess('Successfully left a team!');
            });
    }

    function getEditInfo(context) {
        helper.addHeaderInfo(context);
        context.teamId = context.params.id;

        helper.loadPartials(context, { 'editForm': '/templates/edit/editForm.hbs' })
            .then(function () {
                this.partial('/templates/edit/editPage.hbs');
            });
    }

    function postEditInfo(context) {
        teamsService
            .edit(context.params.id, context.params.name, context.params.comment)
            .then(() => {
                context.redirect('#/catalog/' + context.params.id);
                auth.showInfo('Successfully edited the info!');
            })
            .catch(() => auth.showError('Failed at team editing!'));;
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