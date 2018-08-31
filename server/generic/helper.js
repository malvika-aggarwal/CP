module.exports = {
    createMedia(file){
        return new Promise((resolve, reject) => {
        var   binaryData = new Buffer(file.base64, 'base64').toString('binary');
        var filePath = `public/assets/adminMedia/${file.filename}`;
        require("fs").writeFile(filePath, binaryData, "binary", function(err) {
            if(!err){
                resolve(filePath)
            }else{
                reject(err);
            }
        });
    })
    } 
}