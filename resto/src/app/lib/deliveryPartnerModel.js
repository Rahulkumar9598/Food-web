import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    city: String,
    address: String

})

export const DeliveryPartners = mongoose.models.DeliveryPartners || mongoose.model("DeliveryPartners", deliveryPartnerSchema);