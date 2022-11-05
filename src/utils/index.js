const cryptocurrencies = [
  { name: 'Bitcoin', value: 'bitcoin' },
  { name: 'Dacxi', value: 'dacxi' },
  { name: 'Ethereum', value: 'ethereum' },
  { name: 'Athom', value: 'cosmos' },
  { name: 'Luna', value: 'terra-luna' }
]

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

  return `${day <= 9 ? '0' + day : day}/${month <= 9 ? '0' + month : month}/${year}, ${time}`;
}

export {
  cryptocurrencies,
  format
}