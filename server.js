const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3001;  // Keep your existing port

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files
app.use(express.static(__dirname));

// In-memory storage (replace with a database in production)
const sharingPreferences = new Map();

// Store student work visibility (in a real app, this would be in a database)
const studentWork = new Map();

// Add near the top with other storage
const pageViews = new Map();

// Add this function to load and parse student data
async function loadStudentData() {
    try {
        const class41Data = await fs.readFile(path.join(__dirname, 'data', 'class-4-1-students.txt'), 'utf8');
        const class42Data = await fs.readFile(path.join(__dirname, 'data', 'class-4-2-students.txt'), 'utf8');
        
        // Parse the text files and create a map of nickname -> student data
        const students = new Map();
        
        [class41Data, class42Data].forEach((classData, index) => {
            const className = index === 0 ? '4-1' : '4-2';
            classData.split('\n').forEach(line => {
                if (line.trim()) {
                    const [fullName, nickname] = line.split('\t').map(s => s.trim());
                    students.set(nickname, {
                        fullName,
                        nickname,
                        class: className
                    });
                }
            });
        });
        
        return students;
    } catch (error) {
        console.error('Error loading student data:', error);
        return new Map();
    }
}

// Add this debug function at the top
function debugLog(message, data) {
    console.log('DEBUG:', message, JSON.stringify(data, null, 2));
}

// Modify the login endpoint
app.post('/api/login', async (req, res) => {
    const { studentFullName, studentNickname } = req.body;
    
    const students = await loadStudentData();
    const student = students.get(studentNickname);
    
    if (student && student.fullName.toLowerCase() === studentFullName.toLowerCase()) {
        res.json({
            success: true,
            student: {
                nickname: student.nickname,
                class: student.class
            }
        });
    } else {
        res.status(401).json({
            success: false,
            error: 'Invalid name or nickname'
        });
    }
});

// Serve the student dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'student-dashboard.html'));
});

// API endpoint to update sharing preferences
app.post('/api/update-sharing-preference', (req, res) => {
    const { studentId, sharing } = req.body;
    
    // In a real app, you'd validate the student ID and authentication
    if (studentId) {
        sharingPreferences.set(studentId, sharing);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Student ID required' });
    }
});

// API endpoint to get sharing preference
app.get('/api/get-sharing-preference/:studentId', (req, res) => {
    const { studentId } = req.params;
    const preference = sharingPreferences.get(studentId) || false;
    res.json({ sharing: preference });
});

// API endpoint to get viewable work for a class
app.get('/api/get-viewable-work/:classNumber', (req, res) => {
    const { classNumber } = req.params;
    const requestingStudent = req.query.student;
    
    // Get all students in this class (mock data - would come from DB)
    const classWork = Array.from(sharingPreferences.entries())
        .filter(([studentId, sharing]) => {
            // Include work if:
            // 1. It's the requesting student's own work, OR
            // 2. The student has given permission to share
            return studentId === requestingStudent || sharing === true;
        })
        .map(([studentId]) => ({
            studentId,
            work: studentWork.get(studentId) || { 
                title: 'Sample Work',
                description: `Work by ${studentId}`
            }
        }));

    res.json(classWork);
});

// Modify the views endpoint with more logging
app.get('/api/views/:studentId/:pageType', (req, res) => {
    const { studentId, pageType } = req.params;
    const viewKey = `${studentId}-${pageType}`;
    
    debugLog('Received view request:', {
        studentId,
        pageType,
        viewKey,
        existingViews: pageViews.get(viewKey)
    });

    try {
        const currentViews = pageViews.get(viewKey) || 0;
        const newViews = currentViews + 1;
        pageViews.set(viewKey, newViews);
        
        debugLog('Updated view count:', {
            viewKey,
            previousCount: currentViews,
            newCount: newViews,
            allCounts: Object.fromEntries(pageViews)
        });
        
        res.json({ views: newViews });
    } catch (error) {
        console.error('Error in view counter:', error);
        res.status(500).json({ error: 'Failed to update view count' });
    }
});

// Keep your existing catch-all route at the end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Local network access: http://<your-computer-ip>:${port}`);
}); 