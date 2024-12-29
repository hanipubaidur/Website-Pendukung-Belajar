document.addEventListener('DOMContentLoaded', function() {
    const profileInfo = document.getElementById('profile-info');
    if (!profileInfo) {
        console.error('Profile info element not found!');
        return; // Hentikan eksekusi jika elemen tidak ditemukan
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const profilePicture = user.profilePicture ? user.profilePicture : 'Assets/profile.jpeg';
        document.getElementById('profile-picture-preview').src = profilePicture;

        const dateOfBirth = user.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${user.dateOfBirth}</p>` : '';
        const hobbies = user.hobbies ? `<p><strong>Hobbies:</strong> ${user.hobbies}</p>` : '';
        const bio = user.bio ? `<p><strong>Bio:</strong> ${user.bio}</p>` : '';

        profileInfo.innerHTML = `
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Nickname:</strong> ${user.nickname}</p>
            <p><strong>Password:</strong> ${user.password}</p>
            ${dateOfBirth}
            ${hobbies}
            ${bio}
        `;

        // Load user data into the modal
        document.getElementById('modal-profile-picture-preview').src = user.profilePicture || 'Assets/profile.jpeg';
        document.getElementById('modal-edit-username').value = user.username;
        document.getElementById('modal-edit-nickname').value = user.nickname;
        document.getElementById('modal-edit-password').value = user.password;
        document.getElementById('modal-date-of-birth').value = user.dateOfBirth || '';
        document.getElementById('modal-hobbies').value = user.hobbies || '';
        document.getElementById('modal-bio').value = user.bio || '';

        // Change register link to logout
        const registerNavLink = document.getElementById('register-nav-link');
        if (registerNavLink) {
            registerNavLink.textContent = 'Logout';
            registerNavLink.href = '#';
            registerNavLink.addEventListener('click', function() {
                localStorage.removeItem('user');
                window.location.href = 'register.html';
            });
        }
    } else {
        profileInfo.innerHTML = '<p>No user information found. Please register first.</p>';
    }

    const modalProfilePictureFile = document.getElementById('modal-profile-picture-file');
    if (modalProfilePictureFile) {
        modalProfilePictureFile.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('modal-profile-picture-preview').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const profilePictureFile = document.getElementById('modal-profile-picture-file').files[0];
            const dateOfBirth = document.getElementById('modal-date-of-birth').value.trim();
            const hobbies = document.getElementById('modal-hobbies').value.trim();
            const bio = document.getElementById('modal-bio').value.trim();
            const username = document.getElementById('modal-edit-username').value.trim();
            const nickname = document.getElementById('modal-edit-nickname').value.trim();
            const password = document.getElementById('modal-edit-password').value.trim();
            const user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                if (profilePictureFile) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        user.profilePicture = e.target.result;
                        saveUserProfile();
                    };
                    reader.readAsDataURL(profilePictureFile);
                } else {
                    saveUserProfile();
                }

                function saveUserProfile() {
                    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
                    user.hobbies = hobbies || user.hobbies;
                    user.bio = bio || user.bio;
                    user.username = username || user.username;
                    user.nickname = nickname || user.nickname;
                    user.password = password || user.password;
                    localStorage.setItem('user', JSON.stringify(user));
                    alert('Profile updated successfully!');
                    document.getElementById('edit-profile-form').reset();
                    window.location.reload();
                }
            } else {
                alert('No user found. Please login first.');
            }
        });
    }
});