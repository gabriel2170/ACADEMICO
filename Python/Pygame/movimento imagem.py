import pygame

pygame.init()
window = pygame.display.set_mode([800, 580])

spaceship = pygame.image.load('spaceship.png')

imgX = 100
imgY = 150
speedX = 1
speedY = 1

clock = pygame.time.Clock()

while True:

  window.fill((255, 255, 255))

  window.blit(spaceship, [imgX, imgY])

  imgX += speedX
  imgY += speedY

  if imgX < 0 or imgX > 700:
    speedX = -speedX 

  if imgY < 0 or imgY > 450:
    speedY = -speedY 

  pygame.display.update()
  clock.tick(60)
