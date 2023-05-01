import { CTable, CTableRow, CTableDataCell, CForm, CCol } from "@coreui/react";

import "antd/dist/antd.css";

import AccidentCard from "./HomeComponents/AccidentCard";
import AccidentDetailContainer from "./HomeComponents/AccidentDetailContainer";
import { useEffect, useState } from "react";
import { get_accident_data } from "../../APIs/Api";

function Home() {

  const [accidents, setAccidents] = useState([]);
  const [accidentDetails, setAccidentDetails] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      get_accident_data(getData);
    }, 10000);

    return () => clearInterval(interval);
  }, [accidents]);

  const getData = (newData) => {
    if (accidents.length === 0 || accidents[0].id != newData.id){
      setAccidents([newData, ...accidents]);
    }
    
  };

  const DetailsHandler = (id) => {
    setAccidentDetails(accidents[id])
  }
  
  return (
    <div className="main-div mt-5">
      <CForm>
        <CCol md={12}>
          <CTable borderless className="d-flex justify-content-start">
            <CTableRow>
              {accidents.length != 0 ? (
                <CTableDataCell>
                  <div className="mb-3 mt-3" id="accident-card-scroll">
                    {accidents.reverse().map((accident, index) => (
                      <div key={index}>
                        <AccidentCard
                          index = {index}
                          DetailsHandler={DetailsHandler}
                          accident={accident}
                        />
                      </div>
                    ))}
                  </div>
                </CTableDataCell>
              ) : (
                <CTableDataCell className="d-flex justify-content-center">
                  No Accidents to View
                </CTableDataCell>
              )}
            </CTableRow>

            {accidentDetails != "" && (
              <AccidentDetailContainer
                accidentDetails={accidentDetails}
                viewType = "Authority"
              />
            )}
          </CTable>
        </CCol>
      </CForm>
    </div>
  );
}

export default Home;
