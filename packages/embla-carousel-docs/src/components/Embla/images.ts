import image1 from 'assets/images/slide-1.jpg'
import image2 from 'assets/images/slide-2.jpg'
import image3 from 'assets/images/slide-3.jpg'
import image4 from 'assets/images/slide-4.jpg'

type Image = {
  src: string
  alt: string
}

export const images: Image[] = [
  {
    src: image1,
    alt: `A photograph of a person walking his or her dog on the beach.`,
  },
  {
    src: image2,
    alt: `A photograph of a branch with leaves.`,
  },
  {
    src: image3,
    alt: `A photograph of a person walking his or her dog on the beach.`,
  },
  {
    src: image4,
    alt: `A photograph of a branch with rain soaked leaves.`,
  },
]

export const imageByIndex = (index: number): Image =>
  images[index % images.length]
