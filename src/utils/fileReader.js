const path = require("path");
const fs = require("fs");
const { dialog } = require("electron").remote;

/**
 *
 *
 *
 */
function readFile(filePath) {
  if (filePath === undefined) {
    return "Please select a file";
  } else {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("An error ocurred reading the file :" + err.message);
        return "An error ocurred reading the file :" + err.message;
      }
      // Change how to handle the file content
      console.log("The file content is : " + data);
      return "The file content is : " + data;
    });
  }
}

export default readFile;
