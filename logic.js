const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;


const db = mongoose.connect('mongodb://phantom_webacker:asdf1234@ds111065.mlab.com:11065/oauth20',
{useNewUrlParser: true});



// Converts value to lowercase
function toLower(v) {
  return v.toLowerCase();
}


const contactSchema = mongoose.Schema({
  firstname: {
    type: String,
    set: toLower
  },
  lastname: {
    type: String,
    set: toLower
  },
  phone: {
    type: String,
    set: toLower
  },
  email: {
    type: String,
    set: toLower
  }
});

// Define model as an interface with the database
const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contact) => {
  Contact.create(contact, (err) => {
    assert.equal(null, err);
    console.info('New contact added -> ' + contact.firstname);
    mongoose.connection.close();
  });
};

const getContact = (name) => {

  const search = new RegExp(name, 'i');
  Contact.find({
      $or: [{
        firstname: search
      }, {
        lastname: search
      }]
    })
    .exec((err, contact) => {
      assert.equal(null, err);
      console.info(contact);
      console.info(`${contact.length} matches`);
      mongoose.connection.close();
    });
};

const updateContact = (_id, contact) => {
  Contact.update({ _id }, contact)
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Updated successfully');
    mongoose.connection.close();
  });
};


const deleteContact = (_id) => {
  Contact.deleteOne({ _id })
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Deleted successfully');
    mongoose.connection.close();
  });
};

const getContactList = () => {
  Contact.find()
  .exec((err, contacts) => {
    assert.equal(null, err);
    console.info(contacts);
    console.info(`${contacts.length} matches`);
    mongoose.connection.close();
  });
};

module.exports = {
  addContact,
  getContact,
  getContactList,
  updateContact,
  deleteContact
};
