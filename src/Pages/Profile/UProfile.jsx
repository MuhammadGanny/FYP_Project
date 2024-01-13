// components/UserProfile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId, userType }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState({
    // Initialize with default values or fetched values if needed
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile/profile');
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchUserProfile();
  }, [userId]);


  const handleUpdateProfile = async () => {
    try {
      await axios.put('http://localhost:5000/profile/update-profile', {
        userId,
        updatedProfileData,
      });
      setIsEditing(false);
      // Fetch updated user data after the profile update
      const response = await axios.get('http://localhost:5000/profile/profile');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      {userData ? (
        <>
          <h1>User Profile</h1>
          {isEditing ? (
            <>
              {/* Render editable profile fields based on userType */}
              {userType === 'student' && (
                <div>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={updatedProfileData.name || userData.name || ''}
                      onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, name: e.target.value })}
                    />
                  </label>
                  {/* ... other fields */}
                </div>
              )}
              {userType === 'company' && (
                <div>
                  <label>
                    Company Name:
                    <input
                      type="text"
                      value={updatedProfileData.companyName || userData.companyName || ''}
                      onChange={(e) => setUpdatedProfileData({ ...updatedProfileData, companyName: e.target.value })}
                    />
                  </label>
                  {/* ... other fields */}
                </div>
              )}
              <button onClick={handleUpdateProfile}>Save Changes</button>
            </>
          ) : (
            <>
              {/* Render non-editable profile fields */}
              {userType === 'student' && (
                <div>
                  <p>Name: {userData.name}</p>
                  {/* ... other fields */}
                </div>
              )}
              {userType === 'company' && (
                <div>
                  <p>Company Name: {userData.companyName}</p>
                  {/* ... other fields */}
                </div>
              )}
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          )}
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
