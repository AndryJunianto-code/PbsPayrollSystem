const getCurrency = (amount) => {
    return amount?.toLocaleString().replace(/,/g, '.');;
  }
  
export default getCurrency;