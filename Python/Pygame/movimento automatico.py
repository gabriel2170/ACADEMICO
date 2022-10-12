import pygame

pygame.init()
window = pygame.display.set_mode([800, 580])

clock = pygame.time.Clock()

quadX = 200
quadY = 250
speedX = 1
speedY = 1

while True:

  window.fill((255, 255, 255))

  pygame.draw.rect(
    window,
    (0, 0, 255),
    [quadX, quadY, 100, 100]
  )
  
  quadX += speedX
  quadY += speedY

  if quadX < 0 or quadX > 700:
    speedX = -speedX

  if quadY < 0 or quadY > 400:
    speedY = -speedY

  pygame.display.update()
  clock.tick(30)
