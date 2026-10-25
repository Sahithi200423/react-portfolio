import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Info,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // Validate form fields on the client
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please provide a subject line.';
    } else if (formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide your message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Protection against repeated clicks
    if (status === 'submitting') {
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    // Case 1: Supabase backend is configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('messages').insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
          },
        ]);

        if (error) {
          throw error;
        }

        setStatus('success');
        setStatusMessage(
          'Thank you! Your message was submitted successfully to the database. I will get back to you shortly.'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#00f2fe', '#8a2be2', '#10b981'],
          });
        } catch (_) {}
      } catch (err) {
        console.error('Supabase submission error:', err);
        setStatus('error');
        setStatusMessage(
          `Unable to deliver message: ${err.message || 'Network error'}. Please feel free to send an email directly using the link on the right.`
        );
      }
    } else {
      // Case 2: Supabase not configured yet (Safe Fallback)
      setStatus('error');
      setStatusMessage(
        'Supabase backend is not configured with live credentials yet. Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file, or click the direct email button below!'
      );
    }
  };

  // Direct mailto link generator for convenience
  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Hello Sahithi,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
  )}`;

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <Mail size={13} /> Communication
          </span>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a question, career opportunity, or project proposal? Send a message directly or connect via social platforms.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="contact-info-col">
            <div className="glass-card contact-info-card">
              <h3 className="info-card-title">Contact Channels</h3>
              <p className="info-card-desc">
                I am actively seeking frontend developer roles, software internships, and collaborative opportunities. Reach out through any of these verified channels:
              </p>

              <div className="info-channels-list">
                <div className="info-channel-item">
                  <div className="channel-icon-wrap cyan">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="channel-label">Direct Email</span>
                    <a href={`mailto:${personalInfo.email}`} className="channel-link">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="info-channel-item">
                  <div className="channel-icon-wrap purple">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="channel-label">Current Location</span>
                    <span className="channel-text">{personalInfo.location}</span>
                  </div>
                </div>

                <div className="info-channel-item">
                  <div className="channel-icon-wrap emerald">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="channel-label">Status</span>
                    <span className="channel-text status-active">
                      {personalInfo.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles Row */}
              <div className="contact-socials-box">
                <span className="socials-box-label">Professional Networks:</span>
                <div className="contact-social-buttons">
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary contact-social-btn"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary contact-social-btn"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form */}
          <div className="contact-form-col">
            <div className="glass-card contact-form-card">
              <div className="form-header-row">
                <div className="form-icon-bubble">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="form-heading">Send a Direct Message</h3>
                  <p className="form-subheading">
                    Validated form with optional Supabase database integration.
                  </p>
                </div>
              </div>

              {/* Supabase Status Banner */}
              {!isSupabaseConfigured && (
                <div className="supabase-notice-banner" role="status">
                  <Info size={16} className="notice-icon" />
                  <div className="notice-text">
                    <strong>Supabase Demo Mode:</strong> Database environment variables are not set yet. Submissions will suggest sending directly via email or configuring <code>.env</code>.
                  </div>
                </div>
              )}

              {/* Submission Status Alerts */}
              {status === 'success' && (
                <div className="status-alert alert-success" role="alert">
                  <CheckCircle2 size={20} className="alert-icon" />
                  <div className="alert-content">
                    <strong>Success!</strong>
                    <p>{statusMessage}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="status-alert alert-error" role="alert">
                  <AlertCircle size={20} className="alert-icon" />
                  <div className="alert-content">
                    <strong>Notice:</strong>
                    <p>{statusMessage}</p>
                    <a
                      href={mailtoLink}
                      className="btn btn-primary alert-action-btn"
                      style={{ marginTop: '0.75rem', display: 'inline-flex' }}
                    >
                      <Mail size={15} />
                      <span>Open Pre-filled Email</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} noValidate className="contact-form">
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="e.g. Alex Johnson"
                    className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && (
                    <span id="name-error" className="field-error-text">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="e.g. alex@example.com"
                    className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && (
                    <span id="email-error" className="field-error-text">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="e.g. Frontend Developer Role / Project Inquiry"
                    className={`form-input ${formErrors.subject ? 'input-error' : ''}`}
                    aria-invalid={Boolean(formErrors.subject)}
                    aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                  />
                  {formErrors.subject && (
                    <span id="subject-error" className="field-error-text">
                      {formErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Please describe your message, proposal, or question..."
                    className={`form-textarea ${formErrors.message ? 'input-error' : ''}`}
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                  />
                  {formErrors.message && (
                    <span id="message-error" className="field-error-text">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary submit-btn"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="spinner-icon" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
