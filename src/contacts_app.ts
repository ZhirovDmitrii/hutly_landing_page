document.addEventListener('DOMContentLoaded', () => {
    const contactButtons = document.querySelectorAll('.contact-us-button');
    const closeFormButton = document.querySelector('.close-btn');
    const contactForm = document.querySelector('.contact-form');
    const contactFormContainer = document.querySelector('.contact-form-container');

    if (contactButtons.length > 0) {
        contactButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (contactFormContainer) {
                    contactFormContainer.classList.remove('hidden');
                    contactFormContainer.scrollIntoView({behavior: 'smooth'})
                }
            });
        });
    }

    if (closeFormButton) {
        closeFormButton.addEventListener('click', function () {
            if (contactFormContainer) {
                contactFormContainer.classList.add('hidden');
            }
            window.scrollTo({top: 0, behavior: 'smooth'})
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const contact = {
                firstName: (document.querySelector('.first-name') as HTMLInputElement).value,
                lastName: (document.querySelector('.last-name') as HTMLInputElement).value,
                email: (document.querySelector('.email') as HTMLInputElement).value,
                phone: (document.querySelector('.phone') as HTMLInputElement).value,
                message: (document.querySelector('.message') as HTMLTextAreaElement).value
            };

            console.log('Submitting contact:', contact);

            fetch('https://hutly-landing-page-back.onrender.com/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            })
                .then(response => {
                    console.log('Response:', response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    alert('Contact submitted successfully');
                    (contactForm as HTMLFormElement).reset();
                    if (contactFormContainer) {
                        contactFormContainer.classList.add('hidden');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem with your submission: ' + error.message);
                });
        });
    }
});