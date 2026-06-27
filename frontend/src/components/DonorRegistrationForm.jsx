import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash, FaCheck, FaUser, FaHeartbeat, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import MaharashtraMapSelector from './MaharashtraMapSelector';
import '../styles/auth.css';

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const GENDERS = ['Male', 'Female', 'Other'];

export default function DonorRegistrationForm({ onSuccess, onBack }) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        bloodGroup: '',
        age: '',
        gender: '',
        weight: '',
        lastDonationDate: '',
        aadhaar: '',
        address: '',
        state: 'Maharashtra',
        district: '',
        taluka: '',
        city: '',
        pincode: '',
        latitude: null,
        longitude: null,
        emergencyContact: '',
        emergencyContactPhone: '',
        availability: 'yes'
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const steps = [
        { label: t('steps.credentials'), icon: FaUser },
        { label: t('steps.details'), icon: FaHeartbeat },
        { label: t('steps.location'), icon: FaMapMarkerAlt },
        { label: t('steps.extra'), icon: FaPhoneAlt }
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
            if (!formData.bloodGroup) {
                newErrors.bloodGroup = t('validation.bloodGroup');
            }
            if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 65) {
                newErrors.age = t('validation.age');
            }
            if (!formData.gender) {
                newErrors.gender = t('validation.gender');
            }
            if (!formData.weight || parseInt(formData.weight) < 50) {
                newErrors.weight = t('validation.weight');
            }
        }

        if (step === 2) {
            if (!formData.latitude || !formData.longitude) {
                newErrors.location = t('fields.mapRequired');
            }
        }

        if (step === 3) {
            if (!formData.emergencyContact.trim()) {
                newErrors.emergencyContact = t('validation.emergencyContact');
            }
            if (!formData.emergencyContactPhone.trim()) {
                newErrors.emergencyContactPhone = t('validation.emergencyContactPhone');
            } else if (!/^[0-9]{10}$/.test(formData.emergencyContactPhone.replace(/\D/g, ''))) {
                newErrors.emergencyContactPhone = t('validation.emergencyContactPhone');
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


            const donorData = {


                fullName: formData.fullName,

                email: formData.email,

                phone: formData.mobile,

                password: formData.password,


                role: "DONOR",



                // donor details

                bloodGroup: formData.bloodGroup,

                age: Number(formData.age),

                gender: formData.gender,

                weight: Number(formData.weight),

                lastDonationDate: formData.lastDonationDate,

                aadhaar: formData.aadhaar,


                // location

                address: formData.address,

                state: formData.state,

                district: formData.district,

                taluka: formData.taluka,

                city: formData.city,

                pincode: formData.pincode,

                latitude: formData.latitude,

                longitude: formData.longitude,


                // emergency

                emergencyContact: formData.emergencyContact,

                emergencyContactPhone: formData.emergencyContactPhone,


                availability: formData.availability


            };



            console.log("Sending donor data:", donorData);



            const response = await fetch(

                "http://localhost:5000/api/auth/register",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },


                    body: JSON.stringify(donorData)

                }

            );




            const data = await response.json();



            console.log("Backend response:", data);



            if (response.ok) {


                alert("Donor Registration Successful");

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
                        <h1>{t('donorForm.title')}</h1>
                        <p>{t('donorForm.subtitle')}</p>
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

                        {/* STEP 2: Medical Profile */}
                        {currentStep === 1 && (
                            <div className="step-content">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('donorForm.bloodGroup')}</label>
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            className={errors.bloodGroup ? 'input-error' : ''}
                                        >
                                            <option value="">{t('donorForm.selectBloodGroup')}</option>
                                            {BLOOD_GROUPS.map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                        {errors.bloodGroup && <span className="error-text">{errors.bloodGroup}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('donorForm.age')}</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder={t('donorForm.agePlaceholder')}
                                            min="18"
                                            max="65"
                                            className={errors.age ? 'input-error' : ''}
                                        />
                                        {errors.age && <span className="error-text">{errors.age}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('donorForm.gender')}</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className={errors.gender ? 'input-error' : ''}
                                        >
                                            <option value="">{t('donorForm.selectGender')}</option>
                                            {GENDERS.map(g => (
                                                <option key={g} value={g.toLowerCase()}>{t(`donate.${g.toLowerCase()}`)}</option>
                                            ))}
                                        </select>
                                        {errors.gender && <span className="error-text">{errors.gender}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('donorForm.weight')}</label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            placeholder={t('donorForm.weightPlaceholder')}
                                            min="50"
                                            className={errors.weight ? 'input-error' : ''}
                                        />
                                        {errors.weight && <span className="error-text">{errors.weight}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('donorForm.lastDonation')}</label>
                                        <input
                                            type="date"
                                            name="lastDonationDate"
                                            value={formData.lastDonationDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('donorForm.aadhaar')}</label>
                                        <input
                                            type="text"
                                            name="aadhaar"
                                            value={formData.aadhaar}
                                            onChange={handleChange}
                                            placeholder={t('donorForm.aadhaarPlaceholder')}
                                            maxLength="12"
                                        />
                                    </div>
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

                        {/* STEP 3: Map Location Picker */}
                        {currentStep === 2 && (
                            <div className="step-content">
                                <div className="form-group">
                                    <label>{t('steps.location')}</label>
                                    <MaharashtraMapSelector
                                        value={formData}
                                        onChange={handleLocationChange}
                                        error={errors.location}
                                    />
                                </div>

                                <div className="step-actions" style={{ marginTop: '24px' }}>
                                    <button type="button" className="btn btn-outline" onClick={handlePrev}>
                                        <FaArrowLeft /> {t('fields.back')}
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                                        {t('fields.next')} <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Emergency Contacts & Availability */}
                        {currentStep === 3 && (
                            <div className="step-content">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('donorForm.emergencyName')}</label>
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            placeholder={t('donorForm.emergencyNamePlaceholder')}
                                            className={errors.emergencyContact ? 'input-error' : ''}
                                        />
                                        {errors.emergencyContact && <span className="error-text">{errors.emergencyContact}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>{t('donorForm.emergencyPhone')}</label>
                                        <input
                                            type="tel"
                                            name="emergencyContactPhone"
                                            value={formData.emergencyContactPhone}
                                            onChange={handleChange}
                                            placeholder={t('donorForm.emergencyPhonePlaceholder')}
                                            maxLength="10"
                                            className={errors.emergencyContactPhone ? 'input-error' : ''}
                                        />
                                        {errors.emergencyContactPhone && <span className="error-text">{errors.emergencyContactPhone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>{t('donorForm.availability')}</label>
                                    <select
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleChange}
                                    >
                                        <option value="yes">{t('donorForm.available')}</option>
                                        <option value="no">{t('donorForm.unavailable')}</option>
                                    </select>
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
