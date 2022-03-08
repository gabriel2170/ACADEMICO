import pygame

pygame.init()
window = pygame.display.set_mode([800, 580])

spaceship = pygame.image.load('spaceship.png')
clock = pygame.time.Clock()

while True:

  window.fill((255, 255, 255))

  window.blit(spaceship, [250, 400])

  pygame.display.update()
  clock.tick(60)
