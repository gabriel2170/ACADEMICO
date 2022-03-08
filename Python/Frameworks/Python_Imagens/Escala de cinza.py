from skimage import io
import numpy as np 
import matplotlib.pyplot as plt


image = io.imread('image.png')

#Decomposicao

imageRed = []

for pixel in image:
    lineRed = []

    for r,g,b in pixel:
        lineRed.append(r)
    imageRed.append(lineRed)

plt.imshow(imageRed , cmap="gray")

#combinacao

imageGray = []

for pixel in image:
    lineGray = []
    for r,g,b in pixel:
        media = int(int(r) + int(g) + int(b) / 3)
        
        lineGray.append(media)
    imageGray.append(lineGray)

plt.imshow(imageGray, cmap="gray")

#combinacao linear

imageGray = []

for pixel in image:
    lineGray = []
    for r,g,b in pixel:
        media = int(0.3 * r + 0.59 * g + 0.11 * b)
        
        lineGray.append(media)
    imageGray.append(lineGray)

plt.imshow(imageGray, cmap="gray")

#binarizacao

imageBin = []

for pixel in image:
    lineBin = []
    for b in pixel:

        if b.all() > 160:
            lineBin.append(255)
        else:
            lineBin.append(0)
    imageBin.append(lineBin)

plt.imshow(imageBin, cmap="gray")
