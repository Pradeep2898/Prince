import firebase from "../firebase";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import $ from 'jquery';

const Admin = () => {
  const [Events, setEvents] = useState([]);
  const initstate = { type: "", name: "", detail: "", timestamp: "" };
  const [inputs, setInputs] = useState(initstate);
  const [editing, setEditing] = useState(false);
  const [docID, setDocID] = useState([]);
  const [loading, setLoading] = useState(true);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  useEffect(() => {
    fetchEventsList();
  }, []);

  const fetchEventsList = () => {
    setLoading(true);
    firebase.collection("Events").onSnapshot(snapshot => {
      //You can "listen" to a document with the onSnapshot() method.
      const listItems = snapshot.docs.map(doc => ({
        //map each document into snapshot
        id: doc.id, //id and data pushed into items array
        ...doc.data() //spread operator merges data to id.
      }));
      setEvents(listItems);
      setLoading(false);
    });
  };

  const addEvent = async e => {
    window.$('#staticBackdrop').modal({backdrop: 'static', keyboard: false})  
    setLoading(true);
    e.preventDefault();
    inputs.timestamp =
      "Posted On " +
      (await (new Date().getDate() +
        "/" +
        months[new Date().getMonth()] +
        "/" +
        new Date().getFullYear()));
    setInputs({
      ...inputs
    });
    await firebase
      .collection("Events")
      .add(inputs)
      .then(async documentReference => {
        console.log("new added document reference ID", documentReference.id);
        await setEvents([]);
        setLoading(false);
        setInputs(initstate);
        fetchEventsList();
      })
      .catch(error => {
        setInputs(initstate);
        console.log(error.message);
      });
  };
  const deleteEvent = id => {
    if (window.confirm("Delete this event?")) {
      console.log("deleted document reference ID", id);
      firebase
        .collection("Events")
        .doc(id)
        .delete();
    }
  };
  const editItem = async event => {
    setEditing(true);
    setInputs({
      type: event.type,
      name: event.name,
      detail: event.detail,
      timestamp:
        "Last Edited On " +
        (await (new Date().getDate() +
          "/" +
          months[new Date().getMonth()] +
          "/" +
          new Date().getFullYear()))
    });
    setDocID(event.id);
    console.log(inputs);
  };
  const updateEvent = inputs => {
    window.$('#staticBackdrop').modal({backdrop: 'static', keyboard: false})  
    if (inputs) {
      console.log(
        "It send the item to the updated item function:",
        inputs,
        docID
      );
      setEditing(false);
      setLoading(true);
    }
    firebase
      .collection("Events")
      .doc(docID)
      .update(inputs)
      .then(
        setInputs({
          initstate
        })
      )
      .then(setLoading(false))
      .then(fetchEventsList());
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Modal */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                {editing && "Edit Event"}
                {!editing && "Add Event"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setEditing(false);
                  setInputs(initstate);
                }}
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="type" class="col-form-label">
                    Event Type:
                  </label>
                  <input
                    name="type"
                    type="text"
                    class="form-control"
                    id="type"
                    value={inputs.type}
                    onChange={handleChange}
                    //the below method can be use when there's no name attributes
                    // onChange={e =>
                    //   setInputs({ ...inputs, type: e.target.value })
                    // }
                  />
                </div>
                <div class="mb-3">
                  <label for="name" class="col-form-label">
                    Name:
                  </label>
                  <input
                    name="name"
                    type="text"
                    class="form-control"
                    id="name"
                    value={inputs.name}
                    onChange={e =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Detail:
                  </label>
                  <textarea
                    name="detail"
                    class="form-control"
                    id="message-text"
                    value={inputs.detail}
                    onChange={e =>
                      setInputs({ ...inputs, detail: e.target.value })
                    }
                  ></textarea>
                </div>
                <div class="modal-footer">
                  {editing && (
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={() => updateEvent(inputs)}
                    >
                      Update
                    </button>
                  )}
                  {!editing && (
                    <button
                      type="button"
                      class="btn btn-success"
                      onClick={addEvent}
                      data-bs-dismiss="modal"
                    >
                      Add
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ul
        class="nav nav-tabs nav-justified"
        id="pills-tab"
        role="tablist"
        style={{ padding: "2rem 4rem 0rem 4rem" }}
      >
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active text-primary h4"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Events
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link text-primary h4"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Others
          </button>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div style={{ padding: "0rem 4rem 2rem 4rem" }}>
            <br />
            <p className="h1 text-center text-sm-start">
              Events
              <button
                type="button"
                class="btn btn-warning float-right"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </button>
            </p>
            <br />
            {loading && (
              <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary m-6" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
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
                          <div
                            class="btn-group me-2"
                            role="group"
                            aria-label="First group"
                          >
                            <button
                              type="button"
                              class="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => editItem(Events)}
                            >
                              <FontAwesomeIcon
                                icon={faPenAlt}
                              ></FontAwesomeIcon>
                            </button>
                          </div>
                          <div
                            class="btn-group me-2"
                            role="group"
                            aria-label="Second group"
                          >
                            <button
                              type="button"
                              class="btn btn-danger"
                              onClick={() => deleteEvent(Events.id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                              ></FontAwesomeIcon>
                            </button>
                          </div>
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
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <h2>Other Details to update like alumini and placements detail</h2>
        </div>
      </div>
    </>
  );
};

export default Admin;
