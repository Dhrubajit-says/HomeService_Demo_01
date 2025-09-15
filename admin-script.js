// Admin Dashboard JavaScript

// Mock data for admin dashboard
const adminData = {
    totalVendors: 24,
    totalOrders: 156,
    platformRevenue: 12450,
    averageRating: 4.7,
    pendingVendors: 3,
    newOrdersToday: 12
};

// Mock vendors data
const vendorsData = [
    {
        id: 1,
        name: "CleanPro Services",
        email: "contact@cleanpro.com",
        phone: "(555) 123-4567",
        services: ["House Cleaning", "Deep Cleaning"],
        rating: 4.8,
        reviews: 156,
        totalOrders: 47,
        status: "approved",
        joinDate: "2023-06-15",
        location: "Downtown"
    },
    {
        id: 2,
        name: "AquaFix Plumbing",
        email: "info@aquafix.com",
        phone: "(555) 987-6543",
        services: ["Plumbing", "Emergency Repairs"],
        rating: 4.7,
        reviews: 198,
        totalOrders: 89,
        status: "approved",
        joinDate: "2023-05-20",
        location: "Midtown"
    },
    {
        id: 3,
        name: "ColorCraft Painters",
        email: "hello@colorcraft.com",
        phone: "(555) 456-7890",
        services: ["Interior Painting", "Exterior Painting"],
        rating: 4.8,
        reviews: 167,
        totalOrders: 72,
        status: "approved",
        joinDate: "2023-07-10",
        location: "Uptown"
    },
    {
        id: 4,
        name: "CoolAir Experts",
        email: "service@coolair.com",
        phone: "(555) 321-0987",
        services: ["AC Repair", "AC Maintenance", "Installation"],
        rating: 4.9,
        reviews: 245,
        totalOrders: 134,
        status: "approved",
        joinDate: "2023-04-12",
        location: "Downtown"
    },
    {
        id: 5,
        name: "PowerUp Electric",
        email: "contact@powerup.com",
        phone: "(555) 654-3210",
        services: ["Electrical Repairs", "Installations"],
        rating: 4.8,
        reviews: 189,
        totalOrders: 95,
        status: "approved",
        joinDate: "2023-08-05",
        location: "Midtown"
    },
    {
        id: 6,
        name: "GreenThumb Landscaping",
        email: "info@greenthumb.com",
        phone: "(555) 789-0123",
        services: ["Landscaping", "Garden Maintenance"],
        rating: 4.7,
        reviews: 156,
        totalOrders: 68,
        status: "approved",
        joinDate: "2023-09-18",
        location: "Uptown"
    },
    {
        id: 7,
        name: "Fresh Start Cleaning",
        email: "hello@freshstart.com",
        phone: "(555) 234-5678",
        services: ["House Cleaning", "Office Cleaning"],
        rating: 4.6,
        reviews: 89,
        totalOrders: 34,
        status: "pending",
        joinDate: "2024-01-05",
        location: "Downtown"
    },
    {
        id: 8,
        name: "PipeMaster Solutions",
        email: "contact@pipemaster.com",
        phone: "(555) 345-6789",
        services: ["Plumbing", "Drain Cleaning"],
        rating: 4.5,
        reviews: 112,
        totalOrders: 56,
        status: "pending",
        joinDate: "2024-01-08",
        location: "Midtown"
    },
    {
        id: 9,
        name: "Brush & Roll Pro",
        email: "info@brushroll.com",
        phone: "(555) 456-7890",
        services: ["Painting", "Color Consultation"],
        rating: 4.6,
        reviews: 94,
        totalOrders: 41,
        status: "pending",
        joinDate: "2024-01-10",
        location: "Uptown"
    }
];

// Mock customers data
const customersData = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "(555) 123-4567",
        totalOrders: 8,
        totalSpent: 450,
        lastOrder: "2024-01-12",
        location: "Downtown"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "(555) 987-6543",
        totalOrders: 12,
        totalSpent: 780,
        lastOrder: "2024-01-10",
        location: "Midtown"
    },
    {
        id: 3,
        name: "Mike Davis",
        email: "mike.davis@email.com",
        phone: "(555) 456-7890",
        totalOrders: 5,
        totalSpent: 320,
        lastOrder: "2024-01-08",
        location: "Uptown"
    },
    {
        id: 4,
        name: "Emily Wilson",
        email: "emily.w@email.com",
        phone: "(555) 321-0987",
        totalOrders: 15,
        totalSpent: 1200,
        lastOrder: "2024-01-11",
        location: "Downtown"
    },
    {
        id: 5,
        name: "David Brown",
        email: "david.brown@email.com",
        phone: "(555) 654-3210",
        totalOrders: 3,
        totalSpent: 180,
        lastOrder: "2024-01-09",
        location: "Midtown"
    }
];

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    loadVendors();
    loadOrders();
    loadCustomers();
});

// Show different sections
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Add active class to clicked menu item
    event.target.closest('.menu-item').classList.add('active');
}

// Load dashboard data
function loadDashboard() {
    // Load recent orders
    loadRecentOrders();
    
    // Load pending vendors
    loadPendingVendors();
}

// Load recent orders
function loadRecentOrders() {
    const recentOrdersContainer = document.getElementById('recentOrders');
    const orders = JSON.parse(localStorage.getItem('vendorOrders')) || [];
    
    // Get recent orders (last 5)
    const recentOrders = orders.slice(-5).reverse();
    
    if (recentOrders.length === 0) {
        recentOrdersContainer.innerHTML = '<p class="no-data">No recent orders</p>';
        return;
    }
    
    recentOrdersContainer.innerHTML = '';
    
    recentOrders.forEach(order => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <div class="activity-info">
                <h4>Order #${order.id}</h4>
                <p>${order.service} - ${order.customerName}</p>
            </div>
            <div class="activity-time">${new Date(order.createdAt).toLocaleDateString()}</div>
        `;
        
        recentOrdersContainer.appendChild(activityItem);
    });
}

// Load pending vendors
function loadPendingVendors() {
    const pendingVendorsContainer = document.getElementById('pendingVendors');
    const pendingVendors = vendorsData.filter(vendor => vendor.status === 'pending');
    
    if (pendingVendors.length === 0) {
        pendingVendorsContainer.innerHTML = '<p class="no-data">No pending vendors</p>';
        return;
    }
    
    pendingVendorsContainer.innerHTML = '';
    
    pendingVendors.forEach(vendor => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.onclick = () => showVendorDetails(vendor);
        
        activityItem.innerHTML = `
            <div class="activity-info">
                <h4>${vendor.name}</h4>
                <p>${vendor.services.join(', ')}</p>
            </div>
            <div class="activity-time">${new Date(vendor.joinDate).toLocaleDateString()}</div>
        `;
        
        pendingVendorsContainer.appendChild(activityItem);
    });
}

// Load vendors
function loadVendors() {
    const vendorsGrid = document.getElementById('vendorsGrid');
    vendorsGrid.innerHTML = '';
    
    vendorsData.forEach(vendor => {
        const vendorCard = createVendorCard(vendor);
        vendorsGrid.appendChild(vendorCard);
    });
}

// Create vendor card
function createVendorCard(vendor) {
    const vendorCard = document.createElement('div');
    vendorCard.className = 'vendor-card';
    vendorCard.onclick = () => showVendorDetails(vendor);
    
    const statusClass = vendor.status;
    const statusText = vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1);
    
    vendorCard.innerHTML = `
        <div class="vendor-header">
            <div class="vendor-name">${vendor.name}</div>
            <div class="vendor-status ${statusClass}">${statusText}</div>
        </div>
        <div class="vendor-details">
            <div class="vendor-detail-item">
                <span class="vendor-detail-label">Services:</span>
                <span class="vendor-detail-value">${vendor.services.join(', ')}</span>
            </div>
            <div class="vendor-detail-item">
                <span class="vendor-detail-label">Rating:</span>
                <span class="vendor-detail-value">⭐ ${vendor.rating} (${vendor.reviews} reviews)</span>
            </div>
            <div class="vendor-detail-item">
                <span class="vendor-detail-label">Total Orders:</span>
                <span class="vendor-detail-value">${vendor.totalOrders}</span>
            </div>
            <div class="vendor-detail-item">
                <span class="vendor-detail-label">Location:</span>
                <span class="vendor-detail-value">${vendor.location}</span>
            </div>
            <div class="vendor-detail-item">
                <span class="vendor-detail-label">Joined:</span>
                <span class="vendor-detail-value">${new Date(vendor.joinDate).toLocaleDateString()}</span>
            </div>
        </div>
    `;
    
    return vendorCard;
}

// Show vendor details modal
function showVendorDetails(vendor) {
    const modal = document.getElementById('vendorModal');
    const vendorDetails = document.getElementById('vendorDetails');
    const approveBtn = document.getElementById('approveBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    
    vendorDetails.innerHTML = `
        <div class="detail-item">
            <span class="vendor-detail-label">Vendor ID:</span>
            <span class="vendor-detail-value">#${vendor.id}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Business Name:</span>
            <span class="vendor-detail-value">${vendor.name}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Email:</span>
            <span class="vendor-detail-value">${vendor.email}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Phone:</span>
            <span class="vendor-detail-value">${vendor.phone}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Services:</span>
            <span class="vendor-detail-value">${vendor.services.join(', ')}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Rating:</span>
            <span class="vendor-detail-value">⭐ ${vendor.rating} (${vendor.reviews} reviews)</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Total Orders:</span>
            <span class="vendor-detail-value">${vendor.totalOrders}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Location:</span>
            <span class="vendor-detail-value">${vendor.location}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Join Date:</span>
            <span class="vendor-detail-value">${new Date(vendor.joinDate).toLocaleDateString()}</span>
        </div>
        <div class="detail-item">
            <span class="vendor-detail-label">Status:</span>
            <span class="vendor-detail-value">${vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}</span>
        </div>
    `;
    
    // Show/hide action buttons based on status
    if (vendor.status === 'pending') {
        approveBtn.style.display = 'inline-block';
        rejectBtn.style.display = 'inline-block';
    } else {
        approveBtn.style.display = 'none';
        rejectBtn.style.display = 'none';
    }
    
    // Store current vendor for actions
    modal.currentVendor = vendor;
    
    modal.style.display = 'block';
    modal.classList.add('fade-in');
}

// Close vendor modal
function closeVendorModal() {
    const modal = document.getElementById('vendorModal');
    modal.style.display = 'none';
    modal.classList.remove('fade-in');
}

// Update vendor status
function updateVendorStatus(newStatus) {
    const modal = document.getElementById('vendorModal');
    const vendor = modal.currentVendor;
    
    if (!vendor) return;
    
    // Update vendor status in data
    const vendorIndex = vendorsData.findIndex(v => v.id === vendor.id);
    if (vendorIndex !== -1) {
        vendorsData[vendorIndex].status = newStatus;
    }
    
    // Show success message
    showNotification(`Vendor ${vendor.name} ${newStatus} successfully!`, 'success');
    
    // Close modal and reload data
    closeVendorModal();
    loadVendors();
    loadPendingVendors();
}

// Load orders
function loadOrders() {
    const ordersTableBody = document.getElementById('ordersTableBody');
    const orders = JSON.parse(localStorage.getItem('vendorOrders')) || [];
    
    if (orders.length === 0) {
        ordersTableBody.innerHTML = '<tr><td colspan="7" class="no-data">No orders found</td></tr>';
        return;
    }
    
    ordersTableBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.onclick = () => showOrderDetails(order);
        
        const statusClass = order.status;
        const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);
        
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.service}</td>
            <td>${order.providerName || 'N/A'}</td>
            <td>${new Date(order.serviceDate).toLocaleDateString()}</td>
            <td><span class="order-status ${statusClass}">${statusText}</span></td>
            <td><button class="action-btn primary" onclick="event.stopPropagation(); showOrderDetails(order)">View</button></td>
        `;
        
        ordersTableBody.appendChild(row);
    });
}

// Show order details modal
function showOrderDetails(order) {
    const modal = document.getElementById('orderModal');
    const orderDetails = document.getElementById('orderDetails');
    
    orderDetails.innerHTML = `
        <div class="detail-item">
            <span class="order-detail-label">Order ID:</span>
            <span class="order-detail-value">#${order.id}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Service:</span>
            <span class="order-detail-value">${order.service}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Customer Name:</span>
            <span class="order-detail-value">${order.customerName}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Phone:</span>
            <span class="order-detail-value">${order.customerPhone}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Email:</span>
            <span class="order-detail-value">${order.customerEmail || 'Not provided'}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Address:</span>
            <span class="order-detail-value">${order.customerAddress}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Service Date:</span>
            <span class="order-detail-value">${new Date(order.serviceDate).toLocaleDateString()}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Service Time:</span>
            <span class="order-detail-value">${order.serviceTime}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Provider:</span>
            <span class="order-detail-value">${order.providerName || 'Not assigned'}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Special Instructions:</span>
            <span class="order-detail-value">${order.specialInstructions || 'None'}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Status:</span>
            <span class="order-detail-value">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Created:</span>
            <span class="order-detail-value">${new Date(order.createdAt).toLocaleString()}</span>
        </div>
    `;
    
    modal.style.display = 'block';
    modal.classList.add('fade-in');
}

// Close order modal
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none';
    modal.classList.remove('fade-in');
}

// Load customers
function loadCustomers() {
    const customersGrid = document.getElementById('customersGrid');
    customersGrid.innerHTML = '';
    
    customersData.forEach(customer => {
        const customerCard = createCustomerCard(customer);
        customersGrid.appendChild(customerCard);
    });
}

// Create customer card
function createCustomerCard(customer) {
    const customerCard = document.createElement('div');
    customerCard.className = 'customer-card';
    
    const initials = customer.name.split(' ').map(n => n[0]).join('');
    
    customerCard.innerHTML = `
        <div class="customer-header">
            <div class="customer-avatar">${initials}</div>
            <div class="customer-info">
                <h4>${customer.name}</h4>
                <p>${customer.email}</p>
            </div>
        </div>
        <div class="customer-stats">
            <div class="customer-stat">
                <div class="customer-stat-number">${customer.totalOrders}</div>
                <div class="customer-stat-label">Orders</div>
            </div>
            <div class="customer-stat">
                <div class="customer-stat-number">$${customer.totalSpent}</div>
                <div class="customer-stat-label">Spent</div>
            </div>
        </div>
        <div class="customer-details">
            <p><strong>Phone:</strong> ${customer.phone}</p>
            <p><strong>Location:</strong> ${customer.location}</p>
            <p><strong>Last Order:</strong> ${new Date(customer.lastOrder).toLocaleDateString()}</p>
        </div>
    `;
    
    return customerCard;
}

// Filter vendors
function filterVendors(status) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        const vendorStatus = card.querySelector('.vendor-status').textContent.toLowerCase();
        
        if (status === 'all' || vendorStatus === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter orders
function filterOrders(status) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const orderRows = document.querySelectorAll('#ordersTableBody tr');
    
    orderRows.forEach(row => {
        if (row.querySelector('.no-data')) return;
        
        const orderStatus = row.querySelector('.order-status').textContent.toLowerCase();
        
        if (status === 'all' || orderStatus === status) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

// Refresh data
function refreshData() {
    showNotification('Data refreshed successfully!', 'success');
    loadDashboard();
    loadVendors();
    loadOrders();
    loadCustomers();
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : '#0c5460'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    .no-data {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 2rem;
    }
`;
document.head.appendChild(style);

// Close modals when clicking outside
window.onclick = function(event) {
    const vendorModal = document.getElementById('vendorModal');
    const orderModal = document.getElementById('orderModal');
    
    if (event.target === vendorModal) {
        closeVendorModal();
    }
    if (event.target === orderModal) {
        closeOrderModal();
    }
}
