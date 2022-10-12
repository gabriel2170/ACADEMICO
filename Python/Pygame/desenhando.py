import pygame

pygame.init()
window = pygame.display.set_mode([800, 580])

while True:

  window.fill((0, 255, 255))

  pygame.draw.rect(
    window,
    (0, 255, 0),
    [100, 50, 100, 200]
  )

  pygame.draw.circle(
    window,
    (255, 0, 255),
    [500, 400],
    100
  )

  pygame.draw.ellipse(
    window,
    (255, 255, 0),
    [300, 20, 300 , 200]
  )

  pygame.draw.polygon(
    window,
    (255, 0, 0),
    ((100 , 300),(300, 300), (300, 500))
  )

  pygame.display.update()
