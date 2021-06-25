export function getStringValuesFromEnum<T>(enumData: T, value: string): string {
  try {
    return Object.entries(enumData).filter((item) => {
      return item[1] === value
    })[0][0]
  } catch (e) {
    return ''
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enumToArray = (enumData: any): any[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys(enumData).map((option: string): any => {
    const label = enumData[option as keyof typeof enumData] as string
    return { value: option as typeof enumData, text: label }
  })
}
