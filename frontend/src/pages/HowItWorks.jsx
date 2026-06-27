import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserPlus, FaSearchLocation, FaHandshake, FaTint } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/pages.css';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { icon: <FaUserPlus />, title: t('how.step1Title'), text: t('how.step1Text') },
    { icon: <FaSearchLocation />, title: t('how.step2Title'), text: t('how.step2Text') },
    { icon: <FaHandshake />, title: t('how.step3Title'), text: t('how.step3Text') },
    { icon: <FaTint />, title: t('how.step4Title'), text: t('how.step4Text') }
  ];

  return (
    <>
      <PageHeader title={t('how.title')} subtitle={t('how.subtitle')} />

      <section className="section">
        <div className="container">
          <div className="steps-wrap">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
