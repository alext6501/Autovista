import React, { useState } from 'react';
import { IonIcon } from '../components/common/IonIcon';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Specification Correction');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all required fields');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been sent to our editorial desk!', 'success');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full flex flex-col gap-10">
      
      {/* Page Title */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
          Get in Touch
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400">
          We'd love to hear from you. Reach out for catalog feedback, specification queries, or partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Contact Info Sidebar (4 cols) */}
        <div className="lg:col-span-5 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
              Editorial & Support Desk
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1 mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <IonIcon name="call-outline" size={20} />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone Inquiries
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                    +1 (800) 555-0199
                  </span>
                  <span className="text-xs text-slate-500">Mon - Fri, 9am - 6pm EST</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <IonIcon name="mail-outline" size={20} />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Direct Email
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                    info@autovista.com
                  </span>
                  <span className="text-xs text-slate-500">Typical response within 24 hours</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <IonIcon name="location-outline" size={20} />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Headquarters
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                    VeyroMotors Tech Hub
                  </span>
                  <span className="text-xs text-slate-400">
                    420 Automotive Way, Suite 800, Detroit, MI 48226
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Follow */}
          <div className="pt-6 border-t border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
              Follow VeyroMotors
            </span>
            <div className="flex items-center gap-3">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-slate-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <IonIcon name="logo-facebook" size={18} />
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-slate-700 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <IonIcon name="logo-twitter" size={18} />
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-slate-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <IonIcon name="logo-instagram" size={18} />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-slate-700 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <IonIcon name="logo-youtube" size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <IonIcon name="checkmark-circle-outline" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Message Received!</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-md">
                Thank you, <strong className="text-white">{name}</strong>. Our editorial team has received your inquiry regarding <em>{topic}</em> and will follow up at <strong className="text-white">{email}</strong>.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-bold text-white tracking-tight pb-3 border-b border-slate-800">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Specification Correction">Specification Correction</option>
                  <option value="Model Addition Request">Request a Vehicle Model to be Added</option>
                  <option value="Catalog Feedback">Catalog Usability Feedback</option>
                  <option value="Press & Media">Press & Media Inquiry</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Provide details about your inquiry or vehicle specification note..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  * Required fields
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <IonIcon name="arrow-forward-outline" size={16} />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
