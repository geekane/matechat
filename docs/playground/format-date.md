在JavaScript中，格式化时间可以通过多种方式实现，包括使用原生的`Date`对象方法、使用国际化API（`Intl`对象），或者使用第三方库。以下是一些常见的方法：

### 1. 使用原生JavaScript

#### 基本格式化

```javascript
const now = new Date();

// 获取年、月、日、时、分、秒
const year = now.getFullYear();
const month = now.getMonth() + 1; // 月份是从0开始的
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

console.log(formattedTime);
```

#### 使用`Date`对象的方法

```javascript
const now = new Date();

// toLocaleString() 方法可以根据本地格式来格式化日期和时间
const formattedTime = now.toLocaleString();

console.log(formattedTime);
```

这些方法可以帮助你根据不同的需求格式化时间。选择哪种方法取决于你的具体需求和项目环境。
