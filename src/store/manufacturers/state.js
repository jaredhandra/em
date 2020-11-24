export default function() {
  return {
    manufacturersList: [
      {
        name: "Ideal Tools",
        id: "ide",
        options: {
          columns: [
            {
              columnName: "itemNumber",
              columnLetter: "J"
            },
            {
              columnName: "standardCost",
              columnLetter: "O"
            },
            {
              columnName: "standardPackQuantity",
              columnLetter: "P"
            },
            {
              columnName: "upcCode",
              columnLetter: "K"
            },
            {
              columnName: "pricedPerUOM",
              columnLetter: "N"
            },
            {
              columnName: "descLine1",
              columnLetter: "L"
            }
          ],
          sheetName: "Sheet1"
        }
      },
      {
        name: "IPEX",
        id: "ipex",
        options: {
          columns: [
            {
              columnName: "descLine1",
              columnLetter: "L"
            }
          ],
          sheetName: "Sheet1"
        }
      }
    ]
  };
}
