import { Inject, Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.enity';
import { Item } from './entities/item.entity';
import { Item_chaps } from './entities/item_chaps.enity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepository: typeof Permission,
    @Inject('ITEM_REPOSITORY') private itemRepository: typeof Item,
    @Inject('ITEM_CHAP_REPOSITORY')
    private itemChapRepository: typeof Item_chaps,
    private readonly AuthService: AuthService,
  ) {}

  // api buy permission item_chap
  async buyPermissionItemChap(itemChapId: number, user: any) {
    try {
      // check price if item_chaps
      const itemChap = await this.itemChapRepository.findOne({
        where: { id: itemChapId },
        include: [
          {
            model: Permission,
            where: { user_id: user.id },
            required: false,
          },
        ],
      });
      if (itemChap.permission.length > 0) {
        return {
          status: 400,
          success: false,
          message: 'You have already bought this chapter',
        };
      }
      const checkPrice = await this.AuthService.checkUserPrice(
        user,
        itemChap.price,
      );
      if (checkPrice.canBuy == false) {
        return {
          status: 400,
          success: false,
          message: 'You do not have enough money to buy this chapter',
        };
      }
      const permission = await this.permissionRepository.create({
        identification_code: itemChapId,
        user_id: user.id,
      });
      return {
        status: 200,
        success: true,
        message: 'you aready can read this chapter successfully',
        data: permission,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        message: error,
      };
    }
  }
}
