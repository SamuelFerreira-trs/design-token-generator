"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Palette, Type, Scaling as Spacing, FolderOpen } from "lucide-react"
import { TokenInput } from "@/components/token-input"
import { PreviewSection } from "@/components/preview-section"
import { ExportDialog } from "@/components/export-dialog"
import { PresetDialog } from "@/components/preset-dialog"

// Default token values
const defaultTokens = {
  // Background tokens
  "bg-primary": "#0B0B0F",
  "bg-section": "#FFFFFF",
  "bg-highlight": "#F8FAFC",

  // Typography tokens
  "text-heading": "#FFFFFF",
  "text-body": "#374151",
  "text-muted": "#6B7280",
  "text-tagline": "#6366F1",

  // Action tokens
  "action-primary": "#6366F1",
  "action-hover": "#4F46E5",
  "action-disabled": "#9CA3AF",

  // Component tokens
  "card-background": "#FFFFFF",
  "card-border": "#E5E7EB",
  "line-color": "#D1D5DB",
}

const predefinedPresets = [
  {
    name: "Tema Escuro",
    tokens: {
      "bg-primary": "#0B0B0F",
      "bg-section": "#1F2937",
      "bg-highlight": "#374151",
      "text-heading": "#FFFFFF",
      "text-body": "#E5E7EB",
      "text-muted": "#9CA3AF",
      "text-tagline": "#60A5FA",
      "action-primary": "#3B82F6",
      "action-hover": "#2563EB",
      "action-disabled": "#6B7280",
      "card-background": "#374151",
      "card-border": "#4B5563",
      "line-color": "#6B7280",
    },
  },
  {
    name: "Tema Claro",
    tokens: {
      "bg-primary": "#FFFFFF",
      "bg-section": "#F8FAFC",
      "bg-highlight": "#E0F2FE",
      "text-heading": "#1F2937",
      "text-body": "#374151",
      "text-muted": "#6B7280",
      "text-tagline": "#0EA5E9",
      "action-primary": "#0EA5E9",
      "action-hover": "#0284C7",
      "action-disabled": "#CBD5E1",
      "card-background": "#FFFFFF",
      "card-border": "#E2E8F0",
      "line-color": "#CBD5E1",
    },
  },
  {
    name: "Tema Verde",
    tokens: {
      "bg-primary": "#064E3B",
      "bg-section": "#ECFDF5",
      "bg-highlight": "#D1FAE5",
      "text-heading": "#FFFFFF",
      "text-body": "#1F2937",
      "text-muted": "#6B7280",
      "text-tagline": "#059669",
      "action-primary": "#10B981",
      "action-hover": "#059669",
      "action-disabled": "#9CA3AF",
      "card-background": "#FFFFFF",
      "card-border": "#A7F3D0",
      "line-color": "#6EE7B7",
    },
  },
]

export default function DesignTokenGenerator() {
  const [tokens, setTokens] = useState(defaultTokens)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [presetDialogOpen, setPresetDialogOpen] = useState(false)
  const [savedPresets, setSavedPresets] = useState<Array<{ name: string; tokens: Record<string, string> }>>([])

  useEffect(() => {
    const saved = localStorage.getItem("design-token-presets")
    if (saved) {
      try {
        setSavedPresets(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading presets:", error)
      }
    }
  }, [])

  const updateToken = (tokenName: string, value: string) => {
    setTokens((prev) => ({
      ...prev,
      [tokenName]: value,
    }))
  }

  const savePreset = (name: string) => {
    const newPreset = { name, tokens: { ...tokens } }
    const updatedPresets = [...savedPresets, newPreset]
    setSavedPresets(updatedPresets)
    localStorage.setItem("design-token-presets", JSON.stringify(updatedPresets))
  }

  const loadPreset = (presetTokens: Record<string, string>) => {
    setTokens(presetTokens)
  }

  const deletePreset = (index: number) => {
    const updatedPresets = savedPresets.filter((_, i) => i !== index)
    setSavedPresets(updatedPresets)
    localStorage.setItem("design-token-presets", JSON.stringify(updatedPresets))
  }

  const tokenCategories = [
    {
      id: "backgrounds",
      title: "Backgrounds",
      icon: <Palette className="w-4 h-4" />,
      tokens: ["bg-primary", "bg-section", "bg-highlight"],
    },
    {
      id: "typography",
      title: "Tipografia",
      icon: <Type className="w-4 h-4" />,
      tokens: ["text-heading", "text-body", "text-muted", "text-tagline"],
    },
    {
      id: "actions",
      title: "Ações",
      icon: <Button className="w-4 h-4" />,
      tokens: ["action-primary", "action-hover", "action-disabled"],
    },
    {
      id: "components",
      title: "Componentes",
      icon: <Spacing className="w-4 h-4" />,
      tokens: ["card-background", "card-border", "line-color"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gerador de Design Tokens</h1>
                <p className="text-sm text-muted-foreground">Para Landing Pages</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPresetDialogOpen(true)} className="gap-2">
                <FolderOpen className="w-4 h-4" />
                Presets
              </Button>
              <Button onClick={() => setExportDialogOpen(true)} className="gap-2">
                <Download className="w-4 h-4" />
                Gerar Códigos
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Token Editor */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Editor de Tokens</h2>
              <p className="text-muted-foreground">Defina seus tokens semânticos e visualize em tempo real</p>
            </div>

            <Tabs defaultValue="backgrounds" className="w-full h-auto">
              <TabsList className="grid grid-cols-4 h-auto w-auto py-1.5 px-1.5 rounded-lg">
                {tokenCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="gap-2 rounded-sm">
                    {category.icon}
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tokenCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                  <Card className="shadow-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {category.icon}
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 mb-0">
                      {category.tokens.map((tokenName) => (
                        <TokenInput
                          key={tokenName}
                          tokenName={tokenName}
                          value={tokens[tokenName]}
                          onChange={(value) => updateToken(tokenName, value)}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Preview em Tempo Real</h2>
              <p className="text-muted-foreground">Veja como seus tokens ficam aplicados</p>
            </div>

            <PreviewSection tokens={tokens} />
          </div>
        </div>
      </div>

      <ExportDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen} tokens={tokens} />

      <PresetDialog
        open={presetDialogOpen}
        onOpenChange={setPresetDialogOpen}
        savedPresets={savedPresets}
        predefinedPresets={predefinedPresets}
        onSavePreset={savePreset}
        onLoadPreset={loadPreset}
        onDeletePreset={deletePreset}
      />
    </div>
  )
}
