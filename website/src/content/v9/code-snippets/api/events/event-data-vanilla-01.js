emblaApi.on('pointerdown', (api, event) => {
  console.log('Event name:', event.type)
  console.log('Event specific data:', event.detail)
})
