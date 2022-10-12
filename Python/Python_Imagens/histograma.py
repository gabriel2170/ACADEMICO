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

plt.bar(range(10), histogram)

#histograma acumulado

cumulative = np.zeros(10, dtype=int)

for i in range(0,10):
    if i == 0:
        cumulative[i] = histogram[i]
    else:
        cumulative[i] = cumulative[i-1] + histogram[i]

plt.bar(range(10), cumulative)
