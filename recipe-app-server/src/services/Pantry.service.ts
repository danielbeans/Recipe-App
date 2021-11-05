import { IPantryItem } from "@shared/interfaces/pantry.interface";
import { decodeJWT } from "@util/token.utility";
import { UserModel } from "@models/User.model";

export const PantryService = {
  async updatePantry(newPantry: IPantryItem[], token: string) {
    try {
      const { user_id } = decodeJWT(token);
      const user = await UserModel.findById(user_id);
      user.pantry.splice(0, user.pantry.length, ...newPantry);
      await user.save();
      return user.pantry;
    } catch {
      throw new Error("Could not update Pantry.");
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
};
