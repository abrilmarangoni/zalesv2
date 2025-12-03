"use client"

export function SectionDivider() {
  return (
    <div className="relative w-full h-px">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent transition-all ease-in-out shadow-[0_0_15px_rgba(181,126,220,0.8),0_0_30px_rgba(181,126,220,0.4)]"></div>
    </div>
  )
}

