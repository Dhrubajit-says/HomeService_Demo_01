// Mock data for services and providers
const servicesData = {
    cleaning: {
        name: "House Cleaning",
        providers: [
            {
                id: 1,
                name: "CleanPro Services",
                rating: "4.8",
                reviews: 156,
                price: "$50",
                experience: "5+ years",
                description: "Professional cleaning with eco-friendly products"
            },
            {
                id: 2,
                name: "Sparkle Clean",
                rating: "4.6",
                reviews: 89,
                price: "$45",
                experience: "3+ years",
                description: "Reliable and thorough cleaning services"
            },
            {
                id: 3,
                name: "Fresh Home Cleaners",
                rating: "4.9",
                reviews: 234,
                price: "$55",
                experience: "7+ years",
                description: "Premium cleaning with satisfaction guarantee"
            }
        ]
    },
    plumbing: {
        name: "Plumbing",
        providers: [
            {
                id: 4,
                name: "AquaFix Plumbing",
                rating: "4.7",
                reviews: 198,
                price: "$80",
                experience: "8+ years",
                description: "Licensed plumbers with 24/7 emergency service"
            },
            {
                id: 5,
                name: "PipeMaster Solutions",
                rating: "4.5",
                reviews: 112,
                price: "$75",
                experience: "4+ years",
                description: "Expert plumbing repairs and installations"
            }
        ]
    },
    painting: {
        name: "Painting",
        providers: [
            {
                id: 6,
                name: "ColorCraft Painters",
                rating: "4.8",
                reviews: 167,
                price: "$200",
                experience: "6+ years",
                description: "Interior and exterior painting specialists"
            },
            {
                id: 7,
                name: "Brush & Roll Pro",
                rating: "4.6",
                reviews: 94,
                price: "$180",
                experience: "3+ years",
                description: "Quality painting with premium materials"
            }
        ]
    },
    ac: {
        name: "AC Maintenance",
        providers: [
            {
                id: 8,
                name: "CoolAir Experts",
                rating: "4.9",
                reviews: 245,
                price: "$100",
                experience: "10+ years",
                description: "AC repair, maintenance, and installation"
            },
            {
                id: 9,
                name: "FrostTech Cooling",
                rating: "4.7",
                reviews: 178,
                price: "$95",
                experience: "5+ years",
                description: "Professional AC services with warranty"
            }
        ]
    },
    electrical: {
        name: "Electrical",
        providers: [
            {
                id: 10,
                name: "PowerUp Electric",
                rating: "4.8",
                reviews: 189,
                price: "$120",
                experience: "9+ years",
                description: "Licensed electricians for all electrical needs"
            },
            {
                id: 11,
                name: "BrightWatt Solutions",
                rating: "4.6",
                reviews: 134,
                price: "$110",
                experience: "4+ years",
                description: "Safe and reliable electrical services"
            }
        ]
    },
    gardening: {
        name: "Gardening",
        providers: [
            {
                id: 12,
                name: "GreenThumb Landscaping",
                rating: "4.7",
                reviews: 156,
                price: "$60",
                experience: "6+ years",
                description: "Complete landscaping and garden maintenance"
            },
            {
                id: 13,
                name: "Nature's Touch",
                rating: "4.5",
                reviews: 87,
                price: "$55",
                experience: "3+ years",
                description: "Professional gardening and lawn care"
            }
        ]
    }
};

// Global variables
let selectedService = null;
let selectedProvider = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('serviceDate').setAttribute('min', today);
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Service selection function
function selectService(serviceType) {
    selectedService = serviceType;
    const service = servicesData[serviceType];
    
    // Update modal title
    document.getElementById('modalTitle').textContent = `Select ${service.name} Provider`;
    
    // Clear and populate providers list
    const providersList = document.getElementById('providersList');
    providersList.innerHTML = '';
    
    // Get approved vendors from localStorage
    const approvedVendors = JSON.parse(localStorage.getItem('approvedVendors')) || [];
    
    // Combine existing providers with approved vendors
    let allProviders = [...service.providers];
    
    // Add approved vendors that provide this service
    approvedVendors.forEach(vendor => {
        if (vendor.services && vendor.services.includes(serviceType)) {
            const serviceMap = {
                'cleaning': 'House Cleaning',
                'plumbing': 'Plumbing',
                'painting': 'Painting',
                'ac': 'AC Maintenance',
                'electrical': 'Electrical',
                'gardening': 'Gardening'
            };
            
            const newProvider = {
                id: vendor.id,
                name: vendor.businessName,
                rating: vendor.rating || '4.5',
                reviews: vendor.reviews || 0,
                price: getServicePrice(serviceType),
                experience: vendor.experience || 'New',
                description: vendor.businessDescription || 'Professional service provider'
            };
            
            allProviders.push(newProvider);
        }
    });
    
    allProviders.forEach(provider => {
        const providerCard = document.createElement('div');
        providerCard.className = 'provider-card';
        providerCard.onclick = () => selectProvider(provider.id, providerCard);
        
        providerCard.innerHTML = `
            <div class="provider-header">
                <div class="provider-name">${provider.name}</div>
                <div class="provider-rating">⭐ ${provider.rating} (${provider.reviews} reviews)</div>
            </div>
            <div class="provider-details">
                <p>${provider.description}</p>
                <p>Experience: ${provider.experience}</p>
            </div>
            <div class="provider-price">Starting from ${provider.price}</div>
        `;
        
        providersList.appendChild(providerCard);
    });
    
    // Show modal
    document.getElementById('providersModal').style.display = 'block';
    document.getElementById('providersModal').classList.add('fade-in');
}

// Helper function to get service price
function getServicePrice(serviceType) {
    const priceMap = {
        'cleaning': '$50',
        'plumbing': '$80',
        'painting': '$200',
        'ac': '$100',
        'electrical': '$120',
        'gardening': '$60'
    };
    return priceMap[serviceType] || '$75';
}

// Provider selection function
function selectProvider(providerId, providerCard) {
    // Remove previous selection
    document.querySelectorAll('.provider-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    providerCard.classList.add('selected');
    
    // Find selected provider data
    const service = servicesData[selectedService];
    selectedProvider = service.providers.find(p => p.id === providerId);
    
    // Close providers modal and open booking modal
    setTimeout(() => {
        closeModal();
        openBookingModal();
    }, 300);
}

// Open booking modal
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
    document.getElementById('bookingModal').classList.add('slide-up');
}

// Close providers modal
function closeModal() {
    document.getElementById('providersModal').style.display = 'none';
    document.getElementById('providersModal').classList.remove('fade-in');
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('bookingModal').classList.remove('slide-up');
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    // Reset form
    document.getElementById('bookingForm').reset();
    selectedService = null;
    selectedProvider = null;
}

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const bookingData = {
        service: servicesData[selectedService].name,
        provider: selectedProvider.name,
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        customerPhone: formData.get('customerPhone'),
        customerAddress: formData.get('customerAddress'),
        serviceDate: formData.get('serviceDate'),
        serviceTime: formData.get('serviceTime'),
        specialInstructions: formData.get('specialInstructions')
    };
    
    // Store booking data (in a real app, this would be sent to a server)
    localStorage.setItem('latestBooking', JSON.stringify(bookingData));
    
    // Update success modal with booking details
    document.getElementById('bookedService').textContent = bookingData.service;
    document.getElementById('bookedProvider').textContent = bookingData.provider;
    document.getElementById('bookedDate').textContent = new Date(bookingData.serviceDate).toLocaleDateString();
    document.getElementById('bookedTime').textContent = bookingData.serviceTime;
    
    // Close booking modal and show success modal
    closeBookingModal();
    document.getElementById('successModal').style.display = 'block';
    document.getElementById('successModal').classList.add('fade-in');
    
    // Simulate adding to vendor queue (for demo purposes)
    addToVendorQueue(bookingData);
});

// Add booking to vendor queue (demo function)
function addToVendorQueue(bookingData) {
    // Get existing vendor orders or create new array
    let vendorOrders = JSON.parse(localStorage.getItem('vendorOrders')) || [];
    
    // Create new order
    const newOrder = {
        id: Date.now(),
        service: bookingData.service,
        customerName: bookingData.customerName,
        customerEmail: bookingData.customerEmail,
        customerPhone: bookingData.customerPhone,
        customerAddress: bookingData.customerAddress,
        serviceDate: bookingData.serviceDate,
        serviceTime: bookingData.serviceTime,
        specialInstructions: bookingData.specialInstructions,
        status: 'pending',
        providerId: selectedProvider.id,
        providerName: selectedProvider.name,
        createdAt: new Date().toISOString()
    };
    
    // Add to vendor orders
    vendorOrders.push(newOrder);
    localStorage.setItem('vendorOrders', JSON.stringify(vendorOrders));
}

// Vendor Registration Functions
function openVendorRegistration() {
    document.getElementById('vendorRegistrationModal').style.display = 'block';
    document.getElementById('vendorRegistrationModal').classList.add('fade-in');
}

function closeVendorRegistration() {
    document.getElementById('vendorRegistrationModal').style.display = 'none';
    document.getElementById('vendorRegistrationModal').classList.remove('fade-in');
    // Reset form
    document.getElementById('vendorRegistrationForm').reset();
}

function closeVendorSuccessModal() {
    document.getElementById('vendorSuccessModal').style.display = 'none';
    closeVendorRegistration();
}

// Handle vendor registration form submission
document.getElementById('vendorRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);
    
    // Validate that at least one service is selected
    if (selectedServices.length === 0) {
        alert('Please select at least one service you provide.');
        return;
    }
    
    const vendorData = {
        id: Date.now(),
        businessName: formData.get('businessName'),
        businessType: formData.get('businessType'),
        businessDescription: formData.get('businessDescription'),
        contactName: formData.get('contactName'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        businessAddress: formData.get('businessAddress'),
        services: selectedServices,
        experience: formData.get('experience'),
        serviceAreas: formData.get('serviceAreas'),
        licenses: formData.get('licenses'),
        insurance: formData.get('insurance'),
        website: formData.get('website'),
        status: 'pending',
        submittedAt: new Date().toISOString(),
        rating: '0',
        reviews: 0
    };
    
    // Store vendor application (in a real app, this would be sent to a server)
    let vendorApplications = JSON.parse(localStorage.getItem('vendorApplications')) || [];
    vendorApplications.push(vendorData);
    localStorage.setItem('vendorApplications', JSON.stringify(vendorApplications));
    
    // Update success modal with application details
    document.getElementById('applicationId').textContent = 'APP-' + vendorData.id;
    document.getElementById('applicationBusinessName').textContent = vendorData.businessName;
    document.getElementById('applicationDate').textContent = new Date(vendorData.submittedAt).toLocaleDateString();
    
    // Close registration modal and show success modal
    closeVendorRegistration();
    document.getElementById('vendorSuccessModal').style.display = 'block';
    document.getElementById('vendorSuccessModal').classList.add('fade-in');
});

// Close modals when clicking outside
window.onclick = function(event) {
    const providersModal = document.getElementById('providersModal');
    const bookingModal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');
    const vendorRegistrationModal = document.getElementById('vendorRegistrationModal');
    const vendorSuccessModal = document.getElementById('vendorSuccessModal');
    
    if (event.target === providersModal) {
        closeModal();
    }
    if (event.target === bookingModal) {
        closeBookingModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
    if (event.target === vendorRegistrationModal) {
        closeVendorRegistration();
    }
    if (event.target === vendorSuccessModal) {
        closeVendorSuccessModal();
    }
}

// Add some demo animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards for animation
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
