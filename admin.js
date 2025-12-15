// Admin Panel for Managing Afspraken
let appointmentsData = [];
let originalData = [];
let authToken = '';
let filterDate = '';
let hasUnsavedChanges = false;

// GitHub repository details
const GITHUB_OWNER = 'vbrhino';
const GITHUB_REPO = 'justyna-website';
const WORKFLOW_FILE = 'update-afspraken.yml';
const DEFAULT_BRANCH = 'copilot/manage-afspraken-csv'; // Using the current PR branch since workflow is defined here

// Populate time picker with business hours (8:00 - 20:00) in 30-minute intervals
function populateTimePickers() {
    const startSelect = document.getElementById('modal-time-start');
    
    // Clear existing options except the first one
    startSelect.innerHTML = '<option value="">Selecteer tijd...</option>';
    
    // Generate times from 08:00 to 20:00 in 30-minute intervals
    for (let hour = 8; hour <= 20; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            // Skip 20:30 and beyond
            if (hour === 20 && minute > 0) continue;
            
            const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            
            const startOption = document.createElement('option');
            startOption.value = timeStr;
            startOption.textContent = timeStr;
            startSelect.appendChild(startOption);
        }
    }
}

// Mark that there are unsaved changes
function markUnsavedChanges() {
    hasUnsavedChanges = true;
    const warning = document.getElementById('pending-changes-warning');
    const saveBtn = document.getElementById('save-btn');
    if (warning) {
        warning.style.display = 'block';
    }
    if (saveBtn) {
        saveBtn.classList.add('btn-pulse');
    }
}

// Clear unsaved changes flag
function clearUnsavedChanges() {
    hasUnsavedChanges = false;
    const warning = document.getElementById('pending-changes-warning');
    const saveBtn = document.getElementById('save-btn');
    if (warning) {
        warning.style.display = 'none';
    }
    if (saveBtn) {
        saveBtn.classList.remove('btn-pulse');
    }
}

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
    
    if (lines.length === 0) {
        throw new Error('CSV file is empty');
    }
    
    const data = [];
    
    // Validate header
    const header = lines[0].toLowerCase();
    if (!header.includes('date') || !header.includes('timeslot') || !header.includes('available')) {
        console.warn('CSV header may not be in expected format. Expected: Date,TimeSlot,Available');
    }
    
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
    
    // Create HTML with row-based layout
    let html = '<div class="appointments-list">';
    
    Object.keys(grouped).sort().forEach(date => {
        // Day header
        html += `
            <div class="day-header">
                <span class="day-date">📅 ${formatDate(date)}</span>
                <span class="day-full-date">${formatDateDDMMYYYY(date)}</span>
            </div>
        `;
        
        // Sort appointments for this day
        grouped[date].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
        
        grouped[date].forEach(apt => {
            const isAvailable = apt.available;
            const availabilityClass = isAvailable ? 'available' : 'booked';
            const availabilityIcon = isAvailable ? '✓' : '✗';
            const availabilityLabel = isAvailable ? 'Beschikbaar' : 'Bezet';
            
            html += `
                <div class="appointment-row ${availabilityClass}" data-id="${apt.id}" data-date="${apt.date}">
                    <div class="row-add-icon" onclick="addAppointmentForDate('${apt.date}')" title="Voeg afspraak toe voor ${formatDate(apt.date)}">
                        <span class="add-icon">➕</span>
                    </div>
                    <div class="row-content">
                        <div class="row-time">🕐 ${apt.timeSlot}</div>
                        <div class="row-status">
                            <span class="status-badge ${availabilityClass}">
                                <span class="status-icon">${availabilityIcon}</span>
                                <span class="status-text">${availabilityLabel}</span>
                            </span>
                        </div>
                        <div class="row-actions">
                            <button onclick="toggleAvailability('${apt.id}')" class="icon-btn" title="Beschikbaarheid wijzigen">
                                <span class="toggle-icon">${isAvailable ? '🔓' : '🔒'}</span>
                            </button>
                            <button onclick="editAppointment('${apt.id}')" class="icon-btn" title="Bewerken">
                                ✏️
                            </button>
                            <button onclick="deleteAppointment('${apt.id}')" class="icon-btn icon-btn-danger" title="Verwijderen">
                                🗑️
                            </button>
                        </div>
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

// Format date as dd/mm/yyyy (Belgium format)
function formatDateDDMMYYYY(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// Toggle availability
function toggleAvailability(id) {
    const apt = appointmentsData.find(a => a.id === id);
    if (apt) {
        apt.available = !apt.available;
        markUnsavedChanges();
        displayAppointments();
    }
}

// Add appointment for specific date (from hover + icon)
function addAppointmentForDate(date) {
    openAppointmentModal(null, date);
}

// Modal management
let currentEditingId = null;

function openAppointmentModal(id = null, prefilledDate = null) {
    const modal = document.getElementById('appointmentModal');
    const title = document.getElementById('modalTitle');
    
    // Populate time pickers
    populateTimePickers();
    
    currentEditingId = id;
    
    if (id) {
        // Edit mode
        title.textContent = 'Afspraak Bewerken';
        const apt = appointmentsData.find(a => a.id === id);
        if (apt) {
            // Backwards compatibility: Extract start time from old format (HH:MM-HH:MM) or use new format (HH:MM)
            // This handles existing appointments that were created before switching to single time field
            const timeSlot = apt.timeSlot.includes('-') ? apt.timeSlot.split('-')[0].trim() : apt.timeSlot.trim();
            document.getElementById('modal-date').value = apt.date;
            document.getElementById('modal-time-start').value = timeSlot;
        }
    } else {
        // Add mode
        title.textContent = 'Afspraak Toevoegen';
        document.getElementById('modal-date').value = prefilledDate || '';
        document.getElementById('modal-time-start').value = '';
    }
    
    modal.style.display = 'block';
}

function closeAppointmentModal() {
    document.getElementById('appointmentModal').style.display = 'none';
    currentEditingId = null;
}

// New Day Modal Functions
function openNewDayModal() {
    const modal = document.getElementById('newDayModal');
    const container = document.getElementById('time-slots-container');
    
    // Default time slots: 9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00
    const defaultTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    
    // Clear and populate time slots
    container.innerHTML = '';
    defaultTimes.forEach((time, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.style.cssText = 'display: flex; align-items: center; gap: 0.5rem;';
        slotDiv.innerHTML = `
            <input type="time" class="time-slot-input time-select" value="${time}" style="flex: 1;">
            <button onclick="removeTimeSlot(this)" class="btn-danger" style="padding: 0.5rem; font-size: 0.9rem;" title="Verwijder tijdslot">🗑️</button>
        `;
        container.appendChild(slotDiv);
    });
    
    // Add button to add more slots
    const addButton = document.createElement('button');
    addButton.onclick = addTimeSlot;
    addButton.className = 'btn-secondary';
    addButton.style.cssText = 'margin-top: 0.5rem;';
    addButton.textContent = '➕ Tijdslot Toevoegen';
    container.appendChild(addButton);
    
    // Clear date field
    document.getElementById('new-day-date').value = '';
    
    modal.style.display = 'block';
}

function closeNewDayModal() {
    document.getElementById('newDayModal').style.display = 'none';
}

function addTimeSlot() {
    const container = document.getElementById('time-slots-container');
    const addButton = container.lastChild; // The add button
    
    const slotDiv = document.createElement('div');
    slotDiv.style.cssText = 'display: flex; align-items: center; gap: 0.5rem;';
    slotDiv.innerHTML = `
        <input type="time" class="time-slot-input time-select" value="09:00" style="flex: 1;">
        <button onclick="removeTimeSlot(this)" class="btn-danger" style="padding: 0.5rem; font-size: 0.9rem;" title="Verwijder tijdslot">🗑️</button>
    `;
    
    container.insertBefore(slotDiv, addButton);
}

function removeTimeSlot(button) {
    button.parentElement.remove();
}

function saveNewDay() {
    const date = document.getElementById('new-day-date').value;
    const timeInputs = document.querySelectorAll('.time-slot-input');
    
    // Validate date
    if (!date) {
        showStatus('Selecteer een datum', 'error');
        return;
    }
    
    // Get all time slots
    const times = Array.from(timeInputs).map(input => input.value).filter(time => time);
    
    if (times.length === 0) {
        showStatus('Voeg minimaal één tijdslot toe', 'error');
        return;
    }
    
    // Check for duplicates
    const uniqueTimes = [...new Set(times)];
    if (uniqueTimes.length !== times.length) {
        showStatus('Verwijder dubbele tijdslots', 'error');
        return;
    }
    
    // Sort times
    uniqueTimes.sort();
    
    // Add all appointments for this day
    let addedCount = 0;
    let skippedCount = 0;
    
    uniqueTimes.forEach(time => {
        const newId = `${date}-${time}`;
        
        // Check if already exists
        if (!appointmentsData.find(a => a.id === newId)) {
            appointmentsData.push({
                date: date,
                timeSlot: time,
                available: true,
                id: newId
            });
            addedCount++;
        } else {
            skippedCount++;
        }
    });
    
    if (addedCount > 0) {
        markUnsavedChanges();
        displayAppointments();
        closeNewDayModal();
        showStatus(`${addedCount} tijdslot(s) toegevoegd${skippedCount > 0 ? ` (${skippedCount} al bestaand)` : ''}`, 'success');
    } else {
        showStatus('Alle tijdslots bestaan al voor deze datum', 'error');
    }
}

function saveAppointmentFromModal() {
    const date = document.getElementById('modal-date').value;
    const startTime = document.getElementById('modal-time-start').value;
    
    // Validate inputs
    if (!date || !startTime) {
        showStatus('Vul alle velden in', 'error');
        return;
    }
    
    const timeSlot = startTime; // Just use the start time
    const newId = `${date}-${timeSlot}`;
    
    // Check if already exists (and it's not the current editing appointment)
    if (newId !== currentEditingId && appointmentsData.find(a => a.id === newId)) {
        showStatus('Deze afspraak bestaat al!', 'error');
        return;
    }
    
    if (currentEditingId) {
        // Edit existing
        const apt = appointmentsData.find(a => a.id === currentEditingId);
        if (apt) {
            apt.date = date;
            apt.timeSlot = timeSlot;
            apt.id = newId;
        }
        showStatus('Afspraak bijgewerkt.', 'success');
    } else {
        // Add new
        appointmentsData.push({
            date: date,
            timeSlot: timeSlot,
            available: true,
            id: newId
        });
        showStatus('Nieuwe afspraak toegevoegd.', 'success');
    }
    
    markUnsavedChanges();
    displayAppointments();
    closeAppointmentModal();
}

// Add new appointment
function addNewAppointment() {
    openAppointmentModal();
}

// Edit appointment
function editAppointment(id) {
    openAppointmentModal(id);
}

// Delete appointment
function deleteAppointment(id) {
    if (!confirm('Weet u zeker dat u deze afspraak wilt verwijderen?')) {
        return;
    }
    
    appointmentsData = appointmentsData.filter(a => a.id !== id);
    markUnsavedChanges();
    displayAppointments();
    showStatus('Afspraak verwijderd.', 'success');
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
        
        // Note: The auth_token is sent to verify the workflow caller has proper permissions.
        // While it appears in workflow inputs, the workflow validates it against a secret.
        // For production use, consider implementing a dedicated backend API for additional security.
        
        // Trigger GitHub Action workflow
        const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ref: DEFAULT_BRANCH,
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
        clearUnsavedChanges();
        
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
    clearUnsavedChanges();
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
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('appointmentModal');
        if (event.target === modal) {
            closeAppointmentModal();
        }
    };
});
