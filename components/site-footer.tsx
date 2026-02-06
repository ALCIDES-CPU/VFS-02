"use client"

import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/vfs-logo.png"
                alt="VFS Global"
                width={130}
                height={32}
                className="h-7 w-auto"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Plataforma de agendamento de visto de Cabo Verde para Portugal.
              Servico rapido, seguro e profissional.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Links Rapidos
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/agendar"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Agendar Visto
              </Link>
              <Link
                href="/documentos"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Documentos Necessarios
              </Link>
              <Link
                href="/contactos"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contactos
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Contacto</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>info@vfsglobal.com</p>
              <p>+238 000 0000</p>
              <p>Praia, Cabo Verde</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          {new Date().getFullYear()} VFS Global. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
