import React, { useState } from "react";
import "../Style/upload.css";
import "../Style/output.css";

import axios from "axios";

function Upload() {
  const [Result, setResult] = useState([]);

  const [file, setfile] = useState({ stdt: "", endt: "", empno: 0 });

  console.log(Result);

  async function submitHandler(e) {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    let formdata = new FormData();
    formdata.append("stdt", file.stdt);
    formdata.append("endt", file.endt);
    formdata.append("empno", file.empno);
    formdata.append("originalname", "");

    let bodyContent = formdata;

    let reqOptions = {
      url: "https://empdata-production.up.railway.app/acti",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    setResult(response.data.data);
  }

  return (
    <div>
      <div className="container">
        <h1>Addendance Data Report</h1>
        <form id="form" onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="files">Select files</label>
            <input id="files" type="file" multiple />
          </div>
          <div className="input-group">
            <label htmlFor="files">Select Start-Date</label>
            <input
              type="date"
              onChange={(e) => {
                setfile({ ...file, stdt: e.target.value });
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="files">Select end-Date</label>
            <input
              type="date"
              onChange={(e) => {
                setfile({ ...file, endt: e.target.value });
              }}
            />
          </div>
          <div className="input-group">
            Emp no
            <input
              value={file.empno}
              onChange={(e) => {
                setfile({ ...file, empno: e.target.value });
              }}
              type="number"
            />
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <hr />
      <hr />
      <div className="Table-container">
        <h1>Addendance Data Report Output</h1>
      </div>
      <div className="Table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Dates</th>
              <th>Day of week</th>
              <th>start Time</th>
              <th>End time</th>
              <th>over time</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            <>
              {Result &&
                Result.map((res, index) => (
                  <tr>
                    <td key={index}>{res.date}</td>
                    <td key={index}>{res.dayOfTheWeek}</td>
                    <td key={index}>{res.startTime}</td>
                    <td key={index}>{res.endTime}</td>
                    <td key={index}>{res.overtime}</td>
                    <td key={index}>{res.Hours}</td>
                  </tr>
                ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Upload;
