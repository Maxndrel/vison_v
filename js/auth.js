// Auth module for handling user registration and login using localStorage

// Key for storing users array in localStorage
const USERS_KEY = 'visionV_users';
const CURRENT_USER_KEY = 'visionV_currentUser';

// Get users array from localStorage
function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Save users array to localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Signup function
function signup(userData) {
  const users = getUsers();
  const { name, email, phone, password } = userData;

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  // Add new user
  const newUser = { name, email, phone, password };
  users.push(newUser);
  saveUsers(users);

  return { success: true, message: 'Account created successfully!' };
}

// Login function
function login(email, password) {
  const users = getUsers();
  const user = users.find(user => user.email === email);

  if (!user) {
    throw new Error('User not found.');
  }

  if (user.password !== password) {
    throw new Error('Invalid password.');
  }

  // Set current user
  localStorage.setItem(CURRENT_USER_KEY, email);

  return { success: true, message: 'Login successful!' };
}

// Logout function (for future use)
function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Get current user
function getCurrentUser() {
  const email = localStorage.getItem(CURRENT_USER_KEY);
  if (email) {
    const users = getUsers();
    return users.find(user => user.email === email);
  }
  return null;
}

// Export functions for use in other scripts
window.Auth = {
  signup,
  login,
  logout,
  getCurrentUser
};
