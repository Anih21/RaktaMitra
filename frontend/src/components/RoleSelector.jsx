import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaTint, FaHeartbeat, FaHospital, FaBuilding } from 'react-icons/fa';
import '../styles/auth.css';

export default function RoleSelector({ onSelectRole }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(null);

    const roles = [
        {
            id: 'donor',
            title: t('roleSelector.donorTitle'),
            description: t('roleSelector.donorDesc'),
            icon: FaTint,
            color: '#D32F2F'
        },
        {
            id: 'seeker',
            title: t('roleSelector.seekerTitle'),
            description: t('roleSelector.seekerDesc'),
            icon: FaHeartbeat,
            color: '#D32F2F'
        }
    ];

    const handleContinue = () => {
        if (selectedRole) {
            onSelectRole(selectedRole);
        }
    };

    return (
        <div className="role-selector-container">
            <div className="role-selector-wrapper">
                <div className="role-selector-header">
                    <h1>{t('roleSelector.title')}</h1>
                    <p>{t('roleSelector.subtitle')}</p>
                </div>

                <div className="role-grid">
                    {roles.map(role => {
                        const IconComponent = role.icon;
                        return (
                            <div
                                key={role.id}
                                className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
                                onClick={() => setSelectedRole(role.id)}
                            >
                                <IconComponent className="role-icon" />
                                <h3>{role.title}</h3>
                                <p>{role.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="role-selector-actions">
                    <button
                        className="btn btn-primary"
                        onClick={handleContinue}
                        disabled={!selectedRole}
                    >
                        {t('roleSelector.continue')}
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate('/login')}
                    >
                        {t('roleSelector.backToLogin')}
                    </button>
                </div>
            </div>
        </div>
    );
}
