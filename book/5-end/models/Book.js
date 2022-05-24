import mongoose from "mongoose";
import generateSlug from "../lib/slugify";

const { Schema } = mongoose;

// BookSchema 定義一個 Book 該有哪些資料
const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  githubRepo: {
    type: String,
    required: true,
  },
  githubLastCommitSha: String,
  createdAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// BookClass 定義有哪些操作 Book 的靜態函式
class BookClass {
  static async list({ offset = 0, limit = 10 } = {}) {
    // 程式邏輯
    const books = await this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    // 回傳有 books 屬性的物件，而 books 是一個最多有 10 個元素的陣列
    return { books };
  }

  static async getBySlug({ slug }) {
    // 程式邏輯
    const bookDocument = await this.findOne({ slug });
    if (!bookDocument) {
      throw new Error("此書不存在");
    }
    const book = bookDocument.toObject();

    // 回傳 book 物件
    return book;
  }

  static async add({ name, price, githubRepo }) {
    // 程式邏輯
    const slug = await generateSlug(this, name);
    if (!slug) {
      throw new Error(`${name} slug 產生失敗`);
    }
    // 回傳新增的 book 物件
    return this.create({
      name,
      slug,
      price,
      githubRepo,
      createdAt: new Date(),
    });
  }

  static async edit({ id, name, price, githubRepo }) {
    // 程式邏輯
    const book = await this.findById(id, "slug name");

    if (!book) {
      throw new Error(`${id} 書本找不到`);
    }

    const modifier = { price, githubRepo };

    if (name !== book.name) {
      modifier.name = name;
      modifier.slug = await generateSlug(this, name);
    }

    // 回傳修改過後的 book 物件
    return this.updateOne({ _id: id }, { $set: modifier });
  }
}

// 這樣 BookSchema 就除了資料型態之外，更有我們在 BookClass 內定義的函式
BookSchema.loadClass(BookClass);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
