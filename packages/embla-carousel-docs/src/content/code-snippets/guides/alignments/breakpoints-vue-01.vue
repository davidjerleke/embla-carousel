<script setup>
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef] = useEmblaCarousel({
  align: 'center',
  breakpoints: {
    '(min-width: 768px)': { align: 'start' }
  }
})
</script>
