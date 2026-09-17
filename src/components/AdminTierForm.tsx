import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

interface AdminTierFormProps {
  onAdd: (name: string, price: string, totalCount: string) => void;
  loading: boolean;
}

const AdminTierForm: React.FC<AdminTierFormProps> = ({ onAdd, loading }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [totalCount, setTotalCount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name, price, totalCount);
    setName("");
    setPrice("");
    setTotalCount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl border border-gray-200 space-y-3"
    >
      <h3 className="font-bold text-slate-800 flex items-center gap-2">
        <PlusCircle className="w-4 h-4 text-indigo-600" /> Add Ticket Tier
      </h3>

      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tier name (e.g. Gold)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="number"
        min="1"
        step="any"
        required
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price (LKR)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="number"
        min="1"
        required
        value={totalCount}
        onChange={(e) => setTotalCount(e.target.value)}
        placeholder="Total tickets in this tier"
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-md transition cursor-pointer disabled:bg-indigo-300"
      >
        {loading ? "Adding..." : "Add Tier"}
      </button>
    </form>
  );
};

export default AdminTierForm;
