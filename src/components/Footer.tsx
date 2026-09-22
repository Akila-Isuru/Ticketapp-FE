import React from "react";
import {
  MessageCircle,
  Phone,
  MapPin,
  Mail,
  Star,
  Globe,
  Ticket,
  ArrowRight,
} from "lucide-react";

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.258 2.25H8.084l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13.5 21v-8h2.75l.41-3h-3.16V8.08c0-.87.24-1.46 1.5-1.46h1.78V3.94a23.7 23.7 0 0 0-2.59-.13c-2.57 0-4.34 1.57-4.34 4.45V10H7v3h2.85v8h3.65Z" />
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.81a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.24z" />
  </svg>
);

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1a6.98 6.98 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const SOCIALS = [
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  { label: "X", icon: XIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
  { label: "YouTube", icon: YouTubeIcon, href: "#" },
  { label: "TikTok", icon: TikTokIcon, href: "#" },
];

const ABOUT_LINKS = [
  "Who we are",
  "Privacy Policy",
  "Terms & conditions",
  "Support Centre",
  "FAQ",
  "Help Articles",
  "Blog",
];

const CATEGORY_LINKS = [
  "Concerts",
  "Art & Drama",
  "Sport & Adventure",
  "Family & Other",
  "Download Tickets",
  "Event Map",
];

const ORGANISER_LINKS = [
  "For Organisers",
  "TM Manager Console",
  "Venue Map",
  "Brand Guide",
  "TM Insights",
];

const PHONES = ["+94 777 371 672", "+94 777 389 172", "+94 777 074 872"];

const PAYMENTS = [
  "VISA",
  "Mastercard",
  "AMEX",
  "Discover",
  "Diners",
  "UnionPay",
  "JCB",
  "Maestro",
  "KOKO",
  "stripe",
  "G Pay",
  "Apple Pay",
  "PayPal",
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6f55e8] to-[#8b76f0] flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-[#6f55e8] tracking-tight">
                TuneTix
              </span>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Follow Us</h4>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-[#6f55e8] hover:text-[#5a42d4] transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#"
              className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 hover:bg-green-100 transition group"
            >
              <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-green-700 leading-tight">
                  Get updates and exclusive deals
                </p>
                <p className="text-sm font-semibold text-slate-900 leading-tight">
                  Join Our WhatsApp Channel
                </p>
              </div>
              <span className="text-xs font-medium text-slate-700 bg-white border border-green-300 rounded-full px-2.5 py-1 flex items-center gap-1 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition">
                Join
                <ArrowRight className="w-3 h-3" />
              </span>
            </a>

            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Rate your experience
              </h4>
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition">
                  <Star className="w-4 h-4 fill-green-500 text-green-500" />
                  Trustpilot
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition">
                  <GoogleIcon className="w-4 h-4" />
                  Google
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                You choose how to pay
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {PAYMENTS.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 tracking-tight"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-slate-900 mb-4">About Us</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {ABOUT_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#6f55e8] transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-slate-900 mb-4">Categories</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {CATEGORY_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#6f55e8] transition">
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#6f55e8] font-medium hover:gap-2 transition-all"
                >
                  See all
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-slate-900 mb-4">
              For Organisers
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {ORGANISER_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#6f55e8] transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <button className="mt-6 bg-[#6f55e8] hover:bg-[#5a42d4] text-white text-sm font-medium px-6 py-3 rounded-full transition shadow-sm hover:shadow-lg hover:shadow-[#6f55e8]/30 cursor-pointer">
              List your event
            </button>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold text-slate-900 mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  {PHONES.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="hover:text-[#6f55e8] transition"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <a href="#" className="hover:text-[#6f55e8] transition">
                  Chat on WhatsApp
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  No 261/A/3/5,
                  <br />
                  Hokandara Road,
                  <br />
                  Thalawathugoda, Sri Lanka
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@tunetix.com"
                  className="hover:text-[#6f55e8] transition"
                >
                  hello@tunetix.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-4">
            Our Global Footprint
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-slate-400" />
              Sri Lanka
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-slate-400" />
              United Arab Emirates
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <p className="text-xs text-slate-400">
            © Copyright 2026, TuneTix Private Limited | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
