import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {useState} from "react";

function App() {

    const [uniqueNumber, setUniqueNumber] = useState('Generator token will be shown here');
    const [validationStatus, setValidationStatus] = useState(false);
    const [gender, setGender] = useState("");

    function onChangeValue(event) {
        setGender(event.target.value);
        console.log(event.target.value);
    }

    function generateToken() {
        if(gender === ''){
            return;
        }

        fetch('http://localhost:8080/api/v0/generator/generate?tokenDigits='+gender)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUniqueNumber(data.payload)
            });
    }

    function validateToken() {
        console.log(document.getElementById('uniqueId').innerText)
        fetch('http://localhost:8090/api/v0/validator?token=' + uniqueNumber)
            .then(response => response.json())
            .then(data => {
                document.getElementById('uniqueIdLabel').innerText = data.payload

                setValidationStatus(data.payload)
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className='parent'>
                    <div className='child'>
                        <label className="p-2 title lh-1">
                            Token Generator
                        </label>

                        <div style={{backgroundColor: "whitesmoke", padding: "10px"}}>
                            <label style={{color: "black", fontSize: 12, textAlign: "end", fontWeight: "500"}}>
                                Select below numbers range to generate new token:
                            </label>
                            <div className="row" style={{padding: "10px", color: "black"}}>
                                <div onChange={onChangeValue}>
                                    <input type="radio" value="1,2,3,4,5" name="gender" checked={gender === "1,2,3,4,5"} /> (1,2,3,4,5)
                                    <input type="radio" value="1,6,7,8,9" name="gender" checked={gender === "1,6,7,8,9"}/> (1,6,7,8,9)
                                    <input type="radio" value="2,6,4,9,1" name="gender" checked={gender === "2,6,4,9,1"} /> (2,6,4,9,1)
                                    <input type="radio" value="5,7,3,2,1" name="gender" checked={gender === "5,7,3,2,1"} /> (5,7,3,2,1)
                                </div>
                               {/* <div className="col-6 form-check" style={{color: "black", fontSize: 13, fontWeight: "500"}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           id="flexRadioDefault1" checked></input>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Default radio
                                    </label>
                                </div>
                                <div className="col-6 form-check" style={{color: "black", fontSize: 13, fontWeight: "500"}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           id="flexRadioDefault2" ></input>
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Default checked radio
                                    </label>
                                </div>
                                <div className="col-6 form-check" style={{color: "black", fontSize: 12, fontWeight: "500"}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           id="flexRadioDefault3"></input>
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        Default radio
                                    </label>
                                </div>
                                <div className="col-6 form-check" style={{color: "black", fontSize: 12, fontWeight: "500"}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           id="flexRadioDefault4" ></input>
                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                        Default checked radio
                                    </label>
                                </div>*/}
                            </div>

                            <div style={{textAlign: "center", fontSize: "12px", padding: "10px"}}>

                                <Button onClick={generateToken} className="btn-primary lh-1"
                                        style={{fontSize: "12px", textAlign: "end"}}>
                                    Generate Token
                                </Button>
                            </div>
                            <div style={{textAlign: "center", marginTop: "10px"}}>
                                <label style={{color: "black", fontSize: 12, textAlign: "end"}} id="uniqueId">
                                    <strong style={{textAlign: "center"}}> {uniqueNumber}</strong>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='child'>
                        <label className=" p-2 title lh-1">Token Validator</label>

                        <div style={{backgroundColor: "whitesmoke", padding: "10px"}}>
                            <div style={{textAlign: "center", marginTop: "10px"}}>
                                <label style={{color: "black", fontSize: 14, textAlign: "end"}} id="uniqueId">
                                    Check if token is valid or not
                                </label>
                                <br></br>
                                <Button onClick={validateToken} className="btn-primary lh-sm"
                                        style={{fontSize: "12px"}}>
                                    Validate Token
                                </Button>
                                <br></br>
                                <label style={{color: "black", fontSize: 14, textAlign: "end", fontWeight: "500"}}
                                       id="uniqueIdLabel">
                                    {validationStatus}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
