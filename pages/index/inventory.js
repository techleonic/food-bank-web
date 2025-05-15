const inventoryData = [
  { id: 1, item: "Rice", quantity: 2500, unit: "lbs", pricePerHundred: 45.99, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { id: 2, item: "Beans", quantity: 1800, unit: "lbs", pricePerHundred: 58.50, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30" },
  { id: 3, item: "Oats", quantity: 1200, unit: "lbs", pricePerHundred: 62.75, image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed" },
  { id: 4, item: "Wheat", quantity: 3000, unit: "lbs", pricePerHundred: 39.99, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b" },
  { id: 5, item: "Lentils", quantity: 950, unit: "lbs", pricePerHundred: 72.25, image: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f" },
  { id: 6, item: "Corn", quantity: 1650, unit: "lbs", pricePerHundred: 42.50, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076" },
];

// Function to populate inventory cards
function populateInventoryCards() {
  const inventoryCardsContainer = document.getElementById('inventory-cards');
  if (!inventoryCardsContainer) return;
  
  inventoryData.forEach(item => {
    const cardHtml = `
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${item.id * 100}">
        <div class="inventory-card">
          <div class="inventory-image" style="background-image: url(${item.image})">
            <div class="inventory-badge">
              $${item.pricePerHundred.toFixed(2)}<span>/100 lbs</span>
            </div>
          </div>
          <div class="inventory-details">
            <h3>${item.item}</h3>
            <div class="inventory-quantity">
              <div class="quantity-bar" style="width: ${Math.min(100, (item.quantity/30))}%"></div>
              <span>${item.quantity.toLocaleString()} ${item.unit} in stock</span>
            </div>
            <div class="mt-3">
              <button class="btn btn-sm btn-outline-primary donate-btn" data-item="${item.item}">
                <i class="bi bi-heart"></i> Donate This Item
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    inventoryCardsContainer.innerHTML += cardHtml;
  });
}

// Function to populate inventory table
function populateInventoryTable() {
  const inventoryTableBody = document.getElementById('inventory-table');
  if (!inventoryTableBody) return;
  
  let totalQuantity = 0;
  let totalValue = 0;
  
  inventoryData.forEach(item => {
    const itemValue = (item.quantity/100) * item.pricePerHundred;
    totalQuantity += item.quantity;
    totalValue += itemValue;
    
    const rowHtml = `
      <tr data-aos="fade-up" data-aos-delay="${item.id * 50}">
        <td class="font-medium">${item.item}</td>
        <td class="text-center">${item.quantity.toLocaleString()} ${item.unit}</td>
        <td class="text-center">$${item.pricePerHundred.toFixed(2)}</td>
        <td class="text-end">$${itemValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      </tr>
    `;
    
    inventoryTableBody.innerHTML += rowHtml;
  });
  
  // Add total row
  const totalRowHtml = `
    <tr class="table-active" data-aos="fade-up" data-aos-delay="400">
      <td colspan="2"><strong>Total Inventory</strong></td>
      <td class="text-center">
        <strong>
          ${totalQuantity.toLocaleString()} lbs
        </strong>
      </td>
      <td class="text-end">
        <strong>
          $${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </strong>
      </td>
    </tr>
  `;
  
  inventoryTableBody.innerHTML += totalRowHtml;
}

// Set up animations and event handlers
function setupEventListeners() {
  // Add hover animations to inventory cards
  document.querySelectorAll('.inventory-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Set up donation button click handlers
  document.querySelectorAll('.donate-btn').forEach(button => {
    button.addEventListener('click', function() {
      const item = this.getAttribute('data-item');
      alert(`Thank you for your interest in donating ${item}! In a real application, this would open a donation form.`);
      document.location.href = '#donate';
    });
  });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  populateInventoryCards();
  populateInventoryTable();
  
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
  });
  
  // Add slight delay to ensure DOM is fully populated before setting up listeners
  setTimeout(setupEventListeners, 500);
  
  // Add scroll animation to background elements
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Animate background blobs on scroll
    const backgroundGrain = document.querySelector('.background-grain');
    const backgroundBean = document.querySelector('.background-bean');
    
    if (backgroundGrain && backgroundBean) {
      backgroundGrain.style.transform = `translateY(${scrollPosition * 0.05}px)`;
      backgroundBean.style.transform = `translateY(${scrollPosition * -0.03}px)`;
    }
  });
});