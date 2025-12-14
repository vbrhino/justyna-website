// Price list functionality
let priceListData = [];

// Safe translation function
function tSafe(key) {
    return (typeof t === 'function') ? t(key) : key;
}

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n').filter(line => line.trim()); // Skip empty lines
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines
        
        const values = line.split(',');
        const row = {};
        
        headers.forEach((header, index) => {
            row[header] = values[index] ? values[index].trim() : '';
        });
        
        data.push(row);
    }
    
    return data;
}

// Group data by category
function groupByCategory(data) {
    const grouped = {};
    
    data.forEach(item => {
        const category = item.CategoryKey;
        // Skip items with missing CategoryKey
        if (!category || category.trim() === '') {
            console.warn('Skipping item with missing CategoryKey:', item);
            return;
        }
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
            `<p>${tSafe('prices.error')}</p>`;
    }
}

// Display price list on page
function displayPriceList() {
    const container = document.getElementById('price-list-container');
    const grouped = groupByCategory(priceListData);
    
    let html = '';
    
    Object.keys(grouped).forEach(categoryKey => {
        const categoryName = tSafe(`pricelist.category.${categoryKey}`);
        html += `
            <div class="price-category">
                <h3 class="category-title">${categoryName}</h3>
                <div class="price-table">
                    <table>
                        <thead>
                            <tr>
                                <th>${tSafe('prices.table.treatment')}</th>
                                <th>${tSafe('prices.table.price')}</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        grouped[categoryKey].forEach(item => {
            const serviceKey = item.ServiceKey;
            // Skip items with missing ServiceKey or use fallback
            if (!serviceKey || serviceKey.trim() === '') {
                console.warn('Skipping item with missing ServiceKey:', item);
                return;
            }
            const serviceName = tSafe(`pricelist.service.${serviceKey}`);
            html += `
                <tr>
                    <td>${serviceName}</td>
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
        <html lang="${currentLang || 'nl'}">
        <head>
            <meta charset="UTF-8">
            <title>${tSafe('prices.title')} - Be Beauty JS</title>
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
            <h1>${tSafe('prices.title')} - Be Beauty JS</h1>
    `;
    
    Object.keys(grouped).forEach(categoryKey => {
        const categoryName = tSafe(`pricelist.category.${categoryKey}`);
        const treatmentHeader = tSafe('prices.table.treatment');
        const priceHeader = tSafe('prices.table.price');
        
        html += `<h2>${categoryName}</h2>`;
        html += `<table><thead><tr>`;
        html += `<th>${treatmentHeader}</th><th>${priceHeader}</th>`;
        html += `</tr></thead><tbody>`;
        
        grouped[categoryKey].forEach(item => {
            const serviceKey = item.ServiceKey;
            if (!serviceKey || serviceKey.trim() === '') return; // Skip invalid items
            const serviceName = tSafe(`pricelist.service.${serviceKey}`);
            html += `<tr><td>${serviceName}</td><td class="price">${item.Price}</td></tr>`;
        });
        
        html += `</tbody></table>`;
    });
    
    html += `
            <p style="text-align: center; margin-top: 40px; color: #666; font-size: 14px;">
                Be Beauty JS | <a href="mailto:contact@bebeautyjs.be">contact@bebeautyjs.be</a> | <a href="tel:+32488485290">0488 48 52 90</a><br>
                Kroonstraat 33, 9300 Aalst
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
    // Wait for translations to load first
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            loadPriceList();
        }, 100);
    });
}
