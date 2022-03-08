from skimage import io
import numpy as np 
import matplotlib.pyplot as plt


#image = io.imread('image.png')

image = [[2,4,6,5],
         [8,7,5,6],
         [5,5,2,3],
         [4,6,3,3]]




M = len(image) - 1
N = len(image[0]) - 1



#Prewitt

filtro = [[1, 0, -1],
          [1, 0, -1],
          [1, 0, -1]]

imagePrewittV = []

for i in range(1 , M):
    newLine = []
    for j in range(1, N):
        newPixel = ((filtro[0][0] * image[i-1][j-1])
                   + (filtro[0][1] * image[i-1][j])
                   + (filtro[0][2] * image[i-1][j+1])
                   + (filtro[1][0] * image[i][j-1])
                   + (filtro[1][1] * image[i][j])
                   + (filtro[1][2] * image[i][j+1])
                   + (filtro[2][0] * image[i+1][j-1])
                   + (filtro[2][1] * image[i+1][j])
                   + (filtro[2][2] * image[i+1][j+1]))
        newLine.append(abs(newPixel))
    imagePrewittV.append(newLine)


filtro = [[1, 1, 1],
          [0, 0, 0],
          [-1, -1, -1]]

imagePrewittH = []

for i in range(1 , M):
    newLine = []
    for j in range(1, N):
        newPixel = ((filtro[0][0] * image[i-1][j-1])
                   + (filtro[0][1] * image[i-1][j])
                   + (filtro[0][2] * image[i-1][j+1])
                   + (filtro[1][0] * image[i][j-1])
                   + (filtro[1][1] * image[i][j])
                   + (filtro[1][2] * image[i][j+1])
                   + (filtro[2][0] * image[i+1][j-1])
                   + (filtro[2][1] * image[i+1][j])
                   + (filtro[2][2] * image[i+1][j+1]))
        newLine.append(abs(newPixel))
    imagePrewittH.append(newLine)

imagePrewitt = np.array(imagePrewittV) + np.array(imagePrewittH)

plt.imshow(imagePrewitt, cmap="gray")

#sobel

filtro = [[1, 0, -1],
          [2, 0, -2],
          [1, 0, -1]]

imageSobelV = []

for i in range(1 , M):
    newLine = []
    for j in range(1, N):
        newPixel = ((filtro[0][0] * image[i-1][j-1]) 
                   + (filtro[0][1] * image[i-1][j]) 
                   + (filtro[0][2] * image[i-1][j+1])
                   + (filtro[1][0] * image[i][j-1])
                   + (filtro[1][1] * image[i][j])
                   + (filtro[1][2] * image[i][j+1])
                   + (filtro[2][0] * image[i+1][j-1])
                   + (filtro[2][1] * image[i+1][j])
                   + (filtro[2][2] * image[i+1][j+1]))
        newLine.append(abs(newPixel))
    imageSobelV.append(newLine)


filtro = [[1, 2, 1],
          [0, 0, 0],
          [-1, -2, -1]]

imageSobelH = []

for i in range(1 , M):
    newLine = []
    for j in range(1, N):
        newPixel = ((filtro[0][0] * image[i-1][j-1])
                   + (filtro[0][1] * image[i-1][j])
                   + (filtro[0][2] * image[i-1][j+1])
                   + (filtro[1][0] * image[i][j-1])
                   + (filtro[1][1] * image[i][j])
                   + (filtro[1][2] * image[i][j+1])
                   + (filtro[2][0] * image[i+1][j-1])
                   + (filtro[2][1] * image[i+1][j])
                   + (filtro[2][2] * image[i+1][j+1]))
        newLine.append(abs(newPixel))
    imageSobelH.append(newLine)

imageSobel = np.array(imageSobelV) + np.array(imageSobelH)

plt.imshow(imageSobel, cmap="gray")

