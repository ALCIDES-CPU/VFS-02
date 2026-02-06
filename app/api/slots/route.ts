import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")
  const date = searchParams.get("date")

  if (!location || !date) {
    return NextResponse.json(
      { error: "Location and date are required" },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  // Check if the date is blocked
  const { data: blockedDate } = await supabase
    .from("blocked_dates")
    .select("id")
    .eq("location", location)
    .eq("blocked_date", date)
    .single()

  if (blockedDate) {
    return NextResponse.json({ slots: [], blocked: true })
  }

  // Get available slots
  const { data: slots, error } = await supabase
    .from("time_slots")
    .select("id, slot_time, is_booked, is_blocked")
    .eq("location", location)
    .eq("slot_date", date)
    .eq("is_blocked", false)
    .eq("is_booked", false)
    .order("slot_time", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ slots: slots || [], blocked: false })
}
