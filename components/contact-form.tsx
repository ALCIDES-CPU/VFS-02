"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Erro ao enviar mensagem.")
        setIsSubmitting(false)
        return
      }

      setSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      setError("Erro de conexao. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 className="mb-3 h-10 w-10 text-green-600" />
        <h3 className="font-semibold text-card-foreground">
          Mensagem Enviada
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Obrigado pelo seu contacto. Responderemos o mais breve possivel.
        </p>
        <Button
          variant="outline"
          className="mt-4 bg-transparent"
          onClick={() => setSuccess(false)}
        >
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="contact-name">Nome</Label>
        <Input
          id="contact-name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="O seu nome"
          required
        />
      </div>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="seu@email.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="contact-subject">Assunto</Label>
        <Input
          id="contact-subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
          }
          placeholder="Assunto da mensagem"
          required
        />
      </div>
      <div>
        <Label htmlFor="contact-message">Mensagem</Label>
        <Textarea
          id="contact-message"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Escreva a sua mensagem..."
          rows={4}
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            A enviar...
          </>
        ) : (
          "Enviar Mensagem"
        )}
      </Button>
    </form>
  )
}
