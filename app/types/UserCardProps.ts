import { UserDTO } from "../../models/User";

export type UserCardProps = {
  user: UserDTO;
  onPress: (user: UserDTO) => void;
};
