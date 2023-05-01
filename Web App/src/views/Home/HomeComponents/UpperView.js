import { CTable, CTableRow, CTableBody, CTableDataCell } from "@coreui/react";
import { dateTimeFormat } from "../../../utilts/dateUtils";
import moment from "moment";

function UpperView(props) {
  const { accidentDetails } = props;

  return (
    <CTable>
      <CTableBody>
        <CTableRow>
          <CTableDataCell className="Home-details-table-header">
            <b>Status:</b>
          </CTableDataCell>
          <CTableDataCell>
            <b>{accidentDetails.status}</b>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>
            <b>Time and Date:</b>
          </CTableDataCell>
          <CTableDataCell>
            <b>
            {moment(accidentDetails.date).local().format(dateTimeFormat)}
            </b>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>
            <b>Venue :</b>
          </CTableDataCell>
          <CTableDataCell>
            <b>{accidentDetails.venue}</b>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  );
}

export default UpperView;
