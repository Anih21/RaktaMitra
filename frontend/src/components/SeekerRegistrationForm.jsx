import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaUser,
    FaHeartbeat,
    FaMapMarkerAlt,
    FaPhone,
    FaHospital,
    FaEyeSlash,
    FaEye,
    FaCheck,
    FaArrowLeft,
    FaArrowRight,
    FaEnvelope
} from "react-icons/fa";

import '../styles/auth.css';

const RELATIONSHIPS = ['Self', 'Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Child', 'Other'];
const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export default function SeekerRegistrationForm({ onSuccess, onBack }) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        patientName: '',
        relationship: '',
        bloodGroupNeeded: '',
        unitsNeeded: '',
        urgency: 'moderate',
        medicalReason: '',

        hospitalName: '',
        doctorName: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const steps = [
        { label: t('steps.credentials'), icon: FaUser },
        { label: t('steps.details'), icon: FaHeartbeat },
        { label: t('steps.extra'), icon: FaHospital }
    ];

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 0) {
            if (!formData.fullName.trim()) {
                newErrors.fullName = t('validation.fullName');
            }
            if (!formData.email.trim()) {
                newErrors.email = t('validation.email');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = t('validation.email');
            }
            if (!formData.mobile.trim()) {
                newErrors.mobile = t('validation.mobile');
            } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
                newErrors.mobile = t('validation.mobile');
            }
            if (!formData.password) {
                newErrors.password = t('validation.password');
            } else if (formData.password.length < 8) {
                newErrors.password = t('validation.passwordLen');
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = t('validation.passwordMatch');
            }
        }

        if (step === 1) {
            if (!formData.patientName.trim()) {
                newErrors.patientName = t('validation.patientName') || 'Patient name is required';
            }
            if (!formData.relationship) {
                newErrors.relationship = t('validation.relationship');
            }
            if (!formData.bloodGroupNeeded) {
                newErrors.bloodGroupNeeded = t('validation.bloodGroup');
            }
            if (!formData.unitsNeeded || parseInt(formData.unitsNeeded) <= 0) {
                newErrors.unitsNeeded = t('validation.units');
            }
            if (!formData.medicalReason.trim()) {
                newErrors.medicalReason = t('validation.medicalReason');
            }
        }



        // Step 4 (index 3) hospitalization details are optional, but name is nice to validate if entered
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

        if (!validateStep(2)) return;

        setLoading(true);

        try {


            const seekerData = {

                fullName: formData.fullName,

                email: formData.email,

                phone: formData.mobile,

                password: formData.password,

                role: "SEEKER",


                patientName: formData.patientName,

                relationship: formData.relationship,

                bloodGroupNeeded: formData.bloodGroupNeeded,

                unitsNeeded: Number(formData.unitsNeeded),

                urgency: formData.urgency,

                medicalReason: formData.medicalReason,

                hospitalName: formData.hospitalName,

                doctorName: formData.doctorName

            };


            console.log("Sending to backend:", seekerData);



            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(seekerData)

                }
            );



            const data = await response.json();



            console.log("Backend response:", data);



            if (response.ok) {

                alert("Registration Successful");

                onSuccess();

            }
            else {

                setErrors({
                    submit: data.message
                });

            }



        }
        catch (error) {

            console.log(error);

            setErrors({
                submit: "Backend connection failed"
            });

        }
        finally {

            setLoading(false);

        }

    };

    return (
        <div className="registration-container">
            <div className="registration-wrapper">
                <div className="registration-card">
                    <div className="registration-header">
                        <h1>{t('seekerForm.title')}</h1>
                        <p>{t('seekerForm.subtitle')}</p>
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
                                    <label>{t('fields.fullName')}</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder={t('fields.fullNamePlaceholder')}
                                        className={errors.fullName ? 'input-error' : ''}
                                    />
                                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('fields.email')}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('fields.emailPlaceholder')}
                                            className={errors.email ? 'input-error' : ''}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('fields.mobile')}</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder={t('fields.mobilePlaceholder')}
                                            maxLength="10"
                                            className={errors.mobile ? 'input-error' : ''}
                                        />
                                        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('fields.password')}</label>
                                        <div className="input-wrapper password-wrapper">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder={t('fields.passwordPlaceholder')}
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
                                        <label>{t('fields.confirmPassword')}</label>
                                        <div className="input-wrapper password-wrapper">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder={t('fields.confirmPasswordPlaceholder')}
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

                                <div className="step-actions">
                                    <button type="button" className="btn btn-outline" onClick={onBack}>
                                        <FaArrowLeft /> {t('fields.back')}
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                                        {t('fields.next')} <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Patient & Medical Details */}
                        {currentStep === 1 && (
                            <div className="step-content">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('seekerForm.patientName')}</label>
                                        <input
                                            type="text"
                                            name="patientName"
                                            value={formData.patientName}
                                            onChange={handleChange}
                                            placeholder={t('seekerForm.patientNamePlaceholder')}
                                            className={errors.patientName ? 'input-error' : ''}
                                        />
                                        {errors.patientName && <span className="error-text">{errors.patientName}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('seekerForm.relationship')}</label>
                                        <select
                                            name="relationship"
                                            value={formData.relationship}
                                            onChange={handleChange}
                                            className={errors.relationship ? 'input-error' : ''}
                                        >
                                            <option value="">{t('seekerForm.selectRelationship')}</option>
                                            {RELATIONSHIPS.map(rel => (
                                                <option key={rel} value={rel.toLowerCase()}>{t(`common.${rel.toLowerCase()}`) || rel}</option>
                                            ))}
                                        </select>
                                        {errors.relationship && <span className="error-text">{errors.relationship}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('seekerForm.bloodGroupNeeded')}</label>
                                        <select
                                            name="bloodGroupNeeded"
                                            value={formData.bloodGroupNeeded}
                                            onChange={handleChange}
                                            className={errors.bloodGroupNeeded ? 'input-error' : ''}
                                        >
                                            <option value="">{t('donorForm.selectBloodGroup')}</option>
                                            {BLOOD_GROUPS.map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                        {errors.bloodGroupNeeded && <span className="error-text">{errors.bloodGroupNeeded}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('seekerForm.unitsNeeded')}</label>
                                        <input
                                            type="number"
                                            name="unitsNeeded"
                                            value={formData.unitsNeeded}
                                            onChange={handleChange}
                                            placeholder={t('seekerForm.unitsPlaceholder')}
                                            min="1"
                                            className={errors.unitsNeeded ? 'input-error' : ''}
                                        />
                                        {errors.unitsNeeded && <span className="error-text">{errors.unitsNeeded}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>{t('seekerForm.urgency')}</label>
                                    <select
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleChange}
                                    >
                                        <option value="urgent">{t('seekerForm.urgent')}</option>
                                        <option value="moderate">{t('seekerForm.moderate')}</option>
                                        <option value="low">{t('seekerForm.low')}</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>{t('seekerForm.medicalReason')}</label>
                                    <textarea
                                        name="medicalReason"
                                        value={formData.medicalReason}
                                        onChange={handleChange}
                                        placeholder={t('seekerForm.medicalReasonPlaceholder')}
                                        className={errors.medicalReason ? 'input-error' : ''}
                                        rows="3"
                                    />
                                    {errors.medicalReason && <span className="error-text">{errors.medicalReason}</span>}
                                </div>

                                <div className="step-actions">
                                    <button type="button" className="btn btn-outline" onClick={handlePrev}>
                                        <FaArrowLeft /> {t('fields.back')}
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                                        {t('fields.next')} <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        )}


                        {/* STEP 4: Hospitalization & Doctor Details */}
                        {currentStep === 2 && (
                            <div className="step-content">
                                <div className="form-group">
                                    <label>{t('seekerForm.hospitalName')}</label>
                                    <input
                                        type="text"
                                        name="hospitalName"
                                        value={formData.hospitalName}
                                        onChange={handleChange}
                                        placeholder={t('seekerForm.hospitalPlaceholder')}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t('seekerForm.doctorName')}</label>
                                    <input
                                        type="text"
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        placeholder={t('seekerForm.doctorPlaceholder')}
                                    />
                                </div>

                                <div className="step-actions">
                                    <button type="button" className="btn btn-outline" onClick={handlePrev} disabled={loading}>
                                        <FaArrowLeft /> {t('fields.back')}
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                                        {loading ? t('common.loading') : t('fields.submit')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
