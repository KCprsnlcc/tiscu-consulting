import { Linkedin, Twitter, Mail, Triangle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function Footer() {
  return (
    <footer className="bg-tiscu-navy text-tiscu-steel border-t border-tiscu-bg/10 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {/* White Triangle beside TISCU - matching header exactly */}
          <Triangle className="w-4 h-4 fill-tiscu-bg text-tiscu-bg" />
          <span className="font-grotesk font-semibold tracking-tight text-lg text-tiscu-bg">
            TISCU
          </span>
          <span className="text-xs font-mono opacity-50">
            / CONSULTING GRP.
          </span>
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-tiscu-bg cursor-pointer transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-tiscu-bg cursor-pointer transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Email"
            className="hover:text-tiscu-bg cursor-pointer transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="text-xs font-mono opacity-50">
          &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
