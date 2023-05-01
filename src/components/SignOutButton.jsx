import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { BiLogOut } from "react-icons/bi";
import { GoPerson } from "react-icons/go";

export function SignOutButton() {
  return (
      <CDropdown>
        <CDropdownToggle
          placement="bottom-end"
          caret={false}
          id="sign-out-button-profile-details-dropdown-toggle"
        >
          <GoPerson />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem onClick={() => {}} className="btn btn-link">
            <BiLogOut size="2em" className="sign-out-button-icon-bi" />
            Sign&nbsp;Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
  );
};
