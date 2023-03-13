import React from 'react';
import Header from '../Layout/Header';
import AddRandomContact from './AddRandomContact';
import RemoveAllContact from './RemoveAllContact';
import AddContact from './AddContact';
import FavoriteContacts from './FavoriteContacts';
import GeneralContacts from './GeneralContacts';
import Footer from '../Layout/Footer';

class ContactIndex extends React.Component{
  constructor(props){
    super(props);
    this.state={
      contactList:[
        {
          id: 1,
          name: "Leslie Knope",
          phone: "1234567",
          email: "Leslie.Knope@pawnee.com",
          isFavorite: false,
        },
        {
          id: 2,
          name: "Ron Swanson",
          phone: "1234567",
          email: "Ron.Swanson@pawnee.com",
          isFavorite: true,
        },
        {
          id: 3,
          name: "April Ludgate",
          phone: "1234567",
          email: "April.Ludgate@pawnee.com",
          isFavorite: false,
        }
      ],
      selectedContact: undefined,
      isUpdating: false
    };
  }

  handleAddContact = (newContact) => {
    if(newContact.name===""){
      return {status: 'failure', msg:"Pleace Enter a valid name"};
    } else if(newContact.phone===""){
      return {status: 'failure', msg:"Pleace Enter a Phone number"};
    }
    const duolicateRecord = this.state.contactList.filter((x) => {
      if(x.name === newContact.name && x.phone === newContact.phone) {
        return true;
      }
    });

    if(duolicateRecord.length > 0) {
      return {status: 'failure', msg:'Duplicate Record'};
    } else{
      const newFinalContact = {
        ...newContact,
        id: this.state.contactList[this.state.contactList.length-1].id + 1,
        isFavorite: false,
      };
      this.setState((prevState)=>{
        return{
          contactList: prevState.contactList.concat([newFinalContact])
        };
      });
      return {status: 'success', msg: 'Contact was added successfully'};
    }
  };

  handleUpdateContact = (updatedContact) => {
    console.log(updatedContact);
    if(updatedContact.name === "") {
      return {status: 'failure', msg:"Pleace Enter a valid name"};
    } else if(updatedContact.phone===""){
      return {status: 'failure', msg:"Pleace Enter a Phone number"};
    }
    this.setState((prevState) => {
      return{
        contactList: prevState.contactList.map((obj) => {
          if(obj.id === Number(updatedContact.id)) {
            return{
              ...obj,
              name: updatedContact.name,
              email: updatedContact.email,
              phone: updatedContact.phone,
            }
          }
          return obj;
        }),
        isUpdating: false,
        selectedContact: undefined
      };
    });
    return {status: 'success', msg: 'Contact was updated successfully'};
  };

  handleToggleFavorites = (contact) => {
    // console.log(contact);
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if(obj.id === contact.id) {
            return {...obj, isFavorite: !obj.isFavorite};
          }
          return obj;
        })
      };
    });
  };

  handleDeleteContact = (contact) => {
    console.log('Delete ' + contact);
    this.setState((prevState) => {
      return {
          contactList: prevState.contactList.filter((obj) => {
          return obj.id !== contact.id;
        })
      };
    });
  };

  handleAddRandomContact = (newContact) => {
    const newFinalContact = {
      ...newContact,
      id: this.state.contactList[this.state.contactList.length-1].id + 1,
      isFavorite: false,
    };
    this.setState((prevState)=>{
      return{
        contactList: prevState.contactList.concat([newFinalContact])
      };
    });
  };

  handleRemoveAllContacts = () => {
    this.setState((prevState) => {
      return {
        contactList:[]
      };
    });
  };

  
  handleUpdateClick = (contact) => {
    console.log(contact);
    this.setState((prevState) => {
      return {
        selectedContact: contact,
        isUpdating: true
      };
    });
  };  
  
  handleCancelUpdateContact = () => {
    this.setState((prevState) => {
      return {
        selectedContact: undefined,
        isUpdating: false
      };
    });
  };  

  render(){
    return(
      <div>
        <Header/>
        <div className='container' style={{minHeight: '85vh'}}>
          <div className='row py-3'>
            <div className='col-4 offset-2 row'>
              <AddRandomContact
              handleAddRandomContact={this.handleAddRandomContact}/>
            </div>
            <div className='col-4 row'>
              <RemoveAllContact handleRemoveAllContacts={this.handleRemoveAllContacts}/>
            </div>
            <div className='row py-2'>
              <div className='col-8 offset-2 row'>
                <AddContact
                isUpdating={this.state.isUpdating}
                selectedContact={this.state.selectedContact}
                handleAddContact={this.handleAddContact}
                cancelUpdateContact={this.handleCancelUpdateContact}
                handleUpdateContact={this.handleUpdateContact}
                />
              </div>
            </div>
            <div className='row py-2'>
              <div className='col-8 offset-2 row'>
                <FavoriteContacts
                contacts={this.state.contactList.filter((u)=> u.isFavorite===true)}
                favoriteClick={this.handleToggleFavorites}
                deleteClick={this.handleDeleteContact}
                updateClick={this.handleUpdateClick}
                />
              </div>
            </div>
            <div className='row py-2'>
              <div className='col-8 offset-2 row'>
                <GeneralContacts
                contacts={this.state.contactList.filter((u)=> u.isFavorite===false)}
                favoriteClick={this.handleToggleFavorites}
                deleteClick={this.handleDeleteContact}
                updateClick={this.handleUpdateClick}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default ContactIndex;