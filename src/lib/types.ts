export type ItemStatus = "lost" | "found";
export type ItemCategory = "Electronics" | "Books" | "Clothing" | "Accessories" | "ID & Cards" | "Keys" | "Bags" | "Other";

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  location: string;
  date: string;
  contactEmail: string;
  contactName: string;
  imageUrl: string;
  isResolved: boolean;
  createdAt: string;
}

export const categories: ItemCategory[] = [
  "Electronics",
  "Books",
  "Clothing",
  "Accessories",
  "ID & Cards",
  "Keys",
  "Bags",
  "Other",
];
