import React, {useState} from "react";
import {postResult} from "../../services/AppServices";

const result = {
    golesLocal: '',
    golesVisitante: '',
    numeroTarjetasRojas: '',
    numeroTarjetasAmarillas: ''
}

const AddResult = ({ accessToken }) => {
    const [resultData, setResultData] = useState(result);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResultData({
            ...resultData,
            [name]: value,
        });
    };

    const handleAddResult = async () => {
        try {
            await postResult(accessToken,resultData);

            setResultData({
                golesLocal: 0,
                golesVisitante: 0,
                numeroTarjetasRojas: 0,
                numeroTarjetasAmarillas: 0
            });
        } catch (error) {
            console.error('Error al agregar resultado:', error);
        }
    }

    return (
        <div>
            <div className="info">
                <div className="golesFavor">
                    <label className="name" htmlFor="nombre">Goles local:</label>
                    <input type="text" className="insert" name="golesLocal"
                           value={resultData.golesLocal}
                           onChange={handleInputChange} required
                    />
                </div>
                    <br />
                <div className="golesContra">
                    <label className="name" htmlFor="bandera">Goles visitante:</label>
                    <input type="text" className="insert" name="golesVisitante"
                           value={resultData.golesVisitante}
                           onChange={handleInputChange} required
                    />
                </div>
                    <br />
                <button type="button" className="btn" onClick={handleAddResult}>
                    Agregar resultado
                </button>
            </div>
        </div>
    );
};

export default AddResult;