document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const studentFullName = document.getElementById('studentFullName').value;
    const studentNickname = document.getElementById('studentNickname').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentFullName,
                studentNickname
            })
        });

        const data = await response.json();
        
        if (data.success) {
            // Store student info
            sessionStorage.setItem('studentName', data.student.nickname);
            sessionStorage.setItem('classNumber', data.student.class);
            
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            alert('Invalid name or nickname. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Error during login. Please try again.');
    }
}); 