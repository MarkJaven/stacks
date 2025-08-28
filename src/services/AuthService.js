// src/services/AuthService.js
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';

export const AuthService = {
  // Sign up new user with email/password
  async signUp(email, password, displayName = '') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName && displayName.trim()) {
        await updateProfile(userCredential.user, {
          displayName: displayName.trim()
        });
      }
      
      return { 
        success: true, 
        user: userCredential.user, 
        error: null 
      };
    } catch (error) {
      return { 
        success: false, 
        user: null, 
        error: this.getErrorMessage(error.code) 
      };
    }
  },

  // Sign in existing user with email/password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { 
        success: true, 
        user: userCredential.user, 
        error: null 
      };
    } catch (error) {
      return { 
        success: false, 
        user: null, 
        error: this.getErrorMessage(error.code) 
      };
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      // Add custom parameters for better UX
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const userCredential = await signInWithPopup(auth, provider);
      console.log('✅ Google sign-in successful:', userCredential.user.email);
      
      return { 
        success: true, 
        user: userCredential.user, 
        error: null 
      };
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      return { 
        success: false, 
        user: null, 
        error: this.getGoogleErrorMessage(error.code) 
      };
    }
  },

  // Send password reset email
  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent successfully to:', email);
      return { 
        success: true, 
        error: null 
      };
    } catch (error) {
      console.error('❌ Firebase password reset error:', error);
      return { 
        success: false, 
        error: this.getErrorMessage(error.code) 
      };
    }
  },

  // Confirm password reset (when user clicks email link)
  async confirmPasswordReset(oobCode, newPassword) {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      return { 
        success: true, 
        error: null 
      };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error.code) 
      };
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      return { 
        success: true, 
        error: null 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Helper function to convert Firebase error codes to user-friendly messages
  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/invalid-action-code': 'This reset link is invalid or has expired.',
      'auth/expired-action-code': 'This reset link has expired. Please request a new one.',
    };

    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  },

  // Helper function for Google-specific error messages
  getGoogleErrorMessage(errorCode) {
    const googleErrorMessages = {
      'auth/popup-closed-by-user': 'Sign-in cancelled. Please try again.',
      'auth/popup-blocked': 'Popup blocked by browser. Please allow popups and try again.',
      'auth/cancelled-popup-request': 'Sign-in cancelled. Please try again.',
      'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in method.',
      'auth/auth-domain-config-required': 'Configuration error. Please contact support.',
      'auth/operation-not-allowed': 'Google sign-in is not enabled. Please contact support.',
      'auth/operation-not-supported-in-this-environment': 'Google sign-in is not supported in this browser environment.',
      'auth/unauthorized-domain': 'This domain is not authorized for Google sign-in.',
    };

    return googleErrorMessages[errorCode] || this.getErrorMessage(errorCode);
  }
};