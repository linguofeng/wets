import * as path from 'path';
import * as fs from 'fs-extra';

import { nameError, pageExists } from '../src/lib/errors';
import { createHtml, createPug, createCss, createTs, createPage, deletePage } from '../src/lib';

describe('index', () => {
  it('createHtml', async () => {
    expect(createHtml('home')).toEqual(
      await fs.readFile('fixtures/createHtml.html', 'utf-8'),
    );
  });

  it('createPug', async () => {
    expect(createPug('home')).toEqual(
      await fs.readFile('fixtures/createPug.pug', 'utf-8'),
    );
  });

  it('createCss', async () => {
    expect(createCss('home')).toEqual(
      await fs.readFile('fixtures/createCss.css', 'utf-8'),
    );
  });

  it('createTs html', async () => {
    expect(createTs('home', 'html')).toEqual(
      await fs.readFile('fixtures/createTsHtml.ts', 'utf-8'),
    );
  });

  it('createTs pug', async () => {
    expect(createTs('home', 'pug')).toEqual(
      await fs.readFile('fixtures/createTsPug.ts', 'utf-8'),
    );
  });

  it('createTs jsx', async () => {
    expect(createTs('home', 'jsx')).toEqual(
      await fs.readFile('fixtures/createTs.tsx', 'utf-8'),
    );
  });

  it('createTs app', async () => {
    expect(createTs('MyApp', 'app')).toEqual(
      await fs.readFile('fixtures/createTsApp.ts', 'utf-8'),
    );
  });

  it('createPage Hello', async () => {
    expect.assertions(1);
    await expect(createPage(path.join(__dirname, 'test'), 'Hello', 'html'))
      .rejects.toEqual(nameError('Hello'));
  });

  it('createPage login', async () => {
    const appPath = path.join(__dirname, 'test');
    await fs.remove(appPath);
    await createPage(appPath, 'login', 'html');
    await fs.remove(appPath);
  });

  it('createPage login', async () => {
    expect.assertions(1);
    const appPath = path.join(__dirname, 'test');
    await fs.remove(appPath);
    await createPage(appPath, 'login', 'html');
    await expect(createPage(appPath, 'login', 'html'))
      .rejects.toEqual(pageExists('login'));
    await fs.remove(appPath);
  });

  it('createPage login-success', async () => {
    const appPath = path.join(__dirname, 'test');
    await fs.remove(appPath);
    await createPage(appPath, 'login-success', 'html', '登录成功');
    await fs.remove(appPath);
  });

  it('createPage && deletePage login-success', async () => {
    const appPath = path.join(__dirname, 'test');
    await fs.remove(appPath);
    await createPage(appPath, 'login-success', 'html', '登录成功');
    await deletePage(appPath, 'login-success');
    await fs.remove(appPath);
  });
});
