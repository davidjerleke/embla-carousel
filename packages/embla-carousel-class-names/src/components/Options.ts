export type OptionsType = {
  selected: string
  draggable: string
  dragging: string
}

export const defaultOptions: OptionsType = {
  selected: 'is-selected',
  draggable: 'is-draggable',
  dragging: 'is-dragging',
}

export type ClassNamesOptionsType = Partial<OptionsType>
