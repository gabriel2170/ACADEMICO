import pygame

pygame.init()
window = pygame.display.set_mode([800, 580])

spaceship = pygame.image.load('spaceship.png')

spaceship = pygame.transform.flip(
  spaceship, False, True
)

spaceship = pygame.transform.scale(
  spaceship, [250, 150]
)

spaceship = pygame.transform.rotate(
  spaceship, 90
)

clock = pygame.time.Clock()

while True:

  window.fill((255, 255, 255))

  window.blit(spaceship, [100, 150])

  pygame.display.update()
  clock.tick(60)
