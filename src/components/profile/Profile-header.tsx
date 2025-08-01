"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export function ProfileHeader({ name, email, avatarUrl }: ProfileHeaderProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
      <Avatar className="w-24 h-24 border-2 border-gray-200">
        <AvatarImage
          src={avatarUrl || "/placeholder.svg?height=96&width=96"}
          alt="Profile"
        />
        <AvatarFallback className="text-2xl bg-gray-100 text-gray-800">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <p className="text-gray-600 mb-4">{email}</p>
      </div>
      <Button
        variant="outline"
        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
      >
        <Edit3 className="w-4 h-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
}
