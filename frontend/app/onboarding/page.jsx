"use client"

import { useState } from "react"
import AreasOfInterestSelector from "./components/AreasOfInterestSelector"
import Domain from "./components/Domain"
import SkillLevel from "./components/SkillLevel"

function Page() {

  const [step, setStep] = useState(1)
  return (
      <div>
      {step === 1 && <Domain onNext={()=>setStep(2)} />}
      {step === 2 && <AreasOfInterestSelector onNext={()=>setStep(3)} onBack={()=>setStep(1)} />}
      {step === 3 && <SkillLevel />}
      </div>
  )
}

export default Page
