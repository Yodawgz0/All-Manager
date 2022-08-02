import io
import base64
from PIL import Image
import sys

# Arguments passed
print("Got the Image Data!!\n")
img = Image.open(io.BytesIO(base64.decodebytes(bytes(str(sys.argv[1]), "utf-8"))))
print("Saved the Image as TextReadingImage\n")

quit()