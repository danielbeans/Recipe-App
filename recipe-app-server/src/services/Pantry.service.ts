import { IPantryItem } from "@shared/interfaces/pantry-item.interface";
import { decodeJWT } from "@util/token.utility";
import { UserModel } from "@models/User.model";

export const PantryService = {
  async addToPantry(newItem: IPantryItem, token: string) {
    try {
      const { user_id } = decodeJWT(token);
      const user = await UserModel.findById(user_id);
      user.pantry.push({ name: newItem.name });
      await user.save();
      return user.pantry;
    } catch {
      throw new Error("Could not add to Pantry.");
    }
  },
  async editPantry({ name, id }: IPantryItem, token: string) {
    try {
      const { user_id } = decodeJWT(token);
      const user = await UserModel.findById(user_id);
      const foundIndex = user.pantry.findIndex((item) => item.id === id);
      user.pantry[foundIndex].name = name;
      if (foundIndex === -1) return new Error("Could not find item in Pantry");
      await user.save();
      return user.pantry;
    } catch {
      throw new Error("Could not edit Pantry.");
    }
  },
  async removeFromPantry(itemToRemove: IPantryItem, token: string) {
    try {
      const { user_id } = decodeJWT(token);
      const user = await UserModel.findById(user_id);
      const foundIndex = user.pantry.findIndex(
        (item) => item.id === itemToRemove.id
      );
      if (foundIndex === -1) return new Error("Could not find item in Pantry");
      user.pantry.splice(foundIndex, 1);
      await user.save();
      return user.pantry;
    } catch {
      throw new Error("Could not remove from Pantry");
    }
  },
  async getPantry(token: string) {
    try {
      const { user_id } = decodeJWT(token);
      const user = await UserModel.findById(user_id);
      return user.pantry;
    } catch {
      throw new Error("Unable to get Pantry");
    }
  },
  async clearPantry(token: string) {
    try {
      const { user_id } = decodeJWT(token);
      const user = await UserModel.findById(user_id);
      user.pantry = [];
      await user.save();
      return user.pantry;
    } catch {
      throw new Error("Unable to get Pantry");
    }
  },
};
