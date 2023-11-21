import React, {useEffect, useState} from 'react';
import {updateResult} from "../../services/AppServices";
import "../../assets/css/match/MatchCardUpdate.css"

const resultado = {
    id: 0,
    golesLocal: 0,
    golesVisitante: 0,
    numeroTarjetasRojas: 0,
    numeroTarjetasAmarillas: 0
}
const EditMatchResult = ({ accessToken, partido, onEditMatchResultSuccess }) => {
    const [newResultData, setNewResultData] = useState(resultado);

    useEffect(() => {
        if (partido) {
            setNewResultData(partido.marcador);
        } else {
            setNewResultData(resultado);
        }
    }, [partido]);


    const handleInputLocal = (e) => {
        const { value } = e.target;
        setNewResultData((prevState) => ({
            ...prevState,
            golesLocal: value,
        }));
    };

    const handleInputVisitante = (e) => {
        const { value } = e.target;
        setNewResultData((prevState) => ({
            ...prevState,
            golesVisitante: value,
        }));
    };

    const handleUpdateEquipo = async () => {
        try {
            await updateResult(accessToken, partido, newResultData);
            onEditMatchResultSuccess();
        } catch (error) {
            console.error('Error al agregar equipo:', error);
        }
    };

    return (
        <div className="contenido">
            <div className="info">
                <div className="teams">
                    <div className="equipoLocal">
                        <label className="name" htmlFor="nombre">
                            {partido.equipoLocal ? partido.equipoLocal.nombre : ''}
                        </label>
                        <input type="number"
                               className="insert"
                               name="nombre"
                               value={newResultData.golesLocal || ''}
                               onChange={handleInputLocal} required
                        />
                    </div>
                    <div className="equipoVisitante">
                        <label className="name" htmlFor="nombre">
                            {partido.equipoVisitante ? partido.equipoVisitante.nombre : ''}
                        </label>
                        <input type="number"
                               className="insert"
                               name="nombre"
                               value={newResultData.golesVisitante || ''}
                               onChange={handleInputVisitante} required
                        />
                    </div>
                </div>
                <button type="button"
                        className="btn"
                        onClick={handleUpdateEquipo}>
                    Editar equipo
                </button>
            </div>
        </div>
    );
};

export default EditMatchResult;
