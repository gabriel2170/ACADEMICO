import pygame

pygame.init()
window = pygame.display.set_mode([800, 580])

 quadX = 200
 quadY = 250
  
while True:

  window.fill((255, 255, 255))
  
  pygame.draw.rect(
    window,
    (0, 0, 255),
    [quadX, quadY, 100, 100]
  )
  

  pygame.display.update()
