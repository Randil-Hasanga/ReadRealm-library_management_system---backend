import { Injectable } from '@nestjs/common';
import { CreateDipDto } from './dto/create-dip.dto';
import { UpdateDipDto } from './dto/update-dip.dto';

@Injectable()
export class DipService {

  basic() {
    return `
import cv2
from google.colab.patches import cv2_imshow

# Load the image
image = cv2.imread("image_1.jpg")
if image is None:
    print("Error loading image")
else:
    print("Image loaded successfully")
    cv2_imshow(image)

# Convert to grayscale
image = cv2.imread("image_1.jpg")
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imwrite("gray_image.jpg", gray_image)
cv2_imshow(gray_image)
print("Gray image saved successfully")

# resize the image
image = cv2.imread("image_1.jpg")
resized_image = cv2.resize(image, (600, 400))
cv2.imwrite("resized_image.jpg", resized_image)
cv2_imshow(resized_image)
print("Resized image saved successfully")

# Rotate the image
image = cv2.imread("image_1.jpg")
(h, w) = image.shape[:2]
center = (w // 2, h // 2)
matrix = cv2.getRotationMatrix2D(center, 180, 1.0)
rotated_image = cv2.warpAffine(image, matrix, (w, h))
cv2.imwrite("rotated_image.jpg", rotated_image)
cv2_imshow(rotated_image)
print("Rotated image saved successfully")

# blur image
image = cv2.imread("image_1.jpg")
blurred_image = cv2.GaussianBlur(image, (21, 21), 0)
cv2.imwrite("blurred_image.jpg", blurred_image)
cv2_imshow(blurred_image)
print("Blurred image saved successfully")

# Edge detection
image = cv2.imread("image_1.jpg")
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray_image, 100, 200)
cv2.imwrite("edges_image.jpg", edges)
cv2_imshow(edges)
print("Edges image saved successfully")

# Draw a rectangle and text
image = cv2.imread("image_1.jpg")
cv2.rectangle(image, (50, 50), (450+50, 200+50), (255, 0, 0), 2)
text_position = (50 + 20, 50 + 50)
cv2.putText(image, 'wtf', text_position, cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
cv2.imwrite("output_image.jpg", image)
cv2_imshow(image)
print("image with text and shape saved successfully")

# treshold img
image = cv2.imread("image_1.jpg")
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
_, threshold_image = cv2.threshold(gray_image, 130, 255, cv2.THRESH_BINARY)
cv2.imwrite("threshold_image.jpg", threshold_image)
cv2_imshow(threshold_image)
print("Threshold image saved successfully")`;
  }


  color_space() {
    return `
import cv2
from google.colab.patches import cv2_imshow
import numpy as np
import matplotlib.pyplot as plt

#rgb

img_bgr = cv2.imread("img_bgr.PNG")
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
r,g,b = cv2.split(img_rgb)

plt.figure(figsize=(10,10))

plt.subplot(2,2,1)
plt.imshow(img_rgb)
plt.title("Original Image")

plt.subplot(2,2,2)
plt.imshow(r)
plt.title("Red Channel")

plt.subplot(2,2,3)
plt.imshow(g)
plt.title("Green Channel")

plt.subplot(2,2,4)
plt.imshow(b)
plt.title("Blue Channel")

#hsv

img_hsv = cv2.imread("img_hsv.PNG")
img_hsv = cv2.cvtColor(img_hsv, cv2.COLOR_BGR2RGB)
h, s, v = cv2.split(img_hsv)

plt.figure(figsize=(10,10))

plt.subplot(2,2,1)
plt.imshow(img_hsv)
plt.title("Original Image")

plt.subplot(2,2,2)
plt.imshow(h)
plt.title("Hue Channel")

plt.subplot(2,2,3)
plt.imshow(s)
plt.title("Saturation Channel")

plt.subplot(2,2,4)
plt.imshow(v)
plt.title("Value Channel")


# hsl

img_hls = cv2.imread("img_hls.PNG")
img_hls = cv2.cvtColor(img_hls, cv2.COLOR_BGR2RGB)
h,l,s = cv2.split(img_hls)

plt.figure(figsize=(10,10))

plt.subplot(2,2,1)
plt.imshow(img_hls)
plt.title("Original Image")

plt.subplot(2,2,2)
plt.imshow(h)
plt.title("Hue Channel")

plt.subplot(2,2,3)
plt.imshow(l)
plt.title("Lightness Channel")

plt.subplot(2,2,4)
plt.imshow(s)
plt.title("Saturation Channel")
`
  }

  histogram() {
    return `
import cv2
import numpy as np
import matplotlib.pyplot as plt
from google.colab.patches import cv2_imshow

img = cv2.imread("mage-with-bad-contrast_Q320 (1).jpg", cv2.IMREAD_GRAYSCALE)
#calculate the hisogram
histogram = cv2.calcHist([img], [0], None, [256], [0,256])

plt.figure(figsize=(8,4))
plt.subplot(121)
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title("Original Image")
plt.axis("off")

plt.subplot(122)
plt.plot(histogram)
plt.title("Histogram")
plt.xlabel("Pixel Value")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

# -------------------------

#Histogram equalization in Open CV

#apply histogram equalization
equalized_image = cv2.equalizeHist(img)

plt.figure(figsize=(8,4))

plt.subplot(121)
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title("Original Image")
plt.axis("off")

plt.subplot(122)
plt.imshow(cv2.cvtColor(equalized_image, cv2.COLOR_BGR2RGB))
plt.title("Equalized Image")
plt.axis("off")

plt.tight_layout()
plt.show()

# -------------------------

#calculate histograms
og_image_histogram = cv2.calcHist([img], [0], None, [255], [0,256])
equalized_image_histogram = cv2.calcHist([equalized_image], [0], None, [255], [0,256])

plt.figure(figsize=(12, 4))

plt.subplot(121)
plt.plot(og_image_histogram, color="blue")
plt.title("Original Image Histogram")
plt.xlabel("Pixel Value")
plt.ylabel("Frequency")

plt.subplot(122)
plt.plot(equalized_image_histogram, color="black")
plt.title("Equalized Image Histogram")
plt.xlabel("Pixel Value")
plt.ylabel("Frequency")

plt.tight_layout()
plt.show()

# CLAHE -------------------------

img = cv2.imread("Q0Tql (1).png",cv2.IMREAD_GRAYSCALE)
cv2_imshow(img)

#create CLAHE object
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
cl1 = clahe.apply(img)
cv2_imshow(cl1)

# Color Image Histogram Processing ---------------------

img = cv2.imread("macaw.jpg", cv2.COLOR_BGR2RGB)
scaled_img = cv2.resize(img, None, fx=0.5, fy=0.5)
cv2_imshow(scaled_img)

B = scaled_img[:,:,0]
G = scaled_img[:,:,1]
R = scaled_img[:,:,2]

B_hist = cv2.calcHist([scaled_img], [0], None, [256], [0,256])
G_hist = cv2.calcHist([scaled_img], [1], None, [256], [0,256])
R_hist = cv2.calcHist([scaled_img], [2], None, [256], [0,256])

plt.subplot(221)
plt.plot(B_hist, color="blue")
plt.title("Blue Channel Histogram")

plt.subplot(222)
plt.plot(G_hist, color="green")
plt.title("Green Channel Histogram")

plt.subplot(223)
plt.plot(R_hist, color="red")
plt.title("Red Channel Histogram")

# low contrast image

img = cv2.imread("macaw_lc.jpg")
scaled_img = cv2.resize(img, None, fx=0.5, fy=0.5)
cv2_imshow(scaled_img)

B = scaled_img[:,:,0]
G = scaled_img[:,:,1]
R = scaled_img[:,:,2]

b_equal_hist = cv2.equalizeHist(B)
g_equal_hist = cv2.equalizeHist(G)
r_equal_hist = cv2.equalizeHist(R)

B_hist = cv2.calcHist([b_equal_hist], [0], None, [256], [0,256])
G_hist = cv2.calcHist([g_equal_hist], [0], None, [256], [0,256])
R_hist = cv2.calcHist([r_equal_hist], [0], None, [256], [0,256])

#merge the channels and create new image
equi_im = cv2.merge((b_equal_hist, g_equal_hist, r_equal_hist))

plt.imshow(b_equal_hist)
plt.title("Blue equi")
plt.show()

plt.imshow(g_equal_hist)
plt.title("Green equi")
plt.show()

plt.imshow(r_equal_hist)
plt.title("Red equi")
plt.show()

cv2_imshow(scaled_img)
cv2_imshow(equi_im)

# show histograms

plt.subplot(221)
plt.plot(B_hist, color="blue" )

plt.subplot(222)
plt.plot(G_hist, color="green")

plt.subplot(223)
plt.plot(R_hist, color="red")
    `
  }

  spartial_filtering() {
    return `
# Smoothing Filters ------------------------------------------------------

# **Linear Spatial Filtering** ------------------------

#Mean Filter/ Averaging Filter ----------------

#Low Pass Spatial Domain Filtering to observe the blurring effect

img = cv2.imread("inputimage.png", 0) # 0 means grayscale

#obtain number of rows and columns of the image
m, n = img.shape

#develop averaging filter(3, 3) mask
mask = np.ones([3, 3], dtype= int)
mask = mask/9

#Convolve the 3*3 mask over the image
img_new = np.zeros([m, n]) #this initializes an empty image (img_new) of the same size as the original image to store the filtered result

for i in range(1, m-1):
  for j in range(1, n-1):
    temp = img[i-1, j-1] * mask[0, 0] + img[i-1, j] * mask[0, 1] + img[i-1, j+1] * mask[0, 2] + img[i, j-1] * mask[1, 0] + img[i, j] * mask[1, 1] + img[i, j+1] * mask[1, 2] + img[i+1, j-1] * mask[2, 0] + img[i+1, j] * mask[2, 1] + img[i+1, j+1] * mask[2, 2]

    img_new[i, j] = temp

img_new = img_new.astype(np.uint8)
cv2.imwrite("Averaging Filtered Image.tif", img_new)

plt.imshow(img, cmap="gray")
plt.title("Original Image")
plt.axis("off")
plt.show()

plt.imshow(img_new, cmap="gray")
plt.title("Averaging Filtered Image")
plt.axis("off")
plt.show()

# Gaussian Filter ----------------

img = cv2.imread("PEL-PTE-s5-4-600x800.jpg", cv2.IMREAD_COLOR)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#apply gaussian filter
kernel_size = (15, 15)
sigma_value = 0 #sigma defines the blur strength, 0 means that openCV will automatically calculate the optimal value for sigma based on the kernel size
gaussian_blur = cv2.GaussianBlur(img_rgb, kernel_size, sigma_value)

fig, axe = plt.subplots(1,2, figsize=(12,6))

axe[0].imshow(img_rgb)
axe[0].set_title("Original Image")
axe[0].axis("off")

axe[1].imshow(gaussian_blur)
axe[1].set_title("Gaussian Filtered Image")
axe[1].axis("off")

plt.show()

# Non - Linear Spatial Filtering----------------------

# Order Statistics (Non linear) filter - Median Filter -----------------

img_noisy = cv2.imread("inputimage.png", 0)

m, n = img_noisy.shape

#traverse the image. for every 3*3 area,
#find the median of the pixels and
#replace the center pixel by the median
img_new = np.zeros([m, n])

for i in range(1, m-1):
  for j in range(1, n-1):
    temp = [img_noisy[i-1, j-1], img_noisy[i-1, j], img_noisy[i-1, j+1], img_noisy[i, j-1], img_noisy[i, j], img_noisy[i, j+1], img_noisy[i+1, j-1], img_noisy[i+1, j], img_noisy[i+1, j+1]]
    temp = sorted(temp)
    #in a list of 9 sorted elements the middle one is the 5th element but index strarts in 0 so 4
    img_new[i, j] = temp[4]

img_new = img_new.astype(np.uint8)
cv2.imwrite("Median Filtered Image.tif", img_new)

plt.imshow(img_noisy, cmap="gray")
plt.title("Original Image")
plt.axis("off")
plt.show()

plt.imshow(img_new, cmap="gray")
plt.title("Median Filtered Image")
plt.axis("off")
plt.show()


# Sharpening Filters ----------------------------------------------

# Laplacian Filter -----------------

gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#apply laplacian filter
laplacian = cv2.Laplacian(gray_image, cv2.CV_64F)

plt.figure(figsize=(12, 6))

plt.subplot(1,2,1)
plt.imshow(img_rgb)
plt.title("Original Image")
plt.axis("off")

plt.subplot(1,2,2)
plt.imshow(laplacian, cmap="gray")
plt.title("Laplacian Filtered Image")
plt.axis("off")

plt.show()    
    `}
  morphological() {
    return `
import cv2
import numpy as np
from google.colab.patches import cv2_imshow

#erosion --------------------

img = cv2.imread("j.png", cv2.IMREAD_GRAYSCALE)
kernel = np.ones((5,5), np.uint8)
erosion = cv2.erode(img, kernel, iterations = 1)

print("Original Image")
cv2_imshow(img)
print("Eroded Image")
cv2_imshow(erosion)

#dilation --------------------

dilation = cv2.dilate(img, kernel, iterations = 1)

print("Original Image")
cv2_imshow(img)
print("Dilated Image")
cv2_imshow(dilation)

#opening --------------------

img_opening = cv2.imread("opening.png", cv2.IMREAD_GRAYSCALE)
opening = cv2.morphologyEx(img_opening, cv2.MORPH_OPEN, kernel)

print("Original Image")
cv2_imshow(img_opening)

print("Opened Image")
cv2_imshow(opening)

#closing --------------------

img_closing = cv2.imread("closing.png", cv2.IMREAD_GRAYSCALE)
closing = cv2.morphologyEx(img_closing, cv2.MORPH_CLOSE, kernel)

print("Original Image")
cv2_imshow(img_closing)

print("Closed Image")
cv2_imshow(closing)

#gradient --------------------

gradient = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)

print("Original Image")
cv2_imshow(img)

print("Gradient Image")
cv2_imshow(gradient)

# hit or mis --------------------

input_image = np.array((
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 255, 255, 255, 0, 0, 0, 255],
    [0, 255, 255, 255, 0, 0, 0, 0],
    [0, 255, 255, 255, 0, 255, 0, 0],
    [0, 0, 255, 0, 0, 0, 0, 0],
    [0, 0, 255, 0, 0, 255, 255, 0],
    [0, 255, 0, 255, 0, 0, 255, 0],
    [0, 255, 255, 255, 0, 0, 0, 0]
), dtype="uint8")

kernel = np.array((
    [0, 1, 0],
    [1, -1, 1],
    [0, 1, 0]
), dtype="int")

output_image = cv2.morphologyEx(input_image, cv2.MORPH_HITMISS, kernel)

scale = 40
input_resized = cv2.resize(input_image, (input_image.shape[1]*scale, input_image.shape[0]*scale), interpolation=cv2.INTER_NEAREST)
output_resized = cv2.resize(output_image, (output_image.shape[1]*scale, output_image.shape[0]*scale), interpolation=cv2.INTER_NEAREST)

print("Input Image")
cv2_imshow(input_resized)
print("Output Image")
cv2_imshow(output_resized)
      `
  }

  intensity_transformation() {
    return `
import cv2
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams["figure.autolayout"] = True

def scale_image(input_image):
  input_image = input_image / np.max(input_image)
  input_image = (input_image * 255).astype(int)
  return input_image

# Image Negative ---------------------------------

img = cv2.imread("Fig0304(a)(breast_digital_Xray) (1).tif")

def negative(r):
  s = 255 - r
  return s

# graph
x_value = np.linspace(0,255,255)
y_value = negative(x_value)

plt.plot(x_value, y_value)
plt.xlabel("Input intensity")
plt.ylabel("Output intensity")
plt.title("Image Negative")

# apply negative function
img_neg = negative(img)

plt.title("Original Image")
plt.imshow(img)

plt.title("Image Negative")
plt.imshow(img_neg)

# plot original , graph , negative

def plot_results(input_image, output_image, x_values, y_values, save_as):
  plt.figure(figsize=(36,12))

  plt.subplot(1,3,1)
  plt.title("Original Image")
  plt.imshow(input_image)
  plt.axis("off")

  plt.subplot(1,3,2)
  plt.plot(x_values, y_values)
  plt.xlabel("Input Pixels")
  plt.ylabel("Output Pixels")
  plt.grid("true")

  plt.subplot(1,3,3)
  plt.title("Transformed Image")
  plt.imshow(output_image)
  plt.axis("off")

  plt.savefig(save_as+".png")

plot_results(img, img_neg, x_value, y_value, "Image Negative")

# log transform ---------------------------------------------------

img = cv2.imread("Fig0305(a)(DFT_no_log) (1).tif")

def logTransform (r, c=1):
  s = c*np.log(1.0 + r)
  return s

log_img = logTransform(img)
img_log_scaled = scale_image(log_img)

x_value = np.linspace(0,255,255)
y_value = logTransform(x_value)

plot_results(img, img_log_scaled, x_value, y_value, "Log Transformation")

# inverse log transform ---------------------------------------------------

img = cv2.imread("owl.png", cv2.IMREAD_GRAYSCALE)

c=45
log_transformed = c*(np.log(img+1))

#convert to unsigned 8 bit version
log_transformed = np.uint8(log_transformed)

invert_log_transformed = c*(np.exp(log_transformed/c)-1)

#convert to unsigned 8 bit version
invert_log_transformed = np.uint8(invert_log_transformed)

plt.figure(figsize=(10,5))

plt.subplot(1,3,1)
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title("Original Image")
plt.axis("off")

plt.subplot(1,3,2)
plt.imshow(cv2.cvtColor(log_transformed, cv2.COLOR_BGR2RGB))
plt.title("Log Transformed Image")
plt.axis("off")

plt.subplot(1,3,3)
plt.imshow(cv2.cvtColor(invert_log_transformed, cv2.COLOR_BGR2RGB))
plt.title("Inverse Log Transformed Image")
plt.axis("off")

plt.show()

# Power Law Transformation ---------------------------------------------------

img = cv2.imread("Fig0308(a)(fractured_spine) (1).tif")

def gammaTransform(r, gamma, c=1):
  s=c*(r**gamma)
  return s

img_gamma = gammaTransform(img, 0.4)
img_gamma_scaled = scale_image(img_gamma)

x_value = np.linspace(0, 255, 255)
y_value = gammaTransform(x_value, 0.4)

plot_results(img, img_gamma_scaled, x_value, y_value, "Power Law (Gamma)")

# showing result for gamma value array ----

def performGammaTransform(input_img, gamma_value):
  img_gamma = gammaTransform(input_img, gamma_value)
  img_gamma_scaled = scale_image(img_gamma)

  x_value = np.linspace(0, 255, 255)
  y_value = gammaTransform(x_value, gamma_value)

  plot_results(input_img, img_gamma_scaled, x_value, y_value, "Power Law (Gamma)"+str(gamma_value))
  return img_gamma_scaled

# gamma < 1
final_img = []
for gammaValue in [0.6, 0.4, 0.3]:
  final_img.append(performGammaTransform(img, gammaValue))

# gamma > 1
img = cv2.imread("Fig0309(a)(washed_out_aerial_image) (1).tif")

final_aerial_images = []

for gammaValues in [4.0, 2.0, 1.0]:
  final_aerial_images.append(performGammaTransform(img, gammaValues))

plt.figure(figsize=(24,12))

plt.subplot(221)
plt.imshow(final_aerial_images[0])
plt.title("Gamma = 4.0")
plt.axis("off")

plt.subplot(222)
plt.imshow(final_aerial_images[1])
plt.title("Gamma = 2.0")
plt.axis("off")

plt.subplot(223)
plt.imshow(final_aerial_images[2])
plt.title("Gamma = 1.0")
plt.axis("off")

plt.subplot(224)
plt.imshow(img)
plt.title("Original Image")
plt.axis("off")

# constrast streatching -----------------------------------------------------

img = cv2.imread("Fig0310(b)(washed_out_pollen_image) (1).tif")

def piecewiseLinear (r, r1, s1, r2, s2):
  if r<r1:
    s = (s1/r1) * r
  elif r>r1 and r<r2:
    s = ((s2-s1)/(r2-r1))*(r-r1)+s1
  else:
    s = ((255-s2)/(255-r2))*(r-r2)+s2
  return int(s)

piecewiseLinear = np.vectorize(piecewiseLinear)

x_value = np.linspace(0, 255, 255)
y_value = piecewiseLinear(x_value, 80, 30, 150, 190)

transformed_img = piecewiseLinear(img, 80, 30, 150, 190)

plot_results(img, transformed_img, x_value, y_value, "Contrast Stretching")

# Intensity Level Slicing ---------------------------------------------------------
# approach 1 ------------------

img = cv2.imread("Fig0312(a)(kidney) (1).tif")

def intensityLevelTransform1(r):
  if r > 140 and r < 210:
    return 255
  else:
    return 0

intensityLevelTransform1 = np.vectorize(intensityLevelTransform1)

x_value = np.linspace(0, 255, 255)
y_value = intensityLevelTransform1(x_value)

transformed_img = intensityLevelTransform1(img)

plot_results(img, transformed_img, x_value, y_value, "Intensity Level Transformation")

# approach 2 ------------------

def intensityLevelTransform2(r):
  if r > 140 and r < 210:
    return 240
  else:
    return r

intensityLevelTransform2 = np.vectorize(intensityLevelTransform2)

x_value = np.linspace(0, 255, 255)
y_value = intensityLevelTransform2(x_value)

plot_results(img, transformed_img, x_value, y_value, "Intensity Level Transformation")

# Bit plane slicing ----------------------------------------------------------------------------

img = cv2.imread("Fig0314(a)(100-dollars) (1).tif",0)

plt.imshow(img, cmap="gray")
plt.axis("off")

def bitPlaneSlicing(r, bitPlane):
  dec = np.binary_repr(r, width=8)
  return int(dec[8-bitPlane])

bitPlaneSlicing = np.vectorize(bitPlaneSlicing)

eight_bit_place = bitPlaneSlicing(img, bitPlane=8)

plt.imshow(eight_bit_place, cmap="gray")
plt.axis("off")

bit_planes_dict = {}
for bit_plane in np.arange(8, 0, -1):
  bit_planes_dict["bit_plane_"+str(bit_plane)] = bitPlaneSlicing(img, bitPlane=bit_plane)

plt.figure(figsize=(24,12))

plt.subplot(331)
plt.imshow(img, cmap="gray")
plt.title("Original image")
plt.axis("off")

plt.subplot(332)
plt.imshow(bit_planes_dict["bit_plane_1"], cmap="gray")
plt.title("Bit plane 1")
plt.axis("off")

plt.subplot(333)
plt.imshow(bit_planes_dict["bit_plane_2"], cmap="gray")
plt.title("Bit plane 2")
plt.axis("off")

plt.subplot(334)
plt.imshow(bit_planes_dict["bit_plane_3"], cmap="gray")
plt.title("Bit plane 3")
plt.axis("off")

plt.subplot(335)
plt.imshow(bit_planes_dict["bit_plane_4"], cmap="gray")
plt.title("Bit plane 4")
plt.axis("off")

plt.subplot(336)
plt.imshow(bit_planes_dict["bit_plane_5"], cmap="gray")
plt.title("Bit plane 5")
plt.axis("off")

plt.subplot(337)
plt.imshow(bit_planes_dict["bit_plane_6"], cmap="gray")
plt.title("Bit plane 6")
plt.axis("off")

plt.subplot(338)
plt.imshow(bit_planes_dict["bit_plane_7"], cmap="gray")
plt.title("Bit plane 7")
plt.axis("off")

plt.subplot(339)
plt.imshow(bit_planes_dict["bit_plane_8"], cmap="gray")
plt.title("Bit plane 8")
plt.axis("off")

plt.tight_layout()
plt.savefig("Bit Plane Slicing.png")
      `
  }

  edge_detection() {
    return `
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread("Edge Detection.png")

gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

blurred_image = cv2.GaussianBlur(gray_image, (3, 3), 0)

# sobel ---------------------------
# edge detection of blured img

Gx=cv2.Sobel(blurred_image,cv2.CV_64F,1,0,ksize=3)
Gy=cv2.Sobel(blurred_image,cv2.CV_64F,0,1,ksize=3)

G=np.sqrt(Gx*2+Gy*2)

Gx=np.uint8(255*np.abs(Gx)/np.max(np.abs(Gx)))
Gy=np.uint8(255*np.abs(Gy)/np.max(np.abs(Gy)))
G=np.uint8(255*np.abs(G)/np.max(np.abs(G)))

plt.figure(figsize=(15,10))
plt.subplot(2,2,1)
plt.imshow(cv2.cvtColor(img,cv2.COLOR_BGR2RGB))
plt.title('Original Image')

plt.subplot(2,2,2)
plt.imshow(Gx,cmap='gray')
plt.title('Gx')

plt.subplot(2,2,3)
plt.imshow(Gy,cmap='gray')
plt.title('Gy')

plt.subplot(2,2,4)
plt.imshow(G,cmap='gray')
plt.title('G')

# Prewitt Edge Detection -------------------------

def prewitt_edge_detection(img):
  # Convert the image to grayscale (Note: Converting to RGB is unusual for edge detection)
  gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

  # Define the kernel for detecting vertical edges (Gx)
  kernel_x = np.array([[-1, 0, 1],[-1, 0, 1],[-1, 0, 1]])
  # Apply the kernel to find horizontal edges (This comment might be slightly misleading given the kernel detects vertical changes)
  horizontal_edges = cv2.filter2D(gray_image, -1, kernel_x)

  # Define the kernel for detecting horizontal edges (Gy)
  kernel_y = np.array([[-1, -1, -1],[0, 0, 0],[1, 1, 1]])
  # Apply the kernel to find vertical edges (This comment might be slightly misleading given the kernel detects horizontal changes)
  vertical_edges = cv2.filter2D(gray_image, -1, kernel_y)

  # Convert the edge images to float32 data type
  horizontal_edges = np.float32(horizontal_edges)
  vertical_edges = np.float32(vertical_edges)

  # Calculate the magnitude of the gradient (combined horizontal and vertical edge strength)
  gradient_magnitude = cv2.magnitude(horizontal_edges, vertical_edges)

  # Define a threshold for edge detection
  threshold = 50
  # Pixels with gradient magnitude > threshold become 255 (white), otherwise 0 (black)
  _, edges = cv2.threshold(gradient_magnitude, threshold, 255, cv2.THRESH_BINARY)

  return edges

edges = prewitt_edge_detection(img)

plt.figure(figsize=(10,5))

plt.subplot(1,2,1)
plt.imshow(cv2.cvtColor(img,cv2.COLOR_BGR2RGB))
plt.title('Original Image')
plt.axis('off')

plt.subplot(1,2,2)
plt.imshow(edges,cmap='gray')
plt.title('Prewitt Edge Detection')
plt.axis('off')

# tresholding ------------------------------------------

color_image = cv2.imread("threshold.png", cv2.IMREAD_COLOR)

grayscale_image = cv2.cvtColor(color_image, cv2.COLOR_BGR2GRAY)

threshold_value = 128
_, binary_image = cv2.threshold(grayscale_image, threshold_value, 255, cv2.THRESH_BINARY)

plt.figure(figsize=(15,5))

plt.subplot(131)
plt.title("Original Image")
plt.imshow(color_image, cmap="gray")
plt.axis("off")

plt.subplot(132)
plt.title("Grayscale Image")
plt.imshow(grayscale_image, cmap="gray")
plt.axis("off")

plt.subplot(133)
plt.title("Binary Image")
plt.imshow(binary_image, cmap="gray")
plt.axis("off")

plt.show



      `
  }
}
