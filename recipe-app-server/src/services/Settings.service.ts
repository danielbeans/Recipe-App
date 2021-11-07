import { UserModel } from "@models/User.model";

export const SettingsService = {
  async deleteAccount({ user_id }: { user_id: JwtPayload["user_id"] }) {
    try {
      const user = await UserModel.findById(user_id);
      // delete the document here
      await user.save();
      return true;
    } catch {
      throw new Error("Could not update Pantry."); // TODO update error accordingly
    }
  },
};
