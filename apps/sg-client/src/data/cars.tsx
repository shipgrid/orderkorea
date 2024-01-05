type ICAR_MAKES = string[]

interface ICAR_MODELS {
  [make: string]: string[]
}

const CAR_MAKES: ICAR_MAKES = [
  'BMW', 
  'Audi', 
  'Mercedes-Benz'
]

const CAR_MODELS: ICAR_MODELS = {
  BMW: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', 'X Series', 'M Series', 'i Series'],
  Audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7'],
  "Mercedes-Benz": ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'G-Class', 'GLA', 'GLC', 'GLE', 'GLS']
}

export {
  CAR_MAKES,
  CAR_MODELS
}
