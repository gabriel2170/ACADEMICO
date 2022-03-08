pygame.init()
window = pygame.display.set_mode([800, 580])

font = pygame.font.Font('comicate.ttf', 21)
text = font.render('UNIFRAN', True)
clock = pygame.time.Clock()

while True:

  
  window.fill((255, 255, 255))
  window.blit(text, [350,350])


  pygame.display.update()
  clock.tick(60)
