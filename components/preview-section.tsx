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
      <div className="p-8 rounded-lg bg-(--bg-primary)">
        <h1 className="text-(--text-h1) text-(--font-h1-size) font-(--font-h1-weight) leading-(--font-h1-height) tracking-(--font-h1-spacing) font-(--font-family-heading)">
          Título Principal
        </h1>
        <p className="mt-4 text-(--text-tagline-md) text-(--font-tagline-md-size)">Subtítulo da sua landing page</p>
        <Button className="mt-6 bg-(--action-primary-default) hover:bg-(--action-primary-hover)">Call to Action</Button>
      </div>

      {/* Typography Preview */}
      <Card className="rounded-(--border-radius-3)">
        <CardHeader>
          <CardTitle>Tipografia</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-(--text-body-base) text-(--font-h1-size) font-(--font-h1-weight) leading-(--font-h1-height) tracking-(--font-h1-spacing) font-(--font-family-heading)">
            Heading 1
          </h1>
          <h2 className="mt-4 text-(--text-body-base) text-(--font-h2-size) font-(--font-h2-weight) leading-(--font-h2-height) tracking-(--font-h2-spacing) font-(--font-family-heading)">
            Heading 2
          </h2>
          <h3 className="mt-4 text-(--text-body-base) text-(--font-h3-size) font-(--font-h3-weight) leading-(--font-h3-height) tracking-(--font-h3-spacing) font-(--font-family-heading)">
            Heading 3
          </h3>
          <h4 className="mt-4 text-(--text-body-base) text-(--font-h4-size) font-(--font-h4-weight) leading-(--font-h4-height) tracking-(--font-h4-spacing) font-(--font-family-heading)">
            Heading 4
          </h4>

          <p className="mt-6 text-(--text-body-lg) text-(--font-body-lg-size)">Corpo de texto grande.</p>
          <p className="mt-2 text-(--text-body-base) text-(--font-body-base-size)">Corpo de texto base.</p>
          <p className="mt-2 text-(--text-body-sm) text-(--font-body-sm-size)">Corpo de texto pequeno.</p>
        </CardContent>
      </Card>

      {/* Visuals Preview */}
      <Card className="rounded-(--border-radius-4)">
        <CardHeader>
          <CardTitle>Visuais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-(--line-color-1)">
              <p>Card com Borda Tipo 1</p>
            </div>
            <div className="p-4 rounded-lg border-2 border-(--line-color-2)">
              <p>Card com Borda Tipo 2</p>
            </div>
            <div className="p-4 rounded-lg border-2 border-(--line-color-3)">
              <p>Card com Borda Tipo 3</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge className="rounded-(--border-radius-1)">Radius 1</Badge>
            <Badge className="rounded-(--border-radius-2)">Radius 2</Badge>
            <Badge className="rounded-(--border-radius-3)">Radius 3</Badge>
            <Badge className="rounded-(--border-radius-4)">Radius 4</Badge>
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
            <Button className="bg-(--action-primary-default) hover:bg-(--action-primary-hover) border-(--action-primary-default) rounded-(--border-radius-2)">
              Primário
            </Button>
            <Button className="bg-(--action-primary-hover) rounded-(--border-radius-2)">Hover</Button>
            <Button disabled className="bg-(--action-disabled) rounded-(--border-radius-2)">
              Desabilitado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
