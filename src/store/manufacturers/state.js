export default function() {
  return {
    manufacturersList: [
      {
        name: "Ideal Tools",
        id: "ide",
        options: {
          columns: {
            itemNumber: "J",
            standardCost: "O",
            standardPackQuantity: "P",
            upcCode: "K",
            pricedPerUOM: "N",
            descLine1: "L"
          },
          sheetName: "Sheet1"
        }
      },
      {
        name: "Klein Tools",
        id: "klein"
      },
      {
        name: "Eaton",
        id: "eaton"
      }
    ]
  };
}
