import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PageLayout } from "./components/PageLayout";

import "./styles/App.css";
import "./scss/style.scss";
import "bootstrap-css-only/css/bootstrap.min.css";
import "./styles/ScrollBar.css";
import "./styles/Home.css";
import "./styles/PageLayout.css";
import "./styles/SignOutButton.css";
import Home from "./views/Home/Home";

export default function App() {
  return (
    <div>
      <Router>
        <PageLayout>
          <Home />
        </PageLayout>
      </Router>
    </div>
  );
}
