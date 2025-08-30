"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Settings } from "lucide-react"

export function AccountSettings() {
  const settings = [
    {
      title: "Email Notifications",
      description: "Receive order updates via email",
      action: "Settings",
    },
    {
      title: "Two-Factor Authentication",
      description: "Add extra security to your account",
      action: "Enable",
    },
    {
      title: "Privacy Settings",
      description: "Control your data visibility",
      action: "Settings",
    },
  ]

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">Account Settings</CardTitle>
        <CardDescription className="text-gray-600">Manage your account preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {settings.map((setting, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{setting.title}</p>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <Button variant="default" size="sm" className="border-gray-300 bg-transparent">
                {setting.action === "Settings" ? <Settings className="w-4 h-4" /> : setting.action}
              </Button>
            </div>
            {index < settings.length - 1 && <Separator className="bg-gray-200 mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
