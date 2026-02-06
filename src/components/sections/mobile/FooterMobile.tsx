import { Linkedin, Twitter, Mail, Triangle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function FooterMobile() {
  return (
    <footer className="bg-tiscu-navy text-tiscu-steel border-t border-tiscu-bg/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            {/* White Triangle beside TISCU - matching header exactly */}
            <Triangle className="w-4 h-4 fill-tiscu-bg text-tiscu-bg" />
            <span className="font-grotesk font-semibold tracking-tight text-lg text-tiscu-bg">
              TISCU
            </span>
            <span className="text-xs font-mono opacity-50">
              / CONSULTING GRP.
            </span>
          </div>
        </div>

        {/* Social Links - Mobile Optimized */}
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-tiscu-bg cursor-pointer transition-colors p-2 hover:bg-tiscu-bg/10 rounded-full"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-tiscu-bg cursor-pointer transition-colors p-2 hover:bg-tiscu-bg/10 rounded-full"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Email"
            className="hover:text-tiscu-bg cursor-pointer transition-colors p-2 hover:bg-tiscu-bg/10 rounded-full"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright - Centered */}
        <div className="text-center">
          <div className="text-xs font-mono opacity-50">
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
