// Admin Panel for Managing Afspraken
let appointmentsData = [];
let originalData = [];
let authToken = '';
let filterDate = '';

// GitHub repository details
const GITHUB_OWNER = 'vbrhino';
const GITHUB_REPO = 'justyna-website';
const WORKFLOW_FILE = 'update-afspraken.yml';

// Authentication
function authenticate() {
    const token = document.getElementById('auth-token').value.trim();
    const errorDiv = document.getElementById('auth-error');
    
    if (!token) {
        errorDiv.textContent = 'Voer een token in';
        errorDiv.classList.add('show');
        return;
    }
    
    // Store token (in a real app, validate against server)
    authToken = token;
    sessionStorage.setItem('admin_token', token);
    
    // Hide auth section and show admin panel
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    
    // Load appointments
    loadAppointments();
}

function logout() {
    authToken = '';
    sessionStorage.removeItem('admin_token');
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('auth-token').value = '';
}

// Check if already authenticated
function checkAuth() {
    const storedToken = sessionStorage.getItem('admin_token');
    if (storedToken) {
        authToken = storedToken;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAppointments();
    }
}

// Load appointments from CSV
async function loadAppointments() {
    try {
        showStatus('Afspraken laden...', 'info');
        const response = await fetch('afspraken.csv?' + new Date().getTime()); // Cache bust
        const csvText = await response.text();
        appointmentsData = parseCSV(csvText);
        originalData = JSON.parse(JSON.stringify(appointmentsData)); // Deep copy
        displayAppointments();
        hideStatus();
    } catch (error) {
        console.error('Error loading appointments:', error);
        showStatus('Fout bij laden van afspraken: ' + error.message, 'error');
    }
}

// Parse CSV
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n').filter(line => line.trim());
    const data = [];
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',');
        if (values.length >= 3) {
            data.push({
                date: values[0].trim(),
                timeSlot: values[1].trim(),
                available: values[2].trim().toLowerCase() === 'true',
                id: `${values[0]}-${values[1]}` // Create unique ID
            });
        }
    }
    
    return data;
}

// Convert data to CSV format
function toCSV(data) {
    let csv = 'Date,TimeSlot,Available\n';
    
    // Sort by date and time
    const sorted = [...data].sort((a, b) => {
        if (a.date !== b.date) {
            return a.date.localeCompare(b.date);
        }
        return a.timeSlot.localeCompare(b.timeSlot);
    });
    
    sorted.forEach(item => {
        csv += `${item.date},${item.timeSlot},${item.available}\n`;
    });
    
    return csv;
}

// Display appointments
function displayAppointments() {
    const container = document.getElementById('appointments-table');
    
    // Filter appointments if filter is active
    let filtered = appointmentsData;
    if (filterDate) {
        filtered = appointmentsData.filter(apt => apt.date === filterDate);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<p>Geen afspraken gevonden.</p>';
        return;
    }
    
    // Group by date
    const grouped = {};
    filtered.forEach(apt => {
        if (!grouped[apt.date]) {
            grouped[apt.date] = [];
        }
        grouped[apt.date].push(apt);
    });
    
    // Create HTML
    let html = '<div class="appointments-grid">';
    
    Object.keys(grouped).sort().forEach(date => {
        grouped[date].forEach(apt => {
            const isAvailable = apt.available;
            const availabilityClass = isAvailable ? 'available' : 'booked';
            const availabilityLabel = isAvailable ? 'Beschikbaar' : 'Bezet';
            
            html += `
                <div class="appointment-card ${availabilityClass}" data-id="${apt.id}">
                    <div class="appointment-header">
                        <div>
                            <div class="appointment-date">📅 ${formatDate(apt.date)}</div>
                            <div class="appointment-time">🕐 ${apt.timeSlot}</div>
                        </div>
                    </div>
                    <div class="availability-toggle">
                        <label class="toggle-switch">
                            <input type="checkbox" ${isAvailable ? 'checked' : ''} 
                                   onchange="toggleAvailability('${apt.id}')">
                            <span class="toggle-slider"></span>
                        </label>
                        <span class="availability-label ${availabilityClass}">${availabilityLabel}</span>
                    </div>
                    <div class="card-actions">
                        <button onclick="editAppointment('${apt.id}')" class="btn-warning btn-small">✏️ Bewerken</button>
                        <button onclick="deleteAppointment('${apt.id}')" class="btn-danger btn-small">🗑️ Verwijderen</button>
                    </div>
                </div>
            `;
        });
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Format date for display
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const days = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
    const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${dayName} ${day} ${month}`;
}

// Toggle availability
function toggleAvailability(id) {
    const apt = appointmentsData.find(a => a.id === id);
    if (apt) {
        apt.available = !apt.available;
        displayAppointments();
    }
}

// Add new appointment
function addNewAppointment() {
    const date = prompt('Datum (YYYY-MM-DD):');
    if (!date) return;
    
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        alert('Ongeldige datum formaat. Gebruik YYYY-MM-DD');
        return;
    }
    
    const timeSlot = prompt('Tijdslot (HH:MM-HH:MM, bijv. 09:00-10:30):');
    if (!timeSlot) return;
    
    // Validate time slot format
    if (!/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(timeSlot)) {
        alert('Ongeldig tijdslot formaat. Gebruik HH:MM-HH:MM');
        return;
    }
    
    const id = `${date}-${timeSlot}`;
    
    // Check if already exists
    if (appointmentsData.find(a => a.id === id)) {
        alert('Deze afspraak bestaat al!');
        return;
    }
    
    // Add new appointment
    appointmentsData.push({
        date: date,
        timeSlot: timeSlot,
        available: true,
        id: id
    });
    
    displayAppointments();
    showStatus('Nieuwe afspraak toegevoegd. Vergeet niet te opslaan!', 'success');
}

// Edit appointment
function editAppointment(id) {
    const apt = appointmentsData.find(a => a.id === id);
    if (!apt) return;
    
    const newDate = prompt('Datum (YYYY-MM-DD):', apt.date);
    if (!newDate) return;
    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
        alert('Ongeldige datum formaat. Gebruik YYYY-MM-DD');
        return;
    }
    
    const newTimeSlot = prompt('Tijdslot (HH:MM-HH:MM):', apt.timeSlot);
    if (!newTimeSlot) return;
    
    if (!/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(newTimeSlot)) {
        alert('Ongeldig tijdslot formaat. Gebruik HH:MM-HH:MM');
        return;
    }
    
    const newId = `${newDate}-${newTimeSlot}`;
    
    // Check if new ID conflicts with another appointment
    if (newId !== id && appointmentsData.find(a => a.id === newId)) {
        alert('Een afspraak met deze datum en tijd bestaat al!');
        return;
    }
    
    // Update appointment
    apt.date = newDate;
    apt.timeSlot = newTimeSlot;
    apt.id = newId;
    
    displayAppointments();
    showStatus('Afspraak bijgewerkt. Vergeet niet te opslaan!', 'success');
}

// Delete appointment
function deleteAppointment(id) {
    if (!confirm('Weet u zeker dat u deze afspraak wilt verwijderen?')) {
        return;
    }
    
    appointmentsData = appointmentsData.filter(a => a.id !== id);
    displayAppointments();
    showStatus('Afspraak verwijderd. Vergeet niet te opslaan!', 'success');
}

// Filter appointments
function filterAppointments() {
    filterDate = document.getElementById('filter-date').value;
    displayAppointments();
}

// Clear filter
function clearFilter() {
    filterDate = '';
    document.getElementById('filter-date').value = '';
    displayAppointments();
}

// Save changes
async function saveChanges() {
    if (!authToken) {
        showStatus('U bent niet ingelogd!', 'error');
        return;
    }
    
    // Check if there are changes
    if (JSON.stringify(appointmentsData) === JSON.stringify(originalData)) {
        showStatus('Geen wijzigingen om op te slaan.', 'info');
        return;
    }
    
    if (!confirm('Weet u zeker dat u de wijzigingen wilt opslaan? Dit zal de afspraken.csv bijwerken via GitHub Actions.')) {
        return;
    }
    
    try {
        showStatus('Wijzigingen opslaan...', 'info');
        
        const csvData = toCSV(appointmentsData);
        
        // Trigger GitHub Action workflow
        const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ref: 'main', // or your default branch
                inputs: {
                    csv_data: csvData,
                    auth_token: authToken
                }
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
        }
        
        showStatus('✅ Wijzigingen succesvol opgeslagen! De GitHub Action is gestart.', 'success');
        originalData = JSON.parse(JSON.stringify(appointmentsData));
        
        // Reload after a delay to see changes
        setTimeout(() => {
            showStatus('Afspraken opnieuw laden...', 'info');
            loadAppointments();
        }, 3000);
        
    } catch (error) {
        console.error('Error saving changes:', error);
        showStatus('❌ Fout bij opslaan: ' + error.message, 'error');
    }
}

// Cancel changes
function cancelChanges() {
    if (JSON.stringify(appointmentsData) === JSON.stringify(originalData)) {
        showStatus('Geen wijzigingen om te annuleren.', 'info');
        return;
    }
    
    if (!confirm('Weet u zeker dat u alle wijzigingen wilt annuleren?')) {
        return;
    }
    
    appointmentsData = JSON.parse(JSON.stringify(originalData));
    displayAppointments();
    showStatus('Wijzigingen geannuleerd.', 'info');
}

// Show status message
function showStatus(message, type) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.textContent = message;
    statusDiv.className = 'status-message show ' + type;
}

// Hide status message
function hideStatus() {
    const statusDiv = document.getElementById('status-message');
    statusDiv.className = 'status-message';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});
