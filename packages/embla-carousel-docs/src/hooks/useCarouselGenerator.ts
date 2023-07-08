import { useContext } from 'react'
import {
  CarouselGeneratorContext,
  CarouselGeneratorContextType
} from 'components/CarouselGenerator/CarouselGeneratorContext'

export const useCarouselGenerator = (): CarouselGeneratorContextType =>
  useContext(CarouselGeneratorContext)
