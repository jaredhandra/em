const ExcelJS = require("exceljs");
const FileSaver = require("file-saver");
const JSZip = require("jszip");
const { PROTRAC_COLUMNS } = require("./protracData.js");

import { Workbook } from "exceljs/excel";
import { Loading, Notify } from "quasar";

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
function convertExcelSheet(manufacturer, file) {
  Loading.show()
  let workbook = new Workbook();
  let protracValues = {};
  workbook.xlsx.readFile(file.path).then(function() {
    // Get sheet by Name
    let worksheet = workbook.getWorksheet(manufacturer.options.sheetName);
    let columns = manufacturer.options.columns

    // Extract the data we need for protrac
    for (const column of columns) {
      try {
        var data = worksheet.getColumn(column.columnLetter);
        protracValues[column.columnName] = data.values;
      } catch {
        Loading.hide()
        Notify.create('Column not found')
        throw new Error("Column not found")
      }
    }
    protracValues.productLine = [manufacturer.id];
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
  
  // add all of the protrac columns even if we don't have values for them
  // protrac requires all columns
  sheet.columns = PROTRAC_COLUMNS;
  sheet.getColumn("unitOfMeasure").values = ["ea"];

  for (const key in protracValues) {
    var currentColumn = sheet.getColumn(key);
    currentColumn.values = protracValues[key];
  }

  let file = workbook.xlsx
    .writeBuffer()
    .then(buffer => {
      Loading.hide()
      return FileSaver.saveAs(new Blob([buffer]), "Test.xlsx");
    })
    .catch(err => console.log("Error", err));
}

export { createZipFile, convertExcelSheet };
