// Vercel Configuration for MediCare Website

// Initialize form handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('Vercel configuration initialized');
    
    // Setup event listeners for form functionality
    setupAppointmentForm();
    setupContactForm();
    setupUserAnalytics();
});

// Function to handle appointment form submission
function setupAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading indicator
            const submitBtn = appointmentForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            const formData = new FormData(appointmentForm);
            const appointmentData = {
                id: generateUniqueId(),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                date: formData.get('date'),
                time: formData.get('time'),
                doctor: formData.get('doctor'),
                message: formData.get('message'),
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            
            // In production, this would call the Vercel API endpoint
            // For demonstration, we'll simulate a successful response
            setTimeout(function() {
                try {
                    // Store appointment data locally for demo purposes
                    storeAppointmentLocally(appointmentData);
                    
                    // When deployed to Vercel, uncomment this code to use the API route
                    /*
                    fetch('/api/appointments', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(appointmentData)
                    });
                    */
                    
                    // Show success message
                    showMessage('success', 'Appointment request submitted successfully! We will contact you shortly.');
                    appointmentForm.reset();
                    
                    // Track appointment submission event
                    trackEvent('appointment_submitted', {
                        doctor: appointmentData.doctor,
                        date: appointmentData.date
                    });
                } catch (error) {
                    console.error('Error processing appointment:', error);
                    showMessage('error', 'An error occurred while processing your request. Please try again.');
                } finally {
                    // Restore button state
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }, 1000); // Simulate network delay of 1 second
        });
    }
}

// Function to handle contact form submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading indicator
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            const contactData = {
                id: generateUniqueId(),
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                status: 'unread',
                createdAt: new Date().toISOString()
            };
            
            // In production, this would call the Vercel API endpoint
            // For demonstration, we'll simulate a successful response
            setTimeout(function() {
                try {
                    // Store contact data locally for demo purposes
                    storeContactLocally(contactData);
                    
                    // When deployed to Vercel, uncomment this code to use the API route
                    /*
                    fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contactData)
                    });
                    */
                    
                    // Show success message
                    showMessage('success', 'Your message has been sent successfully! We will get back to you soon.');
                    contactForm.reset();
                    
                    // Track contact form submission event
                    trackEvent('contact_form_submitted', {
                        subject: contactData.subject
                    });
                } catch (error) {
                    console.error('Error processing message:', error);
                    showMessage('error', 'An error occurred while processing your message. Please try again.');
                } finally {
                    // Restore button state
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }, 1000); // Simulate network delay of 1 second
        });
    }
}

// Function to track user analytics
function setupUserAnalytics() {
    // Track page views
    trackEvent('page_view', {
        page: window.location.pathname,
        referrer: document.referrer
    });
    
    // Track navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', {
                link: this.getAttribute('href'),
                text: this.textContent
            });
        });
    });
    
    // Track CTA button clicks
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                text: this.textContent,
                location: getElementPath(this)
            });
        });
    });
}

// Helper function to generate a unique ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Helper function to get element path for analytics
function getElementPath(element) {
    let path = '';
    let currentElement = element;
    
    while (currentElement && currentElement !== document.body) {
        let selector = currentElement.tagName.toLowerCase();
        if (currentElement.id) {
            selector += '#' + currentElement.id;
        } else if (currentElement.className) {
            selector += '.' + currentElement.className.replace(/\s+/g, '.');
        }
        path = selector + (path ? ' > ' + path : '');
        currentElement = currentElement.parentElement;
    }
    
    return path;
}

// Helper function to track events
function trackEvent(eventName, attributes) {
    console.log('Event tracked:', eventName, attributes);
    
    // Store event in local storage for demo purposes
    const events = JSON.parse(localStorage.getItem('medicare_analytics') || '[]');
    events.push({
        eventName,
        attributes,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('medicare_analytics', JSON.stringify(events));
}

// Helper functions to store data locally (for demo purposes)
function storeAppointmentLocally(appointmentData) {
    const appointments = JSON.parse(localStorage.getItem('medicare_appointments') || '[]');
    appointments.push(appointmentData);
    localStorage.setItem('medicare_appointments', JSON.stringify(appointments));
}

function storeContactLocally(contactData) {
    const contacts = JSON.parse(localStorage.getItem('medicare_contacts') || '[]');
    contacts.push(contactData);
    localStorage.setItem('medicare_contacts', JSON.stringify(contacts));
}

// Helper function to show success/error messages
function showMessage(type, message) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `alert alert-${type}`;
    messageContainer.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(messageContainer, form);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            messageContainer.remove();
        }, 5000);
    }
}
