from skimage import io
import numpy as np 
import matplotlib.pyplot as plt
import imutils
import cv2

image = io.imread('image.png')

#Antes de dectar os contornos com esse algoritmo faca 2 passos antes: 

#Converter imagem para escala de cinza !!
#Detectar bordas da imagem com Sobel ou Prewitt!!


cnts = cv2.findContours(
 imageSobel.copy(),
 cv2.RETR_EXTERNAL,
 cv2.CHAIN_APPROX_SIMPLE
)
cnts = imutils.grab_contours(cnts)


imageCnts = image.copy()
for c in cnts:
 cv2.drawContours(
 imageCnts, [c], -1, (0, 0, 0), 2
 )
plt.imshow(imageCnts)

(x, y, w, h) = cv2.boundingRect(cnts[0])
crop = image[y:y+h, x:x+w]
plt.imshow(crop)
