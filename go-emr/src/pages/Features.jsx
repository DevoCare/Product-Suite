import { Link } from 'react-router-dom';
import {
  Mic,
  FileText,
  Users,
  Calendar,
  Activity,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  Globe,
  Bell,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    category: 'Clinical',
    items: [
      { icon: Mic, title: 'AI Scribe', desc: 'Voice-to-SOAP notes with auto-coding' },
      { icon: FileText, title: 'E-Prescribing', desc: 'EPCS certified with drug checks' },
      { icon: Activity, title: 'Clinical Decision Support', desc: 'Evidence-based alerts' },
    ]
  },
  {
    category: 'Patient Engagement',
    items: [
      { icon: Users, title: 'Patient Portal', desc: 'Secure messaging & records access' },
      { icon: Calendar, title: 'Online Scheduling', desc: 'Self-service appointments' },
      { icon: Bell, title: 'Reminders', desc: 'SMS, email & voice reminders' },
    ]
  },
  {
    category: 'Operations',
    items: [
      { icon: TrendingUp, title: 'Revenue Cycle', desc: '98% clean claims rate' },
      { icon: Clock, title: 'Prior Auth', desc: 'Electronic prior authorization' },
      { icon: Globe, title: 'Interoperability', desc: 'FHIR R4 native APIs' },
    ]
  }
];

export default function Features() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section bg-gradient-to-b from-primary-50 to-white dark:from-dark-surface dark:to-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <span className="badge-primary mb-4">Features</span>
            <h1 className="section-title">
              Everything You Need,{' '}
              <span className="gradient-text">Nothing You Don't</span>
            </h1>
            <p className="section-subtitle">
              Built by healthcare professionals for modern practices.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {features.map((category, idx) => (
        <section key={idx} className={`section ${idx % 2 === 1 ? 'bg-slate-50 dark:bg-dark-surface' : 'bg-white dark:bg-dark-bg'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {category.category}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {category.items.map((item, i) => (
                <div key={i} className="feature-card">
                  <div className="icon-box mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">See It In Action</h2>
          <p className="text-primary-100 mb-8">Schedule a personalized demo today.</p>
          <Link to="/" className="btn-primary-lg bg-white text-primary-700 hover:bg-slate-100">
            Request Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
