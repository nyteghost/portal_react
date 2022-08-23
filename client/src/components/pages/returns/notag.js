import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "../../../styles/new.css";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input {...register("firstName")} />

      <input type="submit" />
    </form>
  );
}

// export default function App() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get(
//           `https://jsonplaceholder.typicode.com/posts?_limit=10`
//         );
//         setData(response.data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         setData(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <div className="App">
//       <h1>No Tags</h1>
//       {loading && <div>A moment please...</div>}
//       {error && (
//         <div>{`There is a problem fetching the post data - ${error}`}</div>
//       )}
//       <ul>
//         {data &&
//           data.map(({ id, title }) => (
//             <li key={id}>
//               <h3>{title}</h3>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }
