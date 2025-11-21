import React from 'react'
import { Button } from "@/components/ui/button"

function App(): React.ReactElement {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Weather App</h1>
        <Button>Click me</Button>
      </div>
    </div>
  )
}

export default App
