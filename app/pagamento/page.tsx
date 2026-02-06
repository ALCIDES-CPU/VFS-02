"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, ArrowRight, Shield, Lock } from "lucide-react"

type Appointment = {
  id: string
  appointment_number: string
  visa_type: string
  full_name: string
  location: string
  appointment_date: string
  appointment_time: string
  amount: number
}

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/bJe9AVdr808c2PqefMenS02"

export default function PagamentoPage() {
  const router = useRouter()
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("appointment")
    if (!stored) {
      router.push("/agendar")
      return
    }
    setAppointment(JSON.parse(stored))
  }, [router])

  if (!appointment) {
    return null
  }

  function handlePayment() {
    // Redirect to Stripe payment link
    window.location.href = `${STRIPE_PAYMENT_LINK}?client_reference_id=${appointment?.appointment_number}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-foreground">
            Pagamento
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Revise os dados e prossiga para o pagamento seguro
          </p>

          <Card className="mt-8 border-border bg-card">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-primary/5 p-4">
                <CreditCard className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    Agendamento #{appointment.appointment_number}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {appointment.full_name}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-border rounded-lg border border-border">
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-sm text-muted-foreground">Tipo de Visto</span>
                  <span className="text-sm font-medium capitalize text-card-foreground">
                    {appointment.visa_type}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-sm text-muted-foreground">Local</span>
                  <span className="text-sm font-medium text-card-foreground">
                    {appointment.location}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-sm text-muted-foreground">Data</span>
                  <span className="text-sm font-medium text-card-foreground">
                    {appointment.appointment_date}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-sm text-muted-foreground">Horario</span>
                  <span className="text-sm font-medium text-card-foreground">
                    {appointment.appointment_time}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-primary/5 px-4 py-3">
                  <span className="text-sm font-semibold text-card-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {appointment.amount},00 EUR
                  </span>
                </div>
              </div>

              <Button
                className="mt-6 w-full"
                size="lg"
                onClick={handlePayment}
              >
                Pagar com Stripe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  Pagamento seguro
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" />
                  Dados encriptados
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
