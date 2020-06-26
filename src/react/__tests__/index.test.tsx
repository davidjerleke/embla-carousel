import React from 'react'
import { mount, configure } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { useEmblaCarousel } from '../'

configure({ adapter: new EnzymeAdapter() })

describe('Embla Carousel Hook', () => {
  const EmblaCarouselHook = () => {
    const [EmblaCarousel] = useEmblaCarousel()
    return (
      <EmblaCarousel>
        <ul>
          <li />
          <li />
          <li />
        </ul>
      </EmblaCarousel>
    )
  }

  test('Renders children', () => {
    const embla = mount(<EmblaCarouselHook />)
    expect(embla.find('ul').length).toBe(1)
    expect(embla.find('li').length).toBe(3)
  })
})
