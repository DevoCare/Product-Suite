import { Shield, Lock, Eye, Server, CheckCircle, Globe, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const certifications = [
  { name: 'HIPAA Compliant', desc: 'Full administrative, physical, and technical safeguards' },
  { name: 'SOC 2 Type II', desc: 'Annual third-party security audits' },
  { name: 'ONC Certified', desc: '2015 Edition Cures Update certified' },
  { name: 'FHIR R4 Native', desc: 'HL7 FHIR R4 compliant APIs' },
];

const features = [
  { icon: Lock, title: 'AES-256 Encryption', desc: 'All data encrypted at rest and in transit' },
  { icon: Eye, title: 'Audit Logging', desc: 'Complete access and activity tracking' },
  { icon: Server, title: 'Secure Infrastructure', desc: 'SOC 2 certified data centers' },
  { icon: Shield, title: 'MFA Required', desc: 'Multi-factor authentication for all users' },
];

export default function Security() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section bg-gradient-to-b from-primary-50 to-white dark:from-dark-surface dark:to-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <span className="badge-success mb-4">
              <Shield className="w-4 h-4" /> Trust Center
            </span>
            <h1 className="section-title">
              Enterprise-Grade Security
            </h1>
            <p className="section-subtitle">
              Your patients trust you with their health. You can trust us with their data.
            </p>
          </div>

          {/* Certifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {certifications.map((cert, i) => (
              <div key={i} className="card p-4 text-center">
                <CheckCircle className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{cert.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="section bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Security Infrastructure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="feature-card text-center">
                <div className="icon-box mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-50 dark:bg-dark-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Questions About Security?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Our security team is ready to help with your compliance requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Request Security Review <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="btn-secondary">Download SOC 2 Report</button>
          </div>
        </div>
      </section>
    </div>
  );
}
