import { create } from "zustand";

export const store = create((set) => ({
 selectedItem: {
  id: null,
  category_id: null,
  amount: "",
  description: "",
  type: "",
 },
 setSelectedItem: (data) => {
  // console.log({ setSelectedItem: data });
    set((state) => ({
     selectedItem: {
      id: data ? data?.id : null,
      category_id: data ? data?.category_id : null,
      amount: data ? String(data?.amount) : "",
      description: data ? data?.description : "",
      type: data ? data?.type : "",
     },
    }));
 },
}));
