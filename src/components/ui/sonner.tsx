"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
  theme={theme as ToasterProps["theme"]}
  toastOptions={{
    className: "bg-white text-black border border-zinc-700",
  }}
  {...props}
/>

  )
}

export { Toaster }
