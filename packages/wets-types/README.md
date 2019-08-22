# wets-types

(仅)描述所有微信小程序内置的API和元素属性的TypeScript描述，请保持和 wets 框架解耦。

## 使用

```bash
$ yarn add --dev wets-types
$ vim tsconfig.json
```

```diff
{
  "compilerOptions": {
    ...
+   "typeRoots": ["node_modules/@types", "node_modules/wets-types"]
  }
}
```
