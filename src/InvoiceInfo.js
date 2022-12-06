import logo from "./images.png";
import "./App.css";
import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { Dna } from "react-loader-spinner";

function InvoiceInfo() {
  const [subject, setSubject] = useState();
  const [sendername, setSendername] = useState();
  const [emailbody, setEmailbody] = useState();
  const allowedExtensions = ["csv"];
  const [isSending, setIsSending] = useState(false);
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
    setIsSending(true);
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      for (let i = 0; i < parsedData.length; i++) {
        let payload = {
          emailData: {
            senderName: sendername,
            subject: subject,
            emailBody: emailbody
          },
          email: parsedData[i].email
        };
        let response = await axios({
          url: "http://localhost:4000/send",
          // header: {
          //   "Access-Control-Allow-Origin": "*",
          //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          // },
          method: "POST",
          data: payload
        });
        if (response.status === 200) {
          alert(i + 1 + " email sent successfully");
          console.log(i)
        }
        if (i+1  == parsedData.length || response.status !== 200) {
          setIsSending(false);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      {isSending ? (
        <div
          style={{
            display: "flex",
            height: "600px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Dna
            visible={true}
            height="120"
            width="120"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <br />
          <p>Hold On it's in my DNA</p>
        </div>
      ) : (
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
                <h3>Priv8 Advenced Mailing Tool</h3>
                <form className="form-group" onSubmit={handleParse}>
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

                    <textarea
                      name="w3review"
                      rows="4"
                      cols="90"
                      className="form-control"
                      onChange={(e) => setEmailbody(e.target.value)}
                      placeholder="letter html"
                    ></textarea>
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
      )}
    </>
  );
}

export default InvoiceInfo;
