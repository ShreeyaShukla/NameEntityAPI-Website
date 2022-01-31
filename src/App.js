
import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {

  const [text,setText] = useState('');
  const [result,setResult] = useState('');

  const handleClick = () => { 
    //console.log(process.env.REACT_APP_AZURE_KEY);
    var config = { 
      headers: {
      "Ocp-Apim-Subscription-Key": "30b2218e13774e20a5a985d3e638b252"
      }
   };
   var body = {
    documents: [{
        id: 1,
        text: text
    }]
   };
   
  axios
    .post("https://sl4nameentityapi.cognitiveservices.azure.com//text/analytics/v3.2-preview.1/entities/recognition/general",
    body,
    config)
    .then(res => {
      let name="";
      res.data.documents[0].entities.forEach(doc => {
            if(doc.category=='Location') { 
                name = doc.text;
            }
  
      })
      setResult(name)
      console.log(res.data)
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
    <h1>Find out the location entity in the sentence</h1>
      <textarea id="text-input" rows="10" cols="100" value={text} onChange={e => setText(e.target.value)}></textarea>
      <br></br>
      <button id="find-button" onClick={handleClick}>FIND</button>
      <h1 id='result'>{result}</h1>
    </div>
  );
}

export default App;
