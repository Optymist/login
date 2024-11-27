document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');

    if (username) {
        document.getElementById('welcome-message').textContent = `Welcome, ${username}!`;
    } else {
        alert('No username found. Redirecting to login.');
        window.location.href = "/";
    }
})

document.getElementById('sign-out').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/login.html';
});

document.getElementById('deregister').addEventListener('click', async () => {
    const email = localStorage.getItem('email');

    if (confirm('Are you sure you want to deregister?')) {
        try {
            const response = await fetch('http://localhost:3000/deregister', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email}),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.clear();
                window.location.href = '/login.html';
            } else {
                alert(result.message || 'Error deregistering account.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deregistering');
        }
    }
});