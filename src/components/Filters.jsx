import React, { useState } from "react";
import "./App.css";

const Filters = () => {
    const [distance, setDistance] = useState(100);
    const [flexibleHours, setFlexibleHours] = useState(false);
    const [dressCode, setDressCode] = useState(false);

    return (
        <div className="filters-card">
            <h3 className="filters-title">Filtros</h3>
            <div className="filters-options">
                <label><input type="checkbox" /> CLT</label>
                <label><input type="checkbox" /> PJ</label>
                <label><input type="checkbox" /> FreeLancer</label>
                <label><input type="checkbox" /> Estágio</label>
            </div>

            <div className="filters-distance">
                <span>Distância</span>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={distance} 
                    onChange={(e) => setDistance(e.target.value)} 
                    className="distance-slider"
                />
                <span className="distance-value">{distance} Km</span>
            </div>

            <div className="filters-toggles">
                <div className="toggle-option">
                    <label>Horário Flexível</label>
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={flexibleHours} 
                            onChange={() => setFlexibleHours(!flexibleHours)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="toggle-option">
                    <label>Vestimenta Livre</label>
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            checked={dressCode} 
                            onChange={() => setDressCode(!dressCode)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Filters;
