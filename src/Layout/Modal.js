import React from "react";

export const Modal = (props) => {
  return (
    <div
      //   className={`${props.showModal ? "" : "modal fade"}`}
      style={{
        display: `${props.showModal ? "" : "node"}`,
        zIndex: `${props.showModal ? "3" : ""}`,
        width: "100%",
        height: "100%",
      }}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <h3 className="modal-body">{props.text}</h3>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
