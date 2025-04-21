// JavaScript for the Add Certificate page

document.addEventListener('DOMContentLoaded', () => {
  const certificateForm = document.getElementById('certificate-form');
  const successMessage = document.getElementById('success-message');
  const certificateIdElement = document.getElementById('certificate-id');
  const verifyButton = document.getElementById('verify-button');

  if (certificateForm) {
    // Set default date to today
    const issueDateInput = document.getElementById('issueDate');
    if (issueDateInput) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      issueDateInput.value = formattedDate;
    }

    // Handle form submission
    certificateForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // Disable submit button and show loading state
      const submitButton = certificateForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Processing...`;
      
      try {
        // Collect form data
        const formData = new FormData(certificateForm);
        const certificateData = {
          recipient: formData.get('recipient'),
          email: formData.get('email'),
          course: formData.get('course'),
          issuer: formData.get('issuer'),
          issueDate: formData.get('issueDate'),
          description: formData.get('description') || ''
        };
        
        // Send data to API
        const response = await fetchAPI('/addCertificate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(certificateData)
        });

        // Handle successful response
        if (response.success) {
          // Show success message
          certificateForm.reset();
          
          // Set the certificate ID in the success message
          if (certificateIdElement) {
            certificateIdElement.textContent = response.blockId;
          }
          
          // Show success message
          if (successMessage) {
            successMessage.classList.remove('hidden');
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          
          // Setup verify button
          if (verifyButton) {
            verifyButton.addEventListener('click', () => {
              window.location.href = `verifyCertificate.html?id=${response.blockId}`;
            });
          }
        } else {
          throw new Error(response.message || 'Failed to add certificate');
        }
      } catch (error) {
        console.error('Error adding certificate:', error);
        alert(`Error: ${error.message || 'Failed to add certificate. Please try again.'}`);
      } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    });
  }
});