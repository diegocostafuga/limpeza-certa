'use client'

import { useState } from 'react'
import { DilutionCalculator } from './dilution-calculator'
import { SavedDilutions } from './saved-dilutions'
import { SavedDilutionsPreview } from './saved-dilutions-preview'

interface CalculatorSectionProps {
  isLoggedIn: boolean
}

export function CalculatorSection({ isLoggedIn }: CalculatorSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <>
      <DilutionCalculator isLoggedIn={isLoggedIn} onSave={() => setRefreshKey((k) => k + 1)} />
      <div className="mt-10">
        {isLoggedIn ? <SavedDilutions refreshKey={refreshKey} /> : <SavedDilutionsPreview />}
      </div>
    </>
  )
}
