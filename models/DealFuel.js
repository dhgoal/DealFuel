const mongoose = require("mongoose");

const WorkExperienceSchema = new mongoose.Schema({
  company: String,
  startDate: String, // Consider using Date type if you want to manipulate dates
  endDate: String, // Consider using Date type if you want to manipulate dates
});

const ProfessionalRoleSchema = new mongoose.Schema({
  role: String,
  selected: Boolean,
});

const OfferDetailSchema = new mongoose.Schema({
  offerName: String,
  company: String,
  triage: String,
  avgOfferValue: String, // Consider using Number type if these will always be numeric
  numberOfCloses: String, // Consider using Number type if these will always be numeric
});

const UserProfileSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String, // Ensure you hash passwords before storing them
    phoneNumber: String,
    amountClosed: String, // Consider using Number type if these will always be numeric
    city: String,
    country: String,
    numCompanies: String, // Consider using Number type if these will always be numeric
    age: String, // Consider using Number type if these will always be numeric
    language: String,
    niche: String,
    experience: String,
    calls: String, // Consider using Number type if these will always be numeric
    calendlyUrl: String,
    twitterUrl: String,
    linkedinUrl: String,
    professionalRoles: [ProfessionalRoleSchema],
    aboutMe: String,
    aboutMeFile: String, // Store a reference to the file location if storing files elsewhere (e.g., AWS S3)
    workExperiences: [WorkExperienceSchema],
    offerDetails: [OfferDetailSchema],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
