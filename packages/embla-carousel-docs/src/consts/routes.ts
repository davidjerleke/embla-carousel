import { SPACINGS } from 'consts/spacings'

export const ROUTES_LOADING_BAR_HEIGHT = SPACINGS.CUSTOM(({ ONE }) => ONE / 2)

export type RouteType = {
  id: string
  slug: string
  title: string
  description: string
  level: number
  order: number
  children: RouteType[]
}
