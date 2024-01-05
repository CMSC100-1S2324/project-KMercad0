import "./Products.css";
import React, { useState, useEffect } from "react";

export default function ManageProduct() {
    const [tableRows, setTableRows] = useState([]);
    const [sortDirections, setSortDirections] = useState({
        title: 1,
        name: 1,
        type: 1,
        price: 1,
        quantity: 1,
    });
    const [editingRow, setEditingRow] = useState(null);
    const [editedValues, setEditedValues] = useState({
        title: "",
        name: "",
        type: "",
        price: "",
        quantity: "",
    });

    useEffect(() => {
        fetch("http://localhost:3001/get-products")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.products);
                setTableRows(data.products);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    function handleEditChange(e, columnName) {
        const value = e.target.value;

        setEditedValues((prevValues) => ({
            ...prevValues,
            [columnName]: value,
        }));
    }

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

    function updateSortArrow(columnName) {
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
        const newTitle = document.getElementById("newTitle")?.value || "Title";
        const newName = document.getElementById("newName")?.value || "Name";
        const newType = document.getElementById("newType")?.value || "Type";
        const newPrice = document.getElementById("newPrice")?.value || "Price";
        const newQuantity = document.getElementById("newQuantity")?.value || "Quantity";

        console.log("New Product Values:", newTitle, newName, newType, newPrice, newQuantity);

        // Make a POST request to add the new product
        fetch("http://localhost:3001/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newTitle,
                name: newName,
                type: newType,
                price: newPrice,
                quantity: newQuantity,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("New product added:", data);

                window.location.reload();
            })
            .catch((error) => console.error("Error adding new product:", error));
    }

    const handleEditClick = (index) => {
        setEditingRow(index);
        const product = tableRows[index];
        setEditedValues({
            title: product.title || "",
            name: product.name || "",
            type: product.type || "",
            price: product.price || "",
            quantity: product.quantity || "",
        });
    };

    const handleSaveClick = (editedProduct) => {
        // Optimistically update the state
        const updatedRows = [...tableRows];
        updatedRows[editingRow] = { ...editedProduct, ...editedValues };
        setTableRows(updatedRows);

        // Make a PUT request to update the product
        fetch(`http://localhost:3001/update-product/${editedProduct._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: editedValues.title,
                name: editedValues.name,
                type: editedValues.type,
                price: editedValues.price,
                quantity: editedValues.quantity,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update product: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Product updated:", data);
                // Reset the editing state
                setEditingRow(null);
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                // If there's an error, revert the state to its original values
                setTableRows(tableRows);
            });
    };

    const handleDeleteClick = (productId) => {
        // Make a DELETE request to remove the product
        fetch(`http://localhost:3001/delete-product/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to delete product: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Product deleted:", data);
                // Update the state by removing the deleted product
                const updatedRows = [...tableRows];
                updatedRows.splice(editingRow, 1);
                setTableRows(updatedRows);
                // Reset the editing state
                setEditingRow(null);
            })
            .catch((error) => console.error("Error deleting product:", error));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        handleButtonClick("title");
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        updateSortArrow("title");
    }, []);

    return (
        <>
            <div className="product-container">
                <h2 className="product-list">Product List</h2>

                <table className="input-table">
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" id="newTitle" placeholder="Title" />
                            </td>
                            <td>
                                <input type="text" id="newName" placeholder="Name" />
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
                                <button className="action-button" onClick={() => handleButtonClick("name")}>
                                    Name &#8645;
                                </button>
                                <div className="sort-arrow" id="name-arrow"></div>
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
                                <td>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedValues.title}
                                            onChange={(e) => handleEditChange(e, "title")}
                                        />
                                    ) : (
                                        product.title || "N/A"
                                    )}
                                </td>
                                <td>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedValues.name}
                                            onChange={(e) => handleEditChange(e, "name")}
                                        />
                                    ) : (
                                        product.name || "N/A"
                                    )}
                                </td>
                                <td>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedValues.type}
                                            onChange={(e) => handleEditChange(e, "type")}
                                        />
                                    ) : (
                                        product.type || "N/A"
                                    )}
                                </td>
                                <td>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedValues.price}
                                            onChange={(e) => handleEditChange(e, "price")}
                                        />
                                    ) : (
                                        product.price || "N/A"
                                    )}
                                </td>
                                <td>
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedValues.quantity}
                                            onChange={(e) => handleEditChange(e, "quantity")}
                                        />
                                    ) : (
                                        product.quantity || "N/A"
                                    )}
                                </td>
                                <td>
                                    {editingRow === index ? (
                                        <>
                                            <button
                                                className="action-button edit-button"
                                                onClick={() => handleSaveClick(product)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="action-button delete-button"
                                                onClick={() => handleDeleteClick(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="action-button" onClick={() => handleEditClick(index)}>
                                                Edit
                                            </button>
                                            <button
                                                className="action-button"
                                                onClick={() => handleDeleteClick(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
