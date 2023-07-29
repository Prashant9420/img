import "./App.css";
import react, { useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [file, setFile] = useState();
  const [img,setImg]=useState(null);
  const [allImgs,setAllImgs]=useState([]);
  const [selectedImg,setSelectedImg]=useState();
  const [isUploaded,setIsUploaded]=useState(true);
  const handleClick =  async () => {
    setIsUploaded(false);
    const formData=new FormData();
    formData.append("file",file);
    const resp = await  fetch("https://img-backend-4p9u.onrender.com/upload", {
      method: "POST",
      body:formData,
    }); 
    const data = await resp.json();
    setAllImgs((prevImgs) => [...prevImgs, data.image.path.slice(8)]);
    setIsUploaded(true);
    toast("Image uploaded !");

  };
  useEffect(() => {
    getAllImages();
  }, []);
  const getAllImages=async()=>{
    const resp=await fetch("https://img-backend-4p9u.onrender.com/getAllImgs")
    const data=await resp.json();
    setAllImgs(data.files);
  
  }

  const handleSelectChange = (event) => {
    setSelectedImg(event.target.value);
  };


  return (
    <div className="App">
      <div>
        <select onChange={handleSelectChange}>
          <option>None</option>
          {
            allImgs.map((img)=>{
              return <option key={img}>{img}</option>
            })
          }
        </select>
      </div>
      <div>
        {(selectedImg)?<img src={`https://img-backend-4p9u.onrender.com/uploads/${selectedImg}`}/>:null}
      </div>
      <input type="file" name="uploaded_img" onChange={(e)=>{setFile(e.target.files[0]);console.log(e.target.files[0])}}/>
      <button onClick={() => handleClick()}>submit</button>{(!isUploaded)?<CircularProgress />:null}
      <ToastContainer/>
    </div>
  );
}

export default App;
