from skimage import io
import numpy as np 
import matplotlib.pyplot as plt


#image = io.imread('image.png')

image = [[2,4,6,5],
         [8,7,5,6],
         [5,5,2,3],
         [4,6,3,3]]


#histograma

histogram = np.zeros(10, dtype=int)

for line in image:
    for p in line:
        histogram[p] += 1

#histograma acumulado

cumulative = np.zeros(10, dtype=int)

for i in range(0,10):
    if i == 0:
        cumulative[i] = histogram[i]
    else:
        cumulative[i] = cumulative[i-1] + histogram[i]


#Equalizacao de histograma

L = 10
M = len(image)
N = len(image[0])

termo = (L - 1) / (M * N)

imageEq = []

for line in image:
    newLine = []
    for p in line:
        newPixel = int(round(termo * cumulative[p]))
        newLine.append(newPixel)
    imageEq.append(newLine)

plt.imshow(imageEq, cmap="gray")
