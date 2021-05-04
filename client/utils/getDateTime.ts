const getDateTime = (value: Date) => {
  const date = value.toLocaleDateString()
  const time = value.toLocaleTimeString().slice(0, -3)
  return `${date} ${time}`
}

export default getDateTime