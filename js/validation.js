// Shared validation functions for forms

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength (at least 8 characters, one uppercase, one lowercase, one number)
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Check if passwords match
function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Validate phone number (basic Nigerian format)
function validatePhone(phone) {
  const phoneRegex = /^(\+234|0)[789]\d{9}$/;
  return phoneRegex.test(phone);
}

// Show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId + '-error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

// Hide error message
function hideError(elementId) {
  const errorElement = document.getElementById(elementId + '-error');
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

// Clear all errors in a form
function clearErrors(form) {
  const errors = form.querySelectorAll('.error-message');
  errors.forEach(error => error.style.display = 'none');
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success mt-3';
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 5000);
}

// Show error message globally
function showGlobalError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger mt-3';
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// AJAX form submission
function submitForm(form, url, successCallback) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (successCallback) {
      successCallback(data);
    } else {
      showSuccess('Form submitted successfully!');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showGlobalError('An error occurred. Please try again.');
  });
}
