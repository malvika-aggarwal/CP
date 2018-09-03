module.exports = {
  createMedia(file) {
    return new Promise((resolve, reject) => {
      var binaryData = new Buffer(file.base64, 'base64').toString('binary');
      var filePath = `assets/adminMedia/${file.filename}`;
      require("fs").writeFile(`public/${filePath}`, binaryData, "binary", (err) => {
        if (!err) {
          resolve(filePath)
        } else {
          reject(err);
        }
      });
    })
  }
}