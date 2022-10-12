import pygame

pygame.init()
window = pygame.display.set_mode([800, 580])

clock = pygame.time.Clock()

quadX = 200
quadY = 250
speedX = 0
speedY = 0

while True:

  for event in pygame.event.get():

    if event.type == pygame.KEYDOWN:
      if event.key == pygame.K_LEFT:
        speedX = -2

      if event.key == pygame.K_RIGHT:
        speedX = 2

      if event.key == pygame.K_UP:
        speedY = -2

      if event.key == pygame.K_DOWN:
        speedY = 2

    if event.type == pygame.KEYUP:
        if(event.key == pygame.K_LEFT
        or event.key == pygame.K_RIGHT
        or event.key == pygame.K_UP
        or event.key == pygame.K_DOWN):
          speedX = 0
          speedY = 0


  window.fill((255, 255, 255))

  pygame.draw.rect(
    window,
    (0, 0, 255),
    [quadX, quadY, 100, 100]
  )
  
  quadX += speedX
  quadY += speedY

  pygame.display.update()
  clock.tick(30)
