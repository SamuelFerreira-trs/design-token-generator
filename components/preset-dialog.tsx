"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Trash2, Download, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PresetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  savedPresets: Array<{ name: string; tokens: Record<string, string> }>
  predefinedPresets: Array<{ name: string; tokens: Record<string, string> }>
  onSavePreset: (name: string) => void
  onLoadPreset: (tokens: Record<string, string>) => void
  onDeletePreset: (index: number) => void
}

export function PresetDialog({
  open,
  onOpenChange,
  savedPresets,
  predefinedPresets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
}: PresetDialogProps) {
  const [presetName, setPresetName] = useState("")
  const { toast } = useToast()

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome para o preset.",
        variant: "destructive",
      })
      return
    }

    onSavePreset(presetName.trim())
    setPresetName("")
    toast({
      title: "Preset salvo!",
      description: `O preset "${presetName}" foi salvo com sucesso.`,
    })
  }

  const handleLoadPreset = (tokens: Record<string, string>, name: string) => {
    onLoadPreset(tokens)
    onOpenChange(false)
    toast({
      title: "Preset carregado!",
      description: `O preset "${name}" foi aplicado.`,
    })
  }

  const handleDeletePreset = (index: number, name: string) => {
    onDeletePreset(index)
    toast({
      title: "Preset removido",
      description: `O preset "${name}" foi removido.`,
    })
  }

  const PresetCard = ({
    preset,
    onLoad,
    onDelete,
    showDelete = false,
  }: {
    preset: { name: string; tokens: Record<string, string> }
    onLoad: () => void
    onDelete?: () => void
    showDelete?: boolean
  }) => (
    <Card className="group">
      <CardHeader className="pb-3">
        <div className="flex justify-between flex-col items-center">
          <CardTitle className="text-sm font-medium">{preset.name}</CardTitle>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={onLoad} className="gap-1">
              <Download className="w-3 h-3" />
              Carregar
            </Button>
            {showDelete && onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDelete}
                className="gap-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap flex-row items-center gap-1.5">
          {Object.entries(preset.tokens)
            .slice(0, 8)
            .map(([key, value]) => (
              <div
                key={key}
                className="w-4 h-4 rounded border border-border"
                style={{ backgroundColor: value }}
                title={`${key}: ${value}`}
              />
            ))}
          {Object.keys(preset.tokens).length > 8 && (
            <div className="h-4 rounded border border-border bg-muted flex items-center justify-center text-xs text-muted-foreground w-9">
              +{Object.keys(preset.tokens).length - 8}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Gerenciar Presets
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="predefined" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predefined">Temas Prontos</TabsTrigger>
            <TabsTrigger value="saved">Meus Presets</TabsTrigger>
            <TabsTrigger value="save">Salvar Atual</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Temas Predefinidos</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Escolha um dos temas prontos para começar rapidamente
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex-col">
              {predefinedPresets.map((preset, index) => (
                <PresetCard key={index} preset={preset} onLoad={() => handleLoadPreset(preset.tokens, preset.name)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Presets Salvos</h3>
              <p className="text-sm text-muted-foreground mb-4">Seus presets personalizados salvos localmente</p>
            </div>
            {savedPresets.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Palette className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Nenhum preset salvo ainda.
                    <br />
                    Vá para a aba "Salvar Atual" para criar seu primeiro preset.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedPresets.map((preset, index) => (
                  <PresetCard
                    key={index}
                    preset={preset}
                    onLoad={() => handleLoadPreset(preset.tokens, preset.name)}
                    onDelete={() => handleDeletePreset(index, preset.name)}
                    showDelete={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="save" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Salvar Configuração Atual</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Salve seus tokens atuais como um preset para reutilizar depois
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="preset-name">Nome do Preset</Label>
                    <Input
                      id="preset-name"
                      placeholder="Ex: Meu Tema Personalizado"
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSavePreset()
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleSavePreset} className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Preset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
