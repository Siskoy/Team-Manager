let teamsService = (() => {
    function loadTeams() {
        // Request teams from db
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

    function joinTeam(teamId) {
        let userData = {
            username: sessionStorage.getItem('username'),
            teamId: teamId
        };

        sessionStorage.setItem('teamId', teamId);
        return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', userData);
    }

    function leaveTeam() {
        let userData = {
            username: sessionStorage.getItem('username'),
            teamId: ''
        };

        sessionStorage.setItem('teamId', '');
        return requester.update('user', sessionStorage.getItem('userId'), userData, 'kinvey');
    }

    function addMember(teamId) {
        return fetch(`https://baas.kinvey.com/appdata/kid_S1iMzOQzH/teams/${teamId}`,
            {
                'method': 'GET',
                'headers': {
                    'Authorization': requester.makeAuth('kinvey')
                }
            })
            .then(response => response.json())
            .then(data => {
                data.members.push({ username: sessionStorage.getItem('username') });
                fetch(`https://baas.kinvey.com/appdata/kid_S1iMzOQzH/teams/${teamId}`,
                {
                    'method': 'PUT',
                    'headers': {
                        'Authorization': 'Basic ' + btoa('Siskoy:1234')
                    },
                    'body': JSON.stringify(data)
                })
            });
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