// Vendor Dashboard JavaScript

// Mock vendor data
const vendorData = {
    id: 1,
    name: "CleanPro Services",
    status: "pending",
    rating: 4.8,
    reviews: 156,
    totalOrders: 47,
    completedOrders: 42,
    totalEarnings: 2350
};

// Initialize vendor dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    updateVendorStats();
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

// Load orders from localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('vendorOrders')) || [];
    const ordersGrid = document.getElementById('ordersGrid');
    
    if (orders.length === 0) {
        // Show demo orders if no real orders exist
        displayDemoOrders();
        return;
    }
    
    ordersGrid.innerHTML = '';
    
    orders.forEach(order => {
        if (order.providerId === vendorData.id) {
            const orderCard = createOrderCard(order);
            ordersGrid.appendChild(orderCard);
        }
    });
}

// Display demo orders for demonstration
function displayDemoOrders() {
    const demoOrders = [
        {
            id: 1001,
            service: "House Cleaning",
            customerName: "John Smith",
            customerPhone: "(555) 123-4567",
            customerAddress: "123 Main St, Downtown",
            serviceDate: "2024-01-15",
            serviceTime: "10:00",
            specialInstructions: "Focus on kitchen and bathrooms",
            status: "pending",
            createdAt: "2024-01-10T10:30:00Z"
        },
        {
            id: 1002,
            service: "House Cleaning",
            customerName: "Sarah Johnson",
            customerPhone: "(555) 987-6543",
            customerAddress: "456 Oak Ave, Midtown",
            serviceDate: "2024-01-12",
            serviceTime: "14:00",
            specialInstructions: "Deep cleaning for move-out",
            status: "confirmed",
            createdAt: "2024-01-08T15:20:00Z"
        },
        {
            id: 1003,
            service: "House Cleaning",
            customerName: "Mike Davis",
            customerPhone: "(555) 456-7890",
            customerAddress: "789 Pine St, Uptown",
            serviceDate: "2024-01-08",
            serviceTime: "09:00",
            specialInstructions: "Regular weekly cleaning",
            status: "completed",
            createdAt: "2024-01-05T12:15:00Z"
        }
    ];
    
    const ordersGrid = document.getElementById('ordersGrid');
    ordersGrid.innerHTML = '';
    
    demoOrders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersGrid.appendChild(orderCard);
    });
}

// Create order card element
function createOrderCard(order) {
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.onclick = () => showOrderDetails(order);
    
    const statusClass = order.status;
    const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    
    orderCard.innerHTML = `
        <div class="order-header">
            <div class="order-id">Order #${order.id}</div>
            <div class="order-status ${statusClass}">${statusText}</div>
        </div>
        <div class="order-details">
            <div class="order-detail-item">
                <span class="order-detail-label">Service:</span>
                <span class="order-detail-value">${order.service}</span>
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Customer:</span>
                <span class="order-detail-value">${order.customerName}</span>
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Date:</span>
                <span class="order-detail-value">${new Date(order.serviceDate).toLocaleDateString()}</span>
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Time:</span>
                <span class="order-detail-value">${order.serviceTime}</span>
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Address:</span>
                <span class="order-detail-value">${order.customerAddress}</span>
            </div>
        </div>
    `;
    
    return orderCard;
}

// Show order details modal
function showOrderDetails(order) {
    const modal = document.getElementById('orderModal');
    const orderDetails = document.getElementById('orderDetails');
    const confirmBtn = document.getElementById('confirmBtn');
    const completeBtn = document.getElementById('completeBtn');
    
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
            <span class="order-detail-label">Special Instructions:</span>
            <span class="order-detail-value">${order.specialInstructions || 'None'}</span>
        </div>
        <div class="detail-item">
            <span class="order-detail-label">Status:</span>
            <span class="order-detail-value">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
        </div>
    `;
    
    // Show/hide action buttons based on status
    if (order.status === 'pending') {
        confirmBtn.style.display = 'inline-block';
        completeBtn.style.display = 'none';
    } else if (order.status === 'confirmed') {
        confirmBtn.style.display = 'none';
        completeBtn.style.display = 'inline-block';
    } else {
        confirmBtn.style.display = 'none';
        completeBtn.style.display = 'none';
    }
    
    // Store current order for actions
    modal.currentOrder = order;
    
    modal.style.display = 'block';
    modal.classList.add('fade-in');
}

// Close order modal
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none';
    modal.classList.remove('fade-in');
}

// Update order status
function updateOrderStatus(newStatus) {
    const modal = document.getElementById('orderModal');
    const order = modal.currentOrder;
    
    if (!order) return;
    
    // Update order status
    order.status = newStatus;
    
    // Update in localStorage if it exists
    const orders = JSON.parse(localStorage.getItem('vendorOrders')) || [];
    const orderIndex = orders.findIndex(o => o.id === order.id);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('vendorOrders', JSON.stringify(orders));
    }
    
    // Show success message
    showNotification(`Order #${order.id} ${newStatus} successfully!`, 'success');
    
    // Close modal and reload orders
    closeOrderModal();
    loadOrders();
}

// Filter orders by status
function filterOrders(status) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const orderCards = document.querySelectorAll('.order-card');
    
    orderCards.forEach(card => {
        const orderStatus = card.querySelector('.order-status').textContent.toLowerCase();
        
        if (status === 'all' || orderStatus === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Update vendor statistics
function updateVendorStats() {
    // Update profile status
    const profileStatus = document.querySelector('.profile-status');
    if (profileStatus) {
        profileStatus.textContent = vendorData.status.charAt(0).toUpperCase() + vendorData.status.slice(1);
        profileStatus.className = `profile-status ${vendorData.status}`;
    }
    
    // Update navbar status
    const navStatus = document.querySelector('.vendor-status');
    if (navStatus) {
        navStatus.textContent = vendorData.status.charAt(0).toUpperCase() + vendorData.status.slice(1);
        navStatus.className = `vendor-status ${vendorData.status}`;
    }
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
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
}
