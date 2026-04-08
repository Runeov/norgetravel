'use client';

import Image from 'next/image';
import { Employee, TimelineMilestone } from '@/types/admin';
import { MapPin, Mail, Phone, Briefcase, GraduationCap, Award, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface EmployeeProfileCardProps {
  employee: Employee;
}

// Generate placeholder milestones based on employee data
function generateMilestones(employee: Employee): TimelineMilestone[] {
  const currentYear = new Date().getFullYear();
  const yearsNum = parseInt(employee.experience.replace(/\D/g, '')) || 10;
  const startYear = currentYear - yearsNum;
  
  const milestones: TimelineMilestone[] = [];
  
  // Starting milestone
  milestones.push({
    year: startYear.toString(),
    title: 'Begynte karrieren',
    description: `Startet sin reise innen ${employee.specialties[0]?.toLowerCase() || 'regnskap'}`,
    icon: 'briefcase'
  });
  
  // Education milestone (if available)
  if (employee.education && employee.education.length > 0) {
    milestones.push({
      year: (startYear + 2).toString(),
      title: employee.education[0],
      description: 'Fullførte utdanning og sertifisering',
      icon: 'graduation'
    });
  }
  
  // Mid-career milestone
  const midYear = startYear + Math.floor(yearsNum / 2);
  milestones.push({
    year: midYear.toString(),
    title: 'Spesialisering',
    description: `Utviklet spisskompetanse innen ${employee.specialties.slice(0, 2).join(' og ').toLowerCase()}`,
    icon: 'award'
  });
  
  // Joined Averdi milestone
  milestones.push({
    year: (currentYear - 5).toString(),
    title: 'Ble en del av Averdi',
    description: `Begynte som ${employee.role.split('/')[0].trim()} i Karasjok`,
    icon: 'star',
    highlight: true
  });
  
  // Current role milestone
  if (employee.role.includes('Statsautorisert') || employee.role.includes('leder')) {
    milestones.push({
      year: currentYear.toString(),
      title: employee.role,
      description: `Leder nå ${employee.clientTypes?.length || 3}+ klienttyper med fokus på ${employee.specialties[0]?.toLowerCase() || 'kvalitet'}`,
      icon: 'award',
      highlight: true
    });
  }
  
  return milestones;
}

// Icon component for timeline
function TimelineIcon({ type, isHighlight }: { type: TimelineMilestone['icon']; isHighlight?: boolean }) {
  const iconClass = cn(
    "w-4 h-4",
    isHighlight ? "text-white" : "text-[#E86C1F]"
  );
  
  switch (type) {
    case 'briefcase':
      return <Briefcase className={iconClass} aria-hidden="true" />;
    case 'graduation':
      return <GraduationCap className={iconClass} aria-hidden="true" />;
    case 'award':
      return <Award className={iconClass} aria-hidden="true" />;
    case 'star':
      return <Star className={iconClass} aria-hidden="true" />;
    default:
      return <Briefcase className={iconClass} aria-hidden="true" />;
  }
}

export default function EmployeeProfileCard({ employee }: EmployeeProfileCardProps) {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);

  // Use custom timeline if available, otherwise generate placeholder milestones
  const milestones = employee.timeline && employee.timeline.length > 0
    ? employee.timeline
    : generateMilestones(employee);

  // Mock testimonials - in production, these would come from the employee data
  const testimonials = [
    {
      content: `${employee.name} har vært uvurderlig for vår organisasjon. Kompetansen og den lokale forankringen gjør en enorm forskjell.`,
      author: "Klient A",
      company: "Lokal bedrift, Finnmark"
    },
    {
      content: "Profesjonell, tilgjengelig og alltid løsningsorientert. Anbefales på det varmeste!",
      author: "Klient B", 
      company: "Samisk organisasjon"
    },
    {
      content: `Takket være ${employee.name.split(' ')[0]} har vi full kontroll på økonomien og kan fokusere på kjernevirksomheten.`,
      author: "Klient C",
      company: "Oppstartsbedrift"
    }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
  };

  // Calculate stats
  const yearsExp = employee.experience.includes('+') 
    ? employee.experience.replace(/\D/g, '') + '+'
    : employee.experience;
  
  const endorsementCount = employee.achievements?.length || testimonials.length * 8;

  return (
    <div className="w-full max-w-[650px] mx-auto perspective-1000">
      <div className="relative bg-white rounded-2xl shadow-md p-8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        
        {/* Decorative wave background */}
        <div className="absolute bottom-0 left-0 w-full h-16 opacity-5 pointer-events-none">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            <path 
              fill="#E86C1F" 
              fillOpacity="1" 
              d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,165.3C672,160,768,192,864,213.3C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-7 relative">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            {employee.image ? (
              <Image
                src={employee.image}
                alt={employee.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-md transition-transform duration-400 hover:scale-105"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E86C1F] to-[#F4B223] flex items-center justify-center text-white text-2xl font-bold shadow-md transition-transform duration-400 hover:scale-105">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>

          {/* Header Details */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
              {employee.name}
            </h1>
            <p className="text-base font-medium text-[#E86C1F] mb-2">
              {employee.role}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-1 text-sm text-slate-500">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="capitalize">{employee.office}</span>
            </p>
          </div>

          {/* Status Badge */}
          <div className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto bg-[#E86C1F]/10 text-[#E86C1F] px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E86C1F] rounded-full animate-pulse"></span>
            Tilgjengelig
          </div>
        </div>

        {/* About Section */}
        <div className="mb-7 relative">
          <div 
            className={cn(
              "text-slate-600 text-[15px] leading-relaxed overflow-hidden transition-all duration-500",
              isAboutExpanded ? "max-h-[1000px]" : "max-h-[70px]"
            )}
          >
            {employee.description}
          </div>
          <button
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="absolute bottom-0 right-0 text-xs font-semibold text-[#E86C1F] bg-white pl-2 cursor-pointer hover:underline"
          >
            {isAboutExpanded ? 'Les mindre' : 'Les mer'}
          </button>
        </div>

        {/* Interactive Timeline/Journey Section */}
        <div className="mb-6">
          <button
            onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
            className="w-full flex items-center justify-between text-[15px] font-semibold text-slate-900 mb-3 group cursor-pointer hover:text-[#E86C1F] transition-colors"
          >
            <span className="relative inline-block">
              Min reise
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E86C1F] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
            <span className={cn(
              "flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full transition-all duration-300",
              isTimelineExpanded 
                ? "bg-[#E86C1F] text-white" 
                : "bg-slate-100 text-slate-600 group-hover:bg-[#E86C1F]/10 group-hover:text-[#E86C1F]"
            )}>
              {isTimelineExpanded ? (
                <>Skjul <ChevronUp className="w-3 h-3" aria-hidden="true" /></>
              ) : (
                <>Se historien <ChevronDown className="w-3 h-3" aria-hidden="true" /></>
              )}
            </span>
          </button>
          
          <AnimatePresence>
            {isTimelineExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="relative pl-6 py-4">
                  {/* Timeline line */}
                  <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E86C1F] via-[#F4B223] to-slate-200"></div>
                  
                  {/* Milestones */}
                  <div className="space-y-6">
                    {milestones.map((milestone, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                        className="relative"
                        onMouseEnter={() => setActiveMilestone(idx)}
                        onMouseLeave={() => setActiveMilestone(null)}
                      >
                        {/* Timeline dot */}
                        <div 
                          className={cn(
                            "absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                            milestone.highlight 
                              ? "bg-gradient-to-br from-[#E86C1F] to-[#F4B223] shadow-md" 
                              : "bg-white border-2 border-[#E86C1F]",
                            activeMilestone === idx && "scale-125 shadow-lg"
                          )}
                        >
                          <TimelineIcon type={milestone.icon} isHighlight={milestone.highlight} />
                        </div>
                        
                        {/* Milestone content */}
                        <div 
                          className={cn(
                            "ml-4 p-4 rounded-xl transition-all duration-300 cursor-pointer",
                            activeMilestone === idx 
                              ? "bg-gradient-to-r from-[#E86C1F]/10 to-[#F4B223]/10 shadow-sm" 
                              : "bg-slate-50 hover:bg-slate-100"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-1">
                            <span className={cn(
                              "text-xs font-bold px-2 py-0.5 rounded-full",
                              milestone.highlight 
                                ? "bg-[#E86C1F] text-white" 
                                : "bg-slate-200 text-slate-600"
                            )}>
                              {milestone.year}
                            </span>
                            <h4 className="text-sm font-semibold text-slate-900">
                              {milestone.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Core Skills */}
        <div className="mb-5">
          <h2 className="text-[15px] font-semibold text-slate-900 mb-3 relative inline-block group">
            Spesialområder
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E86C1F] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {employee.specialties.map((specialty, idx) => (
              <span
                key={idx}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                  idx % 3 === 0 && "bg-[#E5F7FF] text-slate-700",
                  idx % 3 === 1 && "bg-[#F0EBFF] text-slate-700",
                  idx % 3 === 2 && "bg-[#FFEDE0] text-slate-700"
                )}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        {employee.languages && employee.languages.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold text-slate-900 mb-3 relative inline-block group">
              Språk
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E86C1F] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {employee.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    idx % 3 === 0 && "bg-[#E5F7FF] text-slate-700",
                    idx % 3 === 1 && "bg-[#F0EBFF] text-slate-700",
                    idx % 3 === 2 && "bg-[#FFEDE0] text-slate-700"
                  )}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Slider */}
        <div className="mb-6">
          <h2 className="text-[15px] font-semibold text-slate-900 mb-3 relative inline-block group">
            Anbefalinger
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E86C1F] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </h2>
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="flex-shrink-0 w-full px-1"
                >
                  <div className="bg-slate-50 rounded-xl p-4 relative">
                    {/* Star badge */}
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#FFF3DC] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-[#FFDC91]" role="img" aria-label="Anbefalt">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F6B93B" className="w-4 h-4" aria-hidden="true">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <p className="text-sm italic text-slate-600 mb-2 leading-relaxed pr-8">
                      "{testimonial.content}"
                    </p>
                    <p className="text-[13px] font-semibold text-[#E86C1F]">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Slider Controls */}
            <div className="flex justify-center gap-1.5 mt-2.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToTestimonial(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    currentTestimonialIndex === idx 
                      ? "w-5 bg-[#E86C1F]" 
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  )}
                  aria-label={`Gå til anbefaling ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t border-slate-100">
          {/* Stats */}
          <div className="flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-slate-900">{yearsExp}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Erfaring</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-slate-900">{employee.specialties.length}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Områder</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-slate-900">{endorsementCount}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Anbefalinger</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href={`mailto:${employee.email}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 focus:outline-none"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Kontakt
            </a>
            <a
              href={`tel:+47${employee.phone.replace(/\s/g, '')}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-white border-2 border-slate-900 rounded-full transition-all duration-300 hover:bg-slate-900 hover:text-white hover:-translate-y-0.5 focus:outline-none"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Ring
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
