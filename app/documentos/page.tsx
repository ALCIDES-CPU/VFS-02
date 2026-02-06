import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Briefcase, GraduationCap, Users, FileCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type DocSection = {
  visaType: string
  icon: LucideIcon
  documents: string[]
}

const docSections: DocSection[] = [
  {
    visaType: "Turismo",
    icon: Plane,
    documents: [
      "Passaporte valido (minimo 6 meses de validade)",
      "2 fotografias tipo passe recentes",
      "Formulario de pedido de visto preenchido e assinado",
      "Comprovativo de seguro de viagem",
      "Comprovativo de meios de subsistencia (extrato bancario)",
      "Comprovativo de alojamento (reserva de hotel ou carta convite)",
      "Bilhete de aviao (ida e volta)",
      "Comprovativo de atividade profissional ou ocupacao",
    ],
  },
  {
    visaType: "Trabalho",
    icon: Briefcase,
    documents: [
      "Passaporte valido (minimo 6 meses de validade)",
      "2 fotografias tipo passe recentes",
      "Formulario de pedido de visto preenchido e assinado",
      "Contrato de trabalho ou promessa de contrato",
      "Parecer favoravel do IEFP (Instituto do Emprego)",
      "Certificado de habilitacoes literarias",
      "Registo criminal do pais de origem",
      "Atestado medico",
      "Comprovativo de alojamento em Portugal",
      "Comprovativo de meios de subsistencia",
    ],
  },
  {
    visaType: "Estudo",
    icon: GraduationCap,
    documents: [
      "Passaporte valido (minimo 6 meses de validade)",
      "2 fotografias tipo passe recentes",
      "Formulario de pedido de visto preenchido e assinado",
      "Carta de aceitacao da instituicao de ensino",
      "Comprovativo de meios de subsistencia (bolsa ou declaracao financeira)",
      "Comprovativo de alojamento",
      "Seguro de saude valido para Portugal",
      "Certificado de habilitacoes anteriores",
      "Registo criminal do pais de origem",
    ],
  },
  {
    visaType: "Reagrupamento Familiar",
    icon: Users,
    documents: [
      "Passaporte valido (minimo 6 meses de validade)",
      "2 fotografias tipo passe recentes",
      "Formulario de pedido de visto preenchido e assinado",
      "Certidao de nascimento ou casamento (conforme aplicavel)",
      "Comprovativo de residencia legal do familiar em Portugal",
      "Comprovativo de meios de subsistencia do reagrupante",
      "Comprovativo de alojamento adequado",
      "Registo criminal do pais de origem",
      "Atestado medico",
      "Autorizacao de residencia do familiar em Portugal (copia)",
    ],
  },
]

export default function DocumentosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            Documentos Necessarios
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
            Consulte a lista de documentos necessarios para cada tipo de visto.
            Apresente todos os documentos originais e respetivas copias.
          </p>

          <div className="mt-10 grid gap-6">
            {docSections.map((section) => (
              <Card key={section.visaType} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-card-foreground">
                      Visto de {section.visaType}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {section.documents.map((doc) => (
                      <li key={doc} className="flex items-start gap-2">
                        <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {doc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-accent/30 bg-accent/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-card-foreground">
                Informacoes Importantes
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  - Todos os documentos devem ser apresentados em original e copia.
                </li>
                <li>
                  - Documentos em lingua estrangeira devem ser traduzidos para Portugues
                  por tradutor certificado.
                </li>
                <li>
                  - O prazo de validade do passaporte deve exceder em pelo menos 6 meses a
                  duracao prevista da estadia.
                </li>
                <li>
                  - Apresente-se no local de atendimento 15 minutos antes do horario
                  agendado.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
