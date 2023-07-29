import "./App.css";
import react, { useState,useEffect} from "react";

function App() {
  const [file, setFile] = useState();
  const [img,setImg]=useState(null);
  const [allImgs,setAllImgs]=useState([]);
  const [selectedImg,setSelectedImg]=useState();
  const handleClick =  async () => {
    const formData=new FormData();
    formData.append("file",file);
    const resp = await  fetch("https://img-backend-4p9u.onrender.com/upload", {
      method: "POST",
      body:formData,
    }); 
    const data = await resp.json();
  
    setImg(data.image);

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
      <button onClick={() => handleClick()}>submit</button>
    </div>
  );
}

export default App;
