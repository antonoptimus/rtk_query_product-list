import { useState } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetGoodsQuery,
} from "./redux/goodsApi";

function App() {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");

  const { data = [], isError, isLoading } = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  };

  return (
    <div>
      {isError && <h1>Something went wrong...</h1>}
      {isLoading && <h1>Loading...</h1>}

      <form>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleAddProduct}>add</button>
      </form>

      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value="">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <ul>
        {data.map((item) => (
          <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
