import { create } from "zustand";

export const store = create((set) => ({
 selectedItem: {
  id: null,
  category_id: null,
  amount: '',
  date: null,
  description: '',
  type: null,
 },
 setSelectedItem: (data) => {
  set((state) => ({
   selectedItem: {
    id: data?.id,
    category_id: data?.category_id,
    amount: data?.amount,
    date: data?.data,
    description: data?.description,
    type: data?.type,
   },
  }));
 },
}));
