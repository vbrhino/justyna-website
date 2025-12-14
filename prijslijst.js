// Price list functionality
let priceListData = [];

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(',');
        const row = {};
        
        headers.forEach((header, index) => {
            row[header] = values[index];
        });
        
        data.push(row);
    }
    
    return data;
}

// Group data by category
function groupByCategory(data) {
    const grouped = {};
    
    data.forEach(item => {
        const category = item.Category;
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(item);
    });
    
    return grouped;
}

// Load and display price list
async function loadPriceList() {
    try {
        const response = await fetch('prijslijst.csv');
        const csvText = await response.text();
        priceListData = parseCSV(csvText);
        displayPriceList();
    } catch (error) {
        console.error('Error loading price list:', error);
        document.getElementById('price-list-container').innerHTML = 
            '<p>Er is een probleem opgetreden bij het laden van de prijslijst. Neem contact met ons op voor actuele prijzen.</p>';
    }
}

// Display price list on page
function displayPriceList() {
    const container = document.getElementById('price-list-container');
    const grouped = groupByCategory(priceListData);
    
    let html = '';
    
    Object.keys(grouped).forEach(category => {
        html += `
            <div class="price-category">
                <h3 class="category-title">${category}</h3>
                <div class="price-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Behandeling</th>
                                <th>Duur</th>
                                <th>Prijs</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        grouped[category].forEach(item => {
            html += `
                <tr>
                    <td>${item.Service}</td>
                    <td>${item.Duration}</td>
                    <td class="price">${item.Price}</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Generate PDF for download
function downloadPriceList() {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    const grouped = groupByCategory(priceListData);
    
    let html = `
        <!DOCTYPE html>
        <html lang="nl">
        <head>
            <meta charset="UTF-8">
            <title>Prijslijst - Justyna Beauty Salon</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1 {
                    color: #4a90e2;
                    text-align: center;
                    margin-bottom: 30px;
                }
                h2 {
                    color: #2c3e50;
                    margin-top: 30px;
                    margin-bottom: 15px;
                    border-bottom: 2px solid #4a90e2;
                    padding-bottom: 5px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }
                th {
                    background-color: #f4f4f4;
                    padding: 10px;
                    text-align: left;
                    border-bottom: 2px solid #ddd;
                }
                td {
                    padding: 8px 10px;
                    border-bottom: 1px solid #eee;
                }
                .price {
                    font-weight: bold;
                    color: #4a90e2;
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <h1>Prijslijst - Justyna Beauty Salon</h1>
    `;
    
    Object.keys(grouped).forEach(category => {
        html += `<h2>${category}</h2><table><thead><tr><th>Behandeling</th><th>Duur</th><th>Prijs</th></tr></thead><tbody>`;
        
        grouped[category].forEach(item => {
            html += `<tr><td>${item.Service}</td><td>${item.Duration}</td><td class="price">${item.Price}</td></tr>`;
        });
        
        html += `</tbody></table>`;
    });
    
    html += `
            <p style="text-align: center; margin-top: 40px; color: #666; font-size: 14px;">
                Voor meer informatie: info@justyna-beauty.com | +31 6 12345678
            </p>
        </body>
        </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Trigger print dialog
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// Load price list when page loads
if (document.getElementById('price-list-container')) {
    loadPriceList();
}
