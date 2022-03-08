import pygame
import random
import sys

pygame.init()
window = pygame.display.set_mode([800, 580])

spaceship = pygame.image.load('spaceship.png')

imgX = 100
imgY = 420
quadX = 100
quadY = 100
speedX = 0
speedY = 0

clock = pygame.time.Clock()

while True:

  for event in pygame.event.get():
    if event.type == pygame.KEYDOWN:
      if event.key == pygame.K_LEFT:
        speedX = -1
      if event.key == pygame.K_RIGHT:
        speedX = 1
      
    if event.type == pygame.KEYUP:
      if (event.key == pygame.K_LEFT
      or event.key == pygame.K_RIGHT):
        speedX = 0
        speedY = 0


  window.fill((255, 255, 255))
  window.blit(spaceship, [imgX, imgY])

  pygame.draw.rect(
    window,
    (0, 0, 0),
    [quadX, quadY, 100,100]
  )

  imgX += speedX
  quadY += 1

  if 400 < quadY + 100 and 500 > quadY:
    if imgX < quadX + 100 and imgX + 100 > quadX:
      sys.exit()
  
  if quadY > 580:
    quadY = 0
    quadX = random.randrange(0, 480)

  pygame.display.update()
  clock.tick(60)
