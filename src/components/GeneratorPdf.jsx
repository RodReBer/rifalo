import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CheckCircle } from "lucide-react"

// Registrar la fuente
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
})

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2 solid #4F46E5",
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    color: "#4F46E5",
  },
  content: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    width: 120,
  },
  value: {
    fontSize: 14,
    color: "#111827",
  },
  footer: {
    marginTop: 30,
    borderTop: "2 solid #E5E7EB",
    paddingTop: 10,
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    borderRadius: 9999,
    padding: 5,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  verifiedText: {
    color: "#065F46",
    fontSize: 12,
    marginLeft: 5,
  },
})

// Componente del PDF
const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.title}>Verificaci&oacute;n de Rifa</Text>
      </View>

      <View style={styles.verifiedBadge}>
        <Image style={styles.icon} src="/icons/check-circle.png" />
        <Text style={styles.verifiedText}>Verificado</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Image style={styles.icon} src="/icons/user.png" />
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{data.nombre}</Text>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} src="/icons/credit-card.png" />
          <Text style={styles.label}>Cédula:</Text>
          <Text style={styles.value}>{data.cedula}</Text>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} src="/icons/mail.png" />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} src="/icons/ticket.png" />
          <Text style={styles.label}>Número de Rifa:</Text>
          <Text style={styles.value}>{data.numeroRifa}</Text>
        </View>
        <View style={styles.row}>
          <Image style={styles.icon} src="/icons/calendar.png" />
          <Text style={styles.label}>Fecha y Hora:</Text>
          <Text style={styles.value}>
            {format(new Date(), "d 'de' MMMM 'de' yyyy 'a las' HH:mm:ss", { locale: es })}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Este documento certifica la compra de la rifa con los datos proporcionados.</Text>
        <Text>Para cualquier consulta, por favor contacte a nuestro servicio de atención al cliente.</Text>
      </View>
    </Page>
  </Document>
)

const RifaVerificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [formData, setFormData] = useState(null)

  const onSubmit = (data) => {
    setFormData(data)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Formulario de Verificaci&oacute;n de Rifa</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            {...register("nombre", { required: "Este campo es requerido" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
        </div>
        <div>
          <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
            Cédula de Identidad
          </label>
          <input
            type="text"
            id="cedula"
            {...register("cedula", {
              required: "Este campo es requerido",
              pattern: { value: /^\d{1,3}\.\d{3}\.\d{3}-\d$/, message: "Formato inválido. Ej: 1.234.567-8" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.cedula && <span className="text-red-500 text-sm">{errors.cedula.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Este campo es requerido",
              pattern: { value: /^\S+@\S+$/i, message: "Correo electrónico inválido" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="numeroRifa" className="block text-sm font-medium text-gray-700">
            Número de Rifa
          </label>
          <input
            type="number"
            id="numeroRifa"
            {...register("numeroRifa", {
              required: "Este campo es requerido",
              min: { value: 1, message: "El número debe ser mayor a 0" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.numeroRifa && <span className="text-red-500 text-sm">{errors.numeroRifa.message}</span>}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generar Verificación PDF
        </button>
      </form>

      {formData && (
        <div className="mt-8">
          <PDFDownloadLink document={<PDFDocument data={formData} />} fileName="verificacion-rifa.pdf">
            {({ blob, url, loading, error }) => (
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {loading ? "Generando documento..." : "Descargar Comprobante PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  )
}

export default RifaVerificationForm

