import { useState } from "react";
import quotingAPI from "../../api/quotingAPI";

const ProductAdminModal = ({ products, setProducts, closeModal, data }) => {
  const [product, setProduct] = useState(data);
  const isUpdate = Boolean(data.productId);

  const handleUpdate = async () => {
    try {
      const res = await quotingAPI.updateProduct(product);
      setProducts(
        products.map((item) =>
          item.productId === product.productId ? product : item
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleAdd = async () => {
    if (
      !product.name ||
      !product.series ||
      !product.imageUrl ||
      !product.price
    ) {
      alert("Input info");
      return;
    }
    try {
      const res = await quotingAPI.addProduct(product);
      setProducts([...products, res.data]);
      console.log(res.data);
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="overflow-x-auto bg-white w-[520px] h-430px]">
        {/* header */}
        <div className="sticky top-0 pt-4 px-7 flex justify-between items-center bg-green-800 bg-opacity-80">
          <h2 className="text-2xl font-bold mb-4 text-white z-1">Product</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-6 h-6 -mt-4 cursor-pointer fill-white"
            onClick={closeModal}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        {/* content */}
        <div className="px-10">
          <div className="grid grid-cols-1 gap-4 mt-5">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                value={product.name || ""}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="w-[70%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Series
              </label>
              <input
                type="text"
                value={product.series || ""}
                onChange={(e) =>
                  setProduct({ ...product, series: e.target.value })
                }
                className="w-[20%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Image
              </label>
              <input
                type="text"
                value={product.imageUrl}
                onChange={(e) =>
                  setProduct({ ...product, imageUrl: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Price
              </label>
              <input
                type="text"
                value={product.price || ""}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="w-[20%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>
        </div>
        <div className="px-10 pb-4">
          {isUpdate ? (
            <button
              onClick={handleUpdate}
              className="bg-green-700 hover:bg-green-500 text-white px-8 py-2 rounded mt-4"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-green-700 hover:bg-green-500 text-white px-8 py-2 rounded mt-4"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAdminModal;