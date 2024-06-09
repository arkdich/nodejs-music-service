import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { getTemplateHtml } from 'src/shared/templates/get-template';

@Injectable()
export class ViewService {
  private static instance: ViewService | null = null;

  constructor(private authService: AuthService) {
    if (ViewService.instance) {
      return ViewService.instance;
    }

    ViewService.instance = this;
  }

  async resetPassword(token: string) {
    try {
      await this.authService.validateToken('reset', token);

      const html = getTemplateHtml('ResetPassword');

      return html;
    } catch (err) {
      const html = getTemplateHtml('AccountActivated', { success: false });

      return html;
    }
  }
}
