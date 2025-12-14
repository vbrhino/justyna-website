// Multi-language support
const translations = {
    nl: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'Over Ons',
        'nav.services': 'Diensten',
        'nav.prices': 'Prijzen',
        'nav.contact': 'Contact',
        
        // Home page
        'home.title': 'Welkom bij Be Beauty',
        'home.subtitle': 'Professionele schoonheidsbehandelingen in een luxe omgeving',
        'home.cta': 'Meer Informatie',
        'home.features.title': 'Onze Diensten',
        'home.feature1.title': 'Permanent Make-up',
        'home.feature1.desc': 'Professionele permanent make-up voor wenkbrauwen, eyeliner en lippen.',
        'home.feature2.title': 'Wimperextensions',
        'home.feature2.desc': 'Classic, volume en mega volume wimperextensions voor een perfecte look.',
        'home.feature3.title': 'Kobido Massage',
        'home.feature3.desc': 'Japanse gezichtsmassage voor natuurlijke verjonging en ontspanning.',
        
        // About page
        'about.title': 'Over Be Beauty',
        'about.intro': 'Welkom bij Be Beauty! Wij zijn gespecialiseerd in professionele schoonheidsbehandelingen met een persoonlijke touch.',
        'about.mission.title': 'Onze Missie',
        'about.mission.text': 'Bij Be Beauty geloven we in het versterken van natuurlijke schoonheid. We bieden hoogwaardige behandelingen in een ontspannen, luxe omgeving. Onze ervaren specialisten gebruiken alleen de beste producten en technieken om jou het beste resultaat te geven.',
        'about.services.title': 'Wat We Aanbieden',
        'about.services.intro': 'Onze salon biedt een breed scala aan professionele schoonheidsbehandelingen:',
        'about.services.pmu': 'Permanent Make-up - Wenkbrauwen, Eyeliner en Lippen',
        'about.services.lashes': 'Wimperextensions - Classic, Volume en Mega Volume',
        'about.services.brows': 'Wenkbrauwen & Wimpers - Verven, Epileren, Liften, Lamineren',
        'about.services.nails': 'Nagels - Manicure, Gellak, Acryl/Gel Nagels',
        'about.services.kobido': 'Kobido Massage - Japanse Gezichtsmassage',
        'about.contact.title': 'Kom Langs',
        'about.contact.text': 'We nodigen je graag uit om onze salon te bezoeken voor een persoonlijk consult. Ontdek hoe we jouw natuurlijke schoonheid kunnen versterken.',
        
        // Services page
        'services.title': 'Onze Diensten',
        'services.intro': 'Ontdek ons complete aanbod van professionele schoonheidsbehandelingen. Elk behandeling wordt uitgevoerd met zorg en aandacht voor detail.',
        
        // Price page
        'prices.title': 'Prijslijst',
        'prices.intro': 'Bekijk onze actuele prijzen voor alle behandelingen. Neem contact op voor meer informatie of om een afspraak te maken.',
        'prices.download': 'Download Prijslijst',
        'prices.table.treatment': 'Behandeling',
        'prices.table.duration': 'Duur',
        'prices.table.price': 'Prijs',
        'prices.error': 'Er is een probleem opgetreden bij het laden van de prijslijst. Neem contact met ons op voor actuele prijzen.',
        
        // Contact page
        'contact.title': 'Contact',
        'contact.intro': 'Heb je vragen of wil je een afspraak maken? Vul het formulier in en we nemen zo snel mogelijk contact met je op.',
        'contact.form.name': 'Naam',
        'contact.form.email': 'E-mail',
        'contact.form.subject': 'Onderwerp',
        'contact.form.message': 'Bericht',
        'contact.form.submit': 'Verzenden',
        'contact.info.title': 'Andere Manieren om Ons te Bereiken',
        'contact.info.email': 'E-mail',
        'contact.info.phone': 'Telefoon',
        'contact.info.address': 'Adres',
        'contact.info.social': 'Volg Ons',
        
        // Footer
        'footer.rights': 'Alle rechten voorbehouden',
        'footer.follow': 'Volg ons',
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.services': 'Services',
        'nav.prices': 'Prices',
        'nav.contact': 'Contact',
        
        // Home page
        'home.title': 'Welcome to Be Beauty',
        'home.subtitle': 'Professional beauty treatments in a luxury environment',
        'home.cta': 'Learn More',
        'home.features.title': 'Our Services',
        'home.feature1.title': 'Permanent Make-up',
        'home.feature1.desc': 'Professional permanent makeup for eyebrows, eyeliner and lips.',
        'home.feature2.title': 'Eyelash Extensions',
        'home.feature2.desc': 'Classic, volume and mega volume eyelash extensions for a perfect look.',
        'home.feature3.title': 'Kobido Massage',
        'home.feature3.desc': 'Japanese facial massage for natural rejuvenation and relaxation.',
        
        // About page
        'about.title': 'About Be Beauty',
        'about.intro': 'Welcome to Be Beauty! We specialize in professional beauty treatments with a personal touch.',
        'about.mission.title': 'Our Mission',
        'about.mission.text': 'At Be Beauty we believe in enhancing natural beauty. We offer high-quality treatments in a relaxed, luxurious environment. Our experienced specialists use only the best products and techniques to give you the best results.',
        'about.services.title': 'What We Offer',
        'about.services.intro': 'Our salon offers a wide range of professional beauty treatments:',
        'about.services.pmu': 'Permanent Make-up - Eyebrows, Eyeliner and Lips',
        'about.services.lashes': 'Eyelash Extensions - Classic, Volume and Mega Volume',
        'about.services.brows': 'Eyebrows & Lashes - Tinting, Shaping, Lifting, Lamination',
        'about.services.nails': 'Nails - Manicure, Gel Polish, Acrylic/Gel Nails',
        'about.services.kobido': 'Kobido Massage - Japanese Facial Massage',
        'about.contact.title': 'Visit Us',
        'about.contact.text': 'We invite you to visit our salon for a personal consultation. Discover how we can enhance your natural beauty.',
        
        // Services page
        'services.title': 'Our Services',
        'services.intro': 'Discover our complete range of professional beauty treatments. Each treatment is performed with care and attention to detail.',
        
        // Price page
        'prices.title': 'Price List',
        'prices.intro': 'View our current prices for all treatments. Contact us for more information or to make an appointment.',
        'prices.download': 'Download Price List',
        'prices.table.treatment': 'Treatment',
        'prices.table.duration': 'Duration',
        'prices.table.price': 'Price',
        'prices.error': 'There was a problem loading the price list. Please contact us for current prices.',
        
        // Contact page
        'contact.title': 'Contact',
        'contact.intro': 'Have questions or want to make an appointment? Fill out the form and we will contact you as soon as possible.',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send',
        'contact.info.title': 'Other Ways to Reach Us',
        'contact.info.email': 'Email',
        'contact.info.phone': 'Phone',
        'contact.info.address': 'Address',
        'contact.info.social': 'Follow Us',
        
        // Footer
        'footer.rights': 'All rights reserved',
        'footer.follow': 'Follow us',
    },
    pl: {
        // Navigation
        'nav.home': 'Strona Główna',
        'nav.about': 'O Nas',
        'nav.services': 'Usługi',
        'nav.prices': 'Cennik',
        'nav.contact': 'Kontakt',
        
        // Home page
        'home.title': 'Witamy w Be Beauty',
        'home.subtitle': 'Profesjonalne zabiegi kosmetyczne w luksusowym środowisku',
        'home.cta': 'Dowiedz Się Więcej',
        'home.features.title': 'Nasze Usługi',
        'home.feature1.title': 'Makijaż Permanentny',
        'home.feature1.desc': 'Profesjonalny makijaż permanentny brwi, eyeliner i ust.',
        'home.feature2.title': 'Przedłużanie Rzęs',
        'home.feature2.desc': 'Przedłużanie rzęs metodą klasyczną, volume i mega volume dla idealnego wyglądu.',
        'home.feature3.title': 'Masaż Kobido',
        'home.feature3.desc': 'Japoński masaż twarzy dla naturalnego odmłodzenia i relaksu.',
        
        // About page
        'about.title': 'O Be Beauty',
        'about.intro': 'Witamy w Be Beauty! Specjalizujemy się w profesjonalnych zabiegach kosmetycznych z osobistym podejściem.',
        'about.mission.title': 'Nasza Misja',
        'about.mission.text': 'W Be Beauty wierzymy w podkreślanie naturalnego piękna. Oferujemy wysokiej jakości zabiegi w relaksującej, luksusowej atmosferze. Nasi doświadczeni specjaliści używają tylko najlepszych produktów i technik, aby zapewnić Ci najlepsze rezultaty.',
        'about.services.title': 'Co Oferujemy',
        'about.services.intro': 'Nasz salon oferuje szeroki zakres profesjonalnych zabiegów kosmetycznych:',
        'about.services.pmu': 'Makijaż Permanentny - Brwi, Eyeliner i Usta',
        'about.services.lashes': 'Przedłużanie Rzęs - Klasyczne, Volume i Mega Volume',
        'about.services.brows': 'Brwi & Rzęsy - Farbowanie, Regulacja, Lifting, Laminacja',
        'about.services.nails': 'Paznokcie - Manicure, Hybrydowy, Paznokcie Żelowe/Akrylowe',
        'about.services.kobido': 'Masaż Kobido - Japoński Masaż Twarzy',
        'about.contact.title': 'Odwiedź Nas',
        'about.contact.text': 'Zapraszamy do odwiedzenia naszego salonu na osobistą konsultację. Odkryj, jak możemy podkreślić Twoje naturalne piękno.',
        
        // Services page
        'services.title': 'Nasze Usługi',
        'services.intro': 'Odkryj naszą pełną gamę profesjonalnych zabiegów kosmetycznych. Każdy zabieg wykonywany jest z dbałością o szczegóły.',
        
        // Price page
        'prices.title': 'Cennik',
        'prices.intro': 'Zobacz nasze aktualne ceny wszystkich zabiegów. Skontaktuj się z nami po więcej informacji lub aby umówić się na wizytę.',
        'prices.download': 'Pobierz Cennik',
        'prices.table.treatment': 'Zabieg',
        'prices.table.duration': 'Czas Trwania',
        'prices.table.price': 'Cena',
        'prices.error': 'Wystąpił problem z załadowaniem cennika. Skontaktuj się z nami po aktualne ceny.',
        
        // Contact page
        'contact.title': 'Kontakt',
        'contact.intro': 'Masz pytania lub chcesz umówić się na wizytę? Wypełnij formularz, a skontaktujemy się z Tobą jak najszybciej.',
        'contact.form.name': 'Imię',
        'contact.form.email': 'E-mail',
        'contact.form.subject': 'Temat',
        'contact.form.message': 'Wiadomość',
        'contact.form.submit': 'Wyślij',
        'contact.info.title': 'Inne Sposoby Kontaktu',
        'contact.info.email': 'E-mail',
        'contact.info.phone': 'Telefon',
        'contact.info.address': 'Adres',
        'contact.info.social': 'Obserwuj Nas',
        
        // Footer
        'footer.rights': 'Wszelkie prawa zastrzeżone',
        'footer.follow': 'Obserwuj nas',
    }
};

// Get current language from localStorage or default to Dutch
let currentLang = localStorage.getItem('preferredLanguage') || 'nl';

// Translate function
function t(key) {
    // Fallback to default language if current language not found
    const lang = translations[currentLang] ? currentLang : 'nl';
    return translations[lang][key] || key;
}

// Change language
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    translatePage();
    
    // Reload price list if on prices page
    if (document.getElementById('price-list-container')) {
        loadPriceList();
    }
}

// Translate all elements with data-i18n attribute
function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = t(key);
        } else {
            element.textContent = t(key);
        }
    });
    
    // Update language selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${currentLang}"]`)?.classList.add('active');
    
    // Update page title
    updatePageTitle();
}

// Update page title based on current page
function updatePageTitle() {
    const pageName = document.body.getAttribute('data-page');
    if (pageName) {
        document.title = `${t(pageName + '.title')} - Be Beauty`;
    }
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', () => {
    translatePage();
});
