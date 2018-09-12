module.exports = {
  createMedia(file) {
    return new Promise((resolve, reject) => {
      var binaryData = new Buffer(file.base64, 'base64').toString('binary');
      var splitname = file.filename.split('.');
      var filename = `${splitname[0]}_${new Date().getTime()}`
      var filePath = `assets/adminMedia/${filename}.${splitname[1]}`;
      require("fs").writeFile(`public/${filePath}`, binaryData, "binary", (err) => {
        if (!err) {
          resolve({filePath,filename})
        } else {
          reject(err);
        }
      });
    })
  }
}