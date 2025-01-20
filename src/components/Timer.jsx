import React, { useState, useEffect } from 'react'

const Timer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime))
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  function calculateTimeLeft(targetTime) {
    const endTimeInMs = targetTime.seconds * 1000 + targetTime.nanoseconds / 1000000
    const difference = endTimeInMs - Date.now()
    return Math.max(0, Math.floor(difference / 1000)) // Retorna el tiempo restante en segundos
  }

  // Formatear tiempo restante en días, horas, minutos y segundos
  const days = Math.floor(timeLeft / (60 * 60 * 24))
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60)
  const seconds = timeLeft % 60

  // Función para generar el tiempo con singular/plural adecuado
  const formatTime = (value, singular, plural) => {
    if (value === 1) {
      return `${value} ${singular}`
    } else if (value > 1) {
      return `${value} ${plural}`
    }
    return ''
  }

  // Crear el string del tiempo restante
  let timeStrings = []
  if (days > 0) timeStrings.push(formatTime(days, 'día', 'días'))
  if (hours > 0) timeStrings.push(formatTime(hours, 'hora', 'horas'))
  if (minutes > 0) timeStrings.push(formatTime(minutes, 'minuto', 'minutos'))
  if (seconds > 0) timeStrings.push(formatTime(seconds, 'segundo', 'segundos'))

  // Decidir si usar "falta" o "faltan" al principio
  let timeString = ''
  if (timeStrings.length > 0) {
    const firstUnit = timeStrings[0]
    const plural = firstUnit.includes('s') ? 'Faltan' : 'Falta'
    timeString = `${plural} ${timeStrings.join(', ')}`
  } else {
    timeString = 'Tiempo finalizado'
  }

  // Verificar si el tiempo restante es de una semana o menos
  const isLessThanWeek = days <= 7

  return (
    <div>
      <p className={`text-gray-600 ${isLessThanWeek ? 'text-red-600 font-semibold' : ''}`}>
        {timeString}
      </p>
    </div>
  )
}

export default Timer
