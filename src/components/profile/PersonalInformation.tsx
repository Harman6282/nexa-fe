"use client";

import { userStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone } from "lucide-react";

export function PersonalInformation() {
  const user = userStore((state) => state.user);
  const nameParts = (user?.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section id="personal-info" className="bg-white rounded-xl shadow-sm border border-[#D6C0B3] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-text-main">
            Personal Information
          </h2>
          <p className="text-sm text-text-muted mt-1">
            View your personal details and account settings.
          </p>
        </div>
        <Button
          disabled
          className="bg-text-main/50 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm"
        >
          Profile updates coming soon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label
            htmlFor="firstName"
            className="block text-sm font-medium text-text-main"
          >
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            readOnly
            className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main h-11 px-3 shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="lastName"
            className="block text-sm font-medium text-text-main"
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            readOnly
            className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main h-11 px-3 shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-text-main"
          >
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted h-11" />
            <Input
              id="email"
              name="email"
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main h-11 pl-10 pr-3 shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="phone"
            className="block text-sm font-medium text-text-main"
          >
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted h-11" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={""}
              readOnly
              placeholder="Not set"
              className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main h-11 pl-10 pr-3 shadow-sm placeholder:text-text-muted/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
