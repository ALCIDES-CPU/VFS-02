import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const appointmentNumber = searchParams.get("id")

  if (!appointmentNumber) {
    return NextResponse.json(
      { error: "Appointment number is required" },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  const { data: appointment, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("appointment_number", appointmentNumber)
    .single()

  if (error || !appointment) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    )
  }

  // Generate a simple text receipt as downloadable file
  const receipt = `
========================================
        COMPROVATIVO DE AGENDAMENTO
          VFS Global - Cabo Verde
========================================

Numero do Agendamento: ${appointment.appointment_number}
Data de Emissao: ${new Date().toLocaleDateString("pt-PT")}

----------------------------------------
DADOS DO REQUERENTE
----------------------------------------
Nome Completo: ${appointment.full_name}
Email: ${appointment.email}
Telefone: ${appointment.phone}
Nacionalidade: ${appointment.nationality}
Passaporte: ${appointment.passport_number}

----------------------------------------
DETALHES DO AGENDAMENTO
----------------------------------------
Tipo de Visto: ${appointment.visa_type}
Local: ${appointment.location}
Data: ${appointment.appointment_date}
Horario: ${appointment.appointment_time}
Estado do Pagamento: ${appointment.payment_status === "paid" ? "Pago" : "Pendente"}
Valor: ${appointment.amount},00 EUR

----------------------------------------
DOCUMENTOS NECESSARIOS
----------------------------------------
- Passaporte valido (minimo 6 meses)
- 2 fotografias tipo passe
- Formulario de pedido de visto preenchido
- Comprovativo de seguro de viagem
- Comprovativo de meios de subsistencia
- Comprovativo de alojamento

----------------------------------------
INFORMACOES IMPORTANTES
----------------------------------------
- Apresente-se 15 minutos antes do horario
- Traga todos os documentos originais
- Traga copias de todos os documentos

========================================
        VFS Global | info@vfsglobal.com
========================================
`.trim()

  return new NextResponse(receipt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="comprovativo-${appointment.appointment_number}.txt"`,
    },
  })
}
