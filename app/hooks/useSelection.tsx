import { useState } from 'react';

export const useSelection = <T extends { id: string }>(items: T[]) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const clearSelection = () => setSelectedItems([]);

  return {
    selectedItems,
    toggleSelection,
    clearSelection,
  };
};
