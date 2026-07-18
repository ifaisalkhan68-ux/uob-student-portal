// Generates a stamped reference ID like UOB-QRY-4821
export function generateTrackingId() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `UOB-QRY-${num}`
}

// Builds a wa.me deep link with a pre-filled, structured message
export function buildWhatsAppLink({ phone, trackingId, name, rollNumber, department, message }) {
  const text =
    `New Student Query — ${trackingId}\n` +
    `Department: ${department}\n` +
    `Name: ${name}\n` +
    `Roll No: ${rollNumber || 'N/A'}\n` +
    `Message: ${message}`

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
