import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Shield,
  Zap,
  Clock,
  Users,
  FileText,
  Activity,
  CheckCircle,
  Star,
  Mic,
  Globe,
  Lock,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-surface" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/50 to-transparent dark:from-primary-900/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Now with AI-Powered Documentation
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Modern EMR for{' '}
                <span className="gradient-text">Healthcare</span>{' '}
                Providers
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Streamline your practice with intelligent charting, seamless billing, 
                and patient engagement tools. Built for the future of healthcare.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link to="/" className="btn-primary-lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="trust-badge">
                  <Shield className="w-4 h-4 text-primary-600" />
                  HIPAA Compliant
                </span>
                <span className="trust-badge">
                  <Globe className="w-4 h-4 text-primary-600" />
                  FHIR R4 Native
                </span>
                <span className="trust-badge">
                  <Lock className="w-4 h-4 text-primary-600" />
                  SOC 2 Type II
                </span>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl" />
                
                {/* Dashboard Card */}
                <div className="relative card p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Today's Overview</h3>
                        <p className="text-sm text-slate-500">January 6, 2026</p>
                      </div>
                    </div>
                    <span className="badge-success">Live</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-dark-surface rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary-600">24</div>
                      <div className="text-xs text-slate-500">Patients</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-dark-surface rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-600">98%</div>
                      <div className="text-xs text-slate-500">Claims Rate</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-dark-surface rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-accent-600">$12.4k</div>
                      <div className="text-xs text-slate-500">Revenue</div>
                    </div>
                  </div>

                  {/* AI Scribe */}
                  <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                        <Mic className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">AI Scribe Active</div>
                        <div className="text-xs text-slate-500">Listening...</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full w-full" />
                      <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full w-4/5" />
                      <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full w-3/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-dark-bg border-y border-slate-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '70%', label: 'Less Charting Time' },
              { value: '98%', label: 'Claim Acceptance' },
              { value: '50%', label: 'Fewer No-Shows' },
              { value: '4.9', label: 'Customer Rating', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value flex items-center justify-center gap-1">
                  {stat.value}
                  {stat.icon && <stat.icon className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-slate-50 dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2 className="section-title">
              Everything You Need to Run Your Practice
            </h2>
            <p className="section-subtitle">
              Powerful features designed by healthcare professionals, for healthcare professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mic,
                title: 'AI Documentation',
                description: 'Voice-powered SOAP notes that write themselves. Reduce charting by 70%.',
              },
              {
                icon: FileText,
                title: 'E-Prescribing',
                description: 'EPCS certified. Real-time drug interactions and formulary checks.',
              },
              {
                icon: Users,
                title: 'Patient Portal',
                description: 'Online scheduling, secure messaging, and health record access.',
              },
              {
                icon: TrendingUp,
                title: 'Revenue Cycle',
                description: '98% clean claims rate with AI-powered billing optimization.',
              },
              {
                icon: Clock,
                title: 'Smart Scheduling',
                description: 'Reduce no-shows by 50% with automated reminders.',
              },
              {
                icon: Shield,
                title: 'Compliance Built-In',
                description: 'HIPAA, SOC 2, and ONC certified. Your data is safe.',
              },
            ].map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="icon-box mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/features" className="btn-secondary">
              View All Features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section bg-white dark:bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 dark:text-white mb-6">
            "GoEMR cut my documentation time in half. I actually get to spend time with my patients now."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
              DR
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900 dark:text-white">Dr. Rachel Thompson</div>
              <div className="text-sm text-slate-500">Family Medicine, Portland OR</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of providers who've modernized their workflow with GoEMR. 
            Start your free 14-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary-lg bg-white text-primary-700 hover:bg-slate-100">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-ghost text-white hover:bg-white/10">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
