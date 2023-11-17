const accessToken = localStorage.getItem()
export const getTeams = async () => {
    const response = await fetch('http://localhost:9000/api/v1/equipos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }

    return response;
}