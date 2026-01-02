"use client";

import { useState } from "react";
import { userStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function PersonalInformation() {
  const { user, setUser } = userStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data?.user) {
        setUser(res.data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-[#D6C0B3] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-text-main">
            Personal Information
          </h2>
          <p className="text-sm text-text-muted mt-1">
            Manage your personal details and account settings.
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-text-main hover:bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
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
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main focus:border-accent focus:ring-accent h-11 px-3 transition-colors placeholder:text-text-muted/40 shadow-sm"
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
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main focus:border-accent focus:ring-accent h-11 px-3 transition-colors placeholder:text-text-muted/40 shadow-sm"
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
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main focus:border-accent focus:ring-accent h-11 pl-10 pr-3 transition-colors placeholder:text-text-muted/40 shadow-sm"
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
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-[#D6C0B3] bg-[#E4E0E1]/30 text-text-main focus:border-accent focus:ring-accent h-11 pl-10 pr-3 transition-colors placeholder:text-text-muted/40 shadow-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

