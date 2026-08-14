import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash, FaCheck, FaUser, FaHospital, FaMapMarkerAlt, FaWarehouse } from 'react-icons/fa';
import MaharashtraMapSelector from './MaharashtraMapSelector';
import '../styles/auth.css';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function HospitalRegistrationForm({ onSuccess, onBack }) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '', // Contact Person Name
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        hospitalName: '',
        licenceNumber: '',
        phone: '', // Facility Phone
        address: '',
        state: 'Maharashtra',
        district: '',
        taluka: '',
        city: '',
        pincode: '',
        latitude: null,
        longitude: null,
        // Inventory
        "A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0,
        plasma: 0,
        platelets: 0
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const steps = [
        { label: 'Credentials', icon: FaUser },
        { label: 'Hospital Details', icon: FaHospital },
        { label: 'Location', icon: FaMapMarkerAlt },
        { label: 'Initial Stock', icon: FaWarehouse }
    ];

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 0) {
            if (!formData.fullName.trim()) {
                newErrors.fullName = 'Contact name is required';
            }
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            if (!formData.mobile.trim()) {
                newErrors.mobile = 'Mobile number is required';
            } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
                newErrors.mobile = 'Please enter a valid 10-digit mobile number';
            }
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (step === 1) {
            if (!formData.hospitalName.trim()) {
                newErrors.hospitalName = 'Hospital name is required';
            }
            if (!formData.licenceNumber.trim()) {
                newErrors.licenceNumber = 'Licence number is required';
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'Facility phone is required';
            }
        }

        if (step === 2) {
            if (!formData.latitude || !formData.longitude) {
                newErrors.location = 'Please select a location on the map';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleStockChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: Math.max(0, parseInt(value) || 0)
        }));
    };

    const handleLocationChange = (loc) => {
        setFormData(prev => ({
            ...prev,
            latitude: loc.latitude,
            longitude: loc.longitude,
            district: loc.district,
            taluka: loc.taluka,
            city: loc.city,
            state: loc.state,
            pincode: loc.pincode,
            address: `${loc.city || ''}, ${loc.taluka || ''}, ${loc.district || ''}`
        }));
        if (errors.location) {
            setErrors(prev => ({ ...prev, location: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(3)) return;

        setLoading(true);
        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.mobile, // phone field on user schema
                password: formData.password,
                role: "HOSPITAL",
                
                // hospital specific profile details
                hospitalName: formData.hospitalName,
                licenceNumber: formData.licenceNumber,
                profilePhone: formData.phone, // phone field on hospital profile schema
                address: formData.address,
                state: formData.state,
                district: formData.district,
                taluka: formData.taluka,
                city: formData.city,
                pincode: formData.pincode,
                latitude: formData.latitude,
                longitude: formData.longitude,
                
                // initial stock
                inventory: {
                    "A+": formData["A+"],
                    "A-": formData["A-"],
                    "B+": formData["B+"],
                    "B-": formData["B-"],
                    "AB+": formData["AB+"],
                    "AB-": formData["AB-"],
                    "O+": formData["O+"],
                    "O-": formData["O-"],
                    plasma: formData.plasma,
                    platelets: formData.platelets
                }
            };

            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Hospital Registration Successful");
                onSuccess();
            } else {
                setErrors({ submit: data.message || "Registration failed" });
            }
        } catch (error) {
            console.error(error);
            setErrors({ submit: "Backend connection failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-wrapper">
                <div className="registration-card">
                    <div className="registration-header">
                        <h1>Register as Hospital</h1>
                        <p>Join the network to manage requests and inventory</p>
                    </div>

                    {/* Stepper Progress bar */}
                    <div className="stepper">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            let stepClass = 'step';
                            if (currentStep > idx) stepClass += ' completed';
                            else if (currentStep === idx) stepClass += ' active';

                            return (
                                <div key={idx} className={stepClass} onClick={() => currentStep > idx && setCurrentStep(idx)}>
                                    <div className="step-icon">
                                        {currentStep > idx ? <FaCheck /> : <Icon />}
                                    </div>
                                    <span className="step-label">{step.label}</span>
                                    {idx < steps.length - 1 && <div className="step-line" />}
                                </div>
                            );
                        })}
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {errors.submit && (
                            <div className="alert alert-error">{errors.submit}</div>
                        )}

                        {/* STEP 1: Account Credentials */}
                        {currentStep === 0 && (
                            <div className="step-content">
                                <div className="form-group">
                                    <label>Contact Person Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter contact person's name"
                                        className={errors.fullName ? 'input-error' : ''}
                                    />
                                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="hospital@example.com"
                                            className={errors.email ? 'input-error' : ''}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Mobile Number (Username)</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="10-digit number"
                                            maxLength="10"
                                            className={errors.mobile ? 'input-error' : ''}
                                        />
                                        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <div className="input-wrapper password-wrapper">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Min 8 characters"
                                                className={errors.password ? 'input-error' : ''}
                                            />
                                            <button
                                                type="button"
                                                className="toggle-password"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.password && <span className="error-text">{errors.password}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <div className="input-wrapper password-wrapper">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Repeat password"
                                                className={errors.confirmPassword ? 'input-error' : ''}
                                            />
                                            <button
                                                type="button"
                                                className="toggle-password"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Hospital Profile Details */}
                        {currentStep === 1 && (
                            <div className="step-content">
                                <div className="form-group">
                                    <label>Hospital Registered Name</label>
                                    <input
                                        type="text"
                                        name="hospitalName"
                                        value={formData.hospitalName}
                                        onChange={handleChange}
                                        placeholder="e.g. City General Hospital"
                                        className={errors.hospitalName ? 'input-error' : ''}
                                    />
                                    {errors.hospitalName && <span className="error-text">{errors.hospitalName}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Licence Number</label>
                                        <input
                                            type="text"
                                            name="licenceNumber"
                                            value={formData.licenceNumber}
                                            onChange={handleChange}
                                            placeholder="Licence certificate ID"
                                            className={errors.licenceNumber ? 'input-error' : ''}
                                        />
                                        {errors.licenceNumber && <span className="error-text">{errors.licenceNumber}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Contact Phone (Landline/Alternative)</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="e.g. 022-25XXXXXX"
                                            className={errors.phone ? 'input-error' : ''}
                                        />
                                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Map Location Picker */}
                        {currentStep === 2 && (
                            <div className="step-content">
                                <MaharashtraMapSelector
                                    value={formData}
                                    onChange={handleLocationChange}
                                    error={errors.location}
                                />
                            </div>
                        )}

                        {/* STEP 4: Initial Inventory Stock */}
                        {currentStep === 3 && (
                            <div className="step-content">
                                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary)' }}>Enter Available Stock (Units/Pouches)</h3>
                                <div className="grid grid-4" style={{ gap: '12px' }}>
                                    {BLOOD_GROUPS.map(bg => (
                                        <div className="form-group" key={bg} style={{ marginBottom: 0 }}>
                                            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>{bg}</label>
                                            <input
                                                type="number"
                                                name={bg}
                                                value={formData[bg]}
                                                onChange={handleStockChange}
                                                min="0"
                                                className="form-control"
                                                style={{ padding: '8px' }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="form-row" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Plasma Units</label>
                                        <input
                                            type="number"
                                            name="plasma"
                                            value={formData.plasma}
                                            onChange={handleStockChange}
                                            min="0"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Platelets Units</label>
                                        <input
                                            type="number"
                                            name="platelets"
                                            value={formData.platelets}
                                            onChange={handleStockChange}
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="role-selector-actions" style={{ marginTop: '24px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                            {currentStep > 0 ? (
                                <button type="button" className="btn btn-outline" onClick={handlePrev}>
                                    <FaArrowLeft style={{ marginRight: 6 }} /> Back
                                </button>
                            ) : (
                                <button type="button" className="btn btn-outline" onClick={onBack}>
                                    Cancel
                                </button>
                            )}

                            {currentStep < steps.length - 1 ? (
                                <button type="button" className="btn btn-primary" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                                    Next <FaArrowRight style={{ marginLeft: 6 }} />
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginLeft: 'auto' }}>
                                    {loading ? 'Submitting...' : 'Register'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
