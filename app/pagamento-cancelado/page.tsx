import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle, RefreshCw, Home } from "lucide-react"

export default function PagamentoCanceladoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-lg">
          <Card className="border-border bg-card">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-card-foreground">
                Pagamento Nao Concluido
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                O pagamento nao foi concluido. O seu agendamento nao foi
                confirmado. Pode tentar novamente ou voltar ao inicio.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild>
                  <Link href="/agendar">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Tentar Novamente
                  </Link>
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
