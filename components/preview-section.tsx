"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PreviewSectionProps {
  tokens: Record<string, string>
}

export function PreviewSection({ tokens }: PreviewSectionProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Seção Hero</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 rounded-lg" style={{ backgroundColor: tokens["bg-primary"] }}>
            <h1 className="text-3xl font-bold mb-4" style={{ color: tokens["text-heading"] }}>
              Título Principal
            </h1>
            <p className="text-lg mb-6" style={{ color: tokens["text-tagline"] }}>
              Subtítulo ou tagline da sua landing page
            </p>
            <Button
              className="text-white"
              style={{
                backgroundColor: tokens["action-primary"],
                borderColor: tokens["action-primary"],
              }}
            >
              Call to Action
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Section Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Seção de Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 rounded-lg" style={{ backgroundColor: tokens["bg-section"] }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: tokens["card-background"],
                  borderColor: tokens["card-border"],
                }}
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: tokens["text-body"] }}>
                  Card de Exemplo
                </h3>
                <p className="text-sm mb-4" style={{ color: tokens["text-muted"] }}>
                  Texto descritivo do card usando o token de texto secundário.
                </p>
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: tokens["bg-highlight"],
                    color: tokens["text-body"],
                  }}
                >
                  Tag
                </Badge>
              </div>

              <div
                className="p-4 rounded-lg border justify-start gap-0 py-4"
                style={{
                  backgroundColor: tokens["card-background"],
                  borderColor: tokens["card-border"],
                }}
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: tokens["text-body"] }}>
                  Outro Card
                </h3>
                <p className="text-sm mb-4" style={{ color: tokens["text-muted"] }}>
                  Mais conteúdo de exemplo para demonstrar a consistência.
                </p>
                <div className="w-full rounded h-0.5" style={{ backgroundColor: tokens["line-color"] }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button States Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Estados dos Botões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              style={{
                backgroundColor: tokens["action-primary"],
                borderColor: tokens["action-primary"],
              }}
            >
              Primário
            </Button>
            <Button
              style={{
                backgroundColor: tokens["action-hover"],
                borderColor: tokens["action-hover"],
              }}
            >
              Hover
            </Button>
            <Button
              disabled
              style={{
                backgroundColor: tokens["action-disabled"],
                borderColor: tokens["action-disabled"],
              }}
            >
              Desabilitado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
