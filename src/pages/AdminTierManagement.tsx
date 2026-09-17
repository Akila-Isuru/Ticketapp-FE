import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import AdminTierForm from "../components/AdminTierForm";
import AdminTierListItem from "../components/AdminTierListItem";
import type { TicketTier } from "../types";

const AdminTierManagement: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [tiers, setTiers] = useState<TicketTier[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTiers = async () => {
    try {
      const response = await API.get(`/events/${eventId}/tiers`);
      setTiers(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tiers:", error);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, [eventId]);

  const handleAddTier = async (
    name: string,
    price: string,
    totalCount: string,
  ) => {
    setLoading(true);
    try {
      await API.post(`/events/${eventId}/tiers`, {
        name,
        price: parseFloat(price),
        totalCount: parseInt(totalCount, 10),
      });
      Swal.fire({
        icon: "success",
        title: "Tier Added!",
        timer: 1200,
        showConfirmButton: false,
      });
      fetchTiers();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Tier",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTier = async (tier: TicketTier) => {
    const result = await Swal.fire({
      title: "Delete this tier?",
      text: `"${tier.name}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/events/${eventId}/tiers/${tier.id}`);
        fetchTiers();
      } catch (error: any) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to delete tier",
          "error",
        );
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 mb-6 text-sm font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Manage Ticket Tiers
      </h1>

      <div className="space-y-6">
        <AdminTierForm onAdd={handleAddTier} loading={loading} />

        <div className="space-y-3">
          {tiers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No tiers added yet. This event will use its default single ticket
              price.
            </p>
          ) : (
            tiers.map((tier) => (
              <AdminTierListItem
                key={tier.id}
                tier={tier}
                onDelete={handleDeleteTier}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTierManagement;
