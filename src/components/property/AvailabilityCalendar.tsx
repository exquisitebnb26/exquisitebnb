import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  /** Dates that are unavailable / booked */
  bookedDates?: Date[];
}

export function AvailabilityCalendar({ bookedDates = [] }: AvailabilityCalendarProps) {
  const [month, setMonth] = useState(new Date());

  const isBooked = (date: Date) => {
    if (!Array.isArray(bookedDates)) return false;

    return bookedDates.some((d) => {
      if (!(d instanceof Date)) return false;

      return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      );
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream text-center">
        Availability
      </h3>
      <div className="luxury-divider" />

      <Calendar
        mode="single"
        month={month}
        onMonthChange={setMonth}
        disabled={(date) => date < new Date() || isBooked(date)}
        className={cn("p-3 pointer-events-auto w-full")}
        classNames={{
          months: "flex flex-col space-y-4",
          month: "space-y-4 w-full",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label:
            "text-sm font-medium text-[hsl(var(--forest-dark))] dark:text-cream",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 inline-flex items-center justify-center rounded-sm border transition-colors",
            "bg-emerald-900 text-white border-emerald-900 hover:bg-emerald-900",
            "dark:bg-transparent dark:border-gold/30 dark:text-gold dark:hover:bg-gold/10"
          ),
          nav_button_previous:
            "absolute left-1 ",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "rounded-md w-9 font-normal text-[0.8rem] text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: cn(
            "h-9 w-9 p-0 font-normal inline-flex items-center justify-center rounded-sm transition-colors",
            "text-[hsl(var(--forest-dark))] hover:bg-emerald-800 hover:text-emerald-100 data-[state=open]:bg-emerald-800 data-[state=open]:text-emerald-100",
            "dark:text-cream dark:hover:bg-gold/10",
            "aria-selected:opacity-100",
          ),
          day_selected:
            "bg-[hsl(var(--forest-dark))] text-cream hover:bg-[hsl(var(--forest-dark))] dark:bg-gold dark:text-charcoal dark:hover:bg-gold",
          day_today:
            "ring-1 ring-[hsl(var(--forest-dark))]/40 dark:ring-gold/40 font-semibold",
          day_outside: "opacity-30",
          day_disabled:
            "line-through opacity-35 text-[hsl(var(--forest-dark))]/40 dark:text-cream-muted/40",
          day_hidden: "invisible",
        }}
      />

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[hsl(var(--forest-dark))] dark:bg-gold/100 border border-[hsl(var(--forest-dark))]/20 dark:border-gold/20" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[hsl(var(--forest-dark))]/5 dark:bg-cream/5 line-through opacity-50" />
          Booked
        </span>
      </div>

      <p className="text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted text-xs text-center">
        For exact availability, check the booking platform.
      </p>
    </div>
  );
}
