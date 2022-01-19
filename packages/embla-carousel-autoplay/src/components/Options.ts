export type OptionsType = {
  delay: number
  playOnInit: boolean
  stopOnInteraction: boolean
  stopOnMouseEnter: boolean
  stopOnLastSnap: boolean
}

export const defaultOptions: OptionsType = {
  delay: 4000,
  playOnInit: true,
  stopOnInteraction: true,
  stopOnMouseEnter: false,
  stopOnLastSnap: false,
}

export type AutoplayOptionsType = Partial<OptionsType>
