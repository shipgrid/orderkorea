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
  BMW: [
    '1 Series', '2 Series', '3 Series', 
    '4 Series', '5 Series', '6 Series', 
    '7 Series', '8 Series', 'X1', 
    'X2', 'X3', 'X4',
    'X5', 'X6', 'X7',
    'Z4', 'M2', 'M3',
    'M4', 'M5', 'M6',
    'M8', 'i3', 'i8',
    'iX', 'i4', 'i3'
  ],
  Audi: [
    'A1', 'A3', 'A4', 
    'A5', 'A6', 'A7', 
    'A8', 'Q3', 'Q5', 
    'Q7', 'Q8', 'S4', 
    'S5','S6', 'S7', 
    'S8', 'RS3', 'RS4', 
    'RS5', 'RS6', 'RS7', 
    'RSQ8', 'TT', 'R8'
  ],
  "Mercedes-Benz": [
    'A-Class', 'B-Class', 'C-Class', 
    'CLA', 'CLS', 'GLA',
    'GLB', 'GLC', 'GLE',
    'GLS', 'S-Class', 'SLC',
    'SL', 'AMG GT', 'E-Class',
    'G-Class', 'Sprinter', 'V-Class'
  ]
}

export {
  CAR_MAKES,
  CAR_MODELS
}
