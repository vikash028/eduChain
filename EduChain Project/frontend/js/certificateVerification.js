// JavaScript for the Verify Certificate page

document.addEventListener('DOMContentLoaded', () => {
  const verifyForm = document.getElementById('verify-form');
  const certificateIdInput = document.getElementById('certificate-id-input');
  const verificationResults = document.getElementById('verification-results');
  const certificateValid = document.getElementById('certificate-valid');
  const certificateInvalid = document.getElementById('certificate-invalid');
  const certificateDetails = document.getElementById('certificate-details');
  
  // Check for certificate ID in URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const certificateId = urlParams.get('id');
  
  if (certificateId && certificateIdInput) {
    certificateIdInput.value = certificateId;
    // Automatically verify the certificate from URL parameter
    setTimeout(() => {
      verifyForm.dispatchEvent(new Event('submit'));
    }, 500);
  }
  
  if (verifyForm) {
    verifyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const idToVerify = certificateIdInput.value.trim();
      if (!idToVerify) {
        alert('Please enter a certificate ID');
        return;
      }
      
      // Show loading state
      const submitButton = verifyForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Verifying...`;
      
      // Reset previous results
      verificationResults.classList.add('hidden');
      certificateValid.classList.add('hidden');
      certificateInvalid.classList.add('hidden');
      certificateDetails.classList.add('hidden');
      
      try {
        // Call the API to verify the certificate
        const response = await fetchAPI(`/verifyCertificate/${idToVerify}`);
        
        // Show verification results
        verificationResults.classList.remove('hidden');
        
        if (response.success) {
          // Certificate is valid
          certificateValid.classList.remove('hidden');
          
          // Display certificate details
          const certificate = response.certificate;
          
          document.getElementById('cert-recipient').textContent = certificate.data.recipient || 'N/A';
          document.getElementById('cert-email').textContent = certificate.data.email || 'N/A';
          document.getElementById('cert-course').textContent = certificate.data.course || 'N/A';
          document.getElementById('cert-issuer').textContent = certificate.data.issuer || 'N/A';
          document.getElementById('cert-date').textContent = formatDate(certificate.data.issueDate) || 'N/A';
          document.getElementById('cert-description').textContent = certificate.data.description || 'N/A';
          document.getElementById('cert-id').textContent = certificate.id || 'N/A';
          document.getElementById('cert-timestamp').textContent = formatTimestamp(certificate.timestamp) || 'N/A';
          
          certificateDetails.classList.remove('hidden');
          
          // Scroll to results
          verificationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Certificate is invalid
          certificateInvalid.classList.remove('hidden');
        }
      } catch (error) {
        console.error('Verification error:', error);
        
        // Show error message
        verificationResults.classList.remove('hidden');
        certificateInvalid.classList.remove('hidden');
      } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    });
  }
});