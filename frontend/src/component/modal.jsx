import React from 'react'

const Modal = () => {
    const note={
        author: "John Doe",
        title: "My First Note",
        description: "This is a simple note",
        tag: "Technology"
    }
  return (
    <div>
          <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="">
                <label htmlFor="author">Author Name</label>
                <input
                  type="text"
                  value={note.author}
                  className="form-control"
                  id="author"
                  name="author"
                // onChange={onchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={note.title}
                  className="form-control"
                  id="title"
                  name="title"
                 // onChange={onchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  type="text"
                  className="form-control"
                  value={note.description}
                  id="description"
                  name="description"
                 // onChange={onchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  value={note.tag}
                 // onChange={onchange}
                />
              </div>{" "}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {/* add author field in code upper */}
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  // ref1.current.click(); || us
                //   return updateNotes(
                //     note._id,
                //     note.author,
                //     note.title,
                //     note.description,
                //     note.tag
                //   );
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

  )
}

export default Modal