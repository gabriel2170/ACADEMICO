from skimage import io
import numpy as np 
import matplotlib.pyplot as plt


image = io.imread('image.png')

print(image)

plt.imshow(image)

image[1][0] = [0,255,255]
image[1][1] = [0,255,255]
image[0][0] = [0,255,255]
image[0][1] = [0,255,255]

image2 = image

plt.imshow(image2)
