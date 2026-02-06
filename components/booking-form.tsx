"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plane,
  Briefcase,
  GraduationCap,
  Users,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react"
import { SlotPicker } from "@/components/slot-picker"

const VISA_TYPES = [
  { value: "turismo", label: "Turismo", icon: Plane, description: "Viagem de lazer ou visita" },
  { value: "trabalho", label: "Trabalho", icon: Briefcase, description: "Emprego ou atividade profissional" },
  { value: "estudo", label: "Estudo", icon: GraduationCap, description: "Formacao academica" },
  { value: "reagrupamento", label: "Reagrupamento Familiar", icon: Users, description: "Reunificacao familiar" },
  { value: "outro", label: "Outro", icon: HelpCircle, description: "Outro motivo de viagem" },
]

const STEPS = [
  { number: 1, title: "Tipo de Visto" },
  { number: 2, title: "Dados Pessoais" },
  { number: 3, title: "Local e Data" },
  { number: 4, title: "Confirmacao" },
]

export type FormData = {
  visaType: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  nationality: string
  passportNumber: string
  passportExpiry: string
  gender: string
  maritalStatus: string
  address: string
  city: string
  location: string
  appointmentDate: string
  appointmentTime: string
}

const initialFormData: FormData = {
  visaType: "",
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "",
  passportNumber: "",
  passportExpiry: "",
  gender: "",
  maritalStatus: "",
  address: "",
  city: "",
  location: "",
  appointmentDate: "",
  appointmentTime: "",
}

export function BookingForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  function validateStep(): boolean {
    switch (step) {
      case 1:
        return true
      case 2:
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.phone ||
          !formData.dateOfBirth ||
          !formData.nationality ||
          !formData.passportNumber ||
          !formData.passportExpiry ||
          !formData.gender ||
          !formData.maritalStatus ||
          !formData.address ||
          !formData.city
        ) {
          setError("Todos os campos de dados pessoais sao obrigatorios.")
          return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          setError("Por favor insira um email valido.")
          return false
        }
        return true
      case 3:
        return true
      default:
        return true
    }
  }

  function nextStep() {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 4))
      setError("")
    }
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1))
    setError("")
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Ocorreu um erro. Tente novamente.")
        setIsSubmitting(false)
        return
      }

      // Store appointment in sessionStorage for payment flow
      sessionStorage.setItem("appointment", JSON.stringify(data.appointment))
      router.push("/pagamento")
    } catch {
      setError("Erro de conexao. Tente novamente.")
      setIsSubmitting(false)
    }
  }

  const visaLabel = VISA_TYPES.find((v) => v.value === formData.visaType)?.label || ""

  return (
    <div className="mt-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.number} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step > s.number
                  ? "bg-primary text-primary-foreground"
                  : step === s.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s.number ? <Check className="h-4 w-4" /> : s.number}
            </div>
            <span
              className={`hidden text-xs font-medium sm:inline ${
                step >= s.number ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.title}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-6 sm:w-10 ${
                  step > s.number ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-6 md:p-8">
          {/* Step 1: Visa Type */}
          {step === 1 && (
            <div>
              <h2 className="mb-1 text-lg font-semibold text-card-foreground">
                Selecione o Tipo de Visto
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Escolha o tipo de visto adequado ao seu motivo de viagem (opcional)
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {VISA_TYPES.map((vt) => (
                  <button
                    key={vt.value}
                    type="button"
                    onClick={() => updateField("visaType", vt.value)}
                    className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                      formData.visaType === vt.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        formData.visaType === vt.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <vt.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-card-foreground">
                        {vt.label}
                      </span>
                      <p className="text-xs text-muted-foreground">{vt.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Personal Data */}
          {step === 2 && (
            <div>
              <h2 className="mb-1 text-lg font-semibold text-card-foreground">
                Dados Pessoais
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Preencha todos os campos abaixo (obrigatorios)
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Insira o seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+238 000 0000"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => updateField("nationality", e.target.value)}
                    placeholder="Ex: Cabo-verdiana"
                  />
                </div>
                <div>
                  <Label htmlFor="passportNumber">Numero do Passaporte</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => updateField("passportNumber", e.target.value)}
                    placeholder="Insira o numero do passaporte"
                  />
                </div>
                <div>
                  <Label htmlFor="passportExpiry">Validade do Passaporte</Label>
                  <Input
                    id="passportExpiry"
                    type="date"
                    value={formData.passportExpiry}
                    onChange={(e) => updateField("passportExpiry", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sexo</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(val) => updateField("gender", val)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(val) => updateField("maritalStatus", val)}
                  >
                    <SelectTrigger id="maritalStatus">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viuvo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address">Endereco</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Insira o seu endereco"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Cidade / Ilha</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Ex: Praia, Santiago"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location and Date */}
          {step === 3 && (
            <div>
              <h2 className="mb-1 text-lg font-semibold text-card-foreground">
                Local e Data do Atendimento
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Selecione o local e o horario desejado (opcional)
              </p>
              <div className="mb-6">
                <Label htmlFor="location">Local de Atendimento</Label>
                <Select
                  value={formData.location}
                  onValueChange={(val) => {
                    updateField("location", val)
                    updateField("appointmentDate", "")
                    updateField("appointmentTime", "")
                  }}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Selecione o local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Praia">Praia</SelectItem>
                    <SelectItem value="Mindelo">Mindelo</SelectItem>
                    <SelectItem value="Sal">Sal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.location && (
                <SlotPicker
                  location={formData.location}
                  selectedDate={formData.appointmentDate}
                  selectedTime={formData.appointmentTime}
                  onSelectDate={(date) => {
                    updateField("appointmentDate", date)
                    updateField("appointmentTime", "")
                  }}
                  onSelectTime={(time) => updateField("appointmentTime", time)}
                />
              )}
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && (
            <div>
              <h2 className="mb-1 text-lg font-semibold text-card-foreground">
                Resumo do Agendamento
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Verifique todos os dados antes de prosseguir
              </p>
              <div className="divide-y divide-border rounded-lg border border-border">
                {visaLabel && <SummaryRow label="Tipo de Visto" value={visaLabel} />}
                <SummaryRow label="Nome Completo" value={formData.fullName} />
                <SummaryRow label="Email" value={formData.email} />
                <SummaryRow label="Telefone" value={formData.phone} />
                <SummaryRow label="Data de Nascimento" value={formData.dateOfBirth} />
                <SummaryRow label="Nacionalidade" value={formData.nationality} />
                <SummaryRow label="Passaporte" value={formData.passportNumber} />
                <SummaryRow label="Validade Passaporte" value={formData.passportExpiry} />
                <SummaryRow label="Sexo" value={formData.gender} />
                <SummaryRow label="Estado Civil" value={formData.maritalStatus} />
                <SummaryRow label="Endereco" value={formData.address} />
                <SummaryRow label="Cidade" value={formData.city} />
                {formData.location && <SummaryRow label="Local" value={formData.location} />}
                {formData.appointmentDate && <SummaryRow label="Data" value={formData.appointmentDate} />}
                {formData.appointmentTime && <SummaryRow label="Horario" value={formData.appointmentTime} />}
                <div className="flex items-center justify-between bg-primary/5 px-4 py-3">
                  <span className="text-sm font-semibold text-card-foreground">
                    Valor a Pagar
                  </span>
                  <span className="text-lg font-bold text-primary">80,00 EUR</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Ao prosseguir para pagamento, confirma que todos os dados estao
                corretos e aceita os termos de servico. O pagamento sera
                processado de forma segura pelo Stripe.
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep} type="button">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <Button onClick={nextStep} type="button">
                Proximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                type="button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A processar...
                  </>
                ) : (
                  "Prosseguir para Pagamento"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-card-foreground">{value}</span>
    </div>
  )
}
