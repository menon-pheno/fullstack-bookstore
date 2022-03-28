import mongoose from "mongoose";

const { Schema } = mongoose;

// BookSchema 定義一個 Book 該有哪些資料
const BookSchema = new Schema({});

// BookClass 定義有哪些操作 Book 的靜態函式
class BookClass {}

// 這樣 BookSchema 就除了資料型態之外，更有我們在 BookClass 內定義的函式
BookSchema.loadClass(BookClass);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
