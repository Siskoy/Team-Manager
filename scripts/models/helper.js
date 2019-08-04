const helper = function () {

    /* $(document).on({
        ajaxStart: () => $('#loadingBox').fadeIn(),
        ajaxStop: () => $('#loadingBox').fadeOut(),
    }) */

    const handler = function (response) {
        if (response.status >= 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        if (response.status !== 204) {
            response = response.json();
        }

        return response;
    };

    const passwordCheck = function (params) {
        return params.password === params.rePassword;
    };

    const addHeaderInfo = function (context) {
        const loggedIn = sessionStorage.getItem('authtoken') !== null;

        if (loggedIn) {
            context.loggedIn = loggedIn;
            context.username = sessionStorage.getItem('username');
        }
    }

    const loadPartials = function (context, externalPartials) {
        let defaultPartials = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        };

        if (externalPartials) {
            for (const key in externalPartials) {
                const element = externalPartials[key];

                defaultPartials[key] = element;
            }
        }

        return context.loadPartials(defaultPartials);
    }

    return {
        handler,
        passwordCheck,
        addHeaderInfo,
        loadPartials
    }
}()