import React, { useState } from 'react';
import styled from 'styled-components';

const BulkActionContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #00b38e;
`;

const ActionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SelectAllCheckbox = styled.input`
  cursor: pointer;
  transform: scale(1.2);
`;

const SelectedCount = styled.span`
  color: #00b38e;
  font-weight: 600;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'danger' ? '#ff6b6b' : props.variant === 'warning' ? '#ffa726' : '#00b38e'};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const QuickActionChip = styled.button`
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #333;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e0e0e0;
    border-color: #00b38e;
  }
`;

const BulkActionComponent = ({ 
  items = [], 
  selectedItems = [], 
  onSelectionChange, 
  actionType = 'pharmacy', // 'pharmacy', 'doctor', 'admin'
  onBulkAction 
}) => {
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !isSelectAll;
    setIsSelectAll(newSelectAll);
    
    if (newSelectAll) {
      onSelectionChange(items.map(item => item.id || item._id));
    } else {
      onSelectionChange([]);
    }
  };

  const getActionButtons = () => {
    switch (actionType) {
      case 'pharmacy':
        return [
          { label: '🛒 Add to Cart', action: 'bulk_add_cart', variant: 'primary' },
          { label: '❤️ Add to Wishlist', action: 'bulk_wishlist', variant: 'primary' },
          { label: '📋 Compare', action: 'bulk_compare', variant: 'secondary' },
          { label: '📤 Share', action: 'bulk_share', variant: 'secondary' },
          { label: '🗑️ Remove', action: 'bulk_remove', variant: 'danger' }
        ];
      case 'doctor':
        return [
          { label: '📅 Book Appointments', action: 'bulk_book', variant: 'primary' },
          { label: '❤️ Add to Favorites', action: 'bulk_favorite', variant: 'primary' },
          { label: '📋 Compare Doctors', action: 'bulk_compare', variant: 'secondary' },
          { label: '📤 Share Profiles', action: 'bulk_share', variant: 'secondary' },
          { label: '📧 Send Inquiry', action: 'bulk_inquiry', variant: 'secondary' }
        ];
      case 'admin':
        return [
          { label: '✅ Approve', action: 'bulk_approve', variant: 'primary' },
          { label: '❌ Reject', action: 'bulk_reject', variant: 'danger' },
          { label: '📧 Send Notification', action: 'bulk_notify', variant: 'secondary' },
          { label: '📊 Export Data', action: 'bulk_export', variant: 'secondary' },
          { label: '🗑️ Delete', action: 'bulk_delete', variant: 'danger' }
        ];
      default:
        return [];
    }
  };

  const getQuickActions = () => {
    switch (actionType) {
      case 'pharmacy':
        return [
          { label: 'Select In Stock', filter: (item) => item.availability === 'In Stock' },
          { label: 'Select On Sale', filter: (item) => item.discount > 0 || item.sale },
          { label: 'Select Under ₹100', filter: (item) => parseFloat(item.price) < 100 },
          { label: 'Select Popular', filter: (item) => item.popular || item.rating >= 4 }
        ];
      case 'doctor':
        return [
          { label: 'Select Available Today', filter: (item) => item.availableToday !== false },
          { label: 'Select Video Consult', filter: (item) => item.videoConsult },
          { label: 'Select Highly Rated', filter: (item) => item.rating >= 4.5 },
          { label: 'Select Experienced', filter: (item) => item.experience >= 10 }
        ];
      case 'admin':
        return [
          { label: 'Select Pending', filter: (item) => item.status === 'pending' },
          { label: 'Select Active', filter: (item) => item.status === 'active' },
          { label: 'Select Recent', filter: (item) => new Date(item.createdAt) > new Date(Date.now() - 7*24*60*60*1000) }
        ];
      default:
        return [];
    }
  };

  const handleQuickSelect = (filterFn) => {
    const filteredIds = items.filter(filterFn).map(item => item.id || item._id);
    onSelectionChange([...new Set([...selectedItems, ...filteredIds])]);
  };

  const handleBulkAction = (action) => {
    if (selectedItems.length === 0) {
      alert('Please select items first');
      return;
    }
    
    onBulkAction(action, selectedItems);
  };

  return (
    <BulkActionContainer>
      <ActionHeader>
        <SelectAllContainer>
          <SelectAllCheckbox
            type="checkbox"
            checked={isSelectAll}
            onChange={handleSelectAll}
          />
          <span>Select All</span>
          {selectedItems.length > 0 && (
            <SelectedCount>
              ({selectedItems.length} selected)
            </SelectedCount>
          )}
        </SelectAllContainer>
        
        <ActionButtons>
          {getActionButtons().map(button => (
            <ActionButton
              key={button.action}
              variant={button.variant}
              disabled={selectedItems.length === 0}
              onClick={() => handleBulkAction(button.action)}
            >
              {button.label}
            </ActionButton>
          ))}
        </ActionButtons>
      </ActionHeader>

      <QuickActions>
        <span style={{ fontSize: '12px', color: '#666', alignSelf: 'center' }}>
          Quick select:
        </span>
        {getQuickActions().map((action, index) => (
          <QuickActionChip
            key={index}
            onClick={() => handleQuickSelect(action.filter)}
          >
            {action.label}
          </QuickActionChip>
        ))}
      </QuickActions>
    </BulkActionContainer>
  );
};

export default BulkActionComponent;
