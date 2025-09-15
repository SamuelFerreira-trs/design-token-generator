"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TokenInputProps {
  tokenName: string
  value: string
  onChange: (value: string) => void
}

export function TokenInput({ tokenName, value, onChange }: TokenInputProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const isLightColor = (color: string) => {
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128
  }

  if (tokenName === "font-url-heading") {
    return (
      <div className="space-y-2">
        <Label htmlFor={tokenName} className="text-sm font-medium">
          {tokenName}
        </Label>
        <Input
          id={tokenName}
          value={value}
          onChange={handleTextChange}
          placeholder="Cole o link de download da fonte"
          className="font-mono text-sm flex-1"
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={tokenName} className="text-sm font-medium">
        {tokenName}
      </Label>
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-10 p-0 border-2 relative overflow-hidden bg-transparent"
              style={{ backgroundColor: value }}
              aria-label={`Escolher cor para ${tokenName}`}
            ></Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor={`${tokenName}-picker`} className="text-sm font-medium">
                  Seletor de Cor
                </Label>
                <input
                  id={`${tokenName}-picker`}
                  type="color"
                  value={value}
                  onChange={handleColorChange}
                  className="w-full h-10 rounded border border-input cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor={`${tokenName}-text`} className="text-sm font-medium">
                  Valor Hex/RGB
                </Label>
                <Input
                  id={`${tokenName}-text`}
                  value={value}
                  onChange={handleTextChange}
                  placeholder="#000000"
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Input
          id={tokenName}
          value={value}
          onChange={handleTextChange}
          placeholder="#000000"
          className="font-mono text-sm flex-1"
        />
      </div>
    </div>
  )
}
