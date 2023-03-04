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
      contacList:[
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
      ]
    }
  }

  render(){
    return(
      <div>
        <Header/>
        <div className='container' style={{minHeight: '85vh'}}>
          <div className='row py-3'>
            <div className='col-4 offset-2'>
              <AddRandomContact/>
            </div>
            <div className='col-4'>
              <RemoveAllContact/>
            </div>
            <div className='row py-2'>
              <AddContact/>
            </div>
            <div className='row py-2'>
              <FavoriteContacts
              contacts={this.state.contacList.filter((u)=> u.isFavorite===true)}/>
            </div>
            <div className='row py-2'>
              <GeneralContacts
              contacts={this.state.contacList.filter((u)=> u.isFavorite===false)}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default ContactIndex;