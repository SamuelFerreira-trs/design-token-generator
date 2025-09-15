"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tokens: Record<string, string>
}

export function ExportDialog({ open, onOpenChange, tokens }: ExportDialogProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)
  const { toast } = useToast()

  const generateJSON = () => {
    return JSON.stringify({ color: tokens }, null, 2)
  }

  const generateCSS = () => {
    const cssVars = Object.entries(tokens)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n")

    return `:root {\n${cssVars}\n}`
  }

  const generateThemeProvider = () => {
    const themeObject = Object.entries(tokens)
      .map(([key, value]) => `    '${key}': '${value}',`)
      .join("\n")

    return `export const theme = {\n  colors: {\n${themeObject}\n  }\n}`
  }

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedFormat(format)
      toast({
        title: "Copiado!",
        description: `Código ${format} copiado para a área de transferência.`,
      })
      setTimeout(() => setCopiedFormat(null), 2000)
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o código.",
        variant: "destructive",
      })
    }
  }

  const exportFormats = [
    {
      id: "json",
      title: "JSON",
      description: "Formato JSON para integração com ferramentas",
      content: generateJSON(),
    },
    {
      id: "css",
      title: "CSS Variables",
      description: "Variáveis CSS prontas para usar",
      content: generateCSS(),
    },
    {
      id: "theme",
      title: "Theme Provider",
      description: "Objeto JavaScript para React/Styled Components",
      content: generateThemeProvider(),
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Exportar Design Tokens</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="json" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {exportFormats.map((format) => (
              <TabsTrigger key={format.id} value={format.id}>
                {format.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {exportFormats.map((format) => (
            <TabsContent key={format.id} value={format.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{format.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{format.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(format.content, format.title)}
                      className="gap-2"
                    >
                      {copiedFormat === format.title ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedFormat === format.title ? "Copiado!" : "Copiar"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code>{format.content}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
