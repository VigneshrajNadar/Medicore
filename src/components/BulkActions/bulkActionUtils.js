// Utility functions for handling bulk actions

// Simple async confirm replacement (can be replaced with a custom modal later)
export function customConfirm(message) {
  return new Promise((resolve) => {
    const result = window.prompt(`${message}\nType YES to confirm.`);
    resolve(result && result.toLowerCase() === 'yes');
  });
}

export const handlePharmacyBulkActions = async (action, selectedIds, items, setCart, setWishlist) => {
  const selectedItems = items.filter(item => selectedIds.includes(item.id || item._id));
  
  switch (action) {
    case 'bulk_add_cart':
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const newCartItems = selectedItems.filter(item => 
        !existingCart.some(cartItem => cartItem.id === item.id)
      );
      const updatedCart = [...existingCart, ...newCartItems];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart && setCart(updatedCart);
      alert(`${newCartItems.length} items added to cart!`);
      break;
      
    case 'bulk_wishlist':
      const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const newWishlistItems = selectedItems.filter(item => 
        !existingWishlist.some(wishItem => wishItem.id === item.id)
      );
      const updatedWishlist = [...existingWishlist, ...newWishlistItems];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist && setWishlist(updatedWishlist);
      alert(`${newWishlistItems.length} items added to wishlist!`);
      break;
      
    case 'bulk_compare':
      if (selectedItems.length > 5) {
        alert('You can compare maximum 5 items at once');
        return;
      }
      localStorage.setItem('compareItems', JSON.stringify(selectedItems));
      alert(`${selectedItems.length} items added to comparison`);
      // Navigate to compare page
      window.location.href = '/compare';
      break;
      
    case 'bulk_share':
      const shareData = {
        title: 'Apollo Pharmacy Products',
        text: `Check out these ${selectedItems.length} products from Apollo Pharmacy`,
        url: window.location.href
      };
      
      if (navigator.share) {
        navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const itemNames = selectedItems.map(item => item.name).join(', ');
        navigator.clipboard.writeText(`Apollo Products: ${itemNames} - ${window.location.href}`);
        alert('Product details copied to clipboard!');
      }
      break;
      
    case 'bulk_remove':
      if (await customConfirm(`Are you sure you want to remove ${selectedItems.length} items?`)) {
        // This would typically update the main data source
        alert(`${selectedItems.length} items removed`);
      }
      break;
      
    default:
      console.log('Unknown action:', action);
  }
};

export const handleDoctorBulkActions = async (action, selectedIds, doctors) => {
  const selectedDoctors = doctors.filter(doctor => selectedIds.includes(doctor.id || doctor._id));
  
  switch (action) {
    case 'bulk_book':
      if (selectedDoctors.length > 3) {
        alert('You can book maximum 3 appointments at once');
        return;
      }
      // Store selected doctors for booking
      localStorage.setItem('bulkBookingDoctors', JSON.stringify(selectedDoctors));
      alert(`Proceeding to book ${selectedDoctors.length} appointments`);
      // Navigate to bulk booking page
      window.location.href = '/bulk-booking';
      break;
      
    case 'bulk_favorite':
      const existingFavorites = JSON.parse(localStorage.getItem('favoriteDoctors') || '[]');
      const newFavorites = selectedDoctors.filter(doctor => 
        !existingFavorites.some(fav => fav.id === doctor.id)
      );
      const updatedFavorites = [...existingFavorites, ...newFavorites];
      localStorage.setItem('favoriteDoctors', JSON.stringify(updatedFavorites));
      alert(`${newFavorites.length} doctors added to favorites!`);
      break;
      
    case 'bulk_compare':
      if (selectedDoctors.length > 4) {
        alert('You can compare maximum 4 doctors at once');
        return;
      }
      localStorage.setItem('compareDoctors', JSON.stringify(selectedDoctors));
      alert(`${selectedDoctors.length} doctors added to comparison`);
      window.location.href = '/compare-doctors';
      break;
      
    case 'bulk_share':
      const doctorNames = selectedDoctors.map(doctor => `Dr. ${doctor.name}`).join(', ');
      const shareText = `Check out these doctors on Apollo: ${doctorNames}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Apollo Doctors',
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
        alert('Doctor details copied to clipboard!');
      }
      break;
      
    case 'bulk_inquiry':
      const inquiryData = {
        doctors: selectedDoctors.map(d => ({ id: d.id, name: d.name, speciality: d.speciality })),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      
      // Store inquiry for processing
      const existingInquiries = JSON.parse(localStorage.getItem('doctorInquiries') || '[]');
      existingInquiries.push(inquiryData);
      localStorage.setItem('doctorInquiries', JSON.stringify(existingInquiries));
      
      alert(`Inquiry sent to ${selectedDoctors.length} doctors`);
      break;
      
    default:
      console.log('Unknown doctor action:', action);
  }
};

export const handleAdminBulkActions = async (action, selectedIds, items, updateItems) => {
  const selectedItems = items.filter(item => selectedIds.includes(item.id || item._id));
  
  switch (action) {
    case 'bulk_approve':
      if (await customConfirm(`Approve ${selectedItems.length} items?`)) {
        const updatedItems = items.map(item => 
          selectedIds.includes(item.id || item._id) 
            ? { ...item, status: 'approved', approvedAt: new Date().toISOString() }
            : item
        );
        updateItems(updatedItems);
        alert(`${selectedItems.length} items approved successfully`);
      }
      break;
      
    case 'bulk_reject':
      const reason = prompt('Enter rejection reason:');
      if (reason && await customConfirm(`Reject ${selectedItems.length} items?`)) {
        const updatedItems = items.map(item => 
          selectedIds.includes(item.id || item._id) 
            ? { ...item, status: 'rejected', rejectedAt: new Date().toISOString(), rejectionReason: reason }
            : item
        );
        updateItems(updatedItems);
        alert(`${selectedItems.length} items rejected`);
      }
      break;
      
    case 'bulk_notify':
      const message = prompt('Enter notification message:');
      if (message) {
        // This would typically send notifications via API
        const notifications = selectedItems.map(item => ({
          id: Date.now() + Math.random(),
          itemId: item.id,
          message: message,
          timestamp: new Date().toISOString(),
          status: 'sent'
        }));
        
        const existingNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
        localStorage.setItem('adminNotifications', JSON.stringify([...existingNotifications, ...notifications]));
        alert(`Notifications sent to ${selectedItems.length} items`);
      }
      break;
      
    case 'bulk_export':
      const exportData = selectedItems.map(item => ({
        id: item.id,
        name: item.name || item.title,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }));
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bulk_export_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      alert(`${selectedItems.length} items exported successfully`);
      break;
      
    case 'bulk_delete':
      if (await customConfirm(`Are you sure you want to delete ${selectedItems.length} items? This action cannot be undone.`)) {
        const updatedItems = items.filter(item => !selectedIds.includes(item.id || item._id));
        updateItems(updatedItems);
        alert(`${selectedItems.length} items deleted successfully`);
      }
      break;
      
    default:
      console.log('Unknown admin action:', action);
  }
};

// Utility to create selectable item wrapper
export const createSelectableItem = (item, isSelected, onSelectionChange) => {
  return {
    ...item,
    isSelected,
    onSelect: () => onSelectionChange(item.id || item._id, !isSelected)
  };
};

// Utility to handle individual item selection
export const handleItemSelection = (itemId, isSelected, selectedItems, setSelectedItems) => {
  if (isSelected) {
    setSelectedItems([...selectedItems, itemId]);
  } else {
    setSelectedItems(selectedItems.filter(id => id !== itemId));
  }
};
