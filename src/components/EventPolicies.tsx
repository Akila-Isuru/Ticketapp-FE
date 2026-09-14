import React from "react";
import { ShieldCheck } from "lucide-react";

const POLICIES = [
  "Tickets are non-refundable and non-transferable once purchased.",
  "Please purchase tickets only through official channels. We are not responsible for tickets bought via unauthorised third-party or resale platforms.",
  "It is the responsibility of ticket holders to protect their tickets from loss or theft. Lost or stolen tickets will not be replaced.",
  "Re-entry is not permitted once your ticket has been scanned and validated at the venue.",
  "The organiser reserves the right to refuse entry or remove any person who does not comply with the event rules and guidelines.",
];

const EventPolicies: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
        <ShieldCheck className="w-5 h-5 text-indigo-500" /> Event Policies
      </h3>

      <ul className="space-y-2">
        {POLICIES.map((policy, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
            <span>{policy}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 mt-4">
        By attending this event, you agree to abide by these policies to ensure
        a safe and enjoyable experience for everyone.
      </p>
    </div>
  );
};

export default EventPolicies;
