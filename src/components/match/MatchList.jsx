import React, { useEffect, useState} from "react";

const MatchList = ({ accessToken }) => {
    const [partidos, setPartidos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/v1/partidos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                setPartidos(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [accessToken]);


    return (
        <div>
            <ul>
                {partidos.map((partido) => (
                    <li key={partido.id}>
                        <div>
                            {partido.fecha}
                            {partido.estadio}
                            {partido.arbitro}
                        </div>

                        <div>
                            {partido.equipoLocal.nombre}
                            {partido.marcador.golesLocal}
                        </div>

                        <div>
                            {partido.equipoVisitante.nombre}
                            {partido.marcador.golesVisitante}
                        </div>


                    </li>
                ))}
            </ul>
        </div>
    )
};

export default MatchList;