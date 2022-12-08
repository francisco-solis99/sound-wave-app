import React from 'react';
import '../styles/components/modals.css';

export default function ModalTop({props}) {

  return (
    <div className="modal fade" id="modalTop" tabIndex={-1} aria-labelledby="modalTopLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header modal-img">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h1 className="modal-title" id="modalTopLabel">{props.topTitle}</h1>
          </div>

          <div className="modal-body">
           
          </div>

        </div>
      </div>
    </div>
  );
}
