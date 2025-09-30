document.getElementById('shippingForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Gather shipping info from form fields (customize field names as needed)
  const form = e.target;
  const shippingAddress = {
    name: form.querySelector('[name="name"]')?.value || '',
    street: form.querySelector('[name="street"]')?.value || '',
    city: form.querySelector('[name="city"]')?.value || '',
    state: form.querySelector('[name="state"]')?.value || '',
    zip: form.querySelector('[name="zip"]')?.value || '',
    country: form.querySelector('[name="country"]')?.value || ''
  };

  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!cart.length) {
    alert('Your cart is empty!');
    return;
  }

  // Prepare items for backend (customize as needed to match your Product IDs)
  const items = cart.map(item => ({
    product: item.id,
    quantity: item.quantity || 1
  }));

  // Calculate total amount
  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  try {
    // Send order to backend API
    const res = await fetch('https://bonnie-lass-florals.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        total,
        shippingAddress
      })
    });
    const data = await res.json();
    if(res.ok) {
      alert(data.message || 'Order placed!');
      localStorage.removeItem('cart');
      window.location = 'shop.html'; // Redirect or show confirmation
    } else {
      alert(data.error || 'There was a problem placing your order.');
    }
  } catch (err) {
    alert('Network error!');
  }
});
