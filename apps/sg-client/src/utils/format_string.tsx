const formatNumberWithCommas = (num: number | string) => {

  if (typeof num === 'string') {
    num = parseInt(num);
  }
  
  return num.toLocaleString();
}

export {
  formatNumberWithCommas
}
