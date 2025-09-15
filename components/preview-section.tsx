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
      <div className="p-8 rounded-lg" style={{ backgroundColor: tokens["bg-primary"] }}>
        <h1
          style={{
            color: tokens["text-h1"],
            fontSize: tokens["font-h1-size"],
            lineHeight: tokens["font-h1-height"],
            fontWeight: tokens["font-h1-weight"],
            letterSpacing: tokens["font-h1-spacing"],
            fontFamily: tokens["font-family-heading"],
          }}
        >
          Título Principal
        </h1>
        <p
          className="mt-4"
          style={{
            color: tokens["text-tagline-md"],
            fontSize: tokens["font-tagline-md-size"],
          }}
        >
          Subtítulo da sua landing page
        </p>
        <Button
          className="text-white mt-6"
          style={{
            backgroundColor: tokens["action-primary-default"],
            borderColor: tokens["action-primary-default"],
            borderRadius: tokens["border-radius-2"],
          }}
        >
          Call to Action
        </Button>
      </div>

      {/* Typography Preview */}
      <Card style={{ borderRadius: tokens["border-radius-3"] }}>
        <CardHeader>
          <CardTitle>Tipografia</CardTitle>
        </CardHeader>
        <CardContent>
          <h1
            style={{
              color: tokens["text-body-base"], // Using dark text color for visibility on light background
              fontSize: tokens["font-h1-size"],
              lineHeight: tokens["font-h1-height"],
              fontWeight: tokens["font-h1-weight"],
              letterSpacing: tokens["font-h1-spacing"],
              fontFamily: tokens["font-family-heading"],
            }}
          >
            Heading 1
          </h1>
          <h2
            className="mt-4"
            style={{
              color: tokens["text-body-base"], // Using dark text color for visibility on light background
              fontSize: tokens["font-h2-size"],
              lineHeight: tokens["font-h2-height"],
              fontWeight: tokens["font-h2-weight"],
              letterSpacing: tokens["font-h2-spacing"],
              fontFamily: tokens["font-family-heading"],
            }}
          >
            Heading 2
          </h2>
          <h3
            className="mt-4"
            style={{
              color: tokens["text-body-base"], // Using dark text color for visibility on light background
              fontSize: tokens["font-h3-size"],
              lineHeight: tokens["font-h3-height"],
              fontWeight: tokens["font-h3-weight"],
              letterSpacing: tokens["font-h3-spacing"],
              fontFamily: tokens["font-family-heading"],
            }}
          >
            Heading 3
          </h3>
          <h4
            className="mt-4"
            style={{
              color: tokens["text-body-base"], // Using dark text color for visibility on light background
              fontSize: tokens["font-h4-size"],
              lineHeight: tokens["font-h4-height"],
              fontWeight: tokens["font-h4-weight"],
              letterSpacing: tokens["font-h4-spacing"],
              fontFamily: tokens["font-family-heading"],
            }}
          >
            Heading 4
          </h4>

          <p
            className="mt-6"
            style={{
              color: tokens["text-body-lg"],
              fontSize: tokens["font-body-lg-size"],
            }}
          >
            Corpo de texto grande.
          </p>
          <p
            className="mt-2"
            style={{
              color: tokens["text-body-base"],
              fontSize: tokens["font-body-base-size"],
            }}
          >
            Corpo de texto base.
          </p>
          <p
            className="mt-2 text-sm"
            style={{
              color: tokens["text-body-sm"],
              fontSize: tokens["font-body-sm-size"],
            }}
          >
            Corpo de texto pequeno.
          </p>
        </CardContent>
      </Card>

      {/* Visuals Preview */}
      <Card style={{ borderRadius: tokens["border-radius-4"] }}>
        <CardHeader>
          <CardTitle>Visuais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border" style={{ borderColor: tokens["line-color-1"] }}>
              <p>Card com Borda Tipo 1</p>
            </div>
            <div className="p-4 rounded-lg border-2" style={{ borderColor: tokens["line-color-2"] }}>
              <p>Card com Borda Tipo 2</p>
            </div>
            <div className="p-4 rounded-lg border-2" style={{ borderColor: tokens["line-color-3"] }}>
              <p>Card com Borda Tipo 3</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge style={{ borderRadius: tokens["border-radius-1"] }}>Radius 1</Badge>
            <Badge style={{ borderRadius: tokens["border-radius-2"] }}>Radius 2</Badge>
            <Badge style={{ borderRadius: tokens["border-radius-3"] }}>Radius 3</Badge>
            <Badge style={{ borderRadius: tokens["border-radius-4"] }}>Radius 4</Badge>
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
                backgroundColor: tokens["action-primary-default"],
                borderColor: tokens["action-primary-default"],
                borderRadius: tokens["border-radius-2"],
              }}
            >
              Primário
            </Button>
            <Button
              style={{
                backgroundColor: tokens["action-primary-hover"],
                borderColor: tokens["action-primary-hover"],
                borderRadius: tokens["border-radius-2"],
              }}
            >
              Hover
            </Button>
            <Button
              disabled
              style={{
                backgroundColor: tokens["action-disabled"],
                borderColor: tokens["action-disabled"],
                borderRadius: tokens["border-radius-2"],
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
