import express, { Request, Response, NextFunction } from 'express';
const app = express();


// 添加 CORS 支持
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// 其他中间件
// app.use(...)

// 路由
// app.get(...)

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
