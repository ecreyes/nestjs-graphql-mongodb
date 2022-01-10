import * as DataLoader from 'dataloader'

import { User } from './user.model'
import { UserService } from './user.service'

export function batchUsers(userService: UserService) {
  return new DataLoader<string, User>(async ids => {

    const users = await userService.getUsersById(ids)

    return users
  })
}
