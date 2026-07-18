// Central place to configure department routing.
// Edit the WhatsApp numbers to the real department contacts.
// Format: country code + number, no spaces, no +, no leading 0
// e.g. Pakistan mobile 03xx-xxxxxxx becomes 923xxxxxxxxx

export const departments = [
  {
    id: 'academics',
    label: 'Academics / Examinations',
    whatsapp: '923000000001'
  },
  {
    id: 'admin',
    label: 'Administration',
    whatsapp: '923000000002'
  },
  {
    id: 'finance',
    label: 'Finance / Fee Office',
    whatsapp: '923000000003'
  },
  {
    id: 'hostel',
    label: 'Hostel / Transport',
    whatsapp: '923000000004'
  },
  {
    id: 'it',
    label: 'IT / Portal Support',
    whatsapp: '923000000005'
  }
]

export const university = {
  name: 'University of Buner',
  shortName: 'UOB',
  city: 'Buner, Khyber Pakhtunkhwa'
}
