import logo from "./images.png";
import "./App.css";
import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

function InvoiceInfo() {
  const [host, setHost] = useState();
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [subject, setSubject] = useState();
  const [sendername, setSendername] = useState();
  const [emailbody, setEmailbody] = useState();
  const allowedExtensions = ["csv"];
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      setFile(inputFile);
    }
  };
  const handleParse = async (e) => {
    e.preventDefault();
    if (!file) return setError("Enter a valid file");
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      let payload = {
        emailData: {
          senderName: sendername,
          subject: subject,
          emailBody: emailbody
        },
        smtp: {
          host: host,
          user: user,
          pass: pass
        },
        emails: parsedData
      };
      let response = await axios({
        url: "http://localhost:4000/send",
        method: "POST",
        data: payload
      });
      console.log(response);
    };
    reader.readAsText(file);
  };

  return (
    <div id="wrapper" className="container">
      <div style={{}}>
        <br />
        <center>
          <img src={logo} height="200px" />
        </center>
        <br />
      </div>

      <div className="row">
        <div className="col-12">
          <div id="html_div">
            <h3>email configurations</h3>
            <form className="form-group" onSubmit={handleParse}>
              <div>
                <input
                  type="text"
                  placeholder="email host"
                  className="form-control"
                  onChange={(e) => setHost(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="email"
                  className="form-control"
                  onChange={(e) => setUser(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="email password"
                  className="form-control"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>

              <h3> email info </h3>
              <div id="html_div">
                <input
                  type="text"
                  className="form-control"
                  placeholder="sender name (name will be displayed) ex: Barry greyman"
                  onChange={(e) => setSendername(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="subject"
                  onChange={(e) => setSubject(e.target.value)}
                />
                <br />
                <h5>Tip:</h5>
                <p>
                  <p style={{ color: "red" }}>
                    {" "}
                    use this word in your body to set it as a dynamic word
                  </p>
                  <strong>[[name]]</strong>
                  <br />
                  <p style={{ color: "red" }}>
                    exemple: if i wanna send email body like this :
                  </p>
                  hey Alaa
                  <br />
                  i hope you are okey <br />
                  best regards . <br />
                  <p style={{ color: "red" }}>
                    i should use this tool like this
                  </p>
                  hey [[name]] <br />
                  i hope you are okey <br />
                  best regards . <br />
                </p>

                <textarea
                  name="w3review"
                  rows="4"
                  cols="90"
                  className="form-control"
                  onChange={(e) => setEmailbody(e.target.value)}
                >
                  email content should be here don't for get to use [[name]].
                  feel free to delete this
                </textarea>
                <p>
                  upload your excel file in CSV extension <br /> how ?{" "}
                  <a target="_blank" href="https://prnt.sc/Cd8NGSdolUJ9">
                    {" "}
                    click here
                  </a>
                </p>
                <p>
                  how my file should look <br /> you don't know ?{" "}
                  <a target="_blank" href="https://prnt.sc/oMyP-Mivvv-m">
                    {" "}
                    click here
                  </a>
                </p>
                <center>
                  <input type="file" onChange={handleFileChange} />
                </center>

                <input type="submit" value="send" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceInfo;
