# wets-loader

使用`webpack`来发布微信小程序代码

```js
// ...

module: {
  rules: [
    {
      test: /\.ts$/,
      use: 'wets-loader',
      exclude: /node_modules/,
    },
  ],
},

//...
```
