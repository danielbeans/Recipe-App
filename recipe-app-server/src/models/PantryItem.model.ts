// MODELS USED TO CREATE NEW DOCUMENTS IN MONGODB
import mongoose, { Schema } from "mongoose";
import { IPantryItem } from "@shared/interfaces/pantry-item.interface";

export const PantryItemSchema = new Schema<IPantryItem>({
  //TODO add other properties
  name: { type: String, required: true },
});

export const PantryItemModel = mongoose.model("PantryItem", PantryItemSchema);
