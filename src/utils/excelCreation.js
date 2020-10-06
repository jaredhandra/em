const ExcelJS = require("exceljs");
const FileSaver = require("file-saver");
const JSZip = require("jszip");
const { PROTRAC_COLUMNS } = require("./protracData.js");

import { Workbook } from "exceljs/excel";

function createZipFile(files) {
  // add files to zip
  var zip = new JSZip();

  // return files with file dialog
  zip.generateAsync({ type: "blob" }).then(content => {
    return FileSaver.saveAs(content, "example.zip");
  });
}

/**
 * Parse the file uploaded and only keep the columns we need
 * then pass it on to the protrac file creator
 *
 * @param {JSON} options - the excel sheet options for the selected manufacturer
 * @param {String} file - the location of the file to be parsed
 */
function convertExcelSheet(options, file) {
  let workbook = new Workbook();
  let protracValues = {};
  workbook.xlsx.readFile(file.path).then(function() {
    // Get sheet by Name
    let worksheet = workbook.getWorksheet(options.sheetName);

    // Extract the data we need for protrac
    for (const key in options.columns) {
      if (options.columns.hasOwnProperty(key)) {
        const columnValue = options.columns[key];
        var data = worksheet.getColumn(columnValue);
        protracValues[key] = data.values;
      }
    }
    createProtracFiles(protracValues);
  });
}

/**
 *
 * Takes in a manufacturer ID and manufacturer file
 * and returns a zip file with the correct files for protrac
 *
 * @param {Object} protracValues - ID of the Manufacturer selected
 *
 * @return {Blob} blob file with the xlsx files included
 *
 */
function createProtracFiles(protracValues) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Sheet 1");

  sheet.columns = PROTRAC_COLUMNS;

  for (const key in protracValues) {
    var currentColumn = sheet.getColumn(key);
    currentColumn.values = protracValues[key];
  }

  let file = workbook.xlsx
    .writeBuffer()
    .then(buffer => {
      return FileSaver.saveAs(new Blob([buffer]), "Test.xlsx");
    })
    .catch(err => console.log("Error", err));
}

export { createZipFile, convertExcelSheet };