import React, { useState } from "react";
import { useSavedItems } from "../components/SavedItemsContext";
import "./App.css";

const JobCard = ({ logo, company, type, time, title, description, functions, benefits, customClass }) => {
    const [isSaved, setIsSaved] = useState(false);
    const { addSavedItem, removeSavedItem } = useSavedItems();

    const toggleSave = () => {
        const jobData = { logo, company, type, time, title, description, functions, benefits };
        if (isSaved) {
            removeSavedItem(jobData);
        } else {
            addSavedItem(jobData);
        }
        setIsSaved(!isSaved);
    };

    return (
        <div className={`job-card ${customClass || ""}`}>
            <div className="job-card-header">
                <img src={logo} alt={company} className="job-logo" />
                <div className="job-info">
                    <h3 className="job-company">{company}</h3>
                    <p className="job-details">{type} | {time}</p>
                </div>
                <div className="job-save" onClick={toggleSave}>
                    <i className={`fas fa-bookmark ${isSaved ? "saved" : "unsaved"}`}></i>
                </div>
            </div>
            <h4 className="job-title">{title}</h4>
            <div className="job-description">
                <p><strong>🍔 Vaga de Chapeiro – McDonald's</strong></p>
                <p>{description}</p>
                <p><strong>👨‍🍳 Suas atividades:</strong></p>
                <ul>
                    {functions.map((func, index) => (
                        <li key={index}>{func}</li>
                    ))}
                </ul>
                <p><strong>Benefícios:</strong></p>
                <ul>
                    {benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
                <p><em>✨ Venha fazer parte do time que é referência em sabor e agilidade! #VemProMéqui</em></p>
            </div>
            <button className="apply-button">ME CANDIDATAR</button>
        </div>
    );
};

export default JobCard;