import { resolve } from 'path';
import { renderFile } from 'pug';

export const getTemplateHtml = (name: string, params: unknown) => {
  const templatePath = resolve(
    process.cwd(),
    `src/shared/templates/html/${name}.pug`,
  );

  const html = renderFile(templatePath, params);

  return html;
};
