import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingForm } from "@/components/booking-form"

export default function AgendarPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            Agendar Visto
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Preencha todos os campos para agendar o seu atendimento
          </p>
          <BookingForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
