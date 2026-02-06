import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { appointmentNumber } = await request.json()

    if (!appointmentNumber) {
      return NextResponse.json(
        { error: "Appointment number is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("appointments")
      .update({
        payment_status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("appointment_number", appointmentNumber)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
