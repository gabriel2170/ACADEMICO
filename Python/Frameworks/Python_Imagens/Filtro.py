from skimage import io
import numpy as np 
import matplotlib.pyplot as plt


#image = io.imread('image.png')

image = [[2,4,6,5],
         [8,7,5,6],
         [5,5,2,3],
         [4,6,3,3]]



R = 1
M = len(image) - R
N = len(image[0]) - R



#Filtro de Media

imageFiltro = []

for i in range(R, M):
    newLine = []
    for j in range(R, N):
        filtro = []
        for x in range(i-R, i+R+1):
            for y in range(j-R, j+R+1):
                filtro.append(image[x][y])
        media = int(round(np.mean(filtro)))
        newLine.append(media)
    imageFiltro.append(newLine)

plt.imshow(image, cmap="gray")



#Filtro de Mediana

imageFiltro = []

for i in range(R, M):
    newLine = []
    for j in range(R, N):
        filtro = []
        for x in range(i-R, i+R+1):
            for y in range(j-R, j+R+1):
                filtro.append(image[x][y])
        mediana = int(round(np.median(filtro)))
        newLine.append(mediana)
    imageFiltro.append(newLine)

plt.imshow(image, cmap="gray")
