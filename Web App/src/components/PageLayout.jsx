import React, { useState } from "react";
import { SignOutButton } from "./SignOutButton";
import {
  CContainer,
  CCollapse,
  CNavbarNav
} from "@coreui/react";
import { Navbar } from "react-bootstrap";


export const PageLayout = (props) => {

  return (
    <>
      <Navbar
        expand="lg"
        className="page-layout-nav-bar sticky-top mb-5"
      >
        <CContainer fluid>
          <CCollapse className="navbar-collapse" >
            <CNavbarNav className="page-layout-nav-bar-item-nav gap-4">
            </CNavbarNav>
          </CCollapse>
          <SignOutButton />
        </CContainer>
      </Navbar>
      {props.children}
    </>
  );
};
