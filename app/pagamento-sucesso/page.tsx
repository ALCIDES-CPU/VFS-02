"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Download, Home } from "lucide-react"

type Appointment = {
  id: string
  appointment_number: string
  visa_type: string
  full_name: string
  email: string
  location: string
  appointment_date: string
  appointment_time: string
  amount: number
}

export default function PagamentoSucessoPage() {
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("appointment")
    if (stored) {
      setAppointment(JSON.parse(stored))
      // Mark payment as confirmed via API
      const appt = JSON.parse(stored)
      fetch("/api/appointments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentNumber: appt.appointment_number }),
      })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-lg">
          <Card className="border-border bg-card">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-card-foreground">
                Pagamento Efetuado com Sucesso
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                O seu agendamento foi confirmado. Recebera um email com o
                comprovativo.
              </p>

              {appointment && (
                <div className="mt-6 divide-y divide-border rounded-lg border border-border text-left">
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-muted-foreground">
                      Numero do Agendamento
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {appointment.appointment_number}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-muted-foreground">
                      Nome
                    </span>
                    <span className="text-sm font-medium text-card-foreground">
                      {appointment.full_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-muted-foreground">
                      Tipo de Visto
                    </span>
                    <span className="text-sm font-medium capitalize text-card-foreground">
                      {appointment.visa_type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-muted-foreground">
                      Local
                    </span>
                    <span className="text-sm font-medium text-card-foreground">
                      {appointment.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-muted-foreground">
                      Data e Hora
                    </span>
                    <span className="text-sm font-medium text-card-foreground">
                      {appointment.appointment_date} as{" "}
                      {appointment.appointment_time}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3">
                <Button asChild>
                  <a
                    href={`/api/appointments/receipt?id=${appointment?.appointment_number || ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Comprovativo
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Voltar ao Inicio
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
