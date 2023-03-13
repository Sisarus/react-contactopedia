import React from "react";

class AddContact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessage: undefined,
      successMessage: undefined,
    };
  }

  handleAddContactFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.contactName.value.trim();
    const email = e.target.elements.contactEmail.value.trim();
    const phone = e.target.elements.contactPhone.value.trim();
    const response = this.props.handleAddContact({name: name, email: email, phone: phone});

    if(response.status === 'success'){
      this.setState({errorMessage: undefined, successMessage: response.msg});
      document.querySelector('.contact-form').reset();
    } else {
      this.setState({errorMessage: response.msg, successMessage: undefined});
    }
  };

  render(){
    return(
      <div className="border col-12 text-white p-2">
        <form onSubmit={this.handleAddContactFormSubmit} className="contact-form">
          <div className="row p-2"> 
            <div className="col-12 text-white-50">{this.props.isUpdating? "Update Contact": "Add a new Contact"}</div>
            <div className="col-12 col-md-4 p-1">
              <input className="form-control form-control-sm"
              placeholder="Name..."
              type="text"
              name="contactName"
              defaultValue={this.props.isUpdating? this.props.selectedContact.name : ""}
              ></input>
            </div>
            <div className="col-12 col-md-4 p-1">
              <input className="form-control form-control-sm"
              placeholder="Email..."
              type="text"
              name="contactEmail"
              defaultValue={this.props.isUpdating? this.props.selectedContact.email : ""}
              ></input>
            </div>
            <div className="col-12 col-md-4 p-1">
              <input className="form-control form-control-sm"
              placeholder="Phone..."
              type="text"
              name="contactPhone"
              defaultValue={this.props.isUpdating? this.props.selectedContact.phone : ""}
              ></input>
            </div>
            {this.state.errorMessage===undefined ? (<div></div>):
              <div className="col-12 text-center text-danger">
                {this.state.errorMessage}
              </div>
            }
            {this.state.successMessage===undefined ? (<div></div>):
              <div className="col-12 text-center text-success">
                {this.state.successMessage}
              </div>
            }
            
            <div className={`col-12 p-1 ${this.props.isUpdating?"col-md-4 offset-md-2":"col-md-6 offset-md-3"}`}>
              <button className="btn btn-primary btn-sm form-control">
                {this.props.isUpdating ? 'Update' : 'Create'}
              </button>
            </div>
            {this.props.isUpdating && (
              <div className="col-12 col-md-4 p-1">
                <button className="btn btn-secondary btn-sm form-control">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
};

export default AddContact;