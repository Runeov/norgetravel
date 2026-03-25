'use client';

import { useState } from 'react';
import { Mail, MapPin, Copy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPanel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formValues = new FormData(form);
      const payload = new URLSearchParams();
      formValues.forEach((value, key) => {
        payload.append(key, String(value));
      });

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} copied to clipboard`);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-[#1B3A5C]/5 via-white to-[#00CC6A]/5 relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3A5C]/10 text-[#1B3A5C] rounded-full text-sm font-medium mb-4">
            Plan your Arctic adventure
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
            Get in touch
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Questions about a tour? Partnership inquiry? We reply within one business day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info */}
          <div className="space-y-8 order-2 lg:order-1">
            <Card className="bg-white shadow-xl border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Contact details</h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1B3A5C]/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-[#1B3A5C]" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">Email us</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:hello@norgetravel.com" className="text-[#1B3A5C] hover:underline">hello@norgetravel.com</a>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('hello@norgetravel.com', 'Email')} aria-label="Copy email address">
                          <Copy className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1B3A5C]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[#1B3A5C]" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">Based in</p>
                      <p className="text-sm text-slate-600">Norway 🇳🇴</p>
                    </div>
                  </div>
                </div>

                {/* Affiliate note */}
                <div className="mt-8 p-4 bg-[#00CC6A]/10 rounded-xl border border-[#00CC6A]/20">
                  <p className="text-sm text-slate-700 font-medium mb-1">Affiliate partners</p>
                  <p className="text-sm text-slate-500">
                    NorgeTravel.com earns commissions from linked operators. All recommendations are independent and based on quality, sustainability, and traveller value.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Form */}
          <Card className="bg-white shadow-xl border-slate-200 order-1 lg:order-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-[#00CC6A] mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Thanks for reaching out!</h4>
                  <p className="text-slate-600 mb-6">We'll get back to you within one business day.</p>
                  <Button
                    onClick={() => setSubmitStatus('idle')}
                    variant="outline"
                    className="border-[#1B3A5C] text-[#1B3A5C] hover:bg-[#1B3A5C]/10"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>Don&apos;t fill this out: <input name="bot-field" /></label>
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium">Name *</label>
                      <Input
                        id="contact-name"
                        name="name"
                        required
                        aria-required="true"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-interest" className="text-sm font-medium">Interested in</label>
                      <Input
                        id="contact-interest"
                        name="interest"
                        placeholder="e.g. Northern Lights"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium">Email *</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium">Message *</label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      aria-required="true"
                      className="h-32"
                      placeholder="Tell us about your Norway travel plans..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      Something went wrong. Try again or email us directly at hello@norgetravel.com.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#1B3A5C] hover:bg-[#152f4a] text-white"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? 'Sending...' : 'Send message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
