document.addEventListener('DOMContentLoaded', function() {
    const sharingToggle = document.getElementById('sharingToggle');
    const currentStatus = document.getElementById('currentStatus');
    const studentName = document.getElementById('studentName');
    const continueBtn = document.getElementById('continueBtn');

    // Get student info from session storage
    const studentId = sessionStorage.getItem('studentName');
    const classNumber = sessionStorage.getItem('classNumber');
    
    // Set student name in dashboard
    studentName.textContent = studentId || 'Student';
    
    // Initially disable continue button until sharing preference is set
    continueBtn.disabled = true;
    
    // Set initial neutral state
    sharingToggle.indeterminate = true;
    currentStatus.textContent = 'Please select sharing preference';
    currentStatus.style.color = '#666';

    sharingToggle.addEventListener('change', function(e) {
        // Remove indeterminate state once user makes a choice
        sharingToggle.indeterminate = false;
        const isSharing = e.target.checked;
        updateStatus(isSharing);
        updateSharingPreference(isSharing);
        
        // Enable continue button once preference is set
        continueBtn.disabled = false;
    });

    continueBtn.addEventListener('click', function() {
        // Redirect to appropriate class page
        const classPage = classNumber === '4-1' ? 'class-4-1.html' : 'class-4-2.html';
        window.location.href = classPage;
    });

    function updateStatus(isSharing) {
        currentStatus.textContent = isSharing ? 'Public' : 'Private';
        currentStatus.style.color = isSharing ? '#2196F3' : '#666';
    }

    async function updateSharingPreference(isSharing) {
        try {
            const response = await fetch('/api/update-sharing-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: studentId,
                    sharing: isSharing
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update sharing preference');
            }
        } catch (error) {
            console.error('Error updating sharing preference:', error);
            sharingToggle.checked = !isSharing;
            updateStatus(!isSharing);
        }
    }
}); 