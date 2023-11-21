const getTeams = async (accessToken) => {
    const response = await fetch(`http://localhost:9000/api/v1/equipos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status === 200){
        return await response.json();
    }

    return response;
}

const postTeam = async (accessToken, team) => {
    const response = await fetch(`http://localhost:9000/api/v1/equipos`, {
        method: 'POST',
        body: JSON.stringify(team),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status === 200){
        return await response.json();
    }

    return response;
}

const updateTeam = async (accessToken, team) => {
    const response = await fetch(`http://localhost:9000/api/v1/equipos/${team.id}`, {
        method: 'PUT',
        body: JSON.stringify(team),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status === 200){
        return await response.json();
    }
    return response;
}

const getMatches = async (accessToken) => {
    const response = await fetch(`http://localhost:9000/api/v1/partidos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status === 200){
        return await response.json();
    }

    return response;
}

const postResult = async (accessToken, result) => {
        const response = await fetch(`http://localhost:9000/api/v1/resultados`, {
            method: 'POST',
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if(response.status === 200){
            return await response.json();
        }

        return response;
}

const postMatch = async (accessToken, match) => {
    const response = await fetch(`http://localhost:9000/api/v1/partidos`, {
        method: 'POST',
        body: JSON.stringify(match),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status === 200){
        return await response.json();
    }

    return response;
}

const updateResult = async (accessToken, partidos, marcador) => {
    const response = await fetch(`http://localhost:9000/api/v1/resultados/${partidos.marcador.id}`, {
        method: 'PUT',
        body: JSON.stringify(marcador),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status === 200){
        return await response.json();
    }

    return response;
}

export {
    getTeams,
    postTeam,
    updateTeam,
    getMatches,
    postMatch,
    postResult,
    updateResult
}