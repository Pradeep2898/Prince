import "./App.css";
import Nav from "./pages/navbar";
import Home from "./pages/home";
import Admission from "./pages/admission";
import Contact from "./pages/contact";
import Campus from "./pages/campus";
import Admin from "./pages/admin";
import Footer from "./pages/footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Nav />
      <Route path={["/", "/home"]} component={Home} exact />
      <Route path="/admission" component={Admission} />
      <Route path="/contact" component={Contact} />
      <Route path="/campus" component={Campus} />
      <Route path="/admin" component={Admin} />
      <Footer />
    </Router>
  );
};

export default App;
