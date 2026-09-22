import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    },

    foodsItemsIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foods"
        }
    ],

    deliveryBoy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    status: {
        type: String
    },

    amount: {
        type: Number
    }
});

export const Order =
    mongoose.models.orders ||
    mongoose.model("orders", orderSchema);