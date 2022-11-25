import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import logo from "./logoAgs.png";
import logoBG from "./logoAgsBG.png";
import { useLocation } from "react-router-dom";

export default function Invoice() {
  const [sumPriceHT, setSumPriceHT] = useState(0);
  const [sumTVA, setSumTVA] = useState(0);
  const [sumTTC, setSumTTC] = useState(0);
  const [remise, setRemise] = useState(0);
  const location = useLocation();
  const facture = location.state.facture;
  const invoice2Print = document.getElementById("print");

  const generatePdf = () => {
    html2canvas(invoice2Print, {
      dpi: 144,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  useEffect(() => {
    let temp_sumPriceHT = 0;
    let temp_sumTVA = 0;
    let temp_sumTTC = 0;
    facture[0].Services.map(
      (item) => (
        (temp_sumPriceHT =
          temp_sumPriceHT + parseFloat(item.price) * parseInt(item.qte)),
        (temp_sumTVA =
          temp_sumTVA + parseFloat(item.price) * parseInt(item.qte) * 0.19)
      )
    );

    temp_sumTTC = temp_sumTVA + temp_sumPriceHT;
    let temp_remise = temp_sumPriceHT * (parseFloat(facture[0].Remise) / 100);
    setRemise(temp_remise);
    setSumPriceHT(temp_sumPriceHT);
    setSumTTC(temp_sumTTC);
    setSumTVA(temp_sumTVA);
  }, []);
  console.log(facture)

  return (
    <>
      <button
        className="btn-add"
        style={{ margin: "10px" }}
        onClick={generatePdf}
      >
        generatePdf
      </button>
      <div className="div-A4" id="print">
        <div
          className="contanier div-A4"
          style={{
            backgroundImage: `url(${logoBG})`,
            overflow: "hidden",
            backgroundPosition: "bottom right",
          }}
        >
          <div className="row table-flex">
            <div className="col-5 img-header">
              <img src={logo} height="150px" />
              <p>
                <strong>Adresse :</strong>Rue Anouwayri, ariana 2036
                <br /> <strong>Telephone :</strong> 24 026 020 / 24 095 951
                <br />
                <strong>Email :</strong>Contact@ags.tn
                <br />
                <strong>Siteweb :</strong>https://ags.tn
                <br />
                <strong>MF:</strong>1735578/G/B/M/000
              </p>
            </div>
            <div className="col-5 " style={{ marginTop: "50px" }}>
              <h3>Facture N° </h3>
              <p>
                <br />
                <strong>Date :</strong>qsdqsd
                <br />
                <strong>Marque :</strong> azeaze
                <br /> <strong>Matricule :</strong> azeaze
                <br />
                <strong>Nom Client :</strong> zerze
                <br /> <strong>immatriculation fiscale :</strong> 65+65{" "}
              </p>
            </div>
          </div>
          <div className="row table-flex ">
            <div className="col-10">
              <table>
                <tr>
                  <th width="10%">Réf</th>
                  <th width="30%">Désignation</th>
                  <th width="10%">PU HT</th>
                  <th width="5%">Remise</th>
                  <th width="5%">Qté</th>
                  <th width="10%">Total HT</th>
                  <th width="10%">TVA</th>
                  <th width="15%">Total TTC</th>
                </tr>
                <tr>
                  <td>0001</td>
                  <td>timbre fiscal</td>
                  <td>0.600 DT</td>
                  <td></td>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td>0.600 DT</td>
                </tr>
                {facture[0].Services.map((item) => {
                  return (
                    <tr>
                      <td>{item.ref}</td>
                      <td>{item.description}</td>
                      <td>{item.price + " DT"}</td>
                      <td>{facture[0].Remise + " %"}</td>
                      <td>{item.qte}</td>
                      <td>
                        {parseFloat(item.price) * parseInt(item.qte) + " DT"}
                      </td>
                      <td>
                        {parseFloat(item.price) * parseInt(item.qte) * 0.19 +
                          " DT"}
                      </td>
                      <td>
                        {parseFloat(item.price) * parseFloat(item.qte) +
                          parseFloat(item.price) * 0.19 * parseInt(item.qte) +
                          " DT"}
                      </td>
                    </tr>
                  );
                })}
                <tr className="borderless">
                  <td className="boderless"></td>
                </tr>
                <tr className="total">
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td colspan="4">Total HT : {sumPriceHT + " DT"}</td>
                </tr>
                <tr className="total">
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td colspan="4">Total TVA :{sumTVA + " DT"} </td>
                </tr>
                <tr className="total">
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td colspan="4">Total TTC :{sumTTC + " DT"} </td>
                </tr>
                <tr className="total">
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td colspan="4">REMISE :{remise + " DT"} </td>
                </tr>
                <tr className="total">
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td className="boderless"></td>
                  <td colspan="4">NET À PAYER :{sumTTC - remise + " DT"} </td>
                </tr>
              </table>

              <br />
              <br />
              <br />
              <p style={{ float: "right" }}>Signature Gerant et cachet</p>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
