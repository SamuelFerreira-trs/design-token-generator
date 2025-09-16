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

  const isColorToken =
    tokenName.includes("bg-") ||
    tokenName.includes("text-") ||
    tokenName.includes("action-") ||
    tokenName.includes("line-color")

  const isTypographyToken =
    tokenName.includes("font-") ||
    tokenName.includes("text-") ||
    tokenName.includes("heading-") ||
    tokenName.includes("body-") ||
    tokenName.includes("size") ||
    tokenName.includes("weight") ||
    tokenName.includes("height") ||
    tokenName.includes("spacing")

  const getPlaceholderText = () => {
    if (tokenName.includes("url")) return "Cole o link de download da fonte"
    if (tokenName.includes("size")) return "Ex: 16px, 1.2rem, 14px"
    if (tokenName.includes("weight")) return "Ex: 400, 500, 600, bold"
    if (tokenName.includes("height")) return "Ex: 1.5, 1.2, 24px"
    if (tokenName.includes("spacing")) return "Ex: 0.1em, 2px, normal"
    if (tokenName.includes("family")) return "Ex: Inter, Arial, sans-serif"
    return "Ex: 16px, 1.5, 400"
  }

  // Se o token for de tipografia, renderiza apenas o input de texto
  if (isTypographyToken) {
    return (
      <div className="space-y-3 p-3 border rounded-lg bg-muted/30">
        <Label htmlFor={tokenName} className="text-sm font-medium flex items-center gap-2">
          {isColorToken ? (
            <div className="w-4 h-4 rounded border border-border" style={{ backgroundColor: value || "#000000" }} />
          ) : (
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
          {tokenName}
        </Label>
        <Input
          id={tokenName}
          value={value}
          onChange={handleTextChange}
          placeholder={isColorToken ? "#000000" : getPlaceholderText()}
          className={`text-sm ${isColorToken ? "font-mono" : "font-mono"}`}
        />
        {value && (
          <div className="text-xs text-muted-foreground p-2 bg-background rounded border">
            {isColorToken ? (
              <div className="flex items-center gap-2">
                <span>Preview:</span>
                <div className="w-6 h-4 rounded border border-border" style={{ backgroundColor: value }} />
                <span className="font-mono">{value}</span>
              </div>
            ) : (
              <>
                Preview:{" "}
                <span
                  style={{
                    [tokenName.includes("size")
                      ? "fontSize"
                      : tokenName.includes("weight")
                        ? "fontWeight"
                        : "fontFamily"]: value,
                  }}
                >
                  {value}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  // Renderização padrão com seletor de cor para os outros tokens
  return (
    <div className="space-y-2">
      <Label htmlFor={tokenName} className="text-sm font-medium">
        {tokenName}
      </Label>
      <div className="flex gap-2">
        {isColorToken && (
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
        )}
        <Input
          id={tokenName}
          value={value}
          onChange={handleTextChange}
          placeholder={isColorToken ? "#000000" : getPlaceholderText()}
          className={`text-sm ${isColorToken ? "font-mono flex-1" : "flex-1"}`}
        />
      </div>
    </div>
  )
}
