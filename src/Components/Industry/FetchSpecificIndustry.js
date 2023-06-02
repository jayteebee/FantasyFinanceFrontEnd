// import React, {useState, useEffect} from 'react'
// import { getSpecificIndustry } from "../../API/industryAPI";
// import SpecificIndustry from "./SpecificIndustry";

// const FetchSpecificIndustries = () => {
// const [specificIndustry, setSpecificIndustry] = useState(null);
// const [input, setInput] = useState("");

// const handleChange = (e) => {
//     setInput(e.target.value);
// };

// const handleSubmit = (e) => {
//     e.preventDefault();
//     getSpecificIndustry(input)
//   .then(data => {
//     setSpecificIndustry(data);
//   })
//   .catch(err => console.log("API Call Failed", err));
// }

//   return(
//     <form onSubmit={handleSubmit}>
//         <input type="text" value={input} onChange={handleChange} />
//         <input type="submit" value="Submit" />
//         <SpecificIndustry specificIndustry={specificIndustry} />
//     </form>
//     );
// };

// export default FetchSpecificIndustries;

