import { UserModel } from "@models/User.model";
import { validatePassword } from "@util/password.utility";

export const SettingsService = {
  async deleteAccount({ user_id }: { user_id: JwtPayload["user_id"] }) {
    try {
      await UserModel.findByIdAndRemove(user_id);
      return true;
    } catch {
      throw new Error("Could not delete user account."); // TODO update error accordingly
    }
  },
  async updatePassword({
    user_id,
    currentPassword,
    newPassword,
  }: {
    user_id: JwtPayload["user_id"];
    currentPassword: string;
    newPassword: string;
  }) {
    const userToUpdate = await UserModel.findById(user_id);
    if (
      userToUpdate &&
      (await validatePassword(currentPassword, userToUpdate.password))
    ) {
      userToUpdate.password = newPassword;
      userToUpdate.save();
      return true;
    }
    throw new Error("Invalid current password.");
  },
  async updateName({
    user_id,
    newName,
  }: {
    user_id: JwtPayload["user_id"];
    newName: string;
  }) {
    const userToUpdate = await UserModel.findById(user_id);
    if (userToUpdate) {
      userToUpdate.name = newName;
      userToUpdate.save();
      return true;
    }
    throw new Error("Could not update name");
  },
  async updateUsername({
    user_id,
    newUsername,
  }: {
    user_id: JwtPayload["user_id"];
    newUsername: string;
  }) {
    const userToUpdate = await UserModel.findById(user_id);
    if (userToUpdate) {
      userToUpdate.username = newUsername;
      userToUpdate.save();
      return true;
    }
    throw new Error("Could not update username");
  },
  async updateEmail({
    user_id,
    newEmail,
  }: {
    user_id: JwtPayload["user_id"];
    newEmail: string;
  }) {
    const userToUpdate = await UserModel.findById(user_id);
    if (userToUpdate) {
      userToUpdate.email = newEmail;
      userToUpdate.save();
      return true;
    }
    throw new Error("Could not update email");
  },
};
