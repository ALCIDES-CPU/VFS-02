"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

type Slot = {
  id: string
  slot_time: string
  is_booked: boolean
  is_blocked: boolean
}

type SlotPickerProps = {
  location: string
  selectedDate: string
  selectedTime: string
  onSelectDate: (date: string) => void
  onSelectTime: (time: string) => void
}

function getWeekDays(startDate: Date): Date[] {
  const days: Date[] = []
  const current = new Date(startDate)
  // Start from Monday of the current week
  const day = current.getDay()
  const diff = day === 0 ? -6 : 1 - day
  current.setDate(current.getDate() + diff)
  for (let i = 0; i < 5; i++) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return days
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

const WEEKDAY_NAMES = ["Seg", "Ter", "Qua", "Qui", "Sex"]
const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function SlotPicker({
  location,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: SlotPickerProps) {
  const [weekStart, setWeekStart] = useState(() => {
    const now = new Date()
    // Move to next day at minimum
    now.setDate(now.getDate() + 1)
    return now
  })
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const weekDays = getWeekDays(weekStart)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const fetchSlots = useCallback(
    async (date: string) => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/slots?location=${encodeURIComponent(location)}&date=${date}`
        )
        const data = await res.json()
        setSlots(data.slots || [])
        setBlocked(data.blocked || false)
      } catch {
        setSlots([])
      } finally {
        setLoading(false)
      }
    },
    [location]
  )

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate)
    }
  }, [selectedDate, fetchSlots])

  function prevWeek() {
    const prev = new Date(weekStart)
    prev.setDate(prev.getDate() - 7)
    // Don't go before today
    const todayCheck = new Date()
    todayCheck.setHours(0, 0, 0, 0)
    if (prev >= todayCheck) {
      setWeekStart(prev)
    }
  }

  function nextWeek() {
    const next = new Date(weekStart)
    next.setDate(next.getDate() + 7)
    setWeekStart(next)
  }

  const currentMonth = weekDays[2]
    ? `${MONTH_NAMES[weekDays[2].getMonth()]} ${weekDays[2].getFullYear()}`
    : ""

  return (
    <div>
      {/* Week navigation */}
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={prevWeek} type="button">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-semibold text-foreground">{currentMonth}</span>
        <Button variant="outline" size="sm" onClick={nextWeek} type="button">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day buttons */}
      <div className="grid grid-cols-5 gap-2">
        {weekDays.map((day, i) => {
          const dateStr = formatDate(day)
          const isPast = day <= today
          const isSelected = selectedDate === dateStr
          return (
            <button
              key={dateStr}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(dateStr)}
              className={`flex flex-col items-center rounded-lg border p-3 text-center transition-colors ${
                isPast
                  ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground opacity-50"
                  : isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-xs font-medium text-muted-foreground">
                {WEEKDAY_NAMES[i]}
              </span>
              <span className="mt-1 text-lg font-bold">{day.getDate()}</span>
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Horarios Disponiveis
          </h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : blocked ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Esta data esta bloqueada. Selecione outra data.
            </p>
          ) : slots.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Nao ha horarios disponiveis para esta data.
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSelectTime(slot.slot_time)}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    selectedTime === slot.slot_time
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary/40"
                  }`}
                >
                  {slot.slot_time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
