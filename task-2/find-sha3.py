from io import BytesIO
from urllib.request import urlopen
from zipfile import ZipFile
import ssl
import os
from os.path import abspath, dirname, join
import hashlib

zipurl = "https://www.dropbox.com/s/oy2668zp1lsuseh/task2.zip?dl=1"
context = ssl._create_unverified_context()
dirPath = join(dirname(abspath(__file__)), "unzipFfolder")
with urlopen(zipurl, context=context) as zipresp:
    with ZipFile(BytesIO(zipresp.read())) as zfile:
        zfile.extractall(dirPath)

filesNames = []

with os.scandir(dirPath) as entries:
    for entry in entries:
        filesNames.append(entry.name)

hexList = []

for name in filesNames:
    file_path = join(dirname(abspath(__file__)), "unzipFfolder", name)
    with open(file_path, "rb") as file:
        data = file.read()
        sha256hash = hashlib.sha3_256(data).hexdigest()
        hexList.append(sha256hash)

hexList.sort()

myEmail = "vadimchaiko@yahoo.com"

joinHash = "".join(hexList)
joinHashWithEmail = joinHash + myEmail

resultSha256hash = hashlib.sha3_256(joinHashWithEmail.encode("utf-8")).hexdigest()
print(resultSha256hash)
