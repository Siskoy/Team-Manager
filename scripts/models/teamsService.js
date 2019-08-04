let teamsService = (() => {
    function loadTeams() {
        return requester.get('appdata', 'teams', 'kinvey');
    }

    function loadTeamDetails(teamId) {
        return requester.get('appdata', 'teams/' + teamId, 'kinvey');
    }

    function edit(teamId, name, description) {
        let teamData = {
            name: name,
            comment: description,
            author: sessionStorage.getItem('username')
        };

        return requester.update('appdata', 'teams/' + teamId, 'kinvey', teamData);
    }

    function createTeam(name, comment) {
        let teamData = {
            name: name,
            comment: comment,
            members: [{ username: `${sessionStorage.getItem('username')}` }]
        };

        return requester.post('appdata', 'teams', 'kinvey', teamData);
    }

    async function joinTeam(teamId) {
        let userData = {
            username: sessionStorage.getItem('username'),
            teamId: teamId
        };

        await addMember(teamId);
        sessionStorage.setItem('teamId', teamId);
        return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', userData);
    }

    async function leaveTeam() {
        let userData = {
            username: sessionStorage.getItem('username'),
            teamId: ''
        };

        await removeMember(sessionStorage.getItem('teamId'));
        sessionStorage.setItem('teamId', '');
        return requester.update('user', sessionStorage.getItem('userId'), userData, 'kinvey');
    }

    async function addMember(teamId) {
        let team = await loadTeamDetails(teamId);
        team.members.push({ username: sessionStorage.getItem('username') });

        return requester.update('appdata', 'teams/' + teamId, 'kinvey', team);
    }

    async function removeMember(teamId) {
        let team = await loadTeamDetails(teamId);
        const memberIndex = team.members.findIndex(x => x.username === sessionStorage.getItem('username'));
        team.members.splice(memberIndex, 1);

        return requester.update('appdata', 'teams/' + teamId, 'kinvey', team);
    }

    return {
        loadTeams,
        loadTeamDetails,
        edit,
        createTeam,
        joinTeam,
        leaveTeam,
        addMember,
    }
})()