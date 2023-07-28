import logo from "./logo.svg";
import "./App.css";
import react, { useState } from "react";

function App() {
  const [file, setFile] = useState();
  const [img,setImg]=useState(null);
  const handleClick =  async () => {
    const formData=new FormData();
    formData.append("file",file);
    console.log(formData.file);
    const resp = await  fetch("http://localhost:5000/upload", {
      method: "POST",
      body:formData,
    }); 
    console.log(resp)
    const data = await resp.json();
    console.log(data.image);
    setImg(data.image);

  };
  return (
    <div className="App">
      <div>
        {(img)?<img src={`http://localhost:5000/${img.path}`}/>:null}
      </div>
      <input type="file" name="uploaded_img" onChange={(e)=>{setFile(e.target.files[0]);console.log(e.target.files[0])}}/>
      <button onClick={() => handleClick()}>submit</button>
    </div>
  );
}

export default App;
