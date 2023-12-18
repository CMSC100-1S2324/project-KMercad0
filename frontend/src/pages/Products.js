import "./Products.css";
import React, { useState, useEffect } from "react";

export default function Products() {
  const [tableRows, setTableRows] = useState([]);
  const [sortDirections, setSortDirections] = useState({
    title: 1,
    name: 1,
    type: 1,
    price: 1,
    quantity: 1,
  });

useEffect(() => {
  fetch("http://localhost:3001/get-products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the data to the console
      setTableRows(data);
    })
    .catch((error) => console.error('Error fetching data:', error));
}, []);


  const handleButtonClick = (columnName) => {
    const updatedRows = [...tableRows];

    updatedRows.sort((a, b) => {
      const aValue = (a[columnName] || "").toString().trim();
      const bValue = (b[columnName] || "").toString().trim();

      if (columnName === "title" || columnName === "name") {
        return sortDirections[columnName] * aValue.localeCompare(bValue);
      } else {
        const numericA = parseFloat(aValue) || 0;
        const numericB = parseFloat(bValue) || 0;
        return sortDirections[columnName] * (numericA - numericB);
      }
    });

    setSortDirections({ ...sortDirections, [columnName]: -sortDirections[columnName] });
    setTableRows(updatedRows);
  };

  // Function to update the sort arrow display
  function updateSortArrow(columnName) {
    // Display the sort arrow for the clicked column
    const arrowElement = document.getElementById(`${columnName}-arrow`);
    if (arrowElement) {
      arrowElement.textContent = sortDirections[columnName] === 1 ? " ▲" : " ▼";
    }

    // Reset the sort arrows for other columns
    for (const key in sortDirections) {
      if (key !== columnName) {
        const otherArrowElement = document.getElementById(`${key}-arrow`);
        if (otherArrowElement) {
          otherArrowElement.textContent = "";
        }
      }
    }
  }

  function addNewProduct() {
    const newTitle = document.getElementById("newTitle").value || "Title";
    const newName = document.getElementById("newName").value || "Name";
    const newType = document.getElementById("newType").value || "Type";
    const newPrice = document.getElementById("newPrice").value || "Price";
    const newQuantity = document.getElementById("newQuantity").value || "Quantity";

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${newTitle}</td>
      <td>${newName}</td>
      <td>${newType}</td>
      <td>${newPrice}</td>
      <td>${newQuantity}</td>
    `;
    // Remove this line, as it is not needed
    // tableBody.appendChild(newRow);

    // Clear input fields
    document.getElementById("newTitle").value = "";
    document.getElementById("newName").value = "";
    document.getElementById("newType").value = "";
    document.getElementById("newPrice").value = "";
    document.getElementById("newQuantity").value = "";
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleButtonClick('title');
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateSortArrow('title');
  }, []);

  return (
    <>
      <div className="container">
        <h2>Product List</h2>

        <table className="input-table">
          <tbody>
            <tr>
              <td>
                <input type="text" id="newTitle" placeholder="Title" />
              </td>
              <td>
                <input type="text" id="newPrice" placeholder="Name" />
              </td>
              <td>
                <input type="text" id="newType" placeholder="Type" />
              </td>
              <td>
                <input type="text" id="newPrice" placeholder="Price" />
              </td>
              <td>
                <input type="text" id="newQuantity" placeholder="Quantity" />
              </td>
              <td>
                <button className="action-button" onClick={addNewProduct}>
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>
                <button className="action-button" onClick={() => handleButtonClick("title")}>
                  Title &#8645;
                </button>
                <div className="sort-arrow" id="title-arrow"></div>
              </th>
              <th>
                <button className="action-button" onClick={() => handleButtonClick("Name")}>
                  Name &#8645;
                </button>
                <div className="sort-arrow" id="title-arrow"></div>
              </th>
              <th>
                <button className="action-button" onClick={() => handleButtonClick("type")}>
                  Type &#8645;
                </button>
                <div className="sort-arrow" id="type-arrow"></div>
              </th>
              <th>
                <button className="action-button" onClick={() => handleButtonClick("price")}>
                  Price &#8645;
                </button>
                <div className="sort-arrow" id="price-arrow"></div>
              </th>
              <th>
                <button className="action-button" onClick={() => handleButtonClick("quantity")}>
                  Quantity &#8645;
                </button>
                <div className="sort-arrow" id="quantity-arrow"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
