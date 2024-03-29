document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch random user data from the API
    function fetchRandomUser() {
      return fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
          const user = data.results[0];
          const fullName = `${user.name.first} ${user.name.last}`;
          return {
            name: fullName,
            picture: user.picture.thumbnail,
            email: user.email,
            phone: user.phone,
            address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`
          };
        });
    }
  
    // Function to display contacts in the left part of the contact list
    function displayContacts() {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      const contactList = document.querySelector('.contact-list');
      contactList.innerHTML = '';
  
      contacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact');
        contactElement.innerHTML = `
          <img src="${contact.picture}" alt="${contact.name}" class="contact-image">
          <div class="contact-info">
            <h3 class="contact-name">${contact.name}</h3>
            <p class="contact-email">${contact.email}</p>
            <p class="contact-phone">${contact.phone}</p>
            <p class="contact-address">${contact.address}</p>
          </div>
        `;
        contactList.appendChild(contactElement);
      });
    }
  
    // Event listener for the form submission to add a new contact
    const form = document.querySelector('.custom-form');
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      const newContact = await fetchRandomUser();
      const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      displayContacts();
    });
  
    // Display initial contacts when the page loads
    displayContacts();
  });