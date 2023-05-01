import { CCol } from "@coreui/react";

import { Card } from "react-bootstrap";
import UpperView from "./UpperView";
import LowerView from "./LowerView";

function AccidentDetailContainer(props) {
  const { accidentDetails, viewType} = props;

  return (
    <CCol>
        <Card
          key={accidentDetails.id}
          className="Home-main-card"
          border="dark"
        >
          <UpperView accidentDetails={accidentDetails} />
          <LowerView viewType={viewType} />
        </Card>
    </CCol>
  );
}

export default AccidentDetailContainer;
