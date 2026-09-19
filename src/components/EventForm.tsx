import React, { useState } from "react";
import {
  PlusCircle,
  Calendar,
  Image,
  X,
  Upload,
  Loader2,
  Tag,
} from "lucide-react";
import API from "../api";
import Swal from "sweetalert2";

interface EventFormProps {
  title: string;
  location: string;
  eventDate: string;
  ticketPrice: string;
  totalTickets: string;
  imageUrl: string;
  cardImageUrl: string;
  category: string;
  subCategory: string;
  editingId: number | null;
  loading: boolean;
  onTitleChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onEventDateChange: (v: string) => void;
  onTicketPriceChange: (v: string) => void;
  onTotalTicketsChange: (v: string) => void;
  onImageUrlChange: (v: string) => void;
  onCardImageUrlChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onSubCategoryChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

const CONCERT_SUBCATEGORIES = [
  "Indoor Musical Concert",
  "Outdoor Musical Concert",
  "EDM",
];

const EventForm: React.FC<EventFormProps> = ({
  title,
  location,
  eventDate,
  ticketPrice,
  totalTickets,
  imageUrl,
  cardImageUrl,
  category,
  subCategory,
  editingId,
  loading,
  onTitleChange,
  onLocationChange,
  onEventDateChange,
  onTicketPriceChange,
  onTotalTicketsChange,
  onImageUrlChange,
  onCardImageUrlChange,
  onCategoryChange,
  onSubCategoryChange,
  onSubmit,
  onCancelEdit,
}) => {
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingCard, setUploadingCard] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await API.post("/events/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBanner(true);
    try {
      const uploadedUrl = await uploadFile(file);
      onImageUrlChange(uploadedUrl);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleCardImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCard(true);
    try {
      const uploadedUrl = await uploadFile(file);
      onCardImageUrlChange(uploadedUrl);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setUploadingCard(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
    onSubCategoryChange("");
  };

  const isUploading = uploadingBanner || uploadingCard;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          {editingId ? "Edit Event" : "Add New Event"}
        </h2>
        {editingId && (
          <button
            onClick={onCancelEdit}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            title="Cancel edit"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Musical Concert 2026"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Category
          </label>
          <select
            required
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option value="">Select a category</option>
            <option value="CONCERT">Concert</option>
            <option value="THEATRE">Theatre</option>
            <option value="SPORTS">Sports</option>
          </select>
        </div>

        {category === "CONCERT" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Concert Type
            </label>
            <select
              required
              value={subCategory}
              onChange={(e) => onSubCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
            >
              <option value="">Select a concert type</option>
              {CONCERT_SUBCATEGORIES.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="e.g., Nelum Pokuna, Colombo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Event Date & Time
          </label>
          <input
            type="datetime-local"
            required
            value={eventDate}
            onChange={(e) => onEventDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ticket Price (LKR)
          </label>
          <input
            type="number"
            min="1"
            step="any"
            required
            value={ticketPrice}
            onChange={(e) => onTicketPriceChange(e.target.value)}
            placeholder="e.g., 2500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Total Tickets
          </label>
          <input
            type="number"
            min="1"
            required
            value={totalTickets}
            onChange={(e) => onTotalTicketsChange(e.target.value)}
            placeholder="e.g., 500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Image className="w-3.5 h-3.5" /> Banner Image (Event Details Page)
          </label>

          <label
            htmlFor="event-banner-upload"
            className={`flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed rounded-md py-6 cursor-pointer transition ${
              uploadingBanner
                ? "border-indigo-300 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
            }`}
          >
            {uploadingBanner ? (
              <>
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                <span className="text-xs text-indigo-600 font-medium">
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">
                  Click to upload wide banner image
                </span>
              </>
            )}
            <input
              id="event-banner-upload"
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="hidden"
            />
          </label>

          {imageUrl && !uploadingBanner && (
            <div className="mt-3">
              <img
                src={imageUrl}
                alt="Banner preview"
                className="w-full h-32 rounded-md object-cover border border-gray-200"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Image className="w-3.5 h-3.5" /> Card Image (Home Page Listing)
          </label>

          <label
            htmlFor="event-card-image-upload"
            className={`flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed rounded-md py-6 cursor-pointer transition ${
              uploadingCard
                ? "border-indigo-300 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
            }`}
          >
            {uploadingCard ? (
              <>
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                <span className="text-xs text-indigo-600 font-medium">
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">
                  Click to upload portrait card image
                </span>
              </>
            )}
            <input
              id="event-card-image-upload"
              type="file"
              accept="image/*"
              onChange={handleCardImageChange}
              className="hidden"
            />
          </label>

          {cardImageUrl && !uploadingCard && (
            <div className="mt-3">
              <img
                src={cardImageUrl}
                alt="Card preview"
                className="w-32 h-44 rounded-md object-cover border border-gray-200 mx-auto"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || isUploading || !imageUrl || !cardImageUrl}
          className={`w-full text-white font-medium py-2 rounded-md transition cursor-pointer text-sm mt-2 ${
            editingId
              ? "bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
              : "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300"
          }`}
        >
          {loading
            ? editingId
              ? "Updating..."
              : "Creating..."
            : editingId
              ? "Update Event"
              : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
