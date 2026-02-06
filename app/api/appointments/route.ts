import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

function generateAppointmentNumber(): string {
  const prefix = "VC"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      visaType,
      fullName,
      email,
      phone,
      dateOfBirth,
      nationality,
      passportNumber,
      passportExpiry,
      gender,
      maritalStatus,
      address,
      city,
      location,
      appointmentDate,
      appointmentTime,
    } = body

    // Validate only personal data fields (required)
    if (
      !fullName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !nationality ||
      !passportNumber ||
      !passportExpiry ||
      !gender ||
      !maritalStatus ||
      !address ||
      !city
    ) {
      return NextResponse.json(
        { error: "Todos os campos de dados pessoais sao obrigatorios." },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const appointmentNumber = generateAppointmentNumber()

    let slotId: string | null = null

    // Only check and book a slot if location, date and time are provided
    if (location && appointmentDate && appointmentTime) {
      const { data: slot } = await supabase
        .from("time_slots")
        .select("id, is_booked, is_blocked")
        .eq("location", location)
        .eq("slot_date", appointmentDate)
        .eq("slot_time", appointmentTime)
        .single()

      if (!slot) {
        return NextResponse.json(
          { error: "Time slot not found" },
          { status: 404 }
        )
      }

      if (slot.is_booked || slot.is_blocked) {
        return NextResponse.json(
          { error: "This time slot is no longer available" },
          { status: 409 }
        )
      }

      // Mark slot as booked
      await supabase
        .from("time_slots")
        .update({ is_booked: true })
        .eq("id", slot.id)

      slotId = slot.id
    }

    // Create appointment
    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        appointment_number: appointmentNumber,
        visa_type: visaType || null,
        full_name: fullName,
        email,
        phone,
        date_of_birth: dateOfBirth,
        nationality,
        passport_number: passportNumber,
        passport_expiry: passportExpiry,
        gender,
        marital_status: maritalStatus,
        address,
        city,
        location: location || null,
        appointment_date: appointmentDate || null,
        appointment_time: appointmentTime || null,
        payment_status: "pending",
        amount: 80,
      })
      .select()
      .single()

    if (error) {
      // If appointment creation fails, unbook the slot
      if (slotId) {
        await supabase
          .from("time_slots")
          .update({ is_booked: false })
          .eq("id", slotId)
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ appointment })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
