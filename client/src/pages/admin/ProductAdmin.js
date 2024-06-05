import React, { useState, useEffect } from "react";
import quotingAPI from "../../api/quotingAPI";
import ProductAdminModal from "../modal/ProductAdminModal";

const ITEMS_PER_PAGE = 4;

const ProductAdmin = () => {
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hightlightedProduct, setHightLightProduct] = useState(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    fetchData();
  };

  const fetchData = async () => { };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await quotingAPI.getListProducts();
        setProduct(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching conditions:", error);
      }
    };

    fetchConditions();
  }, []);

  const handleDelete = async (productId) => {
    console.log("id", productId);
    try {
      await quotingAPI.deleteProduct(productId);
      setProduct(product.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const productName = event.target.value;
      const itemIndex = product.findIndex(item => item.name === productName);

      if (itemIndex !== -1) {
        const pageNumber = Math.floor(itemIndex / ITEMS_PER_PAGE) + 1;
        setCurrentPage(pageNumber);
        setHightLightProduct(productName);

        setTimeout(() => {
          setHightLightProduct(null);
        }, 4000);
      } else {
        alert("Product not found");
      }
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = product.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);

  return (
    <div className="container px-4 mx-auto mt-4 ">
      <div className="max-w-lg mx-auto text-center mt-5">
        <h1 className="text-4xl font-bold text-black mb-4">Products</h1>
      </div>
      <div className="flex mt-6 justify-between">
        <div className="flex items-center space-x-2">
          <label htmlFor="orderId" className="block text-gray-700 mr-4">
            Product Name:
          </label>
          <input
            type="text"
            id="orderId"
            className="mt-1 block w-[320px] border-gray-500 border-2 rounded-md"
            onKeyPress={handleSearch}
          />
        </div>
        <button
          className="bg-green-400 rounded-md px-6 py-2"
          onClick={() => openModal({})}
        >
          Add
        </button>

      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="py-2 px-4 text-left text-gray-500 border">ProductID</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Name</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Series</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Image</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Price</th>
              <th className="py-2 px-4 pl-20 text-left text-gray-500 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((product) => (
              <tr key={product.id} className={`border ${hightlightedProduct === product.name ? 'bg-green-200' : ''}`}>
                <td className="py-2 px-4 border">{product.productId}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.series}</td>
                <td className="py-2 px-4 border">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ maxWidth: "100px", height: "auto" }}
                  />
                </td>
                <td className="py-2 px-4 border">${product.price}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-evenly">
                    <button
                      className="bg-yellow-400 rounded-md px-3 py-2"
                      onClick={() => openModal(product)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 rounded-md px-3 py-2"
                      onClick={() => handleDelete(product.productId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8 bg-gray-100 py-2">
        <nav aria-label="Page navigation">
          <ul className="flex list-style-none">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative block py-2 px-3 leading-tight rounded-md text-gray-800 hover:bg-gray-200 mr-1 ${currentPage === 1 && 'cursor-not-allowed'}`}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className={`rounded-full relative block py-2 px-3 leading-tight ${currentPage === page + 1 ? 'bg-green-500 text-white' : 'bg-white text-gray-600'} hover:bg-gray-200 mr-1`}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative block py-2 px-3 leading-tight rounded-md text-gray-800 hover:bg-gray-200 ${currentPage === totalPages && 'cursor-not-allowed'}`}
              >
                Next page
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {isModalOpen && (
        <ProductAdminModal
          products={product}
          setProducts={setProduct}
          data={selectedItem}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ProductAdmin;