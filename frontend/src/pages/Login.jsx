import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/auth.css';

export default function Login() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');


  const validateForm = () => {

    const newErrors = {};

    if (!formData.email.trim()) {

      newErrors.email =
        'Email is required';

    }
    else {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {

        newErrors.email =
          'Please enter valid email';

      }

    }


    if (!formData.password) {

      newErrors.password =
        'Password is required';

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value
    }));


    if (errors[name]) {

      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));

    }

  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitError('');


    if (!validateForm()) {

      return;

    }


    setLoading(true);


    try {


      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },


          body: JSON.stringify({

            email: formData.email,

            password: formData.password

          })

        }

      );



      const data = await response.json();



      if (data.success) {


        localStorage.setItem(
          "token",
          data.token
        );


        localStorage.setItem(
          "role",
          data.role
        );



        if (formData.rememberMe) {


          localStorage.setItem(
            "rakta_user",
            JSON.stringify({

              email: formData.email,

              role: data.role

            })

          );

        }



        navigate("/");


      }
      else {


        setSubmitError(
          data.message
        );


      }



    }
    catch (error) {


      console.log(error);


      setSubmitError(
        "Server connection failed"
      );


    }
    finally {


      setLoading(false);


    }


  };




  return (

    <div className="auth-container">

      <div className="auth-wrapper">

        <div className="auth-card">


          <div className="auth-header">

            <h1>
              {t('login.title')}
            </h1>

            <p>
              {t('login.subtitle')}
            </p>

          </div>



          {
            submitError &&

            <div className="alert alert-error">

              {submitError}

            </div>

          }




          <form
            onSubmit={handleSubmit}
            className="auth-form">



            <div className="form-group">


              <label>
                Email
              </label>



              <div className="input-wrapper">


                <input

                  type="text"

                  id="email"

                  name="email"

                  placeholder={t('login.emailPlaceholder')}

                  value={formData.email}

                  onChange={handleChange}

                  className={
                    errors.email
                      ? 'input-error'
                      : ''
                  }

                />


              </div>



              {
                errors.email &&

                <span className="error-text">

                  {errors.email}

                </span>

              }


            </div>






            <div className="form-group">


              <label>

                Password

              </label>



              <div className="input-wrapper password-wrapper">



                <input


                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }


                  id="password"

                  name="password"

                  placeholder={t('login.passwordPlaceholder')}
                  value={formData.password}

                  onChange={handleChange}


                  className={
                    errors.password
                      ? 'input-error'
                      : ''
                  }


                />





                <button


                  type="button"


                  className="toggle-password"


                  onClick={() =>
                    setShowPassword(!showPassword)
                  }


                >


                  {
                    showPassword

                      ? <FaEyeSlash />

                      : <FaEye />

                  }


                </button>



              </div>



              {
                errors.password &&

                <span className="error-text">

                  {errors.password}

                </span>

              }


            </div>






            <div className="form-footer">


              <label className="checkbox-label">


                <input


                  type="checkbox"


                  name="rememberMe"


                  checked={
                    formData.rememberMe
                  }


                  onChange={handleChange}


                />


                <span>

                  Remember me

                </span>


              </label>


            </div>






            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
              disabled={loading}
            >
              {
                loading
                  ? t('common.loading')
                  : t('login.submit')
              }
            </button>


          </form>





          <div className="auth-footer">


            <p>


              Don't have an account?{" "}


              <Link to="/register">

                Register

              </Link>



            </p>


          </div>




        </div>


      </div>


    </div>


  );

}