import React, { useState, useEffect } from 'react'

function Timer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime))

  function calculateTimeLeft(targetTime) {
    // Convierte el timestamp de Firebase a milisegundos
    const endTimeInMs = targetTime.seconds * 1000 + targetTime.nanoseconds / 1000000
    const difference = endTimeInMs - Date.now()
    return Math.max(0, Math.floor(difference / 1000)) // Devuelve tiempo restante en segundos
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime)) // Calcula tiempo restante en cada tick
    }, 1000)

    return () => clearInterval(timer) // Limpia el intervalo al desmontar el componente
  }, [endTime])

  function formatTime(time) {
    const days = Math.floor(time / (3600 * 24))
    const hours = Math.floor((time % (3600 * 24)) / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    const parts = []
    if (days > 0) parts.push(`${days}d`)
    if (hours > 0 || days > 0) parts.push(`${hours.toString().padStart(2, '0')}h`)
    parts.push(`${minutes.toString().padStart(2, '0')}m`)
    parts.push(`${seconds.toString().padStart(2, '0')}s`)

    return parts.join(' ')
  }

  if (timeLeft <= 0) {
    return <div className="text-sm text-red-600 font-bold">¡Tiempo agotado!</div>
  }

  return (
    <div className="text-sm text-gray-600">
      Tiempo restante: {formatTime(timeLeft)}
    </div>
  )
}

export default Timer
