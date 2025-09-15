"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PreviewSectionProps {
  tokens: Record<string, string>
}

export function PreviewSection({ tokens }: PreviewSectionProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section Preview */}
      <div className="p-8 rounded-lg bg-primary text-primary-foreground">
        <h1 className="text-h1">Título Principal</h1>
        <p className="mt-4 text-tagline-md">Subtítulo da sua landing page</p>
        <Button className="mt-6">Call to Action</Button>
      </div>

      {/* Typography Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Tipografia</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-h1">Heading 1</h1>
          <h2 className="mt-4 text-h2">Heading 2</h2>
          <h3 className="mt-4 text-h3">Heading 3</h3>
          <h4 className="mt-4 text-h4">Heading 4</h4>

          <p className="mt-6 text-body-lg">Corpo de texto grande.</p>
          <p className="mt-2 text-body-base">Corpo de texto base.</p>
          <p className="mt-2 text-body-sm">Corpo de texto pequeno.</p>
        </CardContent>
      </Card>

      {/* Visuals Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Visuais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border">
              <p>Card com Borda</p>
            </div>
            <div className="p-4 rounded-lg border-2 border-border">
              <p>Card com Borda Tipo 2</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge className="rounded-sm">Radius 1</Badge>
            <Badge className="rounded-md">Radius 2</Badge>
            <Badge className="rounded-lg">Radius 3</Badge>
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
            <Button>Primário</Button>
            <Button variant="ghost">Hover</Button>
            <Button disabled>Desabilitado</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
