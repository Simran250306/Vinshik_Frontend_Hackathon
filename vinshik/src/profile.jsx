import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { 
  updateProfile, 
  updateEmail, 
  updatePassword, 
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form states
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || "");
        setEmail(user.email || "");
        setPhotoPreview(user.photoURL || "");
        setLoading(false);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const updateUserProfile = async () => {
    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const updates = {};
      
      // Update display name if changed
      if (displayName !== user.displayName) {
        updates.displayName = displayName;
      }

      // Update profile photo if selected
      if (profilePhoto) {
        // In a real app, you'd upload to Firebase Storage
        // For now, we'll use a data URL
        updates.photoURL = photoPreview;
      }

      // Apply updates
      if (Object.keys(updates).length > 0) {
        await updateProfile(user, updates);
        setSuccess("Profile updated successfully!");
      }

      // Update email if changed
      if (email !== user.email) {
        await updateEmail(user, email);
        setSuccess("Email updated successfully!");
      }

      // Update password if provided
      if (newPassword && currentPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error("New passwords don't match");
        }

        // Re-authenticate before password change
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        
        setSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setUpdating(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/requires-recent-login':
        return 'Please log out and log back in to make these changes.';
      case 'auth/wrong-password':
        return 'Current password is incorrect.';
      case 'auth/email-already-in-use':
        return 'Email is already in use by another account.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return 'An error occurred while updating your profile.';
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Profile Settings</h1>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
        </div>

        <div className="profile-content">
          {/* Profile Photo Section */}
          <div className="profile-photo-section">
            <div className="photo-container">
              <img 
                src={photoPreview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                alt="Profile" 
                className="profile-photo"
              />
              <div className="photo-overlay">
                <label htmlFor="photo-input" className="photo-upload-btn">
                  📷
                </label>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password (required for changes)"
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (optional)"
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="profile-actions">
              <button 
                className="update-btn" 
                onClick={updateUserProfile}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
              
              <button 
                className="signout-btn" 
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
