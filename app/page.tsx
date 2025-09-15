"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Palette, Type, FolderOpen } from "lucide-react"
import { TokenInput } from "@/components/token-input"
import { PreviewSection } from "@/components/preview-section"
import { ExportDialog } from "@/components/export-dialog"
import { PresetDialog } from "@/components/preset-dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const defaultTokens = {
  // Cores
  "bg-primary": "#0B0B0F",
  "bg-section": "#FFFFFF",
  "bg-highlight": "#F8FAFC",
  "text-h1": "#FFFFFF",
  "text-h2": "#FFFFFF",
  "text-h3": "#FFFFFF",
  "text-h4": "#FFFFFF",
  "text-body-sm": "#374151",
  "text-body-base": "#374151",
  "text-body-lg": "#374151",
  "text-tagline-xs": "#6366F1",
  "text-tagline-sm": "#6366F1",
  "text-tagline-md": "#6366F1",
  "action-primary-default": "#6366F1",
  "action-primary-hover": "#4F46E5",
  "action-disabled": "#9CA3AF",

  // Tipografia
  "font-family-heading": "sans-serif",
  "font-h1-size": "3rem",
  "font-h1-height": "1.2",
  "font-h1-weight": "700",
  "font-h1-spacing": "-0.02em",
  "font-h2-size": "2.5rem",
  "font-h2-height": "1.2",
  "font-h2-weight": "700",
  "font-h2-spacing": "-0.02em",
  "font-h3-size": "2rem",
  "font-h3-height": "1.3",
  "font-h3-weight": "600",
  "font-h3-spacing": "-0.01em",
  "font-h4-size": "1.5rem",
  "font-h4-height": "1.4",
  "font-h4-weight": "500",
  "font-h4-spacing": "0",
  "font-body-sm-size": "0.875rem",
  "font-body-base-size": "1rem",
  "font-body-lg-size": "1.125rem",
  "font-tagline-xs-size": "0.75rem",
  "font-tagline-sm-size": "0.875rem",
  "font-tagline-md-size": "1rem",
  "font-url-heading": "",

  // Visuais
  "line-color-1": "#D1D5DB",
  "line-color-2": "#E5E7EB",
  "line-color-3": "#9CA3AF",
  "border-radius-1": "0.25rem",
  "border-radius-2": "0.5rem",
  "border-radius-3": "0.75rem",
  "border-radius-4": "1rem",
}

const predefinedPresets = [
  {
    name: "Tema Escuro",
    tokens: {
      "bg-primary": "#0B0B0F",
      "bg-section": "#1F2937",
      "bg-highlight": "#374151",
      "text-h1": "#FFFFFF",
      "text-h2": "#FFFFFF",
      "text-h3": "#FFFFFF",
      "text-h4": "#FFFFFF",
      "text-body-sm": "#E5E7EB",
      "text-body-base": "#E5E7EB",
      "text-body-lg": "#E5E7EB",
      "text-tagline-xs": "#60A5FA",
      "text-tagline-sm": "#60A5FA",
      "text-tagline-md": "#60A5FA",
      "action-primary-default": "#3B82F6",
      "action-primary-hover": "#2563EB",
      "action-disabled": "#6B7280",

      "font-family-heading": "sans-serif",
      "font-h1-size": "3rem",
      "font-h1-height": "1.2",
      "font-h1-weight": "700",
      "font-h1-spacing": "-0.02em",
      "font-h2-size": "2.5rem",
      "font-h2-height": "1.2",
      "font-h2-weight": "700",
      "font-h2-spacing": "-0.02em",
      "font-h3-size": "2rem",
      "font-h3-height": "1.3",
      "font-h3-weight": "600",
      "font-h3-spacing": "-0.01em",
      "font-h4-size": "1.5rem",
      "font-h4-height": "1.4",
      "font-h4-weight": "500",
      "font-h4-spacing": "0",
      "font-body-sm-size": "0.875rem",
      "font-body-base-size": "1rem",
      "font-body-lg-size": "1.125rem",
      "font-tagline-xs-size": "0.75rem",
      "font-tagline-sm-size": "0.875rem",
      "font-tagline-md-size": "1rem",
      "font-url-heading": "",

      "line-color-1": "#6B7280",
      "line-color-2": "#4B5563",
      "line-color-3": "#E5E7EB",
      "border-radius-1": "0.25rem",
      "border-radius-2": "0.5rem",
      "border-radius-3": "0.75rem",
      "border-radius-4": "1rem",
    },
  },
  {
    name: "Tema Claro",
    tokens: {
      "bg-primary": "#FFFFFF",
      "bg-section": "#F8FAFC",
      "bg-highlight": "#E0F2FE",
      "text-h1": "#1F2937",
      "text-h2": "#1F2937",
      "text-h3": "#1F2937",
      "text-h4": "#1F2937",
      "text-body-sm": "#374151",
      "text-body-base": "#374151",
      "text-body-lg": "#374151",
      "text-tagline-xs": "#0EA5E9",
      "text-tagline-sm": "#0EA5E9",
      "text-tagline-md": "#0EA5E9",
      "action-primary-default": "#0EA5E9",
      "action-primary-hover": "#0284C7",
      "action-disabled": "#CBD5E1",

      "font-family-heading": "sans-serif",
      "font-h1-size": "3rem",
      "font-h1-height": "1.2",
      "font-h1-weight": "700",
      "font-h1-spacing": "-0.02em",
      "font-h2-size": "2.5rem",
      "font-h2-height": "1.2",
      "font-h2-weight": "700",
      "font-h2-spacing": "-0.02em",
      "font-h3-size": "2rem",
      "font-h3-height": "1.3",
      "font-h3-weight": "600",
      "font-h3-spacing": "-0.01em",
      "font-h4-size": "1.5rem",
      "font-h4-height": "1.4",
      "font-h4-weight": "500",
      "font-h4-spacing": "0",
      "font-body-sm-size": "0.875rem",
      "font-body-base-size": "1rem",
      "font-body-lg-size": "1.125rem",
      "font-tagline-xs-size": "0.75rem",
      "font-tagline-sm-size": "0.875rem",
      "font-tagline-md-size": "1rem",
      "font-url-heading": "",

      "line-color-1": "#CBD5E1",
      "line-color-2": "#E2E8F0",
      "line-color-3": "#A0AEC0",
      "border-radius-1": "0.25rem",
      "border-radius-2": "0.5rem",
      "border-radius-3": "0.75rem",
      "border-radius-4": "1rem",
    },
  },
  {
    name: "Tema Verde",
    tokens: {
      "bg-primary": "#064E3B",
      "bg-section": "#ECFDF5",
      "bg-highlight": "#D1FAE5",
      "text-h1": "#FFFFFF",
      "text-h2": "#FFFFFF",
      "text-h3": "#FFFFFF",
      "text-h4": "#FFFFFF",
      "text-body-sm": "#1F2937",
      "text-body-base": "#1F2937",
      "text-body-lg": "#1F2937",
      "text-tagline-xs": "#059669",
      "text-tagline-sm": "#059669",
      "text-tagline-md": "#059669",
      "action-primary-default": "#10B981",
      "action-primary-hover": "#059669",
      "action-disabled": "#9CA3AF",

      "font-family-heading": "sans-serif",
      "font-h1-size": "3rem",
      "font-h1-height": "1.2",
      "font-h1-weight": "700",
      "font-h1-spacing": "-0.02em",
      "font-h2-size": "2.5rem",
      "font-h2-height": "1.2",
      "font-h2-weight": "700",
      "font-h2-spacing": "-0.02em",
      "font-h3-size": "2rem",
      "font-h3-height": "1.3",
      "font-h3-weight": "600",
      "font-h3-spacing": "-0.01em",
      "font-h4-size": "1.5rem",
      "font-h4-height": "1.4",
      "font-h4-weight": "500",
      "font-h4-spacing": "0",
      "font-body-sm-size": "0.875rem",
      "font-body-base-size": "1rem",
      "font-body-lg-size": "1.125rem",
      "font-tagline-xs-size": "0.75rem",
      "font-tagline-sm-size": "0.875rem",
      "font-tagline-md-size": "1rem",
      "font-url-heading": "",

      "line-color-1": "#6EE7B7",
      "line-color-2": "#A7F3D0",
      "line-color-3": "#4B5563",
      "border-radius-1": "0.25rem",
      "border-radius-2": "0.5rem",
      "border-radius-3": "0.75rem",
      "border-radius-4": "1rem",
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
      id: "colors",
      title: "Cores",
      icon: <Palette className="w-4 h-4" />,
      groups: [
        {
          title: "Backgrounds",
          tokens: ["bg-primary", "bg-section", "bg-highlight"],
        },
        {
          title: "Tipografia",
          tokens: [
            "text-h1",
            "text-h2",
            "text-h3",
            "text-h4",
            "text-body-sm",
            "text-body-base",
            "text-body-lg",
            "text-tagline-xs",
            "text-tagline-sm",
            "text-tagline-md",
          ],
        },
        {
          title: "Botões",
          tokens: ["action-primary-default", "action-primary-hover", "action-disabled"],
        },
      ],
    },
    {
      id: "typography",
      title: "Tipografia",
      icon: <Type className="w-4 h-4" />,
      groups: [
        {
          title: "Headings",
          tokens: [
            "font-family-heading",
            "font-h1-size",
            "font-h1-height",
            "font-h1-weight",
            "font-h1-spacing",
            "font-h2-size",
            "font-h2-height",
            "font-h2-weight",
            "font-h2-spacing",
            "font-h3-size",
            "font-h3-height",
            "font-h3-weight",
            "font-h3-spacing",
            "font-h4-size",
            "font-h4-height",
            "font-h4-weight",
            "font-h4-spacing",
          ],
        },
        {
          title: "Corpo e Taglines",
          tokens: [
            "font-body-sm-size",
            "font-body-base-size",
            "font-body-lg-size",
            "font-tagline-xs-size",
            "font-tagline-sm-size",
            "font-tagline-md-size",
          ],
        },
        {
          title: "Recursos",
          tokens: ["font-url-heading"],
        },
      ],
    },
    {
      id: "visuals",
      title: "Visuais",
      icon: <Palette className="w-4 h-4" />,
      groups: [
        {
          title: "Linhas",
          tokens: ["line-color-1", "line-color-2", "line-color-3"],
        },
        {
          title: "Bordas",
          tokens: ["border-radius-1", "border-radius-2", "border-radius-3", "border-radius-4"],
        },
      ],
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

            <Tabs defaultValue="colors" className="w-full h-auto">
              <TabsList className="grid grid-cols-3 h-auto w-auto py-1.5 px-1.5 rounded-lg">
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
                      <Accordion type="multiple" className="w-full">
                        {category.groups.map((group) => (
                          <AccordionItem value={group.title} key={group.title}>
                            <AccordionTrigger className="text-base font-semibold text-foreground">
                              {group.title}
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4">
                              {group.tokens.map((tokenName) => (
                                <TokenInput
                                  key={tokenName}
                                  tokenName={tokenName}
                                  value={tokens[tokenName]}
                                  onChange={(value) => updateToken(tokenName, value)}
                                />
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
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
