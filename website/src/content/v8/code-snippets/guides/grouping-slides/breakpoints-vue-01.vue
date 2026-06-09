<script setup>
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef] = useEmblaCarousel({
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 768px)': { slidesToScroll: 'auto' }
  }
})
</script>
