import {
  faFacebook,
  faGooglePlus,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import {} from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <footer
        style={{
          background: "black",
          color: "#888",
          padding: "2rem"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <p className="h5">About Us</p>
              <p>
                Prince Dr. K Vasudevan College of Engineering and Technology is
                promoted by the Prince Educational Society. This College was
                started in 2009 and was approved by the All India Council for
                Technical Education (AICTE).
              </p>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button type="button" className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                </button>
                <button type="button" className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                </button>
                <button type="button" className="btn btn-outline-primary">
                  <FontAwesomeIcon icon={faGooglePlus}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div className="col-sm">
              <p className="h5">Contact Us</p>
              <div
                className="btn-group-vertical"
                role="group"
                aria-label="Basic outlined example"
              >
                <button type="button" className="p-3 btn btn-outline-primary">
                  <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>{" "}
                  Ponmar, Chennai
                </button>
                <button type="button" className="p-3 btn btn-outline-primary">
                  <FontAwesomeIcon icon={faPhoneAlt}></FontAwesomeIcon> +91
                  76447 65667
                </button>
                <button type="button" className="p-3 btn btn-outline-primary">
                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>{" "}
                  mail@princedrkvasudevan.com
                </button>
              </div>
            </div>
            <div className="col-sm">
              <p className="display-4">Prince Group</p>
              <p className="h6">Home | Courses | Campus Life | Admission</p>
              <br />
              <br />
              <a href="https://pradeep-anand-portfolio.herokuapp.com/" target="_blank">Developed by Howdy.in</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
