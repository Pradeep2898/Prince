import { Carousel } from "react-bootstrap";
import img2 from "../images/pexels-anastasiya-gepp-1462630.jpg";
import img3 from "../images/ahole.jpg";
import firebase from "../firebase";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [Events, setEvents] = useState([]);
  const [AboutUs, setAboutUs] = useState([]);
  const [Placement, setPlacement] = useState([]);
  const [Alumini, setAlumini] = useState([]);

  const fetchAboutUs = async () => {
    const response = firebase.collection("AboutUs");
    const data = await response.get();
    data.docs.forEach(item => {
      setAboutUs([...AboutUs, item.data()]);
    });
  };
  const fetchEventsList = () => {
    firebase
      .collection("Events")
      .get()
      .then(querySnapshot => {
        const tempDoc = [];
        querySnapshot.forEach(doc => {
          tempDoc.push(doc.data());
        });
        setEvents(tempDoc);
      });
  };
  const fetchPlacementDetails = async () => {
    firebase
      .collection("Placements")
      .get()
      .then(querySnapshot => {
        const tempDoc = [];
        querySnapshot.forEach(doc => {
          tempDoc.push(doc.data());
        });
        setPlacement(tempDoc);
      });
  };
  const fetchAlumini = async () => {
    firebase
      .collection("Alumini")
      .get()
      .then(querySnapshot => {
        const tempDoc = [];
        querySnapshot.forEach(doc => {
          tempDoc.push(doc.data());
        });
        setAlumini(tempDoc);
      });
  };
  useEffect(() => {
    fetchAboutUs();
    fetchEventsList();
    fetchPlacementDetails();
    fetchAlumini();
  }, []);
  return (
    <>
      <div
        className="jumbotron jumbotron-fluid"
        style={{
          backgroundImage: `linear-gradient(150deg, #ffffff 10%, rgba(0, 0, 0, 0)40%), url(${img2})`,
          backgroundSize: "100% 150%",
          backgroundRepeat: "no-repeat",
          height: "30rem"
        }}
      >
        <div className="container">
          <br />
          <br />
          <h1 className="display-4">Prince Group</h1>
          <p className="lead">A place to learn, chance to succeed.</p>
          <a className="btn btn-outline-dark btn-lg" href="#" role="button">
            Learn more
          </a>
        </div>
      </div>

      {/* About Us */}
      <div className="container" style={{ padding: "0rem 0rem 2rem 0rem" }}>
        <p className="h1 text-center">About Us</p>
        <br />
        <div className="row">
          <div className="col-sm">
            {AboutUs &&
              AboutUs.map(AboutUs => {
                return (
                  <div className="blog-container">
                    <p>{AboutUs.desc}</p>
                  </div>
                );
              })}
            <hr />
            <br />
            <br />
            <p className="text-right h6">
              Dr. K. Vasudevan <br />
              Chairman, <br />
              Prince Group of Institutions
            </p>
          </div>
          <div className="col-sm-6">
            <img
              src={img3}
              style={{
                height: "90%",
                width: "85%",
                marginLeft: "10%",
                border: "2px solid black"
              }}
            ></img>
          </div>
        </div>
      </div>

      {/* Placements */}
      <div
        style={{
          padding: "2rem 4rem 2rem 4rem",
          backgroundImage: "linear-gradient(#000099, #0000ff)"
        }}
      >
        <p className="h1 text-center text-light">Placements</p>
        <p className="h5 text-center text-light">
          Our students are placed in some of the top MNCs all over the country.
        </p>
        <br />
        <div
          className="card-columns"
          style={{ padding: "0rem 4rem 0rem 4rem" }}
        >
          <br />
          {Placement &&
            Placement.map(Placement => {
              return (
                <div className="card border-dark">
                  <img
                    className="card-img-top"
                    src={Placement.img}
                    alt="company logo"
                  />
                </div>
              );
            })}
          <div className="card p-4 border-dark">
            <h5 className="card-title">And many other top MNCs.</h5>
            <p className="card-text">See full list.</p>
            <a href="#" className="btn btn-info">
              See All
            </a>
          </div>
        </div>
      </div>

      {/* Events */}
      <div style={{ padding: "2rem 4rem 2rem 4rem" }}>
        <p className="h1 text-center">Events</p>
        <br />
        <div className="row justify-content-center">
          {Events &&
            Events.map(Events => {
              return (
                <div className="col-sm-6 p-1">
                  <div className="card text-center">
                    <div className="card-header text-danger h5">
                      {Events.type}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{Events.name}</h5>
                      <p className="card-text">{Events.detail}</p>
                      <a href="#" className="btn btn-primary">
                        Know More
                      </a>
                    </div>
                    <div className="card-footer text-muted">
                      {Events.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Alumini */}
      <div
        style={{
          backgroundImage: "linear-gradient(#000000, #1a0000)",
          color: "white"
        }}
        className="p-3"
      >
        <p className="h1 text-center">Alumini</p>
        <br />
        <Carousel>
          {Alumini &&
            Alumini.map(Alumini => {
              return (
                <Carousel.Item>
                  <div
                    className="carousel-item text-center active"
                    style={{ height: 600 }}
                  >
                    <img
                      className="rounded-circle"
                      src={Alumini.img}
                      alt={Alumini.name}
                      style={{ width: "25%", height: "50%" }}
                    />
                  </div>
                  <Carousel.Caption>
                    <div className="bottom-center">
                      <h3 className="rounded px-2 py-1 d-inline">
                        <h5 className="mt-4 mb-0">
                          <strong className="text-warning text-uppercase">
                            {Alumini.name}
                          </strong>
                        </h5>
                        <h6>
                          Batch {Alumini.batch} <br />
                          <cite>{Alumini.job}</cite>
                        </h6>
                        <p className="m-0 pt-3 text-white">
                          {Alumini.testimony}
                        </p>
                      </h3>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
