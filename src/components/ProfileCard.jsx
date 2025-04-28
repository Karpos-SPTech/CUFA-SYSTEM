import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/icon.png";
import "./App.css";

const ProfileCard = () => {
    const navigate = useNavigate();
    

    return (
        
        <div className="profile-card">
            <img src={profilePic} alt="Guilherme Silva" />
            <h2>GUILHERME SILVA</h2>
            <p>
                Experiência como ajudante de obras, serviços gerais e entregas. Sempre disposto a aprender e crescer profissionalmente.
            </p>
            <p className="location">São Paulo, SP</p>
            <div className="button-group">
                <div className="button-item" onClick={() => navigate("/saved-items")}>
                    <i className="fas fa-bookmark"></i>
                    <span>Itens salvos</span>
                </div>
                <div className="button-item">
                    
                    <i className="fas fa-users"></i>
                    <span>Grupos</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;