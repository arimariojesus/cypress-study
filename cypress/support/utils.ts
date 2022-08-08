export const format = (value: string) => {
  const number = value.split('$')[1].trim()
  const formattedValue = number.replace('.', '').replace(',', '.')

  return Number(formattedValue)
}

export const randomNumber = () => {
  return Math.floor(Math.random() * 101)
}


export const prepareLocalStorage = (win: Window & typeof globalThis) => {

  win.localStorage.setItem('@app:transactions', JSON.stringify([
      {
        type: "Mesada",
        amount: randomNumber() * 100,
        category: "Fixo"
      },
      {
        type: 'Suco Kapo',
        amount: - (randomNumber() * 100),
        category: "Lanche"
      }
    ])
  )

}