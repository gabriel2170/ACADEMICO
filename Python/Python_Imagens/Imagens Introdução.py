from PIL import Image
import numpy as np


image = Image.open('image.png')

data = np.asarray(image)


print(data)
print("\n\n")

print(image.size)
print(image.format)
print(image.mode + "\n")



for pixel in data:
  for r,g,b in pixel:

    print(f"{r} / {g} / {b}")
    print("----------------")
