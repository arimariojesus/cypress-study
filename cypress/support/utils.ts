export const format = (value: string) => {
  const number = value.split('$')[1].trim()
  const formattedValue = number.replace('.', '').replace(',', '.')

  return value.includes('-') ? -Number(formattedValue) : Number(formattedValue)
}

export const randomNumber = () => {
  return Math.floor(Math.random() * 101)
}

export const items = [
  {
    id: 1,
    title: "Mesada",
    amount: (randomNumber() * 100),
    type: "deposit",
    category: "Fixo",
    createdAt: new Date(),
  }, {
    id: 2,
    title: "Pizza",
    amount: (randomNumber() * 100),
    category: "Comida",
    type: "withdraw",
    createdAt: new Date(),
  }
]

export const prepareLocalStorage = (win: Window & typeof globalThis) => {

  win.localStorage.setItem('@app:transactions', JSON.stringify(items)
  )

  return items
}

export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(date)
  );
}