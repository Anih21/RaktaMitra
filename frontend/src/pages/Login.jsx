import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash, FaTint } from 'react-icons/fa';
import '../styles/auth.css';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t('login.errorEmailRequired') || 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = t('login.errorEmailInvalid') || 'Please enter a valid email';
      }
    }

    if (!formData.password) {
      newErrors.password = t('login.errorPasswordRequired') || 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        if (formData.rememberMe) {
          localStorage.setItem('rakta_user', JSON.stringify({ email: formData.email, role: data.role }));
        }
        navigate('/');
      } else {
        setSubmitError(data.message || t('login.errorGeneric') || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setSubmitError(t('login.errorServer') || 'Server connection failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">

          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <FaTint />
            </div>
            <h1>{t('login.title')}</h1>
            <p>{t('login.subtitle')}</p>
          </div>

          {/* Server error */}
          {submitError && (
            <div className="alert alert-error">{submitError}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form" noValidate>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">{t('login.emailLabel') || 'Email'}</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('login.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">{t('login.passwordLabel') || 'Password'}</label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder={t('login.passwordPlaceholder')}
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Remember me */}
            <div className="form-footer">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>{t('login.rememberMe') || 'Remember me'}</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                {t('login.forgotPassword') || 'Forgot password?'}
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('login.submit')}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              {t('login.noAccount') || "Don't have an account?"}{' '}
              <Link to="/register">{t('login.register') || 'Register'}</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}