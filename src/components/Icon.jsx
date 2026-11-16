import { AppWindow, Server, Code, Wrench, Sparkles, ShieldCheck, CircleCheck, Users, TrendingUp, Target, Compass } from 'lucide-react'

const icons = { AppWindow, Server, Code, Wrench, Sparkles, ShieldCheck, CircleCheck, Users, TrendingUp, Target, Compass }

export default function Icon({ name }) {
  const Cmp = icons[name]
  return (
    <div className="ic">
      <Cmp size={22} strokeWidth={1.7} aria-hidden="true" />
    </div>
  )
}
