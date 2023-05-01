import {
  CTable,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CButton,
} from "@coreui/react";

function LowerView(props) {
  const { viewType } = props;

  return (
    <CTable>
      <CTableBody>
        {viewType == "operator" && (
          <CTableRow>
            <CTableDataCell colSpan="3"></CTableDataCell>
            <CTableDataCell className="lower-view text-right">
              <CButton
                type="button"
                className="btn btn-primary mr-3"
                onClick={() => {}}
              >
                Approve
              </CButton>
              <CButton
                type="button"
                className="btn btn-danger "
                onClick={() => {}}
              >
                Reject
              </CButton>
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  );
}

export default LowerView;
