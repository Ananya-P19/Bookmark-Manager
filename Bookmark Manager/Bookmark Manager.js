    // 1. Google Login Callback (The Popup window uses this)
function handleCredentialResponse(response) {
         console.log("Encoded JWT ID token: " + response.credential);
     // Send this token to your server to verify and log the user in
    console.log("Login Success!");
    // Hide login card and show dashboard
    document.getElementById("login-card").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
     
    // Remember login state
     localStorage.setItem('isLoggedIn', 'true');
     renderBookmarks();
   }
   // 2. Add Bookmark Logic
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', () => {
    const title = document.getElementById('siteTitle').value;
    const url = document.getElementById('siteUrl').value;

    if (!title || !url) return alert("Please fill in both fields");

    const bookmark = { title, url };
    
    // Save to LocalStorage
    let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
    bookmarks.push(bookmark);
    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));

    document.getElementById('siteTitle').value = '';
    document.getElementById('siteUrl').value = '';
    renderBookmarks();
});

// 3. Function to display bookmarks
function renderBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];

list.innerHTML = bookmarks.map((bm, index) => `
        <div class="bookmark-item">
            <strong>${bm.title}</strong><br>
            <a href="${bm.url}" target="_blank">Visit Site</a>
        </div>
    `).join('');
}
// 4. Sign Out Logic
document.getElementById('signOutBtn').onclick = function() {
    localStorage.removeItem('isLoggedIn');
    location.reload(); // Resets the page and Google button
};

// 5. Check login on startup
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById("login-card").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        renderBookmarks();
    }
};