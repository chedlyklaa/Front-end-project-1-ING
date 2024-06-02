$(document).ready(function() {
  // Déclarations
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];// Add this function to your JavaScript (in script.js)
    // Fonctions
    function toggleSelected(index) {
        var contact = $(`.contact[data-index="${index}"]`);
        if (contact.hasClass('selected')) {
          contact.removeClass('selected');
          $('#contact-details').empty(); // Hide contact details
        } else {
          $('.contact').removeClass('selected');
          contact.addClass('selected');
          displayContactDetails(index); // Show contact details
        }
      }
      
      // Appel de toggle
      $(document).ready(function() {
        $(document).on('click', '.contact', function() {
          var index = $(this).data('index');
          toggleSelected(index).slideDown();
        });
      });
    //show contacts 
    function displayContacts() {
      contacts.sort(function(a, b) {
        const nameComparison = a.firstName.localeCompare(b.firstName);
        
        if (nameComparison === 0) {
          return a.phoneNumber.localeCompare(b.phoneNumber);
        }
        
        return nameComparison;
      });
  
      let contactsContainer = $('#contactlist');
      contactsContainer.empty();
  
      if (contacts.length) {
        $('#aucun').hide();
        contacts.forEach(function(contact, index) {
            contactsContainer.append(`<div class="contact" data-index="${index}" onclick="toggleSelected(${index})">${contact.firstName} ${contact.lastName}</div>`);
        });
      } else {
        contactsContainer.append(`<p class="no-contacts" id="aucun">Aucun contact pour le moment</p>`);
      }
    }
  
    displayContacts();
  
  
    $(document).on('click', '.contact', function() {
        let index =-1;
        console.log(index)
        index = $(this).data('index');
      displayContactDetails(index);
    });
  //ajouter une fonction ajout et une fonction modify pour form contact 
    $('#form-contact').submit(function(event) {
        event.preventDefault();
      
        let civilite = $('#civilite').val();
        let prenom = $('#prenom').val();
        let nom = $('#nom').val();
        let telephone = $('#telephone').val();
      
        // Check if the contact already exists
        let index = $(this).data('index') ;
        console.log(index)
        if (index > -1) {
            console.log("Ce contact existe déjà.");
          contacts[index].lastName = nom;
          contacts[index].firstName = prenom;
          contacts[index].civilite = civilite;
          contacts[index].phoneNumber = telephone;
        } else {
            console.log("Nouveau contact");
          // If the contact doesn't exist, add it
          let newContact = {
            civilite: civilite,
            firstName: prenom,
            lastName: nom,
            phoneNumber: telephone
          };
          contacts.push(newContact);
        }
        localStorage.setItem('contacts', JSON.stringify(contacts));
      
        displayContacts();
      
        $('#form-contact')[0].reset();
        $('#formulaire-contact').hide();
         $('#form-contact').data('index', index);
      });

  
      
  //effacer
    $('#effacer').click(function() {
      localStorage.removeItem('contacts');
      contacts = [];
      displayContacts();
    });


  //ajouter
    $('#ajouter').click(function() {
      $('#form-contact').data('index', -1);
      $('#contact-details').empty();
      $('#formulaire-contact').slideDown();
    });
  

    //annulation
    $('#btn-annuler').click(function() {
      $('#form-contact')[0].reset();
      $('#formulaire-contact').slideUp();
    });




    // Fonction pour afficher les détails d'un contact
    function displayContactDetails(index) {
        let contact = contacts[index];
        let detailsHtml = `
            <div class="contact-details" data-index="${index}">
                <h2 >Detail du contact</h2>
                <p class="details-item"><strong> ${contact.civilite} ${contact.firstName} ${contact.lastName}</strong></p>
                <p class="details-item"><strong>Téléphone:</strong> ${contact.phoneNumber}</p>
                <button class="edit-contact" data-index="${index}">Editer le contact</button>
            </div>
        `;
        $('#contact-details').html(detailsHtml);
        $('#formulaire-contact').hide();
    }


    
// Gérer le clic sur "Editer le contact"
$(document).on('click', '.edit-contact', function() {
    // Clear the contact details
    $('#contact-details').empty();
    
    let index = $(this).data('index');
    console.log("this is the initial index ")
    console.log(index)
    let contact = contacts[index];
    $('#form-contact').data('index', index);
    //ancien valeur
    $('#civilite').val(contact.civilite);
    $('#prenom').val(contact.firstName);
    $('#nom').val(contact.lastName);
    $('#telephone').val(contact.phoneNumber);
    
    // Show the formulaire-contact form
    $('#formulaire-contact').slideDown();
});

  });