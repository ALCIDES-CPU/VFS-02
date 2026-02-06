import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import {
  FileText,
  CalendarDays,
  CreditCard,
  CheckCircle,
  MapPin,
  Clock,
  Shield,
} from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Preencha o formulario",
    description: "Insira os seus dados pessoais e escolha o tipo de visto",
  },
  {
    icon: CalendarDays,
    title: "Escolha data e local",
    description: "Selecione o local de atendimento e o horario disponivel",
  },
  {
    icon: CreditCard,
    title: "Efetue o pagamento",
    description: "Pagamento seguro processado pelo Stripe",
  },
  {
    icon: CheckCircle,
    title: "Receba a confirmacao",
    description: "Receba o comprovativo por email com todos os detalhes",
  },
]

const features = [
  {
    icon: MapPin,
    title: "3 Locais de Atendimento",
    description: "Praia, Mindelo e Sal",
  },
  {
    icon: Clock,
    title: "Agendamento Rapido",
    description: "Processo completo em menos de 5 minutos",
  },
  {
    icon: Shield,
    title: "Pagamento Seguro",
    description: "Transacoes protegidas pelo Stripe",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5">
              <span className="text-xs font-medium text-primary-foreground">
                Plataforma Oficial de Agendamento
              </span>
            </div>
            <h1 className="text-balance text-3xl font-bold leading-tight text-primary-foreground md:text-5xl">
              Agendamento de Visto de Cabo Verde para Portugal
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Agende o seu atendimento de forma rapida, simples e segura.
              Escolha o tipo de visto, selecione a data e receba a confirmacao
              por email.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/agendar">Agendar Agora</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/documentos">Ver Documentos Necessarios</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-bold text-foreground">
              Como Funciona
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Processo simples em 4 passos
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.title} className="relative rounded-lg border border-border bg-card p-6 text-center">
                  <div className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <s.icon className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold text-card-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-card px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 rounded-lg p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-card-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-2xl rounded-xl bg-primary p-8 text-center md:p-12">
            <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">
              Pronto para agendar o seu visto?
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Comece agora e receba a confirmacao em poucos minutos.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/agendar">Iniciar Agendamento</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
