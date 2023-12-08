const convertToLocalDateString = (date: Date) => {
  return date.toISOString().replace('Z','').replace('T', ' ')
}

export {
  convertToLocalDateString
}