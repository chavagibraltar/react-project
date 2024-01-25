import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Category({ categoryId }) {
  const [category, setCategory] = React.useState();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
    categoryId(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Category</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={category}
        label="Categories"
        onChange={handleChange}
        >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categories.map((c, i) =>
          <MenuItem key={i} value={c.Id}>{c.Name}</MenuItem>
          )}
      </Select>
    </FormControl>
  );
}


///////////////////////////////////////////

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/category`)
  //     .then(res => {
  //       setCategories(res.data);
  //       dispatch({ type: Actions.SET_CATEGORY, payload: res.data })
  //     }
  //     ).catch(err => console.log("bbvbhgfghgfg"));
  // }, [])
  // useEffect(() => {
  //  dispatch(SetCategories());
  // }, [])
//שלי
// import * as React from 'react';//שלי
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import * as actionType from '../store/action';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useEffect } from 'react';
// import axios from "axios";
// import SetCategories from '../server/setCategories';

// export default function Category({ categoryId }) {
  //   //const [categories, setCategories] = React.useState([]);
  
  //   const [category, setCategory] = React.useState([]);
  
  //   const dispatch = useDispatch();
  //   // const navigate = useNavigate();
//   useEffect(() => {//לפי נועה
//     //dispatch(SetCategories());
//     axios.get(`http://localhost:8080/api/category`)
//           .then(res => {
//             dispatch({ type: actionType.SET_CATEGORY, payload: res.data })  
//             //setCategories(res.data);
//         }
//           ).catch(err => console.log(err));
//  }, []);
//   const categories = useSelector(state => state.categories)

//   const handleChange = (event) => {
//     // console.log(event.target.value)
//     setCategory(event.target.value);
//     categoryId(event.target.value);
//   };

//   return (
//     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
//       <InputLabel id="demo-select-small-label">Category</InputLabel>
//       <Select
//         labelId="demo-select-small-label"
//         id="demo-select-small"
//         value={category}
//         label="Categories"
//         onChange={handleChange}
//       >
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         {categories.map((c, i) =>
//           <MenuItem key={i} value={c.Id}>{c.Name}</MenuItem>
//         )}
//         {/* {categories?.map((c,i) => (
//             <div>
//               <MenuItem value={c.Id}>{c.Name}</MenuItem>
//             </div>
//         ))} */}

//       </Select>
//     </FormControl>
//   );
// }