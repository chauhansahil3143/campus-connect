import React, { createContext, useContext, useState, ReactNode } from "react";
import { LostFoundItem, ItemStatus, ItemCategory } from "@/lib/types";
import { initialItems } from "@/lib/mockData";

interface ItemsContextType {
  items: LostFoundItem[];
  addItem: (item: Omit<LostFoundItem, "id" | "createdAt">) => void;
  markAsResolved: (id: string) => void;
  getActiveItems: () => LostFoundItem[];
  getResolvedItems: () => LostFoundItem[];
  getStats: () => {
    activeLost: number;
    activeFound: number;
    resolved: number;
  };
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LostFoundItem[]>(initialItems);

  const addItem = (newItem: Omit<LostFoundItem, "id" | "createdAt">) => {
    const item: LostFoundItem = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [item, ...prev]);
  };

  const markAsResolved = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isResolved: true } : item
      )
    );
  };

  const getActiveItems = () => items.filter((item) => !item.isResolved);

  const getResolvedItems = () => items.filter((item) => item.isResolved);

  const getStats = () => ({
    activeLost: items.filter((item) => item.status === "lost" && !item.isResolved).length,
    activeFound: items.filter((item) => item.status === "found" && !item.isResolved).length,
    resolved: items.filter((item) => item.isResolved).length,
  });

  return (
    <ItemsContext.Provider
      value={{
        items,
        addItem,
        markAsResolved,
        getActiveItems,
        getResolvedItems,
        getStats,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
}
