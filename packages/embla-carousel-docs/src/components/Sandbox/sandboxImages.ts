import image1 from 'assets/images/slide-1.jpg'
import image2 from 'assets/images/slide-2.jpg'
import image3 from 'assets/images/slide-3.jpg'
import image4 from 'assets/images/slide-4.jpg'
import image5 from 'assets/images/slide-5.jpg'

const sandboxImageList: string[] = [image1, image2, image3, image4, image5]

export const sandboxImages = (index: number): string =>
  sandboxImageList[index % sandboxImageList.length]
