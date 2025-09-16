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
  "button-text": "#FFFFFF",
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
      "button-text": "#FFFFFF",
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
      "button-text": "#FFFFFF",
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
      "button-text": "#FFFFFF",
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

  useEffect(() => {
    const styleTag = document.getElementById("design-tokens") || document.createElement("style")
    styleTag.id = "design-tokens"
    document.head.appendChild(styleTag)

    const rootStyles = Object.entries(tokens).reduce((acc, [key, value]) => {
      const cssVarName = `--${key}`
      return `${acc}${cssVarName}: ${value};`
    }, "")

    styleTag.innerHTML = `:root {${rootStyles}}`
  }, [tokens])

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
          tokens: ["action-primary-default", "action-primary-hover", "action-disabled", "button-text"],
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
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  width="50"
                  height="40"
                  viewBox="0 0 50 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-6"
                >
                  <rect x="0.5" y="0.5" width="49" height="39" rx="4.5" fill="white" />
                  <rect x="0.5" y="0.5" width="49" height="39" rx="4.5" stroke="#C4C4CC" />
                  <path
                    d="M26.3287 26.87C19.593 32.6242 14.8099 33.0301 12.3603 30.5785C10.1033 28.3215 11.9752 22.6604 16.5368 17.0697L7.86914 8.40417H13.4081L22.0177 17.0138C16.5844 22.4803 13.4163 28.3008 15.0542 29.9386C16.4105 31.297 20.5848 29.4148 25.0884 25.6297L26.3287 26.87Z"
                    fill="#B585FB"
                  />
                  <path
                    d="M42.1296 31.5951H36.5907L27.9811 22.9855C33.4144 17.5211 36.5824 11.6985 34.9466 10.0627C33.5904 8.70439 29.4119 10.5887 24.9083 14.3738L23.668 13.1335C30.4058 7.37713 35.191 6.9692 37.6405 9.42082C39.8975 11.6778 38.0277 17.3389 33.4641 22.9296L42.1317 31.5951H42.1296Z"
                    fill="#B585FB"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gerador de Design Tokens</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPresetDialogOpen(true)} className="gap-2">
                <FolderOpen className="w-4 h-4" />
                Presets
              </Button>
              <Button onClick={() => setExportDialogOpen(true)} className="gap-2 text-white">
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
              <TabsList className="grid w-full grid-cols-3 h-auto py-1.5 px-1.5 rounded-lg">
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
