"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Send, Phone, Mail, MapPin, ChevronDown, Calendar } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/ScrollEffects";
import { SERVICES_OPTIONS } from "@/lib/constants";

// Custom Dropdown Component - Mobile Optimized
const CustomDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  label: string;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full border border-tiscu-navy/15 bg-tiscu-bg px-4 py-4 text-sm text-tiscu-navy outline-none transition-all duration-200 focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20 font-mono placeholder:text-tiscu-muted/60 flex items-center justify-between cursor-pointer hover:border-tiscu-steel/30 min-h-[48px]"
      >
        <span className={value ? "text-tiscu-navy" : "text-tiscu-muted/60"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-tiscu-steel transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-2 border border-tiscu-navy/15 bg-tiscu-bg shadow-lg max-h-60 overflow-auto focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-4 text-sm font-mono cursor-pointer transition-colors duration-150 min-h-[44px] flex items-center ${
                option.value === value
                  ? 'bg-tiscu-steel/10 text-tiscu-navy'
                  : 'text-tiscu-steel hover:bg-tiscu-navy/5 hover:text-tiscu-navy'
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Custom Date Picker Component - Mobile Optimized
const CustomDatePicker = ({
  value,
  onChange,
  label,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'month' | 'year'>('calendar');
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode('calendar');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setViewMode('calendar');
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    onChange(dateString);
    setSelectedDate(date);
    setIsOpen(false);
    setViewMode('calendar');
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(month);
    setSelectedDate(newDate);
    setViewMode('calendar');
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    setViewMode('calendar');
  };

  const generateMonths = () => {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 50; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className="relative" ref={datePickerRef}>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="w-full border border-tiscu-navy/15 bg-tiscu-bg px-4 py-4 text-sm text-tiscu-navy outline-none transition-all duration-200 focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20 font-mono placeholder:text-tiscu-muted/60 flex items-center justify-between cursor-pointer hover:border-tiscu-steel/30 min-h-[48px]"
      >
        <span className={value ? "text-tiscu-navy" : "text-tiscu-muted/60"}>
          {value ? formatDate(new Date(value)) : "Select a date"}
        </span>
        <Calendar className="h-4 w-4 text-tiscu-steel" />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 border border-tiscu-navy/15 bg-tiscu-bg shadow-lg p-4 focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20">
          {/* Header with clickable month/year */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-tiscu-navy/10 rounded transition-colors duration-150"
              aria-label="Previous month"
            >
              <ChevronDown className="h-4 w-4 text-tiscu-steel rotate-90" />
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('month')}
                className="font-mono text-sm text-tiscu-navy hover:text-tiscu-steel transition-colors duration-150 cursor-pointer px-2 py-1 rounded hover:bg-tiscu-navy/5"
                aria-label="Select month"
              >
                {selectedDate.toLocaleDateString('en-US', { month: 'long' })}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('year')}
                className="font-mono text-sm text-tiscu-navy hover:text-tiscu-steel transition-colors duration-150 cursor-pointer px-2 py-1 rounded hover:bg-tiscu-navy/5"
                aria-label="Select year"
              >
                {selectedDate.getFullYear()}
              </button>
            </div>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-tiscu-navy/10 rounded transition-colors duration-150"
              aria-label="Next month"
            >
              <ChevronDown className="h-4 w-4 text-tiscu-steel -rotate-90" />
            </button>
          </div>
          
          {viewMode === 'calendar' && (
            <>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-xs font-mono text-tiscu-steel uppercase tracking-wider py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((date, index) => {
                  const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                  const isSelected = value && date.toDateString() === new Date(value).toDateString();
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      disabled={!isCurrentMonth}
                      className={`
                        p-3 text-xs font-mono rounded transition-colors duration-150 min-h-[44px] min-w-[44px]
                        ${!isCurrentMonth ? 'text-tiscu-muted/30 cursor-not-allowed' : ''}
                        ${isSelected ? 'bg-tiscu-steel text-tiscu-bg' : ''}
                        ${isToday && !isSelected ? 'border border-tiscu-steel text-tiscu-navy' : ''}
                        ${isCurrentMonth && !isSelected && !isToday ? 'text-tiscu-steel hover:bg-tiscu-navy/5 cursor-pointer' : ''}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          
          {viewMode === 'month' && (
            <div className="grid grid-cols-3 gap-2">
              {generateMonths().map((month, index) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthSelect(index)}
                  className={`p-3 text-xs font-mono rounded transition-colors duration-150 min-h-[44px] min-w-[44px] ${
                    selectedDate.getMonth() === index
                      ? 'bg-tiscu-steel text-tiscu-bg'
                      : 'text-tiscu-steel hover:bg-tiscu-navy/5 cursor-pointer'
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          )}
          
          {viewMode === 'year' && (
            <div className="grid grid-cols-4 gap-2 max-h-60 overflow-auto">
              {generateYears().map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => handleYearSelect(year)}
                  className={`p-2 text-xs font-mono rounded transition-colors duration-150 min-h-[44px] min-w-[44px] ${
                    selectedDate.getFullYear() === year
                      ? 'bg-tiscu-steel text-tiscu-bg'
                      : 'text-tiscu-steel hover:bg-tiscu-navy/5 cursor-pointer'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function BookConsultationMobile() {
  const createBooking = useMutation(api.bookings.create);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    date: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createBooking({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        service: formData.service,
        date: formData.date,
        message: formData.message || undefined,
      });
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 4000);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        date: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full border border-tiscu-navy/15 bg-tiscu-bg px-4 py-4 text-sm text-tiscu-navy outline-none transition-all duration-200 focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20 font-mono placeholder:text-tiscu-muted/60 min-h-[48px]";

  return (
    <section id="book" className="border-t border-tiscu-navy/10 bg-tiscu-bg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <FadeIn direction="left">
            <span className="font-mono text-xs text-tiscu-steel uppercase tracking-widest">
              Fig 3.0 — Engagement
            </span>
            <h2 className="font-grotesk text-2xl sm:text-3xl font-medium tracking-tight mt-4 mb-6 text-tiscu-navy">
              Book a Consultation
            </h2>
            <p className="text-base text-tiscu-steel leading-relaxed mb-8">
              Take the first step toward transforming your business. Share your
              details and we&apos;ll get back to you within 48 hours.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Phone, text: "+1 (555) 000-0000" },
                { icon: Mail, text: "hello@tiscuconsulting.com" },
                { icon: MapPin, text: "Global — Remote & On-site" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 text-tiscu-steel"
                >
                  <div className="w-12 h-12 border border-tiscu-navy/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-tiscu-steel" />
                  </div>
                  <span className="text-sm font-mono">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Form Section */}
        <div className="border-t border-tiscu-navy/10 pt-8">
          <FadeIn direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={inputClasses}
                    placeholder="Company name"
                  />
                </div>

                <CustomDropdown
                  id="service"
                  value={formData.service}
                  onChange={(value) => setFormData({ ...formData, service: value })}
                  options={SERVICES_OPTIONS}
                  placeholder="Select a service"
                  label="Service Interest"
                />

                <CustomDatePicker
                  id="date"
                  value={formData.date}
                  onChange={(value) => setFormData({ ...formData, date: value })}
                  label="Preferred Date"
                />

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-xs text-tiscu-steel uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your business challenges..."
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 border border-tiscu-navy bg-tiscu-navy px-6 py-4 font-grotesk text-sm font-medium text-tiscu-bg transition-all duration-300 hover:bg-transparent hover:text-tiscu-navy cursor-pointer min-h-[48px] disabled:opacity-60 disabled:cursor-wait"
                >
                  {formSubmitted ? (
                    "THANK YOU — WE'LL BE IN TOUCH."
                  ) : isSubmitting ? (
                    "SUBMITTING..."
                  ) : (
                    <>
                      SEND REQUEST
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
