import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookedAppointment", BookingSchema);
