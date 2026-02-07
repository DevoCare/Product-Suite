import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 299, annual: 249 },
    desc: 'For solo practitioners',
    features: [
      'Up to 2 providers',
      'AI Scribe (10 hrs/mo)',
      'E-Prescribing',
      'Patient portal',
      'Email support',
    ],
    notIncluded: ['Prior auth automation', 'API access', 'Custom integrations']
  },
  {
    name: 'Professional',
    price: { monthly: 449, annual: 379 },
    desc: 'For growing practices',
    featured: true,
    features: [
      'Up to 10 providers',
      'Unlimited AI Scribe',
      'E-Prescribing + EPCS',
      'Patient portal',
      'Prior auth automation',
      'API access',
      'Priority support',
    ],
    notIncluded: ['Custom integrations']
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annual: 'Custom' },
    desc: 'For large organizations',
    features: [
      'Unlimited providers',
      'Everything in Professional',
      'Custom integrations',
      'Dedicated success manager',
      'On-premise option',
      'SLA guarantee',
      '24/7 phone support',
    ],
    notIncluded: []
  }
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section bg-gradient-to-b from-primary-50 to-white dark:from-dark-surface dark:to-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h1 className="section-title">Simple, Transparent Pricing</h1>
            <p className="section-subtitle">Start free for 14 days. No credit card required.</p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${annual ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-medium ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                Annual <span className="text-primary-600">(Save 15%)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <div key={i} className={`relative ${plan.featured ? 'pricing-card-featured' : 'pricing-card mt-4'}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary-600 text-white shadow-lg">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{plan.desc}</p>
                
                <div className="mb-6">
                  {typeof plan.price[annual ? 'annual' : 'monthly'] === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                        ${plan.price[annual ? 'annual' : 'monthly']}
                      </span>
                      <span className="text-slate-500">/provider/mo</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">Custom</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                      <X className="w-5 h-5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/"
                  className={`w-full justify-center ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
