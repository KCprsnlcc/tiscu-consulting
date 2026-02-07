"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  Search,
  Filter,
  LogOut,
  User,
  Mail,
  Building2,
  Briefcase,
  MessageSquare,
  StickyNote,
  Trash2,
  X,
  LayoutDashboard,
} from "lucide-react";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  pending: {
    label: "Pending",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  completed: {
    label: "Completed",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

const SERVICE_LABELS: Record<string, string> = {
  finance: "Finance + Business Performance",
  compliance: "Legal Compliance + Risk Management",
  strategy: "Management + Strategy",
  comprehensive: "Comprehensive Advisory",
};

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="border border-tiscu-navy/10 bg-white/60 p-5 transition-all duration-200 hover:border-tiscu-steel/30 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
            {label}
          </p>
          <p className="font-grotesk text-3xl font-medium text-tiscu-navy mt-2 tracking-tight">
            {value}
          </p>
        </div>
        <div
          className={`w-9 h-9 ${accent} border border-current/10 flex items-center justify-center`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border ${config.color} ${config.bgColor} ${config.borderColor}`}
    >
      {config.label}
    </span>
  );
}

function BookingDetailModal({
  booking,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDelete,
}: {
  booking: {
    _id: Id<"bookings">;
    name: string;
    email: string;
    company?: string;
    service: string;
    date: string;
    message?: string;
    status: BookingStatus;
    createdAt: number;
    updatedAt?: number;
    notes?: string;
  };
  onClose: () => void;
  onUpdateStatus: (id: Id<"bookings">, status: BookingStatus) => void;
  onUpdateNotes: (id: Id<"bookings">, notes: string) => void;
  onDelete: (id: Id<"bookings">) => void;
}) {
  const [notes, setNotes] = useState(booking.notes || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleNotesBlur = () => {
    if (notes !== (booking.notes || "")) {
      onUpdateNotes(booking._id, notes);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-tiscu-navy/30 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Booking details for ${booking.name}`}
    >
      <div
        className="bg-tiscu-bg border border-tiscu-navy/10 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-tiscu-navy/10 px-6 py-4">
          <div>
            <h2 className="font-grotesk text-lg font-medium text-tiscu-navy tracking-tight">
              Booking Details
            </h2>
            <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest mt-0.5">
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-tiscu-navy/10 text-tiscu-steel hover:text-tiscu-navy hover:border-tiscu-steel/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Status + Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <StatusBadge status={booking.status} />
            <div className="flex flex-wrap gap-1.5">
              {(["pending", "confirmed", "completed", "cancelled"] as BookingStatus[])
                .filter((s) => s !== booking.status)
                .map((status) => (
                  <button
                    key={status}
                    onClick={() => onUpdateStatus(booking._id, status)}
                    className={`px-3 py-2 min-h-[44px] min-w-[44px] text-[10px] font-mono uppercase tracking-wider border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20 ${STATUS_CONFIG[status].borderColor} ${STATUS_CONFIG[status].color} hover:${STATUS_CONFIG[status].bgColor}`}
                  >
                    {STATUS_CONFIG[status].label}
                  </button>
                ))}
            </div>
          </div>

          {/* Client Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User className="h-4 w-4 text-tiscu-steel mt-0.5 shrink-0" />
              <div>
                <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
                  Client
                </p>
                <p className="font-grotesk text-sm text-tiscu-navy mt-0.5">
                  {booking.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-tiscu-steel mt-0.5 shrink-0" />
              <div>
                <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
                  Email
                </p>
                <a
                  href={`mailto:${booking.email}`}
                  className="font-mono text-sm text-tiscu-navy mt-0.5 hover:text-tiscu-steel transition-colors duration-200 underline decoration-tiscu-navy/20 hover:decoration-tiscu-steel/40"
                >
                  {booking.email}
                </a>
              </div>
            </div>

            {booking.company && (
              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-tiscu-steel mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
                    Company
                  </p>
                  <p className="font-grotesk text-sm text-tiscu-navy mt-0.5">
                    {booking.company}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Briefcase className="h-4 w-4 text-tiscu-steel mt-0.5 shrink-0" />
              <div>
                <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
                  Service
                </p>
                <p className="font-grotesk text-sm text-tiscu-navy mt-0.5">
                  {SERVICE_LABELS[booking.service] || booking.service}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-tiscu-steel mt-0.5 shrink-0" />
              <div>
                <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
                  Preferred Date
                </p>
                <p className="font-grotesk text-sm text-tiscu-navy mt-0.5">
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {booking.message && (
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 text-tiscu-steel mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
                    Message
                  </p>
                  <p className="text-sm text-tiscu-steel leading-relaxed mt-0.5">
                    {booking.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="border-t border-tiscu-navy/10 pt-5">
            <div className="flex items-center gap-2 mb-2">
              <StickyNote className="h-3.5 w-3.5 text-tiscu-steel" />
              <label
                htmlFor="booking-notes"
                className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest"
              >
                Internal Notes
              </label>
            </div>
            <textarea
              id="booking-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Add internal notes about this booking..."
              className="w-full border border-tiscu-navy/10 bg-white/40 px-3 py-2.5 text-sm text-tiscu-navy font-mono placeholder:text-tiscu-muted/50 outline-none transition-all duration-200 focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-tiscu-navy/10 px-6 py-4 flex items-center justify-between">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-1.5 text-red-600 font-mono text-[10px] uppercase tracking-wider hover:text-red-700 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-200"
              aria-label="Delete booking"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-red-600 uppercase tracking-wider">
                Confirm?
              </span>
              <button
                onClick={() => {
                  onDelete(booking._id);
                  onClose();
                }}
                className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border border-tiscu-navy/10 text-tiscu-steel hover:text-tiscu-navy transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20"
              >
                No
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 border border-tiscu-navy bg-tiscu-navy px-4 py-2 font-mono text-[10px] text-tiscu-bg uppercase tracking-wider transition-all duration-200 hover:bg-transparent hover:text-tiscu-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const bookings = useQuery(api.bookings.list, {});
  const stats = useQuery(api.bookings.getStats, {});
  const updateStatus = useMutation(api.bookings.updateStatus);
  const updateNotes = useMutation(api.bookings.updateNotes);
  const removeBooking = useMutation(api.bookings.remove);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<Id<"bookings"> | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const selectedBooking = bookings?.find((b) => b._id === selectedBookingId);

  // Close filter menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close modal on Escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (selectedBookingId) {
        setSelectedBookingId(null);
      } else if (showFilterMenu) {
        setShowFilterMenu(false);
      }
    }
  }, [selectedBookingId, showFilterMenu]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: Id<"bookings">, status: BookingStatus) => {
    updateStatus({ id, status });
  };

  const handleUpdateNotes = (id: Id<"bookings">, notes: string) => {
    updateNotes({ id, notes });
  };

  const handleDelete = (id: Id<"bookings">) => {
    removeBooking({ id });
  };

  return (
    <div className="min-h-screen bg-tiscu-bg">
      {/* Top Navigation */}
      <header className="border-b border-tiscu-navy/10 bg-white/40 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-4.5 w-4.5 text-tiscu-steel" />
              <div>
                <span className="font-grotesk text-sm font-medium text-tiscu-navy tracking-tight">
                  TISCU Studio
                </span>
                <span className="hidden sm:inline font-mono text-[10px] text-tiscu-muted ml-2 uppercase tracking-widest">
                  Dashboard
                </span>
              </div>
            </div>

            {/* Right: User + Logout */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
                  Consultant
                </p>
                <p className="font-grotesk text-xs text-tiscu-navy -mt-0.5">
                  {user?.fullName || user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              <button
                onClick={() => signOut({ redirectUrl: "/" })}
                className="w-9 h-9 flex items-center justify-center border border-tiscu-navy/10 text-tiscu-steel hover:text-tiscu-navy hover:border-tiscu-steel/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20"
                aria-label="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <span className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
            Fig 4.0 — Studio
          </span>
          <h1 className="font-grotesk text-2xl sm:text-3xl font-medium text-tiscu-navy mt-1 tracking-tight">
            Booking Management
          </h1>
          <p className="text-sm text-tiscu-steel mt-1 max-w-lg">
            Monitor and manage consultation bookings submitted through the TISCU
            website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6 sm:mb-8">
          <StatCard
            label="Total"
            value={stats?.total ?? 0}
            icon={Briefcase}
            accent="text-tiscu-navy bg-tiscu-navy/5"
          />
          <StatCard
            label="Pending"
            value={stats?.pending ?? 0}
            icon={Clock}
            accent="text-tiscu-navy bg-tiscu-navy/5"
          />
          <StatCard
            label="Confirmed"
            value={stats?.confirmed ?? 0}
            icon={AlertCircle}
            accent="text-tiscu-navy bg-tiscu-navy/5"
          />
          <StatCard
            label="Completed"
            value={stats?.completed ?? 0}
            icon={CheckCircle2}
            accent="text-tiscu-navy bg-tiscu-navy/5"
          />
          <StatCard
            label="Cancelled"
            value={stats?.cancelled ?? 0}
            icon={XCircle}
            accent="text-tiscu-navy bg-tiscu-navy/5"
          />
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tiscu-muted" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-tiscu-navy/10 bg-white/60 pl-9 pr-4 py-2.5 text-sm text-tiscu-navy font-mono placeholder:text-tiscu-muted/50 outline-none transition-all duration-200 focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20"
              aria-label="Search bookings"
            />
          </div>

          {/* Filter */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="inline-flex items-center gap-2 border border-tiscu-navy/10 bg-white/60 px-4 py-2.5 font-mono text-[10px] text-tiscu-navy uppercase tracking-wider hover:border-tiscu-steel/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20 w-full sm:w-auto justify-center"
              aria-expanded={showFilterMenu}
              aria-haspopup="listbox"
            >
              <Filter className="h-3.5 w-3.5 text-tiscu-steel" />
              {statusFilter === "all" ? "All Status" : STATUS_CONFIG[statusFilter].label}
              <ChevronDown
                className={`h-3 w-3 text-tiscu-steel transition-transform duration-200 ${showFilterMenu ? "rotate-180" : ""}`}
              />
            </button>

            {showFilterMenu && (
              <ul
                role="listbox"
                className="absolute right-0 z-30 mt-1 w-44 border border-tiscu-navy/10 bg-tiscu-bg shadow-lg"
              >
                <li
                  role="option"
                  aria-selected={statusFilter === "all"}
                  onClick={() => {
                    setStatusFilter("all");
                    setShowFilterMenu(false);
                  }}
                  className={`px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider cursor-pointer transition-colors duration-150 ${
                    statusFilter === "all"
                      ? "bg-tiscu-steel/10 text-tiscu-navy"
                      : "text-tiscu-steel hover:bg-tiscu-navy/5 hover:text-tiscu-navy"
                  }`}
                >
                  All Status
                </li>
                {(Object.keys(STATUS_CONFIG) as BookingStatus[]).map((status) => (
                  <li
                    key={status}
                    role="option"
                    aria-selected={statusFilter === status}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowFilterMenu(false);
                    }}
                    className={`px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider cursor-pointer transition-colors duration-150 ${
                      statusFilter === status
                        ? "bg-tiscu-steel/10 text-tiscu-navy"
                        : "text-tiscu-steel hover:bg-tiscu-navy/5 hover:text-tiscu-navy"
                    }`}
                  >
                    {STATUS_CONFIG[status].label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="border border-tiscu-navy/10 bg-white/40">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-3 border-b border-tiscu-navy/10 bg-tiscu-navy/[0.02]">
            <div className="col-span-3 font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
              Client
            </div>
            <div className="col-span-2 font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
              Service
            </div>
            <div className="col-span-2 font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
              Date
            </div>
            <div className="col-span-2 font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
              Status
            </div>
            <div className="col-span-2 font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
              Submitted
            </div>
            <div className="col-span-1 font-mono text-[10px] text-tiscu-steel uppercase tracking-widest text-right">
              Action
            </div>
          </div>

          {/* Loading State */}
          {!bookings && (
            <div className="px-5 py-16 text-center">
              <div className="inline-flex items-center gap-2">
                <div className="w-3 h-3 border border-tiscu-steel/40 border-t-tiscu-steel rounded-full animate-spin" />
                <span className="font-mono text-xs text-tiscu-steel uppercase tracking-wider">
                  Loading bookings...
                </span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {bookings && filteredBookings?.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Calendar className="h-8 w-8 text-tiscu-muted/40 mx-auto mb-3" />
              <p className="font-grotesk text-sm text-tiscu-navy">
                {searchQuery || statusFilter !== "all"
                  ? "No bookings match your filters"
                  : "No bookings yet"}
              </p>
              <p className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest mt-1">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Bookings will appear here when clients submit the form"}
              </p>
            </div>
          )}

          {/* Booking Rows */}
          {filteredBookings?.map((booking) => (
            <div
              key={booking._id}
              onClick={() => setSelectedBookingId(booking._id)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-5 py-4 border-b border-tiscu-navy/5 last:border-b-0 hover:bg-tiscu-navy/[0.02] transition-colors duration-150 cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedBookingId(booking._id);
                }
              }}
              aria-label={`View booking for ${booking.name}`}
            >
              {/* Client */}
              <div className="lg:col-span-3">
                <p className="font-grotesk text-sm text-tiscu-navy group-hover:text-tiscu-navy/90 transition-colors duration-150">
                  {booking.name}
                </p>
                <p className="font-mono text-[10px] text-tiscu-steel truncate">
                  {booking.email}
                </p>
                {booking.company && (
                  <p className="font-mono text-[10px] text-tiscu-muted truncate lg:hidden mt-0.5">
                    {booking.company}
                  </p>
                )}
              </div>

              {/* Service */}
              <div className="lg:col-span-2 flex items-center">
                <span className="font-mono text-xs text-tiscu-steel">
                  {SERVICE_LABELS[booking.service] || booking.service}
                </span>
              </div>

              {/* Date */}
              <div className="lg:col-span-2 flex items-center">
                <span className="font-mono text-xs text-tiscu-steel">
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Status */}
              <div className="lg:col-span-2 flex items-center">
                <StatusBadge status={booking.status as BookingStatus} />
              </div>

              {/* Submitted */}
              <div className="lg:col-span-2 flex items-center">
                <span className="font-mono text-[10px] text-tiscu-muted">
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Action */}
              <div className="lg:col-span-1 flex items-center justify-end">
                <span className="font-mono text-[10px] text-tiscu-muted group-hover:text-tiscu-steel transition-colors duration-150 uppercase tracking-wider">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        {filteredBookings && filteredBookings.length > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-[10px] text-tiscu-muted uppercase tracking-wider">
              Showing {filteredBookings.length} of {bookings?.length ?? 0} bookings
            </p>
            {(searchQuery || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="font-mono text-[10px] text-tiscu-steel uppercase tracking-wider hover:text-tiscu-navy transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20 underline decoration-tiscu-steel/20"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </main>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking as Parameters<typeof BookingDetailModal>[0]["booking"]}
          onClose={() => setSelectedBookingId(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateNotes={handleUpdateNotes}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
