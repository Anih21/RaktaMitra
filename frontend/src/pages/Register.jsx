import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from '../components/RoleSelector';
import DonorRegistrationForm from '../components/DonorRegistrationForm';
import SeekerRegistrationForm from '../components/SeekerRegistrationForm';

import '../styles/auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  if (!selectedRole) {
    return <RoleSelector onSelectRole={setSelectedRole} />;
  }

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  const handleRegistrationSuccess = () => {
    navigate('/login');
  };

  const renderFormComponent = () => {
    switch (selectedRole) {
      case 'donor':
        return (
          <DonorRegistrationForm
            onSuccess={handleRegistrationSuccess}
            onBack={handleBackToRoles}
          />
        );
      case 'seeker':
        return (
          <SeekerRegistrationForm
            onSuccess={handleRegistrationSuccess}
            onBack={handleBackToRoles}
          />
        );


      default:
        return null;
    }
  };

  return renderFormComponent();
}
