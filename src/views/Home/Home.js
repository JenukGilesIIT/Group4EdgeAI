import { CTable, CTableRow, CTableDataCell, CForm, CCol } from "@coreui/react";

import "antd/dist/antd.css";

import AccidentCard from "./HomeComponents/AccidentCard";
import AccidentDetailContainer from "./HomeComponents/AccidentDetailContainer";
import { useEffect, useState } from "react";

function Home() {

  const [accidents, setAccidents] = useState([]);
  const [accidentDetails, setAccidentDetails] = useState("");
  let da = new Date()

  useEffect(() => {
    setAccidents([
      {
        id: 0,
        status : "Accident",
        date : da,
        venue : "No.1, SomeStreet, SomeCity",
        video : "Some Video 1"
      },
      {
        id: 1,
        status : "Accident",
        date : da,
        venue : "No.2, SomeStreet, SomeCity",
        video : "Some Video 2"
      },
      {
        id: 2,
        status : "Accident",
        date : da,
        venue : "No.3, SomeStreet, SomeCity",
        video : "Some Video 3"
      }
    ])
  }, [])

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
                    {accidents.map((accident) => (
                      <div key={accident.id}>
                        <AccidentCard
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
