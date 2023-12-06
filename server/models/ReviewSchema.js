import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Patient",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "patient", select: "name photo" });
  next();
});

reviewSchema.statics.calcAverageRating = async function (doctorId) {
  // this points to the exact reviews
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },

    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].averageRating,
  });
  console.log(stats);
};
reviewSchema.post("save", function () {
  this.constructor.calcAverageRating(this.doctor);
});
export default mongoose.model("Review", reviewSchema);
