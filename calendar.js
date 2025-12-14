// Appointment calendar functionality
let appointmentsData = [];

// Safe translation function - fallback if not loaded
function tSafe(key) {
    if (typeof t === 'function') {
        return t(key);
    }
    // Fallback translations
    const fallbacks = {
        'calendar.error': 'Error loading appointments.',
        'calendar.closed': 'Closed'
    };
    return fallbacks[key] || key;
}

// Get current language safely
function getCurrentLang() {
    return (typeof currentLang !== 'undefined') ? currentLang : 'nl';
}

// Parse CSV data for appointments
function parseAppointmentsCSV(csvText) {
    const lines = csvText.trim().split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',');
        const row = {};
        
        headers.forEach((header, index) => {
            row[header] = values[index] ? values[index].trim() : '';
        });
        
        data.push(row);
    }
    
    return data;
}

// Group appointments by date
function groupAppointmentsByDate(data) {
    const grouped = {};
    
    data.forEach(item => {
        const date = item.Date;
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push({
            timeSlot: item.TimeSlot,  // Changed from 'time' to 'timeSlot'
            available: item.Available === 'true'
        });
    });
    
    return grouped;
}

// Load appointments from CSV
async function loadAppointments() {
    try {
        const response = await fetch('afspraken.csv');
        const csvText = await response.text();
        appointmentsData = parseAppointmentsCSV(csvText);
        displayCalendar();
    } catch (error) {
        console.error('Error loading appointments:', error);
        const container = document.getElementById('calendar-container');
        if (container) {
            container.innerHTML = `<p>${tSafe('calendar.error')}</p>`;
        }
    }
}

// Get date in YYYY-MM-DD format
function formatDateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get month name based on language
function getMonthName(monthIndex) {
    const months = {
        nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        pl: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']
    };
    const lang = getCurrentLang();
    return months[lang][monthIndex];
}

// Get day name based on language
function getDayName(dayIndex) {
    const days = {
        nl: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        pl: ['nie', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob']
    };
    const lang = getCurrentLang();
    return days[lang][dayIndex];
}

// Display calendar
function displayCalendar() {
    const container = document.getElementById('calendar-container');
    if (!container) return;
    
    const groupedAppointments = groupAppointmentsByDate(appointmentsData);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get next 30 days
    const days = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }
    
    let html = '<div class="calendar-grid">';
    
    days.forEach(date => {
        const dateStr = formatDateToString(date);
        const appointments = groupedAppointments[dateStr] || [];
        const availableSlots = appointments.filter(a => a.available).length;
        const hasAvailability = availableSlots > 0;
        
        const dayName = getDayName(date.getDay());
        const dayNumber = date.getDate();
        const monthName = getMonthName(date.getMonth());
        
        html += `
            <div class="calendar-day ${hasAvailability ? 'has-availability' : 'no-availability'}">
                <div class="calendar-day-header">
                    <span class="day-name">${dayName}</span>
                    <span class="day-number">${dayNumber}</span>
                    <span class="month-name">${monthName}</span>
                </div>
                <div class="calendar-day-body">
        `;
        
        if (appointments.length > 0) {
            html += '<div class="time-slots">';
            appointments.forEach(apt => {
                const slotClass = apt.available ? 'available' : 'booked';
                html += `<span class="time-slot ${slotClass}">${apt.timeSlot}</span>`;  // Changed from apt.time to apt.timeSlot
            });
            html += '</div>';
        } else {
            html += `<p class="no-slots">${tSafe('calendar.closed')}</p>`;
        }
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Load appointments when page loads
if (document.getElementById('calendar-container')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            loadAppointments();
        }, 100);
    });
}
