export type OptionsType = {
  delay: number
  stopOnInteraction: boolean
  stopOnMouseEnter: boolean
  stopOnLastSnap: boolean
}

export const defaultOptions: OptionsType = {
  delay: 4000,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
  stopOnLastSnap: false,
}

export type AutoplayOptionsType = Partial<OptionsType>
