import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@vfsglobal.com",
    description: "Resposta em 24-48 horas uteis",
  },
  {
    icon: Phone,
    title: "Telefone",
    value: "+238 000 0000",
    description: "Segunda a Sexta, 9h - 16h",
  },
  {
    icon: MapPin,
    title: "Endereco",
    value: "Praia, Santiago",
    description: "Cabo Verde",
  },
  {
    icon: Clock,
    title: "Horario",
    value: "09:00 - 16:00",
    description: "Segunda a Sexta-feira",
  },
]

export default function ContactosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            Contactos
          </h1>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            Entre em contacto connosco para qualquer duvida ou informacao
            adicional
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="border-border bg-card">
                    <CardContent className="p-5">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-card-foreground">
                        {info.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {info.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h2 className="mb-1 text-lg font-semibold text-card-foreground">
                  Enviar Mensagem
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Preencha o formulario e responderemos o mais breve possivel
                </p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
